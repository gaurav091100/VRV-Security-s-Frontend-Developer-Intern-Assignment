/* eslint-disable react/prop-types */
import { CiTrash, CiEdit } from "react-icons/ci";
import usePermissions from "../../hooks/usePermissions";
import { permissions } from "../../constants/constants";

const RoleTable = ({ onEdit, onDelete, filteredRoles }) => {
  const { userHasPermission } = usePermissions();

  return (
    <div className="w-full">
      <table className="min-w-full mt-4 table-auto border-collapse hidden md:table">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-2 text-center">Role Name</th>
            <th className="px-4 py-2 text-center">Permissions</th>
            {
            (  userHasPermission(permissions.UPDATE) || userHasPermission(permissions.DELETE)) &&   <th className="px-4 py-2 text-center">Actions</th>
            }
          
          </tr>
        </thead>
        <tbody>
          {filteredRoles?.map((role, index) => (
            <tr
              key={role.id}
              className={`border-t ${index % 2 === 1 ? "bg-slate-200" : ""}`}
            >
              <td className="px-4 py-2 text-center">{role?.name}</td>
              <td className="px-4 py-2 text-center">
                {role?.permissions?.join(", ")}
              </td>
              {
                 (userHasPermission(permissions.UPDATE) || userHasPermission(permissions.DELETE)) &&      <td className="px-4 py-2 text-center">
                 {
                   userHasPermission(permissions.UPDATE) &&    <button
                   className="text-slate-800 mr-2"
                   onClick={() => onEdit(role)}
                 >
                   <CiEdit size={20} />
                 </button>
                 }
               
               {
                 userHasPermission(permissions.DELETE) &&   <button
                 className="text-red-500"
                 onClick={() => onDelete(role.id)}
               >
                 <CiTrash size={20} />
               </button>
               }
                
               </td>
              }
           
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive Table for Small Screens */}
      <div className="md:hidden">
        {filteredRoles?.map((role, index) => (
          <div
            key={role?.id}
            className={`border rounded-lg mb-4 p-4 ${
              index % 2 === 1 ? "bg-slate-200" : ""
            }`}
          >
            <p className="mb-2">
              <strong>Role Name:</strong> {role?.name}
            </p>
            <p className="mb-2">
              <strong>Permissions:</strong> {role.permissions?.join(", ")}
            </p>

            <div className="flex space-x-4">
            
             
              {
                  userHasPermission(permissions.UPDATE) &&    <button
                  className="text-slate-800 mr-2"
                  onClick={() => onEdit(role)}
                >
                  <CiEdit size={20} />
                </button>
                }
              
              {
                userHasPermission(permissions.DELETE) &&   <button
                className="text-red-500"
                onClick={() => onDelete(role.id)}
              >
                <CiTrash size={20} />
              </button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleTable;
