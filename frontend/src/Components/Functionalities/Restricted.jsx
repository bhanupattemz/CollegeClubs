import React from "react";
import { useNavigate } from "react-router-dom";
import "./Restricted.css"; 

const Restricted = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="restricted-container">
      <div className="restricted-content">
        <h1 className="restricted-title">Access Restricted</h1>
        <p className="restricted-message">
          You do not have permission to view this page.
        </p>
        <p className="restricted-description">
          Please contact the administrator if you believe this is an error.
        </p>
        <button className="restricted-button" onClick={handleGoHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Restricted;