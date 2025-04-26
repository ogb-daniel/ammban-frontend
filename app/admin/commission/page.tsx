import { getAllCommissions } from "@/app/lib/actions/commission";
import CommissionContainer from "@/app/ui/commission/commission-container";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Commission",
};
export default async function Commission() {
  const limit = 100;
  const products = await getAllCommissions({ MaxResultCount: limit });
  return (
    <main>
      <div className="bg-white px-10 pt-7 pb-3 md:border-b-2 md:border-gray-100 hidden md:block">
        <h1 className="font-semibold ">Commission</h1>
      </div>
      <div className=" p-6">
        <CommissionContainer
          commissions={products.result.payload.items}
          limit={limit}
        />
      </div>
    </main>
  );
}
