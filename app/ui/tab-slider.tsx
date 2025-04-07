"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const TabSlider = ({
  tabs,
}: {
  tabs: { key: string; label: string; component: React.ReactNode }[];
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "py-2 px-4 text-sm font-medium",
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </div>
  );
};

export default TabSlider;
