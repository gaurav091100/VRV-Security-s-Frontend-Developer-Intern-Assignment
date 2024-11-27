import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import UserManagement from "../components/UserManagement/UserManagement";
import RoleManagement from "../components/RoleManagement/RoleManagement";
import Profile from "../components/Profile/Profile";
import Dashboard from "../components/Dashboard/Dashbaord";


const AllRoutes = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
             <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/user-management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/role-management"
          element={
            <ProtectedRoute>
              <RoleManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
     
   
      </Route>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
