"use client";
import React from "react";
import Modal from "react-modal";
import { assignRole, getRoles } from "@/app/lib/actions/user";
import { Role, User } from "@/app/lib/definitions";
import CircleLoader from "../circle-loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface RoleAssignmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
}
Modal.setAppElement("#modals");

const RoleAssignmentModal = ({
  isOpen,
  onRequestClose,
  user,
}: RoleAssignmentModalProps) => {
  const [loading, setLoading] = React.useState(true);
  const [roles, setRoles] = React.useState<Role[]>([]);
  React.useEffect(() => {
    if (isOpen) {
      (async () => {
        const response = await getRoles();
        if (response.success) {
          setRoles(response.result.items);
        }
        setLoading(false);
      })();
    }
  }, [isOpen]);

  if (!user) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-lg shadow-lg">
        {loading ? (
          <CircleLoader className="text-primary" />
        ) : roles?.length === 0 ? (
          <p className="text-center">No roles available</p>
        ) : (
          <div>
            {" "}
            <h2 className="text-lg font-semibold text-center text-[#094794] mb-4">
              Select a role to assign to {user.fullName}
            </h2>
            <ScrollArea className="h-[400px] w-full pr-4">
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                    onClick={async () => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Please confirm your action. Assigning this role will update the user's permissions immediately.",
                        showCancelButton: true,
                        cancelButtonText: "No, Cancel",
                        confirmButtonColor: "#094794",
                        confirmButtonText: "Yes, Confirm",
                        reverseButtons: true,
                        customClass: {
                          cancelButton:
                            "text-primary bg-white border border-primary",
                          actions: "flex-row gap-2",
                        },
                        buttonsStyling: true,
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                          return assignRole({
                            userId: user.id,
                            roleName: role.name,
                          });
                        },
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          const response = result.value;
                          if (!response.success) {
                            console.error(response.error.message);
                            toast.error(response.error.message);
                            return;
                          }

                          console.log(
                            `Assigned ${role.name} role to ${user.fullName}`
                          );
                          toast.success("Role assigned successfully");
                          onRequestClose();
                        }
                      });
                    }}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{role.name}</p>
                      <p className="text-sm text-gray-500">
                        {role.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <button
              className="mt-4 w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={onRequestClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RoleAssignmentModal;
