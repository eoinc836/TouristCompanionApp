import React, { useState } from "react";
import {
  Tabs,
  Card,
  Avatar,
  List,
  Button,
  Input,
  Row,
  Col,
  Select,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import "./UserProfile.scss";
import CardListComponent from "../Map/CardListComponent";
const { Option } = Select;

const UserPage = () => {
  const list = [
    { id: 1, label: "User Information" },
    { id: 2, label: "Saved Places" },
    { id: 3, label: "Browsing History" },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("Username");
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("E-mail");
  const [phoneNumber, setPhoneNumber] = useState("Phone Number");
  const [gender, setGender] = useState("Gender");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <div className="user-page">
      <Tabs tabPosition="left" style={{ height: "100%" }}>
        {list.map((item) => (
          <Tabs.TabPane key={item.id} tab={item.label}>
            {item.id === 1 && (
              <Card className="tab-content" style={{ height: "100%" }}>
                <div className="user-information">
                  <Avatar size={100} icon={<UserOutlined />} />
                  <div className="user-details">
                    {isEditing ? (
                      <>
                        <Input
                          value={username}
                          onChange={handleUsernameChange}
                        />
                      </>
                    ) : (
                      <>
                        <div className="username">{username}</div>
                      </>
                    )}
                  </div>
                  <div className="edit-button-container">
                    <Button onClick={handleEditClick}>
                      {isEditing ? "Cancel" : <EditOutlined />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </div>
                <div className="card-container">
                  <Card title="My Profile" className="my-profile-card">
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Input
                          value={firstName}
                          onChange={handleFirstNameChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "100px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          value={lastName}
                          onChange={handleLastNameChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "100px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          value={email}
                          onChange={handleEmailChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "100px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "100px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          value={gender}
                          onChange={handleGenderChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "50px" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          value={username}
                          onChange={handleUsernameChange}
                          disabled={!isEditing}
                          style={{ height: "100px", marginBottom: "50px" }}
                        />
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Card>
            )}
            {item.id === 2 && (
              <Card className="tab-content" style={{ height: "100vh" }}>
                <div className="saved-places">
                  <CardListComponent />
                </div>
              </Card>
            )}

            {item.id === 3 && (
              <Card className="tab-content" style={{ height: "100vh" }}>
                <div className="browsing-history">
                  <CardListComponent />
                </div>
              </Card>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default UserPage;
