"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { Product, ProductCategory, Transaction } from "@/app/lib/definitions";
import ProductsTable from "./products-table";
import ProductsAction from "./products-action";
import {
  getAllProductCategories,
  getAllProducts,
} from "@/app/lib/actions/product";

export default function ProductsContainer({
  products,
  limit,
  transactions,
}: {
  products: Product[];
  limit: number;
  transactions?: Transaction[];
}) {
  const [skip, setSkip] = useState(100);
  const { initializeProducts, products: storeProducts } = useAdminStore(
    (state) => state
  );
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  useEffect(() => {
    initializeProducts(products);
  }, [initializeProducts, products]);

  useEffect(() => {
    (async () => {
      const categories = await getAllProductCategories({});
      if (categories.success && categories?.result?.payload?.items) {
        setCategories(categories.result.payload.items);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(skip);
    if (skip > storeProducts?.length || skip < storeProducts?.length) return;
    getAllProducts({ MaxResultCount: limit, SkipCount: skip }).then((res) => {
      console.log(res);
      if (res.success && res?.result?.payload?.items?.length && storeProducts)
        initializeProducts([...storeProducts, ...res.result.payload.items]);
      setSkip(skip + limit);
    });
  }, [initializeProducts, limit, skip, storeProducts]);

 return (
  <section className="space-y-4">
    {/* Page Header */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-500">
          Manage product catalog, categories, and availability.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <ProductsAction />
      </div>
    </div>

    {/* Main content card */}
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <ProductsTable transactions={transactions} categories={categories} />
    </div>
  </section>
);



  // return (
  //   <div className="space-y-6">
  //     <ProductsTable transactions={transactions} categories={categories} />
  //     <ProductsAction />
  //   </div>
  // );
}
