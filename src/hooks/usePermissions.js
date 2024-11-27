import { useState, useEffect } from "react";
import useAuth from "../context/useAuth";


const usePermissions = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const rolesResponse = await fetch(
          `http://localhost:5000/roles?name=${user?.role}`
        );
        const rolesData = await rolesResponse.json();

        if (rolesData.length > 0) {
          setPermissions(rolesData[0].permissions);
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
