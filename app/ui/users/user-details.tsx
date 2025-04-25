"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import EditUserForm from "./edit-user-form";
import { User } from "@/app/lib/definitions";
import { disapproveUser, approveUser } from "@/app/lib/actions/user";
import { toast } from "react-toastify";
import CircleLoader from "../circle-loader";
type Props = {
  user: User;
};

const UserDetails = ({ user }: Props) => {
  const router = useRouter();
  const [updateInformation, setUpdateInformation] = React.useState(false);
  const [isToggling, setIsToggling] = React.useState(false);
  const handleToggle = async () => {
    let response;
    setIsToggling(true);
    if (user.isActive) {
      response = await disapproveUser(user.id);
    } else {
      response = await approveUser(user.id);
    }
    if (response.success) {
      router.refresh();
    } else {
      toast.error(response.error.message);
    }
    setIsToggling(false);
  };
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        {/* Back Button */}
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => {
            if (updateInformation) {
              setUpdateInformation(false);
            } else {
              router.back();
            }
          }}
        >
          <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
        </div>

        {updateInformation ? (
          <EditUserForm user={user} />
        ) : (
          <>
            {/* User Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.emailAddress}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium">{}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{}</p>
              </div>
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium">{}</p>
              </div>
              <div>
                <p className="text-gray-500">Date Of Birth</p>
                <p className="font-medium">09-10-1989</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p
                  className={`font-medium ${
                    user.isActive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.isActive ? "Active" : "Deactivated"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <Button
                className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
                onClick={handleToggle}
                disabled={isToggling}
              >
                {isToggling ? (
                  <CircleLoader className="text-white" />
                ) : user.isActive ? (
                  "Deactivate User"
                ) : (
                  "Activate User"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setUpdateInformation(true)}
              >
                Update Information
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
