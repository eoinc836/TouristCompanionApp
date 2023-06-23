import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Map.scss";
import PubSub from "pubsub-js";

export default function Map() {
  useEffect(() => {
    PubSub.publish("getData", { title1: "Map", title2: "Page" });
  }, []);
  const navigate = useNavigate();
  const onFinish = () => {
    navigate("/");
  };
  return (
    <div className="Map">
      <div className="left">
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            labelCol={{ span: 8 }}
            label="Departure "
            name="Departure "
            rules={[
              { required: true, message: "Please input your Departure !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            label="Destination "
            name="Destination "
            rules={[
              { required: true, message: "Please input your Destination !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Search
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
