import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsersList();
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">Users List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center">
              <span className="font-semibold">{user.username}</span> -{" "}
              <span className="text-gray-600">{user.email}</span> -{" "}
              <span className="text-gray-500">{user.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
