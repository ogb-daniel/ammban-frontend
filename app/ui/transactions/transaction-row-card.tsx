import { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import React from "react";
import { Action } from "../table";
import { BiCard } from "react-icons/bi";
import { Transaction } from "@/stores/admin-store";

const TransactionRowCard = ({
  row,
}: {
  row: Row<Transaction>;
  actions?: Action<Transaction>[];
}) => {
  const cells = row.getVisibleCells();
  const transaction = row.original;
  const baseColor = transaction.type === "income" ? "#05c168" : "#FF5A65";

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <div
        className="flex items-center justify-center w-12 p-4 rounded-full"
        style={{
          backgroundColor: `${baseColor}33`,
          color: baseColor,
        }}
      >
        <BiCard className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="space-x-2">
          <span className="font-medium">
            {flexRender(cells[0].column.columnDef.cell, cells[0].getContext())}
          </span>
          <span>
            {flexRender(cells[1].column.columnDef.cell, cells[1].getContext())}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2 text-primary">
          {flexRender(cells[3].column.columnDef.cell, cells[3].getContext())}
        </div>
      </div>

      <span className={`text-sm font-medium `}>
        {flexRender(cells[4].column.columnDef.cell, cells[4].getContext())}
      </span>
    </div>
  );
};

export default TransactionRowCard;
