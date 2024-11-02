"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Search, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VendorListView() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]); 
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;

  const router = useRouter();

  interface Vendor {
    name: string;
    id: number;
    status: string;
    criticality: string;
    serviceProvided: string;
    contact: string;
    type: string;
  }

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendor/getvendors");
        const fetchedVendors = Array.isArray(response.data.getres) ? response.data.getres : [];
        setVendors(fetchedVendors);
        setFilteredVendors(fetchedVendors); 
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    const results = searchTerm === ""
      ? vendors 
      : vendors.filter(vendor =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredVendors(results);
    setCurrentPage(1);
  }, [searchTerm, vendors]);

  const getCriticalityColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "under review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  // Pagination logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={`${isDarkTheme ? "dark" : ""}`}>
      <div className={`h-[100vh] p-4 dark:bg-gray-500`}>
        <div className={`bg-gray-100 dark:bg-gray-900 transition-colors rounded-lg duration-300`}>
          <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
              <div className="flex flex-row-reverse items-center gap-6 space-x-6">
                <div className="">
                  <Home className="h-5 w-5 text-gray-500 cursor-pointer dark:text-gray-400 text-xs" onClick={()=>{router.push("/dashboard")}}></Home>
                  </div>
                <div className="flex  items-center  space-x-2">
                  <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
                  <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md w-full dark:bg-gray-700 dark:text-gray-100"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white" onClick={() => router.push("/form")}>
                  Add New Vendor
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left dark:text-gray-300">Name</TableHead>
                    <TableHead className="text-left dark:text-gray-300">Type</TableHead>
                    <TableHead className="text-left dark:text-gray-300">Criticality</TableHead>
                    <TableHead className="text-left dark:text-gray-300">Status</TableHead>
                    <TableHead className="text-left dark:text-gray-300">Contact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentVendors.map((vendor, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium dark:text-gray-300">{vendor.name}</TableCell>
                      <TableCell className="dark:text-gray-300">{vendor.type}</TableCell>
                      <TableCell>
                        <Badge className={`font-semibold ${getCriticalityColor(vendor.criticality)} hover:bg-gray-200 cursor-pointer`}>
                          {vendor.criticality}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`font-semibold ${getStatusColor(vendor.status)}  hover:bg-gray-200 cursor-pointer`}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">{vendor.contact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4 cursor-pointer">
                <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span className="text-gray-500 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
