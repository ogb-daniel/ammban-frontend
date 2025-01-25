import React from "react";
import Table from "../../table";
import { ColumnDef } from "@tanstack/react-table";
type User = {
  name: string;
  email: string;
  phone: string;
  state: string;
  gender: string;
  status: string;
};

const usersData: User[] = Array(10).fill({
  name: "David Abolaji",
  email: "david@google.com",
  phone: "(234) 907 - 1274 - 515",
  state: "Lagos (Nigeria)",
  gender: "Male",
  status: "Active",
});

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "state",
    header: "State",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <span
        className={`text-sm font-medium ${
          info.getValue() === "Active" ? "text-green-500" : "text-red-500"
        }`}
      >
        {info.getValue() as string}
      </span>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => <button className="text-blue-500">Assign</button>,
  },
];

const UsersTable = () => {
  return (
    <Table<User> data={usersData} columns={userColumns} title="Manage Users" />
  );
};

export default UsersTable;
