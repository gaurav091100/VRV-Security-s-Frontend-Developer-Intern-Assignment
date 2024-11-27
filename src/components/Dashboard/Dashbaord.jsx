import { permissions } from "../../constants/constants";
import useAuth from "../../context/useAuth";
import usePermissions from "../../hooks/usePermissions";
import Button from "../UI/Button";

const Dashboard = () => {
  const { user } = useAuth();
  const { userHasPermission } = usePermissions();  // Using the custom hook

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">Welcome, {user.username}</h1>
      <p className="text-base text-center mt-4">{`Your Role is ${user?.role}. You have the following permissions`}</p>
     <div className="flex items-center justify-evenly mt-8">
     {userHasPermission(permissions.WRITE) && <Button>WRITE</Button>}
      {userHasPermission(permissions.READ) && <Button>READ</Button>}
      {userHasPermission(permissions.UPDATE) && <Button>UPDATE</Button>}
      {userHasPermission(permissions.DELETE) && <Button>DELETE</Button>}
     </div>
    </div>
  );
};

export default Dashboard;
