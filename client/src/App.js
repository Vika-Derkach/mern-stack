import "materialize-css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import useAuth from "./hooks/auth.hook";
import useRoutes from "./routes";
function App() {
  const { token, login, logout, userId } = useAuth();
  const isAthenteficated = !!token;
  const routes = useRoutes(isAthenteficated);
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAthenteficated }}
    >
      <Router>
        {isAthenteficated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
