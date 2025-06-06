import React, { JSX } from "react";
import { BsArrowRight } from "react-icons/bs";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: JSX.Element;
  change?: string;
  duration: string;
  bgColor: string;
  textColor: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  change,
  duration,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`flex flex-col justify-between p-4 rounded-lg ${bgColor} border-2 shadow border-gray-100 `}
    >
      <div>
        <div className="flex justify-between items-center">
          {icon} <BsArrowRight />
        </div>
        <div className="flex gap-2 items-center mt-2">
          <span className={`text-2xl font-bold ${textColor} inline-block`}>
            {value}
          </span>
          <span
            className={`text-sm font-medium ${
              change?.includes("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">{title}</p>

        <span className="text-xs text-gray-500 mt-1 text-right">
          {duration}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
