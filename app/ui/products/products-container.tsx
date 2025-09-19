"use client";

import { useEffect, useState } from "react";
import { useAdminStore } from "@/providers/admin-store-provider";

import { Product } from "@/app/lib/definitions";
import ProductsTable from "./products-table";
import ProductsAction from "./products-action";
import { getAllProducts } from "@/app/lib/actions/product";

export default function ProductsContainer({
  products,
  limit,
}: {
  products: Product[];
  limit: number;
}) {
  const [skip, setSkip] = useState(100);
  const { initializeProducts, products: storeProducts } = useAdminStore(
    (state) => state
  );

  useEffect(() => {
    initializeProducts(products);
  }, [initializeProducts, products]);

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
    <div className="space-y-6">
      <ProductsTable />
      <ProductsAction />
    </div>
  );
}
