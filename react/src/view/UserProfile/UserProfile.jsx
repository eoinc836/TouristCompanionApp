import React from 'react';
import { Tabs, Card, Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './UserProfile.scss';

const UserPage = () => {
  const list = [
    { id: 1, label: "User Information" },
    { id: 2, label: "Saved Places" },
    { id: 3, label: "Browsing History" },
    { id: 4, label: "Settings" },
  ];

  return (
    <div className="user-page">
      <Tabs tabPosition="left" style={{ height: '100%' }}>
        {list.map(item => (
          <Tabs.TabPane key={item.id} tab={item.label}>
            <Card className="tab-content" style={{ height: '100%' }}>
              {item.id === 1 && (
                <div className="user-information">
                  <Avatar size={100} icon={<UserOutlined />} />
                  <div className="user-details">
                    <div className="username">John Doe</div>
                    <div className="email">john.doe@example.com</div>
                    <div className="info-item">Gender: Male</div>
                    <div className="info-item">Phone: 1234567890</div>
                  </div>
                </div>
              )}
              {item.id === 2 && (
                <div className="saved-places">
                  <List
                    dataSource={['Place 1', 'Place 2', 'Place 3']}
                    renderItem={place => (
                      <List.Item>{place}</List.Item>
                    )}
                  />
                </div>
              )}
              {item.id === 3 && (
                <div className="browsing-history">
                  <List
                    dataSource={['Page 1', 'Page 2', 'Page 3']}
                    renderItem={page => (
                      <List.Item>{page}</List.Item>
                    )}
                  />
                </div>
              )}
              {item.id === 4 && (
                <ul className="settings">
                  <li>Update profile information</li>
                  <li>Change Account Setting</li>
                  <li>Manage Privacy Setting</li>
                  <li>Customize the User Experience</li>
                </ul>
              )}
            </Card>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default UserPage;
