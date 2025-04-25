import SellProductForm from "@/app/ui/sell-product-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default function SellProduct() {
  return (
    <main>
      <div className="bg-white px-6 md:px-10 mt-3 md:mt-0 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Sell Product</h1>
      </div>
      <div className=" p-6">
        <SellProductForm />
      </div>
    </main>
  );
}
