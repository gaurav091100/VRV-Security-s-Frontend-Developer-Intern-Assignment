import { useState, useEffect } from "react";
import Button from "../UI/Button";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { createUser, deleteUser, fetchUsers, updateUser } from "../../services/userService";
import { fetchRoles } from "../../services/roleService";
import usePermissions from "../../hooks/usePermissions";
import { permissions } from "../../constants/constants";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [roles, setRoles] = useState([]);

  const { userHasPermission } = usePermissions();
    // Filtering
    const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (filterRole === "All" ? true : user.role === filterRole));

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to load users:", error);
        setError("Error fetching users: " + error)
      }
    };
    const getRoles = async () => {
      try {
        const roles = await fetchRoles();
        setRoles(roles);
      } catch (error) {
        console.error("Failed to load users:", error);
        setError("Error fetching users: " + error)
      }
    };
    getUsers();
    getRoles();

  }, []);

  const handleSave = async (formData) => {
    if (editUser) {
      // Update existing user

      try {
        const updatedUser = await updateUser(editUser.id, formData);
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setEditUser(null);
      } catch (error) {
        console.error("Failed to load users:", error);
        setError("Error fetching users: " + error)
      }
    } else {
      // Add new user

      try {
        const newUser = await createUser(formData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setAddUser(false);
      } catch (error) {
        console.error("Failed to load users:", error);
        setError("Error fetching users: " + error)
      }
    }
  };


   // Handle deleting a user
   const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError("Error fetching users: " + error)
    }
  };

  return (
    <div className="p-4">
       <h2 className="text-xl font-semibold">User Management</h2>

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* User Form Modal */}
      {(editUser || addUser) && (
        <UserForm
          user={editUser}
          onSave={handleSave}
          onCancel={() => {
            setEditUser(null);
            setAddUser(false);
          }}
          roles={roles}
        />
      )}

<div className="flex justify-between items-center mb-4 mt-6">
         <input
           type="text"
           placeholder="Search by username"
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
         {userHasPermission(permissions.WRITE) &&  <Button onClick={() => setAddUser(true)}>Add User</Button> }
        
         </div>
       </div>

      {/* User Table */}
      <UserTable onEdit={setEditUser} onDelete={handleDeleteUser} filteredUsers={filteredUsers} />
      
      {/* Add User Button */}
      
    </div>
  );
};

export default UserManagement;
