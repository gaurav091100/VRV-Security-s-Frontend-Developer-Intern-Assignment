import api from './api';

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
      return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await api.put(`/users/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
