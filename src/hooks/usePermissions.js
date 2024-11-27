import { useState, useEffect } from "react";
import useAuth from "../context/useAuth";
import api from "../services/api";

const usePermissions = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const response = await api.get(
          `/roles?name=${user?.role}`
        );

        if (response.data.length > 0) {
          setPermissions(response.data[0].permissions);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const userHasPermission = (permission) => {
    return permissions.includes(permission);
  };

  return { userHasPermission, permissions };
};

export default usePermissions;
