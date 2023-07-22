import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./header.scss";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default user is not logged in

  // Handle the event when the user clicks the "Logout" button
  const handleLogout = () => {
    // Perform your logout operation, such as clearing user credentials, etc.

    // Update the login status to false
    setIsLoggedIn(false);
  };

  return (
    <header className="py-3">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img
              src={require("../assets/login.jpg")}
              alt="Login"
              width="50"
              height="40"
            />
          </Link>
        </div>

        <nav className="col-12 col-md-auto mb-2">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link to="/" className="nav-link link-secondary">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/map" className="nav-link">
                Map Page
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-12 col-md-3 text-md-end custom-buttons">
          <div className="d-flex justify-content-md-end">
            <Link to="/Userprofile" className="btn btn-link me-2">
              {/* User profile icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>

            {/* Display "Login" or "Logout" button based on the login status */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-primary me-2">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
