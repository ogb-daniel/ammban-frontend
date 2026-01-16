"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";

export default function CommissionAction() {
  const router = useRouter();
  const { user } = useUserStore((state) => state);

  return (
    <button
      className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
      onClick={() =>
        router.push(`/${user?.role}/commissions/create-commission`)
      }
    >
      + Create Commission
    </button>
  );
}


// "use client";
// import { useUserStore } from "@/providers/user-store-provider";
// import { useRouter } from "next/navigation";
// import React from "react";

// export default function CommissionAction() {
//   const router = useRouter();
//   const { user } = useUserStore((state) => state);

//   return (
//     <div className="flex max-w-lg mx-auto gap-6 mt-4">
//       <button
//         className="btn-primary"
//         onClick={() =>
//           router.push(`/${user?.role}/commissions/create-commission`)
//         }
//       >
//         Create Commission
//       </button>
//     </div>
//   );
// }
