import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListFilme from "./components/ListFilme";
import AddFilme from "./components/AddFilme";
import EditFilme from "./components/EditFilme";
import Footer from "./components/common/Footer";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Verificar a validade do token
      const decodedToken = jwt_decode(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
      } else {
        // Token expirado, fazer logout
        handleLogout();
      }
    }
  }, []);

  const PrivateRoute = ({ element, path }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    return <Route path={path} element={element} />;
  };

  const handleLogin = (token) => {
    // Armazenar o token no localStorage
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remover o token do localStorage e fazer logout
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <PrivateRoute path="/list" element={<ListFilme />} />
          <PrivateRoute path="/add" element={<AddFilme />} />
          <PrivateRoute path="/edit/:id" element={<EditFilme />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
