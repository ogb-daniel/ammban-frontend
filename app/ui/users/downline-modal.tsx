"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { User } from "@/app/lib/definitions";
import { getDownlines } from "@/app/lib/actions/dashboard";
import CircleLoader from "../circle-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUser, FaChevronLeft } from "react-icons/fa";
import { PiPhoneFill } from "react-icons/pi";
import { MdPermIdentity } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Eye } from "lucide-react";

interface DownlineModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
}

interface HierarchyLevel {
  user: User;
  downlines: User[];
}

Modal.setAppElement("#modals");

const DownlineModal = ({
  isOpen,
  onRequestClose,
  user,
}: DownlineModalProps) => {
  const [loading, setLoading] = useState(false);
  const [hierarchyStack, setHierarchyStack] = useState<HierarchyLevel[]>([]);
  const [currentDownlines, setCurrentDownlines] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize modal with the parent user's downlines
  React.useEffect(() => {
    if (isOpen && user) {
      loadDownlines(user, true);
    } else if (!isOpen) {
      // Reset state when modal closes
      setHierarchyStack([]);
      setCurrentDownlines([]);
      setError(null);
    }
  }, [isOpen, user]);

  const loadDownlines = async (targetUser: User, isInitial = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDownlines(targetUser.id);
      if (response?.success) {
        const downlines = response.result.referredUsers || [];
        setCurrentDownlines(downlines);

        if (!isInitial) {
          // Add to hierarchy stack when navigating deeper
          setHierarchyStack((prev) => [
            ...prev,
            { user: targetUser, downlines },
          ]);
        } else {
          // Initial load, reset hierarchy
          setHierarchyStack([{ user: targetUser, downlines }]);
        }
      } else {
        setError(response?.error?.message || "Failed to load downlines");
      }
    } catch (err) {
      setError("An error occurred while loading downlines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDownline = (selectedUser: User) => {
    loadDownlines(selectedUser);
  };

  const handleGoBack = () => {
    if (hierarchyStack.length > 1) {
      // Remove the current level
      const newStack = hierarchyStack.slice(0, -1);
      setHierarchyStack(newStack);

      // Set downlines to the previous level
      const previousLevel = newStack[newStack.length - 1];
      setCurrentDownlines(previousLevel.downlines);
    }
  };

  const getCurrentUser = () => {
    return hierarchyStack[hierarchyStack.length - 1]?.user || user;
  };

  const getBreadcrumbs = () => {
    return hierarchyStack.map((level) => level.user.fullName)?.join(" > ");
  };

  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg max-h-[90vh] flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-[#094794]">
              Downline Hierarchy
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onRequestClose}
            >
              ✕
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Path:</span> {getBreadcrumbs()}
          </div>

          {/* Current User Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {getCurrentUser().fullName}
                </p>
                <p className="text-sm text-gray-600">
                  {getCurrentUser().emailAddress}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Role: {getCurrentUser().roleNames?.join(", ") || "N/A"}
                </p>
              </div>
              {hierarchyStack.length > 1 && (
                <button
                  onClick={handleGoBack}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                >
                  <FaChevronLeft className="w-3 h-3" />
                  Back
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Downlines List */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <CircleLoader className="text-primary" />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : currentDownlines.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-center">
              No downlines found for this user.
            </p>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Downlines ({currentDownlines.length})
              </p>
              {currentDownlines.map((downlineUser, index) => (
                <div
                  key={downlineUser.id || index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Name & Email */}
                    <div className="flex items-start gap-2">
                      <FaUser className="text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {downlineUser.fullName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {downlineUser.emailAddress}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <PiPhoneFill className="text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        {downlineUser.phoneNumber || "N/A"}
                      </p>
                    </div>

                    {/* State */}
                    <div className="flex items-center gap-2">
                      <FaLocationDot className="text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (downlineUser as any).state || "N/A"
                        }
                      </p>
                    </div>

                    {/* Role */}
                    <div className="flex items-center gap-2">
                      <MdPermIdentity className="text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        {downlineUser.roleNames?.join(", ") || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* View Downline Button */}
                  <button
                    onClick={() => handleViewDownline(downlineUser)}
                    className="ml-4 flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm whitespace-nowrap"
                    title="View Downline"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">View Downline</span>
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <button
            className="w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={onRequestClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DownlineModal;
