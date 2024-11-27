import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center ">
      <h1 className="text-8xl">404</h1>
      <p>The page you&apos;re looking for does not exist.</p>
      <Button onClick={handleRedirectToHome}>Go Back Home</Button>
    </div>
  );
};

export default PageNotFound;
