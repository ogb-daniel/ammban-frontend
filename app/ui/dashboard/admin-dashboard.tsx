"use client";
import DashboardCard from "@/app/ui/dashboard/dashboard-card";
import RecentProducts from "@/app/ui/dashboard/recent-product";
import RecentTransactions from "@/app/ui/dashboard/recent-transaction";
import SalesInsights from "@/app/ui/dashboard/sales-insights";
import SearchBar from "@/app/ui/search-bar";
import React from "react";
import {
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const cards = [
  {
    title: "Total Sales",
    value: "858",
    icon: <FiTrendingUp className="text-yellow-500 text-xl" />,
    change: "+55%",
    duration: "7d",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-500",
  },
  {
    title: "New Onboardings",
    value: "1,128",
    icon: <FiUsers className="text-blue-500 text-xl" />,
    change: "+5%",
    duration: "7d",
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
  },
  {
    title: "Pending Approvals",
    value: "168",
    icon: <FiFileText className="text-red-500 text-xl" />,
    change: "+8%",
    duration: "7d",
    bgColor: "bg-red-50",
    textColor: "text-red-500",
  },
  {
    title: "Commission Earnings",
    value: "₦47,858",
    icon: <FiDollarSign className="text-teal-500 text-xl" />,
    change: "-14%",
    duration: "30d",
    bgColor: "bg-teal-50",
    textColor: "text-teal-500",
  },
];
const mockData = [
  { date: "23 Oct", users: 3000 },
  { date: "6 Nov", users: 5000 },
  { date: "20 Nov", users: 8000 },
  { date: "4 Dec", users: 15000 },
  { date: "18 Dec", users: 25000 },
  { date: "1 Jan", users: 20000 },
];
const totalUsers = 56589;

export default function AdminDashboard() {
  return (
    <main className="">
      <SearchBar placeholder="Search..." onChange={() => {}} />
      <h2 className="mt-6  font-semibold">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      <SalesInsights data={mockData} totalUsers={totalUsers} />
      <RecentTransactions />
      <RecentProducts />
    </main>
  );
}
