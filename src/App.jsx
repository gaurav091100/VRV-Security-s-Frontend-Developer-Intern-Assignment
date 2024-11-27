import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <AllRoutes />
      </div>
    </Router>
  );
};

export default App;
