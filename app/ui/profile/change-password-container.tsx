"use client";

import ChangePasswordForm from "./change-password-form";

export default function ChangePasswordContainer() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Change Password</h2>
      <ChangePasswordForm />
    </div>
  );
}
