"use client";
import DashboardCard from "@/app/ui/dashboard/dashboard-card";

import React from "react";
import { FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

import { useUserStore } from "@/providers/user-store-provider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReferralInsights from "./referral-insights";

// const mockData = [
//   { date: "23 Oct", users: 3000 },
//   { date: "6 Nov", users: 5000 },
//   { date: "20 Nov", users: 8000 },
//   { date: "4 Dec", users: 15000 },
//   { date: "18 Dec", users: 25000 },
//   { date: "1 Jan", users: 20000 },
// ];
// const totalUsers = 56589;
// const tabs = [
//   { key: "all", label: "All Transactions", component: <AllTransactions /> },
//   { key: "income", label: "Income", component: <Income /> },
//   { key: "outflow", label: "Outflow", component: <Outflow /> },
// ];

export default function AgentDashboard({
  totalSalesAmount,
  totalSales,
  commissionEarnings,
  monthlyReferrals,
}: {
  totalSales: number;
  totalSalesAmount: number;
  commissionEarnings: number;
  monthlyReferrals: { month: string; count: number }[];
}) {
  // const isMobile = useResponsive();
  const user = useUserStore((state) => state.user);
  const cards = [
    {
      title: "Total Sales",
      value: totalSales,
      icon: <FiTrendingUp className="text-yellow-500 text-xl" />,
      duration: "7d",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
      link: "#",
    },
    {
      title: "Total Sales (₦)",
      value: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(totalSalesAmount),
      icon: <FiUsers className="text-blue-500 text-xl" />,
      duration: "7d",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
      link: "#",
    },

    {
      title: "Commission Earnings",
      value: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(commissionEarnings),
      icon: <FiDollarSign className="text-teal-500 text-xl" />,
      duration: "30d",
      bgColor: "bg-teal-50",
      textColor: "text-teal-500",
      link: `/${user?.role}/wallet`,
    },
  ];
  return (
    <main className="">
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold ">Welcome {user?.userName}</h1>
        <p className="text-blue-500 font-medium">
          {user?.role &&
            user?.role.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
        </p>
      </div>
      <div className=" p-6">
        <h2 className="mt-6  font-semibold">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {cards.map((card, index) => (
            <DashboardCard key={index} {...card} />
          ))}
        </div>
        {user?.role === "agent" && (
          <Link
            href={`/${user?.role}/products`}
            className="flex w-fit items-center flex-row gap-4 mt-6 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <div className="flex flex-col">
              <span className="font-medium">Purchase New Product</span>
              <span className="font-semibold text-xl">Select Product</span>
            </div>
            <ArrowRight className="text-white ml-2 inline-block" />
          </Link>
        )}
        <ReferralInsights data={monthlyReferrals} />
        {/* {isMobile ? (
          <>
            <SalesInsights data={mockData} totalUsers={totalUsers} />
            <RecentTransactions />
            <RecentProducts />
          </>
        ) : (
          <div className="mt-10">
            <h2 className="text-[22px]  font-semibold">Recent Transactions</h2>
            <TabSlider tabs={tabs} />
          </div>
        )} */}
      </div>
    </main>
  );
}
