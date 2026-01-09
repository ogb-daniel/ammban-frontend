"use client";

import ChangePinForm from "./change-pin-form";

export default function ChangePinContainer() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Change Pin</h2>
      <ChangePinForm />
    </div>
  );
}
