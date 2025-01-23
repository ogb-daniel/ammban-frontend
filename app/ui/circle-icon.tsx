import React, { JSX } from "react";
type CircleIconProps = {
  icon: JSX.Element;
  iconColor: string;
  bgColor: string;
  title: string;
};

export default function CircleIcon({
  icon,
  iconColor,
  bgColor,
  title,
}: CircleIconProps) {
  return (
    <div>
      <div
        className={`${iconColor} ${bgColor} flex items-center justify-center w-12 p-4  rounded-full`}
      >
        {icon}
      </div>
      <p className="mt-2 font-medium">{title}</p>
    </div>
  );
}
