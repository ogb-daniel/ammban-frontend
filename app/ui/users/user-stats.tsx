"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoHeart } from "react-icons/io5";

const stats = [
  {
    title: "Total Users",
    count: 250,
    baseColor: "#094794",
    icon: HiUsers,
  },
  {
    title: "New Users",
    count: 15,
    baseColor: "#fdb52a",
    icon: FaUser,
  },
  {
    title: "Top Users",
    count: 200,
    baseColor: "#05c168",
    icon: IoHeart,
  },
  {
    title: "Other Users",
    count: 35,
    baseColor: "#1d9de5",
    icon: MoreHorizontal,
  },
];

export default function UserStats({
  userStats = stats,
}: {
  userStats?: {
    title: string;
    count: number;
    baseColor: string;
    icon: React.ElementType;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {userStats.map((stat, index) => (
        <Card
          key={index}
          className={`shadow-sm border rounded-xl`}
          style={{ backgroundColor: `${stat.baseColor}1A` }}
        >
          <CardContent className="p-4 flex items-center gap-3">
            <div
              className="p-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${stat.baseColor}33` }}
            >
              <stat.icon
                className="h-6 w-6"
                style={{ color: stat.baseColor }}
              />
            </div>
            <div className="text-right">
              <p className="font-semibold">{stat.title}</p>
              <p className="text-gray-500 text-left font-bold text-xs">
                {stat.count}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
