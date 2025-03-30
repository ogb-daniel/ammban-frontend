"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { Price, Product } from "@/stores/admin-store";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdEdit, MdInfo } from "react-icons/md";
import { ADMIN_PRODUCTS } from "@/app/lib/routes";
import { useRouter } from "next/navigation";

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaUser className="text-gray-500" />,
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <BiSolidShoppingBagAlt className="text-gray-500" />,
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) =>
      (info.getValue() as Price).amount.toLocaleString("en", {
        style: "currency",
        currency: (info.getValue() as Price).currency,
      }),
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = (rowA.getValue("price") as Price).amount;
      const priceB = (rowB.getValue("price") as Price).amount;
      return priceA > priceB ? 1 : priceA < priceB ? -1 : 0;
    },
    meta: {
      icon: <TbCurrencyNaira className="text-gray-500" />,
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => `${(info.getValue() as string).substring(0, 50)}...`,
    meta: {
      icon: <MdInfo className="text-gray-500" />,
    },
  },
];

const ProductsTable = () => {
  const { products } = useAdminStore((state) => state);
  const router = useRouter();
  const actions = [
    {
      icon: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
      onClick: (product: Product) => {
        router.push(`${ADMIN_PRODUCTS.url}/${product.id}`);
      },
      label: "Edit Product",
    },
    {
      icon: <FaTrash className="w-4 h-4 text-red-500" />,
      onClick: (product: Product) => {
        // Handle delete action
        if (confirm("Are you sure you want to delete this product?")) {
          // Add delete logic here
          console.log("Delete product:", product);
        }
      },
      label: "Delete Product",
    },
  ];
  return (
    <Table<Product>
      data={products}
      columns={productColumns}
      title="All Products"
      actions={actions}
    />
  );
};

export default ProductsTable;
