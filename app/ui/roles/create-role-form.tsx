"use client";
import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useAdminStore } from "@/providers/admin-store-provider";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Switch from "../switch";
// Sample Permissions Data
const permissionsList = [
  "View Customer’s Information",
  "Edit Customer’s Information",
  "Manage User Accounts",
  "Access Financial Reports",
  "Modify Insurance Policies",
];
export default function CreateRoleForm() {
  const { roles, createRole } = useAdminStore((state) => state);
  const router = useRouter();
  // State for permission toggles
  const [permissions, setPermissions] = useState(
    permissionsList.reduce((acc, permission) => {
      acc[permission] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggle = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  // State for selected color
  const [selectedColor, setSelectedColor] = useState<string>("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      color: "",
      permissions: [],
      id: (roles.length + 1).toString(),
    },
    onSubmit: (values) => {
      const roleData = {
        ...values.value,
        permissions: Object.keys(permissions).filter(
          (perm) => permissions[perm]
        ),
        color: selectedColor,
      };

      console.log("Role Data:", roleData);
      // Handle form submission
      createRole(roleData);
      router.back();
    },
  });
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
            name="title"
            // eslint-disable-next-line react/no-children-prop
            children={(field) => (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Title
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
        <div className="mt-6">
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
        </div>

        {/* Permissions List with Switches */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Permissions
          </label>
          <div className="mt-2 space-y-4">
            {permissionsList.map((permission) => (
              <div
                key={permission}
                className="flex items-start space-x-3 p-2 border rounded-lg bg-gray-50"
              >
                <Switch
                  checked={permissions[permission]}
                  onCheckedChange={(e) => {
                    e.preventDefault();
                    handleToggle(permission);
                  }}
                />
                <div>
                  <p className="text-sm font-medium">{permission}</p>
                  <p className="text-xs text-gray-500">
                    We offer a range of insurance options including life,
                    health, home, auto, and business insurance, tailored to meet
                    your unique needs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create Role
        </button>
      </div>
    </form>
  );
}
