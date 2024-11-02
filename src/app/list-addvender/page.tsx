"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Search } from "lucide-react";
import { useRouter } from "next/navigation";


export default function VendorListView() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([]); // Full list of vendors
  const [filteredVendors, setFilteredVendors] = useState([]); // List for search results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();


  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendor/getvendors");
        console.log(response);
        
        const fetchedVendors = Array.isArray(response.data.getres) ? response.data.getres : [];
        setVendors(fetchedVendors);
        setFilteredVendors(fetchedVendors); // Initially set filtered list to all vendors
      } catch (error) {
        setError("Failed to load vendors");
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Filter vendors based on searchTerm
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVendors(vendors); // Show all vendors if no search term
    } else {
      setFilteredVendors(
        vendors.filter(
          (vendor) =>
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, vendors]);

  if (loading) return <div className={`h-[100vh] p-4 animate-pulse `}>
  <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 `}>
    <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Switch  />
          <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64 bg-slate-200 border h-full">
          </div>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white w-36" >
            
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
              <TableRow  className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="font-medium dark:text-gray-200  "></TableCell>
                <TableCell className="dark:text-gray-300"></TableCell>
                <TableCell>
                  <Badge className={`font-semibold `}></Badge>
                </TableCell>
                <TableCell>
                  <Badge className={`font-semibold`}></Badge>
                </TableCell>
                <TableCell className="dark:text-gray-300"></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</div> 
  if (error) return <p>{error}</p>;

// Place these functions inside your component, but above the return statement
const getCriticalityColor = (criticality: string) => {
  switch (criticality.toLowerCase()) {
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    case 'under review':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  }
};


  return (
    <div className={`h-[100vh] p-4 `}>
      <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${isDarkTheme ? "dark" : ""}`}>
        <Card className="w-full mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Vendor List</CardTitle>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
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
                {filteredVendors.map((vendor, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="font-medium dark:text-gray-300">{vendor.name}</TableCell>
                    <TableCell className="dark:text-gray-300">{vendor.type}</TableCell>
                    <TableCell>
                      <Badge className={`font-semibold ${getCriticalityColor(vendor.criticality)}`}>{vendor.criticality}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-semibold ${getStatusColor(vendor.status)}`}>{vendor.status}</Badge>
                    </TableCell>
                    <TableCell className="dark:text-gray-300">{vendor.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
