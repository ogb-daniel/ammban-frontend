import { getAllProducts } from "@/app/lib/actions/product";
import ProductsContainer from "@/app/ui/products/products-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
};
export default async function Products() {
  const limit = 100;
  const products = await getAllProducts({ MaxResultCount: limit });

  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold">Products</h1>
      </div>
      <div className=" p-6">
        <ProductsContainer
          products={products.result.payload.items}
          limit={limit}
        />
      </div>
    </main>
  );
}
