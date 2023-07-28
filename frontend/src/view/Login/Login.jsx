import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import axios from "axios"; // Import the axios library

import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    // Send login request to the backend
    const csrftoken = getCookie("csrftoken");
    axios
  .post("http://localhost:8000/api/login", {
    username: values.username,
    password: values.password,
  }, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
      .then((response) => {
        // Handle successful response
        console.log("Response:", response.data);
        // Perform appropriate actions, such as setting user identity information, redirecting to other pages, etc.
        navigate("/home"); // Redirect to '/home' page after successful login
      })
      .catch((error) => {
        // Handle error response
        console.error("Error:", error);
      });
  };



  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">BusyBuddy</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#DCD7C9" }}>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <span className="login-form-or" style={{ color: "#DCD7C9" }}>
              Or{" "}
              <Link to="/register" style={{ color: "#DCD7C9" }}>
                register now!
              </Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default Login;
