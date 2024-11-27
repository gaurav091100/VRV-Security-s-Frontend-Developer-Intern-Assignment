import { useState } from 'react';
import { FaHome, FaUsers, FaUserShield, FaSignOutAlt, FaBars } from 'react-icons/fa';
import MenuItem from './MenuItem';


const menuItems = [
  {
    id:1,
    link:"/",
    icon: FaHome,
    title:"Dashboard"
  },
  {
    id:2,
    link:"/user-management",
    icon: FaUsers,
    title:"User Management"
  },
  {
    id:3,
    link:"/role-management",
    icon: FaUserShield,
    title:"Role Management"
  },
  // {
  //   id:4,
  //   link:"/settings",
  //   icon: FaCog,
  //   title:"Settings"
  // },
  {
    id:5,
    link:"#",
    icon: FaSignOutAlt,
    title:"Logout"
  },
]
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle sidebar visibility
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white absolute top-4 left-4 z-50"
      >
        <FaBars size={30} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-gray-800 text-white p-4 h-full w-64 transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:w-64`}
      >
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>

        <ul className="space-y-4">
       {
        menuItems?.map((menuItem)=>{
          return <MenuItem key={menuItem?.id} menuItem={menuItem} />
        })
       }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

