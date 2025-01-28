"use client";
import { ADMIN_PRODUCTS } from "@/app/lib/routes";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductsAction() {
  const router = useRouter();
  return (
    <div className="flex max-w-3xl mx-auto gap-6 mt-4">
      <button
        className="btn text-primary border border-primary"
        onClick={() => router.push(`${ADMIN_PRODUCTS.url}/create-category`)}
      >
        Create Category
      </button>
      <button
        className="btn-primary"
        onClick={() => router.push(`${ADMIN_PRODUCTS.url}/create-product`)}
      >
        Create Product
      </button>
    </div>
  );
}
