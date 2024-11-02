'use client'

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sun , Moon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';




// Define validation schema with Zod
const vendorSchema = z.object({
  name: z.string().min(2, "Vendor name must be at least 2 characters"),
  type: z.enum(["Supplier", "Service Provider", "Logistics", "Technology"]),
  criticality: z.enum(["Low", "Medium", "High", "Critical"]),
  status: z.enum(["Active", "Inactive", "Under Review"]),
  contact: z.string().email("Invalid email address"),
serviceProvided: z.enum(["Raw Materials", "IT Support", "Shipping",	"Packaging Materials", "Cybersecurity" ])
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function VendorForm() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, control,reset, formState: { errors } } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),});

  const onSubmit = async(data: VendorFormData) => {
   
    try {
      const result = await axios.post("/api/vendor/addvendor", {
        name: data.name,
        serviceProvided: data.serviceProvided,
        type: data.type,
        criticality: data.criticality,
        status: data.status,
        email: data.contact
      });
      toast.success("Vendor Added");
      console.log("Vendor Data Submitted:", data, "add into db:", result);

      // Clear the form fields after successful submission
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add vendor. Please try again.");
    }
    
    
    
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  function cutfunc(){
    router.push("/list-addvender")
  }

  return (
    <div className={`${isDarkTheme ? 'dark' : ''}` }>
      <div className="dark:bg-slate-700 ">
      <Card className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg p-6" >
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between font-bold text-gray-900 dark:text-gray-100">Add New Vendor <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>  </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Name */}
          <div>
            <Label htmlFor="name">Vendor Name</Label>
            <Input id="name" {...register("name")} placeholder="Enter vendor name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Vendor Type */}
          <div>
            <Label htmlFor="type">Vendor Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select vendor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                    <SelectItem value="Service Provider">Service Provider</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
          </div>

          {/* Criticality */}
          <div>
            <Label htmlFor="criticality">Criticality</Label>
            <Controller
              name="criticality"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="criticality">
                    <SelectValue placeholder="Select criticality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.criticality && <p className="text-red-500 text-sm">{errors.criticality.message}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
          <div>
            <Label htmlFor="Service Provided">	Service Provided</Label>
            <Controller
              name="serviceProvided"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger id="serviceProvided">
                    <SelectValue placeholder="Select Service Provided" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                    <SelectItem value="IT Support">IT Support</SelectItem>
                    <SelectItem value="	Packaging Materials">	Packaging Materials</SelectItem>
                    <SelectItem value="	Cybersecurity">	Cybersecurity</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.criticality && <p className="text-red-500 text-sm">{errors.criticality.message}</p>}
          </div>

          {/* Contact Email */}
          <div>
            <Label htmlFor="contact">Contact Email</Label>
            <Input id="contact" {...register("contact")} placeholder="Enter contact email" />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
          </div>
          <div className="flex items-center gap-4">
              <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">Submit</Button><Button className="bg-red-700 hover:bg-red-800 text-white" onClick={cutfunc}>Cancel</Button>
          </div>
          
        </form>
      </CardContent>
    </Card>
    <ToastContainer/>
    </div>
    
    </div>
    
  );
}
