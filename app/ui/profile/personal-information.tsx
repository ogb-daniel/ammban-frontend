"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Globe,
  MapPin,
  Phone,
  User,
  Briefcase,
  Upload,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { useUserStore } from "@/providers/user-store-provider";

export default function PersonalInformation() {
  const { user } = useUserStore((state) => state);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      fullName: user?.name + " " + user?.surname,
      email: user?.emailAddress,
      description: "",
      phoneNumber: "",
      position: "",
      location: "",
      website: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setEditPersonalInfo(false);
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      ["image/png", "image/jpeg", "image/gif", "image/svg+xml"].includes(
        file.type
      )
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="max-w-4xl mx-auto"
    >
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-sm text-gray-500 mb-4">
          Basic information about you.{" "}
          <button
            type="button"
            className="text-primary"
            onClick={() => setEditPersonalInfo(!editPersonalInfo)}
          >
            {editPersonalInfo ? "Cancel Edit" : "Edit Information"}
          </button>
        </p>
        <div className="space-y-4">
          <form.Field name="fullName">
            {(field) => (
              <div className="flex md:items-center gap-2 flex-col md:flex-row">
                <User size={16} />
                <p className="flex-[0.8] font-medium">Full Name</p>
                <input
                  type="text"
                  className="form-input-field flex-1"
                  placeholder="Full name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="flex md:items-center gap-2 flex-col md:flex-row">
                <Globe size={16} />
                <p className="flex-[0.8] font-medium">Email address</p>
                <input
                  type="email"
                  className="form-input-field flex-1"
                  placeholder="Email address"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>

          <div className="flex md:items-center gap-2 flex-col md:flex-row">
            <MapPin size={16} />
            <p className="flex-[0.8] font-medium">Image</p>
            <label className="flex-1 border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center cursor-pointer">
              {image && (
                <div className="w-16 h-16 relative">
                  <Image
                    src={image}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border"
                    sizes="64px"
                  />
                </div>
              )}
              <Upload className="text-gray-500 w-8 h-8 mb-2 mt-5" />
              <p>
                <span className="text-primary font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 800 x 400px)
              </p>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                disabled={!editPersonalInfo}
              />
            </label>
          </div>

          <form.Field name="description">
            {(field) => (
              <div className="flex md:items-center gap-2 flex-col md:flex-row">
                <Pencil size={16} />
                <p className="flex-[0.8] font-medium">Short description</p>
                <textarea
                  className="form-input-field w-full flex-1"
                  placeholder="Write a short bio about you..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* More Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-2">More Information</h2>
        <p className="text-sm text-gray-500 mb-4">
          More details about you.{" "}
          <button
            type="button"
            className="text-primary"
            onClick={() => setEditPersonalInfo(!editPersonalInfo)}
          >
            {editPersonalInfo ? "Cancel Edit" : "Edit Details"}
          </button>
        </p>
        <div className="space-y-4">
          <form.Field name="phoneNumber">
            {(field) => (
              <div className="flex md:items-center gap-2 flex-col md:flex-row">
                <Phone size={16} />
                <p className="flex-[0.8] font-medium">Phone</p>
                <PhoneInput
                  country={"ng"}
                  value={field.state.value}
                  onChange={(phone) => field.handleChange(phone)}
                  inputClass="!w-full !h-auto !p-2 !pl-14 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
                  containerClass="w-full flex-1"
                  buttonClass="!border-r-0 !rounded-l !p-2"
                  dropdownClass="!rounded"
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="position">
            {(field) => (
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <p className="flex-[0.8] font-medium">Position</p>
                <input
                  type="text"
                  className="form-input-field flex-1"
                  placeholder="Position"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="location">
            {(field) => (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <p className="flex-[0.8] font-medium">Location</p>
                <input
                  type="text"
                  className="form-input-field flex-1"
                  placeholder="Location"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="website">
            {(field) => (
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <p className="flex-[0.8] font-medium">Website</p>
                <input
                  type="text"
                  className="form-input-field flex-1"
                  placeholder="Website"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={!editPersonalInfo}
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {(editPersonalInfo || editPersonalInfo) && (
        <div className="flex justify-center">
          <button type="submit" className="btn-primary mt-6 md:max-w-lg w-full">
            Update Details
          </button>
        </div>
      )}
    </form>
  );
}
