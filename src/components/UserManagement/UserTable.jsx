/* eslint-disable react/prop-types */
import { useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import usePermissions from "../../hooks/usePermissions";
import { permissions } from "../../constants/constants";

const UserTable = ({ onEdit, onDelete, filteredUsers }) => {
  const { userHasPermission } = usePermissions();

  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });

  // Sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key].toString().toLowerCase();
    const bValue = b[sortConfig.key].toString().toLowerCase();
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };


  return (
    <div className="w-full">
      <table className="min-w-full mt-4 table-auto border-collapse hidden md:table">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th
              className="px-4 py-2 text-center cursor-pointer"
              onClick={() => handleSort("username")}
            >
              UserName{" "}
              {sortConfig.key === "username" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 text-center cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 text-center cursor-pointer"
              onClick={() => handleSort("role")}
            >
              Role{" "}
              {sortConfig.key === "role" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-2 text-center">Status</th>
            {
            (  userHasPermission(permissions.UPDATE) || userHasPermission(permissions.DELETE)) &&   <th className="px-4 py-2 text-center">Actions</th>
            }
          
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t ${index % 2 === 1 ? "bg-slate-200" : ""}`}
            >
              <td className="px-4 py-2 text-center">{user.username}</td>
              <td className="px-4 py-2 text-center">{user.email}</td>
              <td className="px-4 py-2 text-center">{user.role}</td>
              <td
                className={`px-4 py-2 text-center font-bold ${
                  user.status === "ACTIVE" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </td>
{
  (userHasPermission(permissions.UPDATE) || userHasPermission(permissions.DELETE)) &&   <td className="px-4 py-2 text-center">
  {userHasPermission(permissions.UPDATE) && (
    <button
      className="text-slate-800 mr-2"
      onClick={() => onEdit(user)} // Open edit form
    >
      <CiEdit size={20} />
    </button>
  )}
  {userHasPermission(permissions.DELETE) && (
    <button
      className="text-red-500"
      onClick={() => onDelete(user.id)} // Delete user
    >
      <CiTrash size={20} />
    </button>
  )}
</td>
}
             
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive Table for Small Screens */}
      <div className="md:hidden">
        {sortedUsers?.map((user, index) => (
          <div
            key={user.id}
            className={`border rounded-lg mb-4 p-4 ${
              index % 2 === 1 ? "bg-slate-200" : ""
            }`}
          >
            <p className="mb-2">
              <strong>Name:</strong> {user.username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  user.status === "ACTIVE" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </span>
            </p>
            <div className="flex space-x-4">
            
              
              {userHasPermission(permissions.UPDATE) && (
                  <button
                    className="text-slate-800 mr-2"
                    onClick={() => onEdit(user)} // Open edit form
                  >
                    <CiEdit size={20} />
                  </button>
                )}
                {userHasPermission(permissions.DELETE) && (
                  <button
                    className="text-red-500"
                    onClick={() => onDelete(user.id)} // Delete user
                  >
                    <CiTrash size={20} />
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
