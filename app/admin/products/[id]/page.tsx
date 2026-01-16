import { notFound } from "next/navigation";
import EditProductForm from "@/app/ui/products/edit-product-form";
import { getProduct } from "@/app/lib/actions/product";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default async function ViewProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const response = await getProduct((await params).id);
  if (!response.success || !response.result.payload) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">View Product</h1>
      </div>
      <div className=" p-6">
        <EditProductForm product={response.result.payload} />
      </div>
    </main>
  );
}
