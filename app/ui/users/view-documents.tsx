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

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-2">{type}</h4>
        <p className="text-sm text-gray-600 mb-2">File: {document.fileName}</p>
        {isImage && document.fileContent && (
          <img
            src={`data:${document.fileType};base64,${document.fileContent}`}
            alt={type}
            className="max-w-full h-auto max-h-48 object-contain rounded"
          />
        )}
        {document.fileUrl && (
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            View Document
          </a>
        )}
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
