import React, { useState } from "react";
import {
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  title: string;
  rowsPerPageOptions?: number[];
};

const Table = <T extends object>({
  data,
  columns,
  title,
  rowsPerPageOptions = [10, 20, 50],
}: TableProps<T>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 10, // default page size
  });
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <section>
      <div className=" bg-white border-2 border-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-100 py-[14px] px-8">
          {title}
        </h2>
        <div className="">
          <table className=" min-w-full table-fixed border-collapse ">
            <thead className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className={`p-2 text-left pt-4 pb-2 font-semibold text-[10px] ${
                        index === 0 && "pl-8"
                      } ${index === headerGroup.headers.length - 1 && "pr-8"} `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={` ${
                    row.index % 2 === 0 ? "bg-primary bg-opacity-5" : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`p-2 py-6 text-sm 
                    ${index === 0 && "pl-8"} ${
                        index === row.getVisibleCells().length - 1 && "pr-8"
                      }
                 `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm font-medium">
          {table.getState().pagination.pageIndex + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            data.length
          )}{" "}
          of {data.length}
        </div>
        <div className="text-sm font-medium">
          Rows per page:
          <select
            className="ml-2 p-1 border rounded bg-primary text-white"
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {rowsPerPageOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <button
            className="p-1 px-3 border rounded mr-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="p-1 px-3 border rounded"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Table;
