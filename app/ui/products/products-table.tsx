"use client";
import React, { useState } from "react";
import Table from "../table";
import { ColumnDef } from "@tanstack/react-table";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaTrash, FaUser } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { MdEdit, MdInfo } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Product, ProductCategory, Transaction } from "@/app/lib/definitions";
import Swal from "sweetalert2";
import {
  deleteProduct,
  deleteProductCategory,
} from "@/app/lib/actions/product";
import { toast } from "react-toastify";
import { useUserStore } from "@/providers/user-store-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCog, UserCheck, ChevronDown } from "lucide-react";
import TransactionContainer from "../transactions/transaction-container";
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {},
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(info.getValue() as number);
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const priceA = rowA.getValue("price") as number;
      const priceB = rowB.getValue("price") as number;
      return priceA > priceB ? 1 : priceA < priceB ? -1 : 0;
    },
    meta: {},
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {},
  },
  {
    accessorKey: "quantity",
    header: "Status",
    cell: (info) => <Status value={info.getValue() as number} />,
    enableSorting: true,
    meta: {
      className: "line-clamp-1",
    },
  },
];
const categoryColumns: ColumnDef<ProductCategory>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <FaUser className="text-gray-500" />,
    },
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: (info) => info.getValue(),
    enableSorting: true,
    meta: {
      icon: <BiSolidShoppingBagAlt className="text-gray-500" />,
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
const Status = ({ value }: { value: number }) => {
  return (
    <span
      className={`text-sm font-medium min-w-[80px] justify-center w-full  broder py-1 px-2 flex items-center gap-1 rounded-sm ${
        value >= 1
          ? "text-[#14CA74] bg-[#05C16833] border-[#05C16880]"
          : "text-[#FF5A65] bg-[#FF5A6533] border-[#FF5A6533]"
      }`}
    >
      {value >= 1 ? "Available" : "Out of Stock"}
    </span>
  );
};
function ManageTransactionsDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  const handleSelect = (value: string) => {
    setSelected(value);
    console.log("Selected:", value); // You can use this value for further logic
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-primary text-white">
          {selected} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Available Products")}
        >
          <UserCog size={16} /> Available Products
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Product Sales History")}
        >
          <UserCheck size={16} /> Product Sales History
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function ManageProductsOrCatDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  const handleSelect = (value: string) => {
    setSelected(value);
    console.log("Selected:", value); // You can use this value for further logic
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-primary text-white">
          {selected} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Products")}
        >
          <UserCog size={16} /> Products
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => handleSelect("Product Categories")}
        >
          <UserCheck size={16} /> Product Categories
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function CategoryFilterDropdown({
  selected,
  setSelected,
  products,
}: {
  selected: string;
  setSelected: (value: string) => void;
  products: Product[];
}) {
  // Get unique categories from products
  const uniqueCategories = React.useMemo(() => {
    const categories = products.map((product) => product.categoryName);
    return Array.from(new Set(categories)).filter(Boolean);
  }, [products]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary text-primary">
          {selected} <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setSelected("All Categories")}
        >
          All Categories
        </DropdownMenuItem>
        {uniqueCategories.map((category) => (
          <DropdownMenuItem
            key={category}
            className="flex items-center gap-2"
            onClick={() => setSelected(category)}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const ProductsTable = ({
  transactions,
  categories,
}: {
  transactions?: Transaction[];
  categories?: ProductCategory[];
}) => {
  const { products, deleteProduct: deleteProductFromStore } = useAdminStore(
    (state) => state
  );
  console.log(products);

  const { user } = useUserStore((state) => state);
  const [selected, setSelected] = useState(
    user?.role === "admin" ? "Products" : "Available Products"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");

  const router = useRouter();
  const actions =
    user?.role === "admin"
      ? [
          {
            element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
            onClick: (product: Product) => {
              router.push(`/${user?.role}/products/${product.id}`);
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
              router.push(`/${user?.role}/products/buy-product/${product.id}`);
            },
            label: "Purchase Product",
          },
        ];

  const categoryActions = [
    {
      element: <MdEdit className="w-4 h-4 text-[#0B1739]" />,
      onClick: (category: ProductCategory) => {
        router.push(`/${user?.role}/products/edit-category/${category.id}`);
      },
      label: "Edit Category",
    },
    {
      element: <FaTrash className="w-4 h-4 text-red-500" />,
      onClick: (category: ProductCategory) => {
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
            return deleteProductCategory(category.id);
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = result.value;
            if (response.success) {
              toast.success("Category deleted successfully");
            } else {
              toast.error(response.error.message);
            }
          }
        });
      },
      label: "Delete Category",
    },
  ];

  // Filter products based on selected category
  const filteredProducts = React.useMemo(() => {
    if (categoryFilter === "All Categories") {
      return products;
    }
    return products.filter((product) => product.categoryName === categoryFilter);
  }, [products, categoryFilter]);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {user?.role !== "admin" ? (
          <ManageTransactionsDropdown
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <ManageProductsOrCatDropdown
            selected={selected}
            setSelected={setSelected}
          />
        )}

        {/* Show category filter only when viewing products */}
        {(selected === "Products" || selected === "Available Products") && (
          <CategoryFilterDropdown
            selected={categoryFilter}
            setSelected={setCategoryFilter}
            products={products}
          />
        )}
      </div>

      {user?.role === "admin" ? (
        selected === "Product Categories" ? (
          <Table<ProductCategory>
            data={categories!}
            columns={categoryColumns}
            title={"All Product Categories"}
            actions={categoryActions}
          />
        ) : (
          <Table<Product>
            data={filteredProducts}
            columns={productColumns}
            title={
              user?.role !== "admin"
                ? selected === "Available Products"
                  ? "All Products"
                  : "All Transactions"
                : selected === "Products"
                ? "All Products"
                : "All Product Categories"
            }
            actions={actions}
          />
        )
      ) : selected === "Product Sales History" && transactions ? (
        <TransactionContainer transactions={transactions || []} />
      ) : (
        <Table<Product>
          data={filteredProducts}
          columns={productColumns}
          title={
            user?.role !== "admin"
              ? selected === "Available Products"
                ? "All Products"
                : "All Transactions"
              : selected === "Products"
              ? "All Products"
              : "All Product Categories"
          }
          actions={actions}
        />
      )}
    </div>
  );
};

export default ProductsTable;
