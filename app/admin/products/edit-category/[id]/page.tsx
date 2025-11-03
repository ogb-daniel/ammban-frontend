import { notFound } from "next/navigation";
import { getProductCategory } from "@/app/lib/actions/product";
import EditCategoryForm from "@/app/ui/products/edit-category-form";
// export const metadata: Metadata = {
//   title: "Dashboard",
// };
export default async function EditProductCategory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const response = await getProductCategory(parseInt((await params).id));
  if (!response.success || !response.result.payload) {
    notFound();
  }
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 border-b-2 border-gray-100">
        <h1 className="font-semibold ">Edit Category</h1>
      </div>
      <div className=" p-6">
        <EditCategoryForm category={response.result.payload} />
      </div>
    </main>
  );
}
