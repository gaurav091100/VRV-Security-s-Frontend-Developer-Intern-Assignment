import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/authService";
import Button from "../UI/Button";
import Input from "../UI/Input";
import FormError from "../UI/FormError";
import InputLabel from "../UI/InputLabel";
import { generateToken } from "../../utils/helper";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


const Login = () => {
 
  const [error, setError] = useState("");

  const onSubmit = async (values, { resetForm }) => {
    try {
      const user = await loginUser(values.email, values.password);
      
      if(user?.role === "USER"){
       throw new Error("You are not authorized");
      
      }else{

      const token = generateToken(user);  

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);  

      window.location.href = "/";
      resetForm();
      }

    } catch (err) {
      setError(err.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[60vh] w-[80vw] md:w-[50vw] lg:w-[25vw] bg-white p-6 rounded-md relative">
        <h3 className="text-2xl md:text-3xl lg:text-4xl mb-4 font-semibold text-center">
          Login
        </h3>
        {error && <FormError className="text-center">{error}</FormError>}
        <form
          className="flex flex-col gap-3 mt-5"
          onSubmit={formik.handleSubmit}
        >
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

          <Button
            type="submit"
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          >
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
