/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

const MenuItem = ({ menuItem }) => {
  const Icon = menuItem?.icon;
  const { logout } = useAuth();

  const handleMenuItemClick = (menuItem) => {
    if (menuItem?.link === "#") {
      logout();
    }
  };
  return (
    <li>
      <Link
        to={menuItem?.link}
        className="flex items-center space-x-2 text-white hover:bg-blue-600 p-2 rounded-md"
        onClick={() => handleMenuItemClick(menuItem)}
      >
        <Icon />
        <span>{menuItem?.title}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
