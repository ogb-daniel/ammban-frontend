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
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { CardLayout, CompactLayout, ListLayout } from "./table/mobile-layouts";
import SearchBar from "./search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { CgSortAz } from "react-icons/cg";

export type Action<T> = {
  element: React.ReactNode;
  onClick: (row: T) => void;
  label: string;
};

export type CategoryOption = {
  name: string;
  description: string;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  title: string;
  rowsPerPageOptions?: number[];
  onSelectedRowsChange?: (rows: T[]) => void;
  actions?: Action<T>[]; // New prop for actions
  mobileLayout?: "list" | "card" | "compact" | "custom"; // Add this prop
  customMobileComponent?: React.ReactNode; // Add this for fully custom mobile layouts
  setFilteredData?: (data: T[]) => void;
  categoryFilter?: {
    options: CategoryOption[];
    selected: string;
    onSelect: (category: string) => void;
  };
  sortOptions?: string[];
};

type ColumnMeta = {
  icon?: React.ReactNode;
  className?: string;
};

// Custom global filter function that handles arrays
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const searchValue = String(filterValue).toLowerCase();
  const cellValue = row.getValue(columnId);

  // Handle array values (like roleNames)
  if (Array.isArray(cellValue)) {
    return cellValue.some((item) =>
      String(item).toLowerCase().includes(searchValue)
    );
  }

  // Handle regular string/number values
  return String(cellValue).toLowerCase().includes(searchValue);
};
const Table = <T extends object>({
  data = [],
  columns,
  title,
  rowsPerPageOptions = [10, 20, 50],
  onSelectedRowsChange,
  actions,
  mobileLayout = "list",
  customMobileComponent,
  setFilteredData,
  categoryFilter,
  sortOptions,
}: TableProps<T>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState();

  // Filter data based on selected category
  const filteredData = React.useMemo(() => {
    if (!categoryFilter || categoryFilter.selected === "All Categories") {
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.categoryName === categoryFilter.selected
    );
  }, [data, categoryFilter]);

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
                {action.element}
              </button>
            ))}
          </div>
        ),
      },
    ] as ColumnDef<T, unknown>[];
  }, [columns, actions]);
  const table = useReactTable({
    data: filteredData,
    columns: allColumns,
    state: {
      pagination,
      rowSelection,
      sorting,
      globalFilter,
    },
    enableRowSelection: true,
    enableSorting: true, // Enable global sorting
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    enableGlobalFilter: true, // Enable global filtering
    globalFilterFn: globalFilterFn,
    getColumnCanGlobalFilter: () => true,
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
  const renderMobileLayout = (row: Row<T>, visualIndex: number) => {
    switch (mobileLayout) {
      case "card":
        return <CardLayout key={visualIndex} row={row} actions={actions} />;
      case "compact":
        return <CompactLayout key={visualIndex} row={row} actions={actions} />;
      case "custom":
        if (customMobileComponent) {
          const CustomComponent =
            customMobileComponent as unknown as React.ComponentType<{
              row: Row<T>;
              actions?: Action<T>[];
            }>;
          return (
            <CustomComponent key={visualIndex} row={row} actions={actions} />
          );
        }
        return null;
      case "list":
      default:
        return <ListLayout key={visualIndex} row={row} actions={actions} />;
    }
  };
  React.useEffect(() => {
    if (setFilteredData) {
      const filteredRows = table
        .getFilteredRowModel()
        .rows.map((row) => row.original);
      setFilteredData(filteredRows);
    }
  }, [table, setFilteredData, globalFilter]);
  return (
    <section>
      <div className="bg-white border-2 border-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-100 py-[14px] px-8">
          {title}
        </h2>
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between px-8 mt-1 mb-4 gap-4">
            <div className="flex items-center gap-2 font-bold">
              {categoryFilter && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 font-bold"
                    >
                      {categoryFilter.selected}{" "}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[500px] p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {categoryFilter.options.map((option) => (
                        <DropdownMenuItem
                          key={option.name}
                          className="flex items-start justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200"
                          onClick={() => categoryFilter.onSelect(option.name)}
                        >
                          <div className="flex-1">
                            <div className=" text-gray-900">{option.name}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {option.description}
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-primary -rotate-90 ml-2" />
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {sortOptions && sortOptions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 font-bold"
                    >
                      Sort <CgSortAz className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        className="flex items-center gap-2"
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <SearchBar
              onChange={(e) => table?.setGlobalFilter(String(e?.target?.value))}
              placeholder="Search for id, name, product"
              className="flex-1 max-w-md"
            />
          </div>
          <table className="hidden md:table min-w-full table-fixed border-collapse">
            <thead>
              {table?.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="p-2 text-left pt-4 pb-2 font-semibold text-[10px] pl-8">
                    <input
                      type="checkbox"
                      checked={table?.getIsAllRowsSelected()}
                      onChange={table?.getToggleAllRowsSelectedHandler()}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  {headerGroup.headers.map((header, index) => {
                    const canSort = header.column.columnDef.enableSorting;
                    return (
                      <th
                        key={header.id}
                        className={`p-2 text-left pt-4 pb-2 font-semibold text-[10px] ${
                          index === headerGroup.headers?.length - 1 && "pr-8"
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
              {table?.getRowModel().rows.map((row, visualIndex) => (
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
                        index === row.getVisibleCells()?.length - 1 && "pr-8"
                      } `}
                    >
                      <div
                        className={`${
                          (cell.column.columnDef.meta as ColumnMeta)?.className
                        } overflow-hidden`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="md:hidden">
            {table
              .getRowModel()
              .rows.map((row, visualIndex) =>
                renderMobileLayout(row, visualIndex)
              )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm font-medium">
          {table?.getState().pagination.pageIndex + 1}-
          {Math.min(
            (table?.getState().pagination.pageIndex + 1) *
              table?.getState().pagination.pageSize,
            filteredData?.length
          )}{" "}
          of {filteredData?.length}
        </div>
        <div className="text-sm font-medium">
          Rows per page:
          <select
            className="ml-2 p-1 border rounded bg-primary text-white"
            onChange={(e) => table?.setPageSize(Number(e.target.value))}
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
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="p-1 px-3 border rounded"
            onClick={() => table?.nextPage()}
            disabled={!table?.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Table;
