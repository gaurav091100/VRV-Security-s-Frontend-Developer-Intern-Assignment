import api from './api';

export const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  };

  export const createRole = async (role) => {
    try {
      const response = await api.post("/roles", role);
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  };
  
  export const updateRole = async (id, updatedRole) => {
    try {
      const response = await api.put(`/roles/${id}`, updatedRole);
      return response.data;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  };
  export const deleteRole = async (id) => {
    try {
      await api.delete(`/roles/${id}`);
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  };

export const checkRoleNameInUse = async (roleName) => {
  try {
    const response = await api.get(`/users?role=${roleName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};
  
  export const fetchPermissions = async () => {
    try {
      const response = await api.get("/permissions");
      return response.data;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  };
  
