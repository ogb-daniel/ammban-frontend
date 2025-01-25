import ProductsTable from "@/app/ui/dashboard/products/products-table";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function Login() {
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Products</h1>
      </div>
      <div className=" p-6">
        <ProductsTable />
      </div>
    </main>
  );
}
