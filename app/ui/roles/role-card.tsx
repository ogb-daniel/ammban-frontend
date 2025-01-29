"use client";
import React from "react";
import { FaUserSecret } from "react-icons/fa";

type Props = {
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
};

export default function RoleCard({
  title,
  description,
  color,
  onClick,
}: Props) {
  return (
    <div className="rounded-[20px] bg-white p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-5">
        <div
          className="w-[60px] h-[60px] p-4 flex items-center justify-center rounded-[20px]"
          style={{
            color,
            backgroundColor: `rgba(${parseInt(
              color.slice(1, 3),
              16
            )}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(
              color.slice(5, 7),
              16
            )}, 0.25)`, // Adjust the opacity value as needed
          }}
        >
          {<FaUserSecret />}
        </div>
        <p className="font-medium">{title}</p>
      </div>
      <p
        className="text-xs"
        style={{
          color: "#718EBF",
        }}
      >{`${(description as string).substring(0, 50)}...`}</p>

      <button
        className="rounded-full py-[9px] px-[30px] border font-medium"
        style={{
          borderColor: "#718EBF",
          color: "#718EBF",
        }}
        onClick={onClick}
      >
        View Details
      </button>
    </div>
  );
}
