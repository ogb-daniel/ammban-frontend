import React, { useState } from "react";
import {
  useReactTable,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
type Action<T> = {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  label: string;
};
type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  title: string;
  rowsPerPageOptions?: number[];
  onSelectedRowsChange?: (rows: T[]) => void;
  actions?: Action<T>[]; // New prop for actions
};

type ColumnMeta = {
  icon?: React.ReactNode;
};
const Table = <T extends object>({
  data,
  columns,
  title,
  rowsPerPageOptions = [10, 20, 50],
  onSelectedRowsChange,
  actions,
}: TableProps<T>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const allColumns = React.useMemo(() => {
    if (!actions?.length) return columns;

    return [
      ...columns,
      {
        id: "actions",
        header: "",
        cell: (info) => (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.onClick(info.row.original)}
                className="p-2 text-gray-600 hover:text-gray-900"
                title={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        ),
      },
    ] as ColumnDef<T, unknown>[];
  }, [columns, actions]);
  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      pagination,
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    enableSorting: true, // Enable global sorting
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  });
  // Call onSelectedRowsChange when selection changes
  React.useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row: Row<T>) => row.original);
      onSelectedRowsChange(selectedRows);
    }
  }, [rowSelection, onSelectedRowsChange, table]);

  return (
    <section>
      <div className="bg-white border-2 border-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-100 py-[14px] px-8">
          {title}
        </h2>
        <div className="overflow-x-auto">
          <table className="hidden md:table min-w-full table-fixed border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="p-2 text-left pt-4 pb-2 font-semibold text-[10px] pl-8">
                    <input
                      type="checkbox"
                      checked={table.getIsAllRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  {headerGroup.headers.map((header, index) => {
                    const canSort = header.column.columnDef.enableSorting;
                    return (
                      <th
                        key={header.id}
                        className={`p-2 text-left pt-4 pb-2 font-semibold text-[10px] ${
                          index === headerGroup.headers.length - 1 && "pr-8"
                        } ${canSort ? "cursor-pointer select-none" : ""}`}
                        onClick={
                          canSort
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          {(header.column.columnDef.meta as ColumnMeta)?.icon}
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {canSort && (
                              <span className="inline-block w-4">
                                {header.column.getIsSorted() === "asc" ? (
                                  <FaSortUp className="text-gray-700" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <FaSortDown className="text-gray-700" />
                                ) : (
                                  <FaSort className="text-gray-400" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, visualIndex) => (
                <tr
                  key={row.id}
                  className={`${
                    visualIndex % 2 === 0 ? "bg-[#F1F7FE]" : "bg-white"
                  }`}
                >
                  <td className="p-2 py-6 text-sm pl-8">
                    <input
                      type="checkbox"
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`p-2 py-6 text-sm ${
                        index === row.getVisibleCells().length - 1 && "pr-8"
                      }`}
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
          <div className="md:hidden">
            {table.getRowModel().rows.map((row, visualIndex) => (
              <div
                key={row.id}
                className={`p-4 ${
                  visualIndex % 2 === 0 ? "bg-[#F1F7FE]" : "bg-white"
                }`}
              >
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
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {row.getVisibleCells().map((cell, index) => {
                  // Skip the actions column in mobile view
                  if (cell.column.id === "actions") return null;

                  return (
                    <div key={cell.id} className="py-2">
                      <div className="text-xs text-gray-500 font-medium">
                        {cell.column.columnDef.header as string}
                      </div>
                      <div className="mt-1">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
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
