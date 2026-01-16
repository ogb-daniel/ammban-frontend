"use client";

import React, { useEffect } from "react";
import RoleCard from "./role-card";
import { useRouter } from "next/navigation";
import { Role } from "@/app/lib/definitions";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useUserStore } from "@/providers/user-store-provider";

export default function AllRoles({ roles }: { roles: Role[] }) {
  const { initializeRoles, roles: storeRoles } = useAdminStore(
    (state) => state
  );
  const { user } = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    initializeRoles(roles);
  }, [initializeRoles, roles]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          
        </h2>

        <button
          className="px-4 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary/90 transition"
          onClick={() =>
            router.push(`/${user?.role}/roles/create-role`)
          }
        >
          + Create Role
        </button>
      </div>

      {/* Roles list */}
      <div className="space-y-5">
        {storeRoles.map((role) => (
          <RoleCard
            key={role.id}
            title={role.displayName}
            description={role.description}
            onClick={() =>
              router.push(`/${user?.role}/roles/${role.id}`)
            }
          />
        ))}
      </div>
    </section>
  );
}

// "use client";
// import React, { useEffect } from "react";
// import RoleCard from "./role-card";
// import { useRouter } from "next/navigation";
// import { Role } from "@/app/lib/definitions";
// import { useAdminStore } from "@/providers/admin-store-provider";
// import { useUserStore } from "@/providers/user-store-provider";

// export default function AllRoles({ roles }: { roles: Role[] }) {
//   const { initializeRoles, roles: storeRoles } = useAdminStore(
//     (state) => state
//   );
//   const { user } = useUserStore((state) => state);

//   useEffect(() => {
//     initializeRoles(roles);
//   }, []);
//   const router = useRouter();
//   return (
//     <section className="space-y-5">
//       {storeRoles.map((role) => (
//         <RoleCard
//           key={role.id}
//           title={role.displayName}
//           description={role.description}
//           onClick={() => {
//             router.push(`/${user?.role}/roles/${role.id}`);
//           }}
//         />
//       ))}
//       <div className="md:w-1/2 mx-auto mt-10">
//         <button
//           className="btn-primary "
//           onClick={() => router.push(`/${user?.role}/roles/create-role`)}
//         >
//           Create Role
//         </button>
//       </div>
//     </section>
//   );
// }
