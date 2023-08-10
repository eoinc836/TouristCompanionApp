import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./header.scss";
import ToggleSwitch from './ToggleSwitch';
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.background};
`;

export default function Header({ darkMode, onToggle }) {
  //console.log("dark mode in header is: ", darkMode);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  //isLoggedIn = new URLSearchParams(location.search).get("loggedIn");
  const [username, setUsername] = useState("");


  const accessToken = sessionStorage.getItem("accessToken");
  const isLoggedInBool = !!accessToken; // Set to true if accessToken exists, otherwise false
  //console.log('is logged in value in header file: ', isLoggedInBool);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  useEffect(() => {
    const isMapLinkActive = location.pathname === '/map';

    if (isMapLinkActive && location.search !== `?darkMode=${darkMode}`) {
      navigate({ pathname: '/map', search: `?darkMode=${darkMode}` });
    }
  }, [darkMode, navigate, location]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    <HeaderContainer>
      {/*  <header className={`py-3 text-center`}>*/}
      <div className="row header-style">
        <div className="col d-flex logo-container-style align-items-center ">
          <Link
            to="/" style={{ fontFamily: 'Federal Service, sans-serif' }}
            className="d-inline-flex justify-content-center align-items-center text-decoration-none fs-26 font-weight-bold logo-style"
          >
            <img
              src={require("../assets/logo.jpg")}
              alt="Login"
              width="70px"
              height="72px"
              className="img-style"
               style={{ marginLeft: '20px' }}
            />
            BUSYBUDDY
          </Link>
        </div>
        <nav className="col d-flex align-items-center justify-content-center nav-style">
          <ul className="nav justify-content-center">
            <li className="nav-item" id="home">
              <NavLink
                to="/"
                className="nav-link link-secondary"
                activeclassname="active"
                isActive={isHomeLinkActive}
                style={{ color: "#45656C", fontSize: "20px" }}
              >
                Home
              </NavLink>
            </li>
            {isLoggedInBool ? (
              <li className="nav-item" id="map">
                <NavLink
                  to={"/map?darkMode=" + darkMode}
                  className="nav-link"
                  activeclassname="active"
                  style={{ color: "#45656C", fontSize: "20px" }}
                  darkMode={darkMode}
                >
                  Map
                </NavLink>
              </li>) : (
              <>
              </>
            )}
            <li className="nav-item" id="highlights">
              <NavLink
                to="/topattractions"
                className="nav-link link-secondary"
                activeclassname="active"
                style={{ color: "#45656C", fontSize: "20px" }}
              >
                NYC Highlights
              </NavLink>
            </li>
          </ul>
        </nav>


        <div className="col d-flex justify-content-left align-items-center  custom-buttons">
          <div className="d-flex justify-content-md-end">
            {/* Display "Login" or "Logout" button based on the login status */}
            {isLoggedInBool ? (
              <>
                <span style={{ marginRight: "20px", fontFamily: "Segoe UI", fontSize: "20px", color: "grey" }}>Hello {capitalizeFirstLetter(username)}</span>
                <button onClick={handleLogout} className="btn btn-primary me-2">
                  Logout
                </button>
              </>
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
           <div style={{ fontFamily: 'HappHearty, sans-serif', textAlign: 'center' }}>
          <ToggleSwitch darkMode={darkMode} onToggle={onToggle} />
        </div>
        </div>
      </div>
      {/*} </header> */}
    </HeaderContainer>
  );
};

