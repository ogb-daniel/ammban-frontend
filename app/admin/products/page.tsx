import ProductsAction from "@/app/ui/products/products-action";
import ProductsTable from "@/app/ui/products/products-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Products() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Products</h1>
      </div>
      <div className=" p-6">
        <ProductsTable />
        <ProductsAction />
      </div>
    </main>
  );
}
