"use client";

import AdminDashboard from "@/app/ui/dashboard/admin-dashboard";

// const cards = [
//   {
//     title: "Total Sales",
//     value: "858",
//     icon: <FiTrendingUp className="text-yellow-500 text-xl" />,
//     change: "+55%",
//     duration: "7d",
//     bgColor: "bg-yellow-50",
//     textColor: "text-yellow-500",
//   },
//   {
//     title: "New Onboardings",
//     value: "1,128",
//     icon: <FiUsers className="text-blue-500 text-xl" />,
//     change: "+5%",
//     duration: "7d",
//     bgColor: "bg-blue-50",
//     textColor: "text-blue-500",
//   },
//   {
//     title: "Pending Approvals",
//     value: "168",
//     icon: <FiFileText className="text-red-500 text-xl" />,
//     change: "+8%",
//     duration: "7d",
//     bgColor: "bg-red-50",
//     textColor: "text-red-500",
//   },
//   {
//     title: "Commission Earnings",
//     value: "₦47,858",
//     icon: <FiDollarSign className="text-teal-500 text-xl" />,
//     change: "-14%",
//     duration: "30d",
//     bgColor: "bg-teal-50",
//     textColor: "text-teal-500",
//   },
// ];
// const mockData = [
//   { date: "23 Oct", users: 3000 },
//   { date: "6 Nov", users: 5000 },
//   { date: "20 Nov", users: 8000 },
//   { date: "4 Dec", users: 15000 },
//   { date: "18 Dec", users: 25000 },
//   { date: "1 Jan", users: 20000 },
// ];
// const totalUsers = 56589;

export default function Dashboard() {
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome Jacob</h1>
        <p className="text-blue-500">AXA Admin</p>
      </div>
      <div className=" p-6">
        <AdminDashboard />
      </div>
    </main>
  );
}
