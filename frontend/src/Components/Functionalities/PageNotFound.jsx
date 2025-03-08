import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <h1 className="page-not-found-title">404</h1>
        <p className="page-not-found-message">Oops! Page Not Found</p>
        <p className="page-not-found-description">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button className="page-not-found-button" onClick={handleGoHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;