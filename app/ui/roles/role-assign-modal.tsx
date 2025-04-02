"use client";
import React from "react";
import Modal from "react-modal";
import { useAdminStore } from "@/providers/admin-store-provider";
import { FaUserSecret } from "react-icons/fa";
import { User } from "@/stores/admin-store";

interface RoleAssignmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
}
const RoleAssignmentModal = ({
  isOpen,
  onRequestClose,
  user,
}: RoleAssignmentModalProps) => {
  const { roles, editUser } = useAdminStore((state) => state);
  Modal.setAppElement("#modals");
  if (!user) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-center text-[#094794] mb-4">
          Select a role to assign to {user.firstName} {user.lastName}
        </h2>
        <div className="space-y-4">
          {roles.map((role, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-lg shadow-sm cursor-pointer"
              onClick={() => {
                // Handle role assignment here
                console.log(
                  `Assigned ${role.title} role to ${user.firstName} ${user.lastName}`
                );
                editUser(user.id, { ...user, role: role.title });
                onRequestClose();
              }}
              //   style={{ backgroundColor: `${role.baseColor}1A` }} // 1A = 10% opacity
            >
              <div
                className="p-4 rounded-[15px] flex items-center justify-center mr-4  "
                style={{ backgroundColor: `${role.color}33` }} // 33 = 20% opacity
              >
                <FaUserSecret
                  className="w-5 h-5"
                  style={{ color: role.color }}
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{role.title}</p>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RoleAssignmentModal;
