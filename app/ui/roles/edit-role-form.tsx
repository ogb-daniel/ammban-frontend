"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import Switch from "../switch";
import { useRouter } from "next/navigation";
import { Permission, Role } from "@/app/lib/definitions";
import { getPermissions, updateRole } from "@/app/lib/actions/role";
import { toast } from "react-toastify";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useUserStore } from "@/providers/user-store-provider";
import CircleLoader from "../circle-loader";

export default function EditRoleForm({ role }: { role: Role }) {
  const { editRole: updateRoleFromStore } = useAdminStore((state) => state);
  const [permissionsList, setPermissionsList] = useState<Permission[]>([]);
  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    role.grantedPermissions.reduce(
      (acc, perm) => ({ ...acc, [perm]: true }),
      {}
    )
  );
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { user } = useUserStore((state) => state);

  // State for selected color

  const handleToggle = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };
  const form = useForm({
    defaultValues: {
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      grantedPermissions: role.grantedPermissions,
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      const roleData = {
        ...role,
        ...values.value,
        grantedPermissions: Object.keys(permissions).filter(
          (perm) => permissions[perm]
        ),
        normalizedName: values.value.name,
      };

      console.log("Role Data:", roleData);
      // Handle form submission
      try {
        const response = await updateRole(roleData);
        if (!response.success) {
          toast.error(response.error.message);
          return;
        }
        updateRoleFromStore(role.id, response.result);
      } finally {
        setSubmitting(false);
      }
      router.replace(`/${user?.role}/roles`);
    },
  });

  useEffect(() => {
    (async () => {
      const response = await getPermissions();
      if (response.success) {
        setPermissionsList(response.result.items);
      }
    })();
  }, []);
  if (!role) {
    return null;
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className=" "
    >
      <div className="flex flex-col bg-white p-8 rounded-3xl">
        <div className="md:w-1/2">
          <form.Field
            name="name"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder="Name Of Role"
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </>
            )}
          />
        </div>
        <div className="md:w-1/2 mt-6">
          <form.Field
            name="displayName"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Display name
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder="Name Of Role"
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </>
            )}
          />
        </div>
        <div className="mt-6">
          <form.Field
            name="description"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Role Description
                </label>
                <textarea
                  name={field.name}
                  placeholder="Details about the role"
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </>
            )}
          />
        </div>
        {/* Color Picker */}
        {/* <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <div className="mt-2 flex space-x-3">
            {[
              "#F7CE46",
              "#EF4444",
              "#FF8328",
              "#10B981",
              "#48A7FF",
              "#6F00FD",
            ].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={clsx(
                  "w-6 h-6 rounded-full border-2 transition-all",
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-gray-300"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div> */}

        {/* Permissions List with Switches */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Permissions
          </label>
          <div className="mt-2 space-y-4">
            {permissionsList.map((permission, index) => (
              <div
                key={index}
                className="flex items-start flex-col lg:flex-row lg:space-x-3 p-2 border rounded-lg bg-gray-50"
              >
                <Switch
                  checked={permissions[permission.name]}
                  onCheckedChange={(e) => {
                    e.preventDefault();
                    handleToggle(permission.name);
                  }}
                />
                <div>
                  <p className="text-sm font-medium">
                    {permission.displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          disabled={submitting}
          type="submit"
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {submitting ? (
            <>
              <CircleLoader />
            </>
          ) : (
            "Edit Role"
          )}
        </button>
      </div>
    </form>
  );
}
