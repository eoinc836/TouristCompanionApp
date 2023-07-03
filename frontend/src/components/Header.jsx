import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import PubSub from "pubsub-js";
import { useEffect, useState } from "react";

export default function Header() {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    PubSub.subscribe("getData", (name, data) => {
      setTitle(data);
    });
  }, []);

  const isHomePage = location.pathname === "/home";

  return (
    <header className="header">
      {isHomePage && (
        <div className={title.title1 === "BUSY" ? "text" : "text1"}>
          <div className="top">{title.title1}</div>
          <div className="bottom">{title.title2}</div>
        </div>
      )}

      <div className="menu">
        <Link to={"/home"}>Home</Link>
        <Link to={"/placerecommendation"}>Place recommenclation</Link>
        <Link to={"/destinationBusyness"}>Destination Busyness</Link>
        <Link to={"/map"}>Map Page</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/userProfile"}>User Profile</Link>
      </div>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/home"}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={location.pathname}>{location.pathname.substr(1)}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </header>
  );
}
