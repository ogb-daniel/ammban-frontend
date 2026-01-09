import { getProduct } from "@/app/lib/actions/product";
import PurchaseProductForm from "@/app/ui/products/purchase-product-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";
export const metadata: Metadata = {
  title: "Dashboard",
};
export default async function BuyProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const response = await getProduct(parseInt((await params).id));
  if (!response.success || !response.result.payload) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 t-3 md:pt-7 pb-3 md:border-b-2 md:border-gray-100">
        <h1 className="font-semibold">Buy Product</h1>
      </div>
      <div className=" p-6">
        <PurchaseProductForm product={response.result.payload} />
      </div>
    </main>
  );
}
