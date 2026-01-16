"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";

export default function ProductsAction() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  if (user?.role === "agent") return null;

  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        onClick={() => router.push(`/${user?.role}/products/create-category`)}
      >
        Create Category
      </button>

      <button
        className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        onClick={() => router.push(`/${user?.role}/products/create-product`)}
      >
        Create Product
      </button>
    </div>
  );
}


// "use client";
// import { useUserStore } from "@/providers/user-store-provider";
// import { useRouter } from "next/navigation";
// import React from "react";

// export default function ProductsAction() {
//   const router = useRouter();
//   const { user } = useUserStore((state) => state);

//   return (
//     <div className="flex max-w-3xl mx-auto gap-6 mt-4">
//       {user?.role !== "agent" && (
//         <>
//           <button
//             className="btn text-primary border border-primary"
//             onClick={() =>
//               router.push(`/${user?.role}/products/create-category`)
//             }
//           >
//             Create Category
//           </button>
//           <button
//             className="btn-primary"
//             onClick={() =>
//               router.push(`/${user?.role}/products/create-product`)
//             }
//           >
//             Create Product
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
