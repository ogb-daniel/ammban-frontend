import moment from "moment";
import React, { JSX } from "react";

type TransactionCardProps = {
  title: string;
  id: string | number;
  icon: JSX.Element;
  change: string;
  date: Date;
  baseColor: string; // Hex color code like "#094794"
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  icon,
  change,
  id,
  date,
  baseColor,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex items-center justify-center w-12 p-4 rounded-full"
        style={{
          backgroundColor: `${baseColor}33`, // 20% opacity
          color: baseColor,
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="space-x-2">
          <span className="font-medium">{title}</span>
          <span>{id}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-primary">
          {moment(date).format("Do MMMM YYYY")}
        </div>
      </div>

      <span
        className={`text-sm font-medium ${
          change.includes("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {change}
      </span>
    </div>
  );
};

export default TransactionCard;
