import {React, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import axios from "axios"; // Import the axios library

import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading state

  const onFinish = async (values) => {
    setLoading(true); // Set loading to true while waiting for the response
    try {
      const loginData = {
        username: values.username,
        password: values.password,
      };

      const csrftoken = getCookie('csrftoken');
      const response = await axios.post('http://localhost:8000/api/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
      });

      console.log('Login Response:', response.data);
      navigate('/home?loggedIn=true'); // Redirect to '/home' page after successful login
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setLoading(false); // Set loading back to false after the request is completed (whether successful or not)
    }
  };



  return (
    <div className="login-container">
      <div className="login-content">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
        <h1 className="login-title">BusyBuddy</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            style={{
              fontSize: "18px", // Adjust the font size
              border: "2px solid #DCD7C9", // Adjust the border size and color
              borderRadius: "8px", // Add rounded corners to the input field
            }}
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
            style={{
              fontSize: "18px", // Adjust the font size
              border: "2px solid #DCD7C9", // Adjust the border size and color
              borderRadius: "8px", // Add rounded corners to the input field
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: "#DCD7C9", fontSize: "18px" }}>
              Remember me
            </Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="" style={{ fontSize: "18px" }}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
         <Button
           type="primary"
           htmlType="submit"
           className="login-form-button"
           style={{
             fontSize: "18px",
             border: "2px solid #DCD7C9",
             backgroundColor: "#627B82",
             borderRadius: "8px",
           }}
         >
           Log in
         </Button>

          <span className="login-form-or" style={{ color: "#DCD7C9", fontSize: "20px" }}>
            Or <Link to="/register" style={{ color: "#DCD7C9", fontSize: "18px" }}>register now!</Link>
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
