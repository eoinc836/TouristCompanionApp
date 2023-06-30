import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PubSub from "pubsub-js";

import "./Login.scss";
export default function Login() {
  useEffect(() => {
    PubSub.publish("getData", { title1: "Login", title2: "Regsiter" });
  }, []);
  const navigate = useNavigate();
  const onFinish = () => {
    navigate("/");
  };

  return (
    <div className="Login">
      <div className="left">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            labelCol={{ span: 8 }}
            label="Name"
            name="Name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            label="Email"
            name="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="right">
        <img src={require("../../assets/login.jpg")} alt="" />
      </div>
    </div>
  );
}
