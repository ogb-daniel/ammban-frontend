"use client";
import React from "react";
import { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Action } from "../table";

export const ListLayout = <T extends object>({
  row,
  actions,
}: {
  row: Row<T>;
  actions?: Action<T>[];
}) => (
  <div className="p-4 border-b last:border-b-0">
    <div className="flex items-center justify-between mb-2">
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      {actions && (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(row.original)}
              className="p-2 text-gray-600 hover:text-gray-900"
              title={action.label}
            >
              {action.element}
            </button>
          ))}
        </div>
      )}
    </div>
    {row.getVisibleCells().map((cell) => {
      if (cell.column.id === "actions") return null;
      return (
        <div key={cell.id} className="py-2">
          <div className="text-xs text-gray-500 font-medium">
            {cell.column.columnDef.header as string}
          </div>
          <div className="mt-1">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </div>
      );
    })}
  </div>
);

export const CardLayout = <T extends object>({
  row,
  actions,
}: {
  row: Row<T>;
  actions?: Action<T>[];
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        {/* Assuming first column is usually the main identifier */}
        <div className="font-medium">
          {flexRender(
            row.getVisibleCells()[0].column.columnDef.cell,
            row.getVisibleCells()[0].getContext()
          )}
        </div>
      </div>
      {actions && (
        <div className="flex gap-1">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(row.original)}
              className="p-1.5 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
              title={action.label}
            >
              {action.element}
            </button>
          ))}
        </div>
      )}
    </div>
    <div className="grid grid-cols-2 gap-2">
      {row
        .getVisibleCells()
        .slice(1)
        .map((cell) => {
          if (cell.column.id === "actions") return null;
          return (
            <div key={cell.id} className="text-sm">
              <div className="text-gray-500 text-xs">
                {cell.column.columnDef.header as string}
              </div>
              <div className="mt-0.5">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </div>
          );
        })}
    </div>
  </div>
);

export const CompactLayout = <T extends object>({
  row,
  actions,
}: {
  row: Row<T>;
  actions?: Action<T>[];
}) => (
  <div className="flex items-center justify-between p-3 border-b">
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <div>
        {flexRender(
          row.getVisibleCells()[0].column.columnDef.cell,
          row.getVisibleCells()[0].getContext()
        )}
      </div>
    </div>
    <div className="flex items-center gap-2">
      {actions &&
        actions.map((action, index) => (
          <button
            key={index}
            onClick={() => action.onClick(row.original)}
            className="p-1.5 text-gray-600 hover:text-gray-900"
            title={action.label}
          >
            {action.element}
          </button>
        ))}
    </div>
  </div>
);
