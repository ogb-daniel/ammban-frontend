"use client";
import React from "react";
import Table from "../../table";
import { ColumnDef } from "@tanstack/react-table";

type Product = {
  name: string;
  category: string;
  price: string;
  description: string;
};

const productsData: Product[] = Array(10).fill({
  name: "AXA PASS",
  category: "INSURANCE",
  price: "15,000.00",
  description:
    "Provides coverage for medical expenses, including doctor visits, hospital stays, medications, and preventive care.",
});

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => `₦${info.getValue()}`,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => `${(info.getValue() as string).substring(0, 50)}...`,
  },
];

const ProductsTable = () => {
  return (
    <Table<Product>
      data={productsData}
      columns={productColumns}
      title="All Products"
    />
  );
};

export default ProductsTable;
