import { IoIosLogOut } from "react-icons/io";
import useAuth from "../../context/useAuth";
const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-end items-center shadow-lg bg-slate-800 py-4 px-8">
      {/* <h1 className="font-bold text-3xl text-white">Admin Panel</h1> */}
      <div className="flex items-center gap-5">
        <h3 className="text-white">Welcome, {user?.username}!</h3>
        <button className="text-white" onClick={logout}>
          <IoIosLogOut size={30} />
        </button>
      </div>
    </div>
  );
};

export default Header;
