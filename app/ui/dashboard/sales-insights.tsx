import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesInsightsProps = {
  data: { date: string; users: number }[];
  totalUsers: number;
};

const SalesInsights: React.FC<SalesInsightsProps> = ({ data, totalUsers }) => {
  // Formatter function to shorten large numbers
  const formatYAxis = (value: number) => {
    if (value >= 1000) return `${value / 1000}k`;
    return value.toString();
  };
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sales Insights</h2>
        <div className="text-right space-x-4 flex  items-center">
          <span className="text-sm text-gray-600">Total Users</span>
          <span className="text-2xl font-bold">
            {totalUsers.toLocaleString()}
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#000000"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesInsights;
