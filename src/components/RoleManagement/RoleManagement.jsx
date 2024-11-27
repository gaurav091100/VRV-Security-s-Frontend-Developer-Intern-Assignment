import { useState, useEffect } from 'react';
import Button from '../UI/Button';
import RoleForm from './RoleForm'; // New Form for adding/editing roles
import RoleTable from './RoleTable';
import { deleteRole, fetchRoles } from '../../services/roleService';
import usePermissions from '../../hooks/usePermissions';
import { permissions } from '../../constants/constants';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null); // To manage the role being edited
  const [addRole, setAddRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const { userHasPermission } = usePermissions();

    // Filtering
    const filteredRoles = roles
    .filter((role) =>
      role?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((role) => (filterRole === "All" ? true : role.name === filterRole));


  // Fetch roles from the API
  useEffect(() => {
   
    const getRoles = async () => {
      try {
        const roles = await fetchRoles();
        setRoles(roles);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
    getRoles();

  }, []);

  // Handle delete role
  const handleDeleteRole = async (id) => {
    try {
      await deleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
      
    }
  };

  // Open role form for editing
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setAddRole(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Role Management</h2>

      {/* Add/Edit Role Form */}
      {(addRole || selectedRole) && (
        <RoleForm
          role={selectedRole}
          closeForm={() => {
            setAddRole(false);
            setSelectedRole(null);
          }}
          setRoles={setRoles}
        />
      )}

      {/* Role List */}
      <div className="flex justify-between items-center mb-4 mt-6">
         <input
           type="text"
           placeholder="Search by role name"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="border p-2 rounded w-1/3"
         />
         <div className="flex items-center gap-4">
         <select
           value={filterRole}
           onChange={(e) => setFilterRole(e.target.value)}
           className="border p-2 rounded"
         >
              <option value="All">All Roles</option>
            {
                roles?.map((role)=>{
                return <option key={role?.id} value={role?.name}>{role?.name}</option>
                })
            }
         </select>
         {
           userHasPermission(permissions.WRITE) && <Button onClick={() => setAddRole(true)}>Add New Role</Button> 
         }
         
         </div>
       </div>
      
      <RoleTable onEdit={handleEditRole} onDelete={handleDeleteRole} filteredRoles={filteredRoles}/>
    </div>
  );
};

export default RoleManagement;
