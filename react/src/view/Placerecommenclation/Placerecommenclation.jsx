import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu, Card, Tree, Typography, Input } from 'antd';
import './Placerecommenclation.scss';

const { Title } = Typography;
const { Sider, Content } = Layout;
const { TreeNode } = Tree;
const { Search } = Input;

const treeData = [
  {
    title: 'Filters',
    key: '0',
    children: [
      {
        title: 'Time',
        key: '0-0',
        children: [
          {
            title: 'Morning',
            key: '0-0-0',
          },
          {
            title: 'Afternoon',
            key: '0-0-1',
          },
          {
            title: 'Evening',
            key: '0-0-2',
          },
          {
            title: 'Night',
            key: '0-0-3',
          },
          {
            title: 'All day',
            key: '0-0-4',
          },
        ],
      },
      {
        title: 'Location',
        key: '0-1',
        children: [
          {
            title: 'Location 1',
            key: '0-1-0',
          },
          {
            title: 'Location 2',
            key: '0-1-1',
          },
          {
            title: 'Location 3',
            key: '0-1-2',
          },
        ],
      },
      {
        title: 'Busyness Preference',
        key: '0-2',
        children: [
          {
            title: 'Quiet',
            key: '0-2-0',
          },
          {
            title: 'Moderate',
            key: '0-2-1',
          },
          {
            title: 'Busy',
            key: '0-2-2',
          },
          {
            title: 'Very busy',
            key: '0-2-3',
          },
        ],
      },
      {
        title: 'Place Type',
        key: '0-3',
        children: [
          {
            title: 'Restaurant',
            key: '0-3-0',
          },
          {
            title: 'Cafe',
            key: '0-3-1',
          },
          {
            title: 'Park',
            key: '0-3-2',
          },
          {
            title: 'Museum',
            key: '0-3-3',
          },
          {
            title: 'Shopping mall',
            key: '0-3-4',
          },
          {
            title: 'Theater',
            key: '0-3-5',
          },
          {
            title: 'Historical site',
            key: '0-3-6',
          },
          {
            title: 'Art gallery',
            key: '0-3-7',
          },
          {
            title: 'Nightclub',
            key: '0-3-8',
          },
          {
            title: 'Sports stadium',
            key: '0-3-9',
          },
        ],
      },
    ],
  },
];

const Placerecommenclation = () => {
  return (
    <div>
      <div className="search-bar">
        <Search placeholder="Search" prefix={<SearchOutlined />} />
      </div>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Tree
            defaultExpandAll
            blockNode
            selectable={false}
            treeData={treeData}
            style={{ padding: '20px' }}
          />
        </Sider>
        <Content className="placerecommenclation">
          <Title level={4} className="title">
            Recommendations
          </Title>
          <div className="card-container">
            <Card className="card">Card 1</Card>
            <Card className="card">Card 2</Card>
            <Card className="card">Card 3</Card>
            <Card className="card">Card 4</Card>
            <Card className="card">Card 5</Card>
            <Card className="card">Card 6</Card>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
export default Placerecommenclation;
