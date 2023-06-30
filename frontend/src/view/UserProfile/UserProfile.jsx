import React, { useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import "./UserProfile.scss";
import PubSub from "pubsub-js";

export default function UserProfile() {
  useEffect(() => {
    PubSub.publish("getData", { title1: "User", title2: "Profile" });
  }, []);
  const list = [
    { id: 1, label: "User Information" },
    { id: 2, label: " Saved Placed" },
    { id: 3, label: "Browsing History" },
    { id: 4, label: "Setting" },
  ];
  const [current, setCurrent] = useState("");
  const handleClick = (v) => {
    console.log(v);
    setCurrent(v.id);
  };
  return (
    <div className="UserProfile">
      <div className="left">
        <Avatar
          size={64}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <p>username</p>
        <ul>
          {list.map((v) => {
            return (
              <li key={v.id} onClick={() => handleClick(v)}>
                {v.label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right">
        <div>
          {current === 1 ? (
            <ul>
              <li>Username :''</li>
              <li>Gender :''</li>
              <li>Birthday :''</li>
              <li>Location :''</li>
              <li>Email :''</li>
            </ul>
          ) : (
            ""
          )}
        </div>
        {current === 2 || current === 3 ? (
          <div className="card">
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        ) : (
          ""
        )}
        <div>
          {current === 4 ? (
            <ul>
              <li>Update profile information</li>
              <li>Change Account Setting</li>
              <li>Manage Privacy Setting</li>
              <li>Customize the User Experience </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
