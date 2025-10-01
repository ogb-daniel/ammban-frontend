"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Globe, Phone, User, Upload } from "lucide-react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { useUserStore } from "@/providers/user-store-provider";
import { getUserDocument, updateUser } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import CircleLoader from "../circle-loader";

type DocumentData = {
  fileName: string;
  fileContent: string;
  fileType: string;
  fileUrl: string;
};

export default function PersonalInformation() {
  const { user } = useUserStore((state) => state);
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [documents, setDocuments] = useState<{
    GovernmentId?: DocumentData;
    Selfie?: DocumentData;
    ProofOfAddress?: DocumentData;
  }>({});
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch user documents on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      console.log("Fetching documents for user:", user);
      if (user?.id === undefined || user?.id === null) {
        setLoadingDocuments(false);
        return;
      }

      setLoadingDocuments(true);
      try {
        const [govIdRes, selfieRes, proofRes] = await Promise.all([
          getUserDocument(user.id.toString(), "GovernmentId"),
          getUserDocument(user.id.toString(), "Selfie"),
          getUserDocument(user.id.toString(), "ProofOfAddress"),
        ]);
        console.log("Fetched documents:", { govIdRes, selfieRes, proofRes });

        const newDocuments: typeof documents = {};

        if (govIdRes.success && govIdRes.result) {
          newDocuments.GovernmentId = govIdRes.result;
        } else if (govIdRes.error) {
          console.error("Error fetching Government ID:", govIdRes.error);
        }

        if (selfieRes.success && selfieRes.result) {
          newDocuments.Selfie = selfieRes.result;
        } else if (selfieRes.error) {
          console.error("Error fetching Selfie:", selfieRes.error);
        }

        if (proofRes.success && proofRes.result) {
          newDocuments.ProofOfAddress = proofRes.result;
        } else if (proofRes.error) {
          console.error("Error fetching Proof of Address:", proofRes.error);
        }

        setDocuments(newDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to load documents");
      } finally {
        setLoadingDocuments(false);
      }
    };

    fetchDocuments();
  }, [user?.id]);

  const form = useForm({
    defaultValues: {
      fullName: user?.name + " " + user?.surname,
      emailAddress: user?.emailAddress,
      phoneNumber: user?.phoneNumber,
    },
    onSubmit: async (values) => {
      console.log(user);
      if (user?.id === undefined || user?.id === null) return;
      console.log("Submitting form with values:", values);

      setSubmitting(true);
      try {
        // Handle user information update
        const [firstName, ...lastNameParts] = values.value.fullName.split(" ");
        const lastName = lastNameParts.join(" ");
        console.log("Parsed names:", { firstName, lastName });
        const updateResponse = await updateUser({
          ...user,
          id: user.id,
          fullName: values.value.fullName,
          surname: lastName,
          emailAddress: values.value.emailAddress,
          phoneNumber: values.value.phoneNumber,
        });
        console.log("Update response:", updateResponse);

        if (!updateResponse.success) {
          toast.error(
            updateResponse.error?.message || "Failed to update user information"
          );
          return;
        }

        // Handle document uploads if any files changed
        if (governmentId || selfie || proofOfAddress) {
          const formData = new FormData();
          if (governmentId) formData.append("governmentId", governmentId);
          if (selfie) formData.append("selfie", selfie);
          if (proofOfAddress) formData.append("proofOfAddress", proofOfAddress);

          const uploadResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/services/app/Account/UploadDocuments?userId=${user.id}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadResult = await uploadResponse.json();

          if (!uploadResult.success) {
            toast.error(
              uploadResult.error?.message || "Failed to upload documents"
            );
            return;
          }
        }

        toast.success("Information updated successfully");
        setEditPersonalInfo(false);

        // Clear file states
        setGovernmentId(null);
        setSelfie(null);
        setProofOfAddress(null);
      } catch (error) {
        console.error("Error updating information:", error);
        toast.error("Failed to update information");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGovernmentIdUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setGovernmentId(file);
  };

  const handleSelfieUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelfie(file);
  };

  const handleProofOfAddressUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setProofOfAddress(file);
  };

  const renderDocument = (
    type: string,
    document?: DocumentData,
    uploadedFile?: File | null
  ) => {
    // Show uploaded file preview if in edit mode and file is selected
    if (editPersonalInfo && uploadedFile) {
      const isImage = uploadedFile.type.startsWith("image/");
      return (
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-2">{type}</h4>
          {isImage ? (
            <div className="w-full h-32 relative mb-2">
              <Image
                src={URL.createObjectURL(uploadedFile)}
                alt={type}
                fill
                className="object-cover border rounded"
                sizes="200px"
              />
            </div>
          ) : (
            <div className="p-2 bg-gray-100 rounded border mb-2">
              <p className="text-sm font-medium">{uploadedFile.name}</p>
            </div>
          )}
          <p className="text-xs text-gray-500">New file selected</p>
        </div>
      );
    }

    // Show existing document if not editing or no new file
    if (!document) {
      return (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">No {type} document found</p>
        </div>
      );
    }

    const isImage = document.fileType?.startsWith("image/");

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-2">{type}</h4>
        <p className="text-sm text-gray-600 mb-2">File: {document.fileName}</p>
        {isImage && document.fileContent && (
          <img
            src={`data:${document.fileType};base64,${document.fileContent}`}
            alt={type}
            className="max-w-full h-auto max-h-48 object-contain rounded mb-2"
          />
        )}
      </div>
    );
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

          <form.Field name="emailAddress">
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
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Documents</h2>
        <p className="text-sm text-gray-500 mb-4">
          Your uploaded verification documents.
        </p>

        {loadingDocuments ? (
          <div className="flex items-center justify-center p-8">
            <CircleLoader />
            <span className="ml-2">Loading documents...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Government ID */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Government-Issued ID
              </label>
              {editPersonalInfo ? (
                <label className="border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center cursor-pointer">
                  {(governmentId || documents.GovernmentId) && (
                    <div className="w-full mb-2">
                      {governmentId ? (
                        governmentId.type.startsWith("image/") ? (
                          <div className="w-full h-32 relative">
                            <Image
                              src={URL.createObjectURL(governmentId)}
                              alt="Government ID"
                              fill
                              className="object-cover border rounded"
                              sizes="200px"
                            />
                          </div>
                        ) : (
                          <div className="p-2 bg-gray-100 rounded border">
                            <p className="text-sm font-medium">
                              {governmentId.name}
                            </p>
                          </div>
                        )
                      ) : (
                        documents.GovernmentId?.fileContent && (
                          <img
                            src={`data:${documents.GovernmentId.fileType};base64,${documents.GovernmentId.fileContent}`}
                            alt="Government ID"
                            className="max-w-full h-auto max-h-32 object-contain rounded"
                          />
                        )
                      )}
                    </div>
                  )}
                  <Upload className="text-gray-500 w-6 h-6 mb-2" />
                  <p>
                    <span className="text-primary font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG or PDF (max. 800 x 400px)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleGovernmentIdUpload}
                  />
                </label>
              ) : (
                renderDocument("Government ID", documents.GovernmentId, null)
              )}
            </div>

            {/* Selfie */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Selfie Photo
              </label>
              {editPersonalInfo ? (
                <label className="border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center cursor-pointer">
                  {(selfie || documents.Selfie) && (
                    <div className="w-full mb-2">
                      {selfie ? (
                        selfie.type.startsWith("image/") ? (
                          <div className="w-full h-32 relative">
                            <Image
                              src={URL.createObjectURL(selfie)}
                              alt="Selfie"
                              fill
                              className="object-cover border rounded"
                              sizes="200px"
                            />
                          </div>
                        ) : (
                          <div className="p-2 bg-gray-100 rounded border">
                            <p className="text-sm font-medium">{selfie.name}</p>
                          </div>
                        )
                      ) : (
                        documents.Selfie?.fileContent && (
                          <img
                            src={`data:${documents.Selfie.fileType};base64,${documents.Selfie.fileContent}`}
                            alt="Selfie"
                            className="max-w-full h-auto max-h-32 object-contain rounded"
                          />
                        )
                      )}
                    </div>
                  )}
                  <Upload className="text-gray-500 w-6 h-6 mb-2" />
                  <p>
                    <span className="text-primary font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG or PDF (max. 800 x 400px)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleSelfieUpload}
                  />
                </label>
              ) : (
                renderDocument("Selfie", documents.Selfie, null)
              )}
            </div>

            {/* Proof of Address */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Proof of Address
              </label>
              {editPersonalInfo ? (
                <label className="border-2 border-dashed rounded-lg p-6 text-center flex flex-col items-center cursor-pointer">
                  {(proofOfAddress || documents.ProofOfAddress) && (
                    <div className="w-full mb-2">
                      {proofOfAddress ? (
                        proofOfAddress.type.startsWith("image/") ? (
                          <div className="w-full h-32 relative">
                            <Image
                              src={URL.createObjectURL(proofOfAddress)}
                              alt="Proof of Address"
                              fill
                              className="object-cover border rounded"
                              sizes="200px"
                            />
                          </div>
                        ) : (
                          <div className="p-2 bg-gray-100 rounded border">
                            <p className="text-sm font-medium">
                              {proofOfAddress.name}
                            </p>
                          </div>
                        )
                      ) : (
                        documents.ProofOfAddress?.fileContent && (
                          <img
                            src={`data:${documents.ProofOfAddress.fileType};base64,${documents.ProofOfAddress.fileContent}`}
                            alt="Proof of Address"
                            className="max-w-full h-auto max-h-32 object-contain rounded"
                          />
                        )
                      )}
                    </div>
                  )}
                  <Upload className="text-gray-500 w-6 h-6 mb-2" />
                  <p>
                    <span className="text-primary font-medium">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG or PDF (max. 800 x 400px)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleProofOfAddressUpload}
                  />
                </label>
              ) : (
                renderDocument(
                  "Proof of Address",
                  documents.ProofOfAddress,
                  null
                )
              )}
            </div>
          </div>
        )}
      </div>

      {(editPersonalInfo || editPersonalInfo) && (
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-primary mt-6 md:max-w-lg w-full"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <CircleLoader className="text-white mr-2" />
                Updating...
              </>
            ) : (
              "Update Details"
            )}
          </button>
        </div>
      )}
    </form>
  );
}
