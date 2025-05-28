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
import { useUserStore } from "@/providers/user-store-provider";
import { showAXATransactionConfirmation } from "@/app/lib/utils/transaction-confirmation";
import { syncTransaction } from "@/app/lib/actions/payment";
import {
  showAXAFailureModal,
  showAXASuccessModal,
} from "@/app/lib/utils/transaction-result";
import { showAXATransactionDetails } from "@/app/lib/utils/transaction-details";

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
  const { user } = useUserStore((state) => state);
  const actions =
    user?.role === "admin"
      ? [
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
        ]
      : [
          {
            element: (
              <button className="border rounded-md py-1 px-2 text-primary border-primary">
                Purchase Product
              </button>
            ),
            onClick: async (product: Product) => {
              const result = await showAXATransactionConfirmation(
                `₦${product.price}`, // cost (formatted)
                "", // fee
                user?.fullName || "", // seller
                "", // buyer
                "", // reference
                async () => {
                  return await syncTransaction({
                    narration: `Purchase of ${product.name}`,
                    amount: product.price,
                    isTrial: false,
                    productId: product.id,
                  });
                }
              );
              console.log(result);
              if (result.isConfirmed) {
                if (result.value?.success) {
                  await showAXASuccessModal(
                    async () => {
                      await showAXATransactionDetails(
                        `₦${product.price}`, // cost (formatted)
                        "", // fee
                        user?.fullName || "", // seller
                        "", // buyer
                        "", // reference
                        result.value?.result.data.transactionID,
                        result.value?.result.data.effectiveDate
                      );
                    },
                    async () => {
                      console.log("Navigating to new policy purchase");
                    }
                  );
                } else {
                  await showAXAFailureModal(
                    async () => {
                      console.log("Retrying transaction");
                    },
                    async () => {
                      console.log("Opening support contact form");
                    }
                  );
                }
              }
            },
            label: "Purchase Product",
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
