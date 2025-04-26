"use client";
import React from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdEdit, MdInfo } from "react-icons/md";
import { ADMIN_PRODUCTS } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import { Product } from "@/app/lib/definitions";
import Swal from "sweetalert2";
import { deleteProduct } from "@/app/lib/actions/product";
import { toast } from "react-toastify";

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
    accessorKey: "categoryName",
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
    cell: (info) => `₦${info.getValue()}`,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.getValue("price") as number;
      const priceB = rowB.getValue("price") as number;
      return priceA > priceB ? 1 : priceA < priceB ? -1 : 0;
    },
    meta: {
      icon: <TbCurrencyNaira className="text-gray-500" />,
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => `${info.getValue() as string}`,
    meta: {
      icon: <MdInfo className="text-gray-500" />,
      className: "line-clamp-1",
    },
  },
];

const ProductsTable = () => {
  const { products, deleteProduct: deleteProductFromStore } = useAdminStore(
    (state) => state
  );
  const router = useRouter();
  const actions = [
    {
      element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
      onClick: (product: Product) => {
        router.push(`${ADMIN_PRODUCTS.url}/${product.id}`);
      },
      label: "Edit Product",
    },
    {
      element: <FaTrash className="w-4 h-4 text-red-500" />,
      onClick: (product: Product) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Please confirm your action.",
          showCancelButton: true,
          cancelButtonText: "No, Cancel",
          confirmButtonColor: "#094794",
          confirmButtonText: "Yes, Confirm",
          reverseButtons: true,
          customClass: {
            cancelButton: "text-primary bg-white border border-primary",
            actions: "flex-row gap-2",
          },
          buttonsStyling: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return deleteProduct(product.id);
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = result.value;
            if (response.success) {
              deleteProductFromStore(product.id);
              toast.success("Product deleted successfully");
            } else {
              toast.error(response.error.message);
            }
          }
        });
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
