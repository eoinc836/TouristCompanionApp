import { Link, useNavigate, NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./header.scss";
import { useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  var [isLoggedIn, setIsLoggedIn] = useState(false); // Default user is not logged in
  var location = useLocation();
  isLoggedIn = new URLSearchParams(location.search).get("loggedIn");

  const accessToken = sessionStorage.getItem("accessToken"); // Use sessionStorage here
  const isLoggedInBool = !!accessToken; // Set to true if accessToken exists, otherwise false
  console.log('is logged in value in header file: ', isLoggedInBool);

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('accessToken'); 
    sessionStorage.removeItem('username'); 
    navigate("/login");
  };
  
  // Custom function to determine if the "Home" link should be considered active
  const isHomeLinkActive = (match, location) => {
    return location.pathname === "/" || (location.pathname === "/home" && isLoggedInBool);
  };



  return (
    <header className="py-3 text-center">
      <div className="row header-style">
        <div className="col d-flex logo-container-style align-items-center ">
          <Link
            to="/"
            className="d-inline-flex justify-content-center align-items-center link-body-emphasis text-decoration-none fs-26 font-weight-bold logo-style"
          >
            <img
              src={require("../assets/logo.jpg")}
              alt="Login"
              width="66px"
              height="68px"
              className="img-style"
            />
            BUSYBUDDY
          </Link>
        </div>
<nav className="col d-flex align-items-center justify-content-center nav-style">
  <ul className="nav justify-content-center">
    <li className="nav-item">
      <NavLink
        exact
        to="/"
        className="nav-link link-secondary"
        activeClassName="active"
        isActive={isHomeLinkActive}
        style={{ color: "#45656C" }} // ??????? #45656C
      >
        Home
      </NavLink>
    </li>
    {isLoggedInBool ? (
    <li className="nav-item">
      <NavLink
        to="/map"
        className="nav-link"
        activeClassName="active"
        style={{ color: "#45656C" }} // ??????? #45656C
      >
        Map
      </NavLink>
    </li>) : (
              <>
              </>
            )}
  </ul>
</nav>


        <div className="col d-flex justify-content-center align-items-center  custom-buttons">
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
            {isLoggedInBool ? (
              <button onClick={handleLogout}  className="btn btn-primary me-2">
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
