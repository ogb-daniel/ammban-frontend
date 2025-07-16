"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type UserData = {
  month: string;
  count: number;
};

export default function ReferralInsights({ data }: { data: UserData[] }) {
  return (
    <div className="w-full bg-white p-6 rounded-lg mt-5">
      <h2 className="text-sm font-medium mb-4">Total users</h2>
      <p className="text-2xl font-semibold">
        {data.reduce((acc, curr) => acc + curr.count, 0)}
      </p>
      <div className="w-full aspect-[3/1]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
