import "./header.scss";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";
import { useEffect, useState } from "react";
export default function Header() {
  const [title, setTitle] = useState("");
  useEffect(() => {
    PubSub.subscribe("getData", (name, data) => {
      setTitle(data);
    });
  }, []);
  return (
    <header className="header">
      <div className={title.title1 === "BUSY" ? "text" : "text1"}>
        <div className="top">{title.title1}</div>
        <div className="bottom">{title.title2}</div>
      </div>

      <div className="menu">
        <Link to={"/home"}>Home</Link>
        <Link to={"/placerecommenclation"}>Place recommenclation</Link>
        <Link to={"/destinationBusyness"}>Destination Busyness</Link>
        <Link to={"/userProfile"}>User Profile</Link>
        <Link to={"/map"}>Map Page</Link>
        <Link to={"/login"}>Login/Regsiter</Link>
      </div>
    </header>
  );
}
