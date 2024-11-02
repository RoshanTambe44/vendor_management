'use client'

import EnhancedVendorDashboard from "./dashboard/page";

export default function Home() {

  const currentDate = new Date().toLocaleDateString();

  return (
   <div className=""> <EnhancedVendorDashboard/></div>
  );
}
 