import Link from "next/link";
import React from "react";
import { BiCard } from "react-icons/bi";
import CircleIcon from "../circle-icon";

export default function RecentProducts() {
  return (
    <section className="mt-9">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Products</h2>
        <Link className="text-primary font-semibold" href="#">
          View All
        </Link>
      </div>
      <div className="p-4">
        <CircleIcon
          icon={<BiCard />}
          iconColor="text-yellow-500"
          bgColor="bg-yellow-100"
          title="AXA PASS"
        />
      </div>
    </section>
  );
}
