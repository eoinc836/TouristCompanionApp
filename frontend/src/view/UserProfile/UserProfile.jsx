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
  Checkbox,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import "./UserProfile.scss";
import CardListComponent from "../Map/CardListComponent";
import { Link } from "react-router-dom";
const { Option } = Select;
const { TabPane } = Tabs;

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

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

const savedPlacesData = [
  {
    id: 1,
    title: "Place 1",
    imageSrc: "img/place1.jpg",
    description: "Description for Place 1",
  },
  {
    id: 2,
    title: "Place 2",
    imageSrc: "img/place2.jpg",
    description: "Description for Place 2",
  },
  {
    id: 3,
    title: "Place 3",
    imageSrc: "img/place3.jpg",
    description: "Description for Place 3",
  },
  {
    id: 4,
    title: "Place 4",
    imageSrc: "img/place4.jpg",
    description: "Description for Place 4",
  },
  {
    id: 5,
    title: "Place 5",
    imageSrc: "img/place5.jpg",
    description: "Description for Place 5",
  },
  {
    id: 6,
    title: "Place 6",
    imageSrc: "img/place6.jpg",
    description: "Description for Place 6",
  },
  {
    id: 7,
    title: "Place 7",
    imageSrc: "img/place7.jpg",
    description: "Description for Place 7",
  },
  {
    id: 8,
    title: "Place 8",
    imageSrc: "img/place8.jpg",
    description: "Description for Place 8",
  },
  {
    id: 9,
    title: "Place 9",
    imageSrc: "img/place9.jpg",
    description: "Description for Place 9",
  },
];


  return (
    <section className="py-3 my-3" style={{ height: "100vh" }}>
      <h1 className="mb-5">Account Settings</h1>
      <div className="bg-white shadow rounded-lg d-block d-sm-flex" style={{ height: "100%" }}>
        <div className="profile-tab-nav border-right" >
          <div className="p-4">
            <div className="img-circle text-center mb-3">
              <Avatar size={100} src="img/user2.jpg" alt="Image" />
            </div>
            <h4 className="text-center">User Name</h4>
          </div>
          <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    className="nav flex-column nav-pills custom-tabs"
                    id="v-pills-tab"
                    tabBarStyle={{ borderRight: "none" }}
                    tabPosition="left" // Display tabs vertically on the left
                  >
            <TabPane
              tab={
                <span>
                  <i className="fa fa-home text-center mr-1"></i> User Profile
                </span>
              }
              key="account"
            >
              {/* Account tab content */}
              {/* Add the form elements and content related to the Account tab */}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i className="fa fa-key text-center mr-1"></i> Reset Password
                </span>
              }
              key="password"
            >
              {/* Password tab content */}
              {/* Add the form elements and content related to the Password tab */}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i className="fa fa-user text-center mr-1"></i> Saved Places
                </span>
              }
              key="saved places"
            >
              {/* Saved Places tab content */}
              {/* Add the form elements and content related to the Saved Places tab */}
            </TabPane>
          </Tabs>
        </div>
        <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === "account" ? "show active" : ""
            }`}
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <h3 className="mb-4">User Profile</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gender}
                    onChange={(e) => handleGenderChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>User name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary">Update</button>
              <button className="btn btn-light">Cancel</button>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "password" ? "show active" : ""
            }`}
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <h3 className="mb-4">Password Settings</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Old password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>New password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Confirm new password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary">Update</button>
              <button className="btn btn-light">Cancel</button>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "saved places" ? "show active" : ""
            }`}
            id="saved places"
            role="tabpanel"
            aria-labelledby="saved places-tab"
          >
          <h3 className="mb-4">Saved Places Settings</h3>
                    <List
                      grid={{ gutter: 9, column: 3 }} // Adjust the number of columns as needed
                      dataSource={savedPlacesData}
                      renderItem={(item) => (
                      <List.Item>
                                       <Card
                                         cover={<img alt={item.title} src={item.imageSrc} />}
                                         actions={[
                                           // Use Link instead of Button for navigation
                                           <Link to={`/edit/${item.id}`}><Button type="primary">Navigation </Button></Link>,
                                           <Button danger>Delete</Button>,
                                         ]}
                                       >
                                         <Card.Meta title={item.title} description={item.description} />
                                       </Card>
                                     </List.Item>
                      )}
                    />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
