import { useFormik } from "formik";
import * as Yup from "yup";
import { signUpUser } from "../../services/authService";
import Input from "../UI/Input";
import Button from "../UI/Button";
import FormError from "../UI/FormError";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputLabel from "../UI/InputLabel";


const validationSchema =  Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


const Signup = () => {
  // Formik for form handling
  const [error, setError] = useState("");

  const onSubmit = async (values,{ resetForm }) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "USER",
      status: "ACTIVE",
    };
    try {
      await signUpUser(userData);
      resetForm()
      alert("Sign up successful");
    } catch (err) {
      setError(err.message);
    }
  };

  
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[60vh] w-[80vw] md:w-[50vw] lg:w-[25vw] bg-white p-6 rounded-md relative">
        <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-semibold text-center">
          Sign Up
        </h3>
        {error && <FormError className="text-center">{error}</FormError>}
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 mt-5"
        >
          <div>
            <InputLabel htmlFor="username" required>
              Username
            </InputLabel>
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
            <InputLabel htmlFor="email" required>
              Email
            </InputLabel>
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
            <InputLabel htmlFor="password" required>
              Password
            </InputLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <FormError>{formik.errors.password}</FormError>
            )}
          </div>

          <Button type="submit">Sign Up</Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
