import React, { useState } from 'react';
import { Layout, Popover, Form, Input, Button } from 'antd';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import "./Map.scss";
const { Content } = Layout;

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 51.5074,
  lng: -0.1278,
};

const MapWithSidebar = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);
    setPopoverVisible(false); // Hide the popover after submitting the form
  };

  const handlePopoverVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };

  const content = (
    <Form name="basic" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Departure"
        name="Departure"
        rules={[{ required: true, message: 'Please input your Departure!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Destination"
        name="Destination"
        rules={[{ required: true, message: 'Please input your Destination!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Layout>
      <Content>
        <LoadScript googleMapsApiKey="AIzaSyCNSp3z6NakRpJX2H_OAUGAs-HIaqc4WbE">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
        </LoadScript>
        <Popover
          content={content}
          visible={popoverVisible}
          onVisibleChange={handlePopoverVisibleChange}
          title="Search"
          trigger="click"
          placement="bottom"
        >
          <Button type="primary" style={{ position: 'absolute', top: 20, left: 20 }}>
            Open Search
          </Button>
        </Popover>
      </Content>
    </Layout>
  );
};

export default MapWithSidebar;
