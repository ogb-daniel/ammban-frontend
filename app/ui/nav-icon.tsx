import React, { JSX, MouseEventHandler } from "react";
type NavIconProps = {
  icon: JSX.Element;
  label: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function NavIcon({ icon, onClick }: NavIconProps) {
  return (
    <div
      className="bg-gray-200 cursor-pointer rounded-lg p-2 w-fit"
      onClick={onClick}
    >
      <div className={` text-black`}>{icon}</div>
    </div>
  );
}
