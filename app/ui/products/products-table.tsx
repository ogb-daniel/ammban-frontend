"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { Price, Product } from "@/stores/admin-store";
import { useAdminStore } from "@/providers/admin-store-provider";

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
    cell: (info) =>
      (info.getValue() as Price).amount.toLocaleString("en", {
        style: "currency",
        currency: (info.getValue() as Price).currency,
      }),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => `${(info.getValue() as string).substring(0, 50)}...`,
  },
];

const ProductsTable = () => {
  const { products } = useAdminStore((state) => state);
  console.log(products);

  return (
    <Table<Product>
      data={products}
      columns={productColumns}
      title="All Products"
    />
  );
};

export default ProductsTable;
