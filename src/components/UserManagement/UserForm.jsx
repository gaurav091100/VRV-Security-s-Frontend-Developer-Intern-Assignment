/* eslint-disable react/prop-types */
import {  useEffect } from "react";
import Button from "../UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputLabel from "../UI/InputLabel";
import Input from "../UI/Input";
import FormError from "../UI/FormError";


const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
});

const UserForm = ({ user, onSave, onCancel, roles }) => {
  
  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      role: user?.role || "",
      status: user?.status || "ACTIVE",
    },
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });


  useEffect(() => {
    if (user) {
      formik.setValues({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[80vw] md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold mb-4">
          {user ? "Edit User" : "Add User"}
        </h3>
        <form className="flex flex-col gap-3 mt-5" onSubmit={formik.handleSubmit}>
        <div>
          <InputLabel htmlFor="username" required>Username</InputLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.username && formik.errors.username && (
              <FormError>{formik.errors.username}</FormError>
            )}
        </div>
        <div>
          <InputLabel htmlFor="email" required>Email</InputLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.email && formik.errors.email && (
              <FormError>{formik.errors.email}</FormError>
            )}
        </div>
       
          <div>
           <InputLabel htmlFor="role" required>Role</InputLabel>
            <select
              name="role"
              placeholder="Select you role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              {roles?.map((role) => {
                return (
                  <option key={role?.id} value={role?.name}>
                    {role?.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.role && formik.errors.role && (
              <FormError>{formik.errors.role}</FormError>
            )}
          </div>
      
        <div>
        <InputLabel htmlFor="status" required>Status</InputLabel>
          <select
            name="status"
            placeholder="Select status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          {formik.touched.status && formik.errors.status && (
              <FormError>{formik.errors.status}</FormError>
            )}
        </div>
        <div className="flex justify-between">
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">
            {user ? "Save Changes" : "Add User"}
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

