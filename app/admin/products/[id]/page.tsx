"use client";
import { use } from "react";

import { useAdminStore } from "@/providers/admin-store-provider";
import { notFound } from "next/navigation";
import EditProductForm from "@/app/ui/products/edit-product-form";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default function ViewProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = use(params).id;
  const { products } = useAdminStore((state) => state);
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View Product</h1>
      </div>
      <div className=" p-6">
        <EditProductForm product={product} />
      </div>
    </main>
  );
}
