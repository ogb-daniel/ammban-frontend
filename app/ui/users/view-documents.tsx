"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserDocument, verifyUserDocument } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import CircleLoader from "../circle-loader";

type Props = {
  userId: string;
};

type DocumentData = {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileContent: string;
};

const ViewDocuments = ({ userId }: Props) => {
  const [documents, setDocuments] = useState<{
    GovernmentId?: DocumentData;
    Selfie?: DocumentData;
    ProofOfAddress?: DocumentData;
  }>({});
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const [govIdRes, selfieRes, proofRes] = await Promise.all([
          getUserDocument(userId, "GovernmentId"),
          getUserDocument(userId, "Selfie"),
          getUserDocument(userId, "ProofOfAddress"),
        ]);

        const newDocuments: typeof documents = {};

        if (govIdRes.success && govIdRes.result) {
          newDocuments.GovernmentId = govIdRes.result;
        }

        if (selfieRes.success && selfieRes.result) {
          newDocuments.Selfie = selfieRes.result;
        }

        if (proofRes.success && proofRes.result) {
          newDocuments.ProofOfAddress = proofRes.result;
        }

        setDocuments(newDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [userId]);

  const handleVerifyDocuments = async () => {
    setVerifying(true);
    try {
      const response = await verifyUserDocument(userId);
      if (response.success) {
        toast.success("Documents verified successfully");
      } else {
        toast.error(response.error?.message || "Failed to verify documents");
      }
    } catch (error) {
      console.error("Error verifying documents:", error);
      toast.error("Failed to verify documents");
    } finally {
      setVerifying(false);
    }
  };

  const renderDocument = (type: string, document?: DocumentData) => {
    if (!document) {
      return (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">No {type} document found</p>
        </div>
      );
    }

    const isImage = document.fileType?.startsWith("image/");
    const isPDF = document.fileType === "application/pdf";

    // Create download link from base64 content
    const downloadUrl = document.fileContent
      ? `data:${document.fileType};base64,${document.fileContent}`
      : document.fileUrl;

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-2">{type}</h4>
        <p className="text-sm text-gray-600 mb-2">File: {document.fileName}</p>
        <p className="text-xs text-gray-500 mb-3">Type: {document.fileType}</p>

        {/* Show image preview for images */}
        {isImage && document.fileContent && (
          <img
            src={`data:${document.fileType};base64,${document.fileContent}`}
            alt={type}
            className="max-w-full h-auto max-h-48 object-contain rounded mb-3"
          />
        )}

        {/* Show PDF icon for PDFs */}
        {isPDF && (
          <div className="flex items-center justify-center bg-gray-100 rounded p-8 mb-3">
            <svg
              className="w-16 h-16 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
              <text
                x="50%"
                y="70%"
                fontSize="6"
                textAnchor="middle"
                fill="currentColor"
              >
                PDF
              </text>
            </svg>
          </div>
        )}

        {/* Show generic file icon for other types */}
        {!isImage && !isPDF && (
          <div className="flex items-center justify-center bg-gray-100 rounded p-8 mb-3">
            <svg
              className="w-16 h-16 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 2h8l4 4v12H4V2zm8 4V2.5L15.5 6H12z" />
            </svg>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 flex-wrap">
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={document.fileName}
              className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </a>
          )}
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </a>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <CircleLoader />
        <span className="ml-2">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">User Documents</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderDocument("Government ID", documents.GovernmentId)}
        {renderDocument("Selfie", documents.Selfie)}
        {renderDocument("Proof of Address", documents.ProofOfAddress)}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleVerifyDocuments}
          disabled={verifying || Object.keys(documents).length === 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {verifying ? (
            <>
              <CircleLoader className="text-white mr-2" />
              Verifying...
            </>
          ) : (
            "Verify Documents"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ViewDocuments;
