"use client";
import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductsAction() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  return (
    <div className="flex max-w-3xl mx-auto gap-6 mt-4">
      <button
        className="btn text-primary border border-primary"
        onClick={() => router.push(`/${user?.role}/products/create-category`)}
      >
        Create Category
      </button>
      <button
        className="btn-primary"
        onClick={() => router.push(`/${user?.role}/products/create-product`)}
      >
        Create Product
      </button>
    </div>
  );
}
