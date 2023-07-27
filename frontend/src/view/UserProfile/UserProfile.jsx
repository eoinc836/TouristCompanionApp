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

const handleUpdateClick = () => {
    // Handle update logic here
    setIsEditing(false); // After update, set isEditing to false to disable editing mode
  };

  return (
<section class="user-profile-container" style={{ backgroundColor: "#2C3639", color: "#DCD7C9" }}>


      <div className="row" style={{ backgroundColor: "#2C3639", color: "#DCD7C9" }}>
        <div className="col-2 left-container">
          <div className="p-5">
            <div className="img-circle text-center mb-4">
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
             <span style={{ fontSize: "24px", color: "#DCD7C9" }}>
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
             <span style={{ fontSize: "24px", color: "#DCD7C9" }}>
               <i className="fa fa-key text-center mr-1"></i> Reset Password
             </span>
           }
           key="password"
         >
           {/* Password tab content */}
           {/* Add the form elements and content related to the Password tab */}
         </TabPane>


          </Tabs>
        </div>

          <div className="col-8 right-container tab-content p-4 p-md-5" id="v-pills-tabContent" >
          <div
            className={`tab-pane fade ${
              activeTab === "account" ? "show active" : ""
            }`}
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <h2 className="mb-4" >User Profile</h2>
            <div className="row">
             <div className="col-md-8 mx-auto">
                         <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>First Name</label>
                  <input
                    type="text"
                    className="form-control"

                    value={firstName}
                    onChange={handleFirstNameChange}
                     style={{ fontSize: "23px", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-8 mx-auto">
                          <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={handleLastNameChange}
                     style={{ fontSize: "23px", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-md-8 mx-auto">
                          <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                     style={{ fontSize: "23px", width: "100%" }}
                  />
                </div>
              </div>
               <div className="col-md-8 mx-auto">
                           <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Phone number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                     style={{ fontSize: "23px", width: "100%" }}
                  />
                </div>
              </div>
               <div className="col-md-8 mx-auto">
                           <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    value={gender}
                    onChange={(e) => handleGenderChange(e.target.value)}
                     style={{ fontSize: "23px", width: "100%" }}
                  />
                </div>
              </div>
           <div className="col-md-8 mx-auto">
             <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
               <label style={{ fontSize: "23px" }}>User name</label>
               <input
                 type="text"
                 className="form-control"
                 value={username}
                 onChange={handleUsernameChange}
                 style={{ fontSize: "23px", width: "100%" }}
               />
             </div>
           </div>

            </div>
              <div className="text-center">
                               {isEditing ? (
                                 // If in editing mode, show update and cancel buttons
                                <div>
                                  <Button type="primary" size="large" onClick={handleUpdateClick} style={{ marginRight: "10px" }}>
                                    Update
                                  </Button>
                                  <Button size="large" onClick={handleEditClick}>
                                    Cancel
                                  </Button>
                                </div>
                               ) : (
                                 // If not in editing mode, show edit button
                                 <Button size="large" onClick={handleEditClick}>Edit</Button>
                               )}
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
            <h2 className="mb-4">Password Settings</h2>
            <div className="row">
               <div className="col-md-8 mx-auto">
                           <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Old password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mx-auto" >
                          <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>New password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
              <div className="col-md-8 mx-auto">
                          <div className="form-group" style={{ width: "100%", fontSize: "23px" }}>
                  <label style={{ fontSize: "23px" }}>Confirm new password</label>
                  <input type="password" className="form-control" />
                </div>
              </div>
            </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary btn-lg me-2">Update</button>
            <button className="btn btn-light btn-lg">Cancel</button>
          </div>


          </div>
        </div>
        </div>

    </section>
  );
};

export default UserPage;
