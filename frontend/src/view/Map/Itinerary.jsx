import React, { useState } from "react";
import { Form, Button, DatePicker, TimePicker, Switch, Select, Drawer, List, Typography, Collapse, Space, Card } from "antd";
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const { Panel } = Collapse;
const { Option } = Select;
const { Text, Title } = Typography;


const Itinerary = ({ setItinerary }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [itineraryList, setItineraryList] = useState([]);
    const [displayRoute, setDisplayRoute] = useState(false); // 1. Add state variable

    const onFinish = (values) => {
        setItinerary(values);
        setDisplayRoute(values.displayRoute); // 2. Update displayRoute state
        if (values.markers === "top20") {
          generateItinerary([values.startEndHour[0].hour(), values.startEndHour[1].hour()], values.dateRange);
            setVisible(true);
        }
    };

    const generateItinerary = (startEndHour, dateRange) => {
        const totalHoursInDay = startEndHour[1] - startEndHour[0];
        const hoursPerAttraction = 2; // 2 hours per attraction
        let itinerary = [];

        let currentDay = dateRange[0];
        let currentHour = startEndHour[0];

        tourStops.forEach((stop, index) => {
            if (currentHour + hoursPerAttraction > startEndHour[1]) {
                // move to next day
                currentDay = currentDay.add(1, 'days');
                currentHour = startEndHour[0];
            }

            let visitStart = currentDay.clone().hour(currentHour).minute(0);
            let visitEnd = currentDay.clone().hour(currentHour + hoursPerAttraction).minute(0);


            itinerary.push({
                key: index,
                time: `${visitStart.format('HH:mm')} - ${visitEnd.format('HH:mm')}`,
                title: stop.title,
                date: currentDay.format('YYYY-MM-DD'),
            });

            currentHour += hoursPerAttraction;
        });

        setItineraryList(itinerary);
    }

    const itineraryByDay = itineraryList.reduce((acc, curr) => {
      (acc[curr["date"]] = acc[curr["date"]] || []).push(curr);
      return acc;
    }, {});

    // Top 20 attractions Markers
const tourStops = [
  {
    position: { lat: 40.764908, lng: -73.974146 },
    title: "Central Park",
    placeId: "ChIJ4zGFAZpYwokRGUGph3Mf37k",
  },
  {
    position: { lat: 40.758895, lng: -73.985131 },
    title: "Times Square",
    placeId: "ChIJmQJIxlVYwokRLgeuocVOGVU",
  },
  {
    position: { lat: 40.748817, lng: -73.985428 },
    title: "Empire State Building",
    placeId: "ChIJtcaxrqlZwokRfwmmibzPsTU",
  },
  {
    position: { lat: 40.779437, lng: -73.963244 },
    title: "The Metropolitan Museum of Art",
    placeId: "ChIJb8Jg9pZYwokR-qHGtvSkLzs",
  },
  {
    position: { lat: 40.759012, lng: -73.984472 },
    title: "Broadway",
    placeId: "ChIJEcHIDhZYwokRSlKSVPyxiBw",
  },
  {
    position: { lat: 40.689249, lng: -74.0445 },
    title: "Statue of Liberty",
    placeId: "ChIJPTacEpBQwokRKwIlDXelxkA",
  },
  {
    position: { lat: 40.75874, lng: -73.978674 },
    title: "Rockefeller Center",
    placeId: "ChIJtcaxrqlZwokRfwmmibzPsTU",
  },
  {
    position: { lat: 40.747936, lng: -74.004721 },
    title: "The High Line",
    placeId: "ChIJ5bQPhMdZwokRkTwKhVxhP1g",
  },
  {
    position: { lat: 40.752726, lng: -73.977229 },
    title: "Grand Central Terminal",
    placeId: "ChIJPbfh-GFZwokRY7R5SP6jN8Q",
  },
  {
    position: { lat: 40.71151, lng: -74.013324 },
    title: "9/11 Memorial and Museum",
    placeId: "ChIJO8X04x9awokRbUf-DOIkH0M",
  },
  {
    position: { lat: 40.761432, lng: -73.977622 },
    title: "Museum of Modern Art (MoMA)",
    placeId: "ChIJk9CrWVZYwokRX9f9Va2bCjI",
  },
  {
    position: { lat: 40.753584, lng: -73.983154 },
    title: "Bryant Park",
    placeId: "ChIJPTacEpBQwokRKwIlDXelxkA",
  },
  {
    position: { lat: 40.74227, lng: -74.006005 },
    title: "Chelsea Market",
    placeId: "ChIJS4bhd4pZwokRklWtP1Rjz_c",
  },
  {
    position: { lat: 40.741092, lng: -73.989663 },
    title: "Flatiron Building",
    placeId: "ChIJPZJr8JRZwokRtA1xYPL9HXo",
  },
  {
    position: { lat: 40.758662, lng: -73.976356 },
    title: "St. Patrick's Cathedral",
    placeId: "ChIJHRvONp9YwokRG9y-w1xW3r8",
  },
  {
    position: { lat: 40.781324, lng: -73.973988 },
    title: "American Museum of Natural History",
    placeId: "ChIJh8VHZYJYwokRL1UEkbo1b1k",
  },
  {
    position: { lat: 40.77143, lng: -73.967904 },
    title: "The Frick Collection",
    placeId: "ChIJ20gXTflYwokRv_zwfh_OrMo",
  },
  {
    position: { lat: 40.730873, lng: -73.99733 },
    title: "Washington Square Park",
    placeId: "ChIJARj8xyBZwokR8hg3zkVcnEA",
  },
  {
    position: { lat: 40.706935, lng: -74.011013 },
    title: "Wall Street and the Financial District",
    placeId: "ChIJvUfDoZJawokR0J3mF4glKfs",
  },
  {
    position: { lat: 40.758739, lng: -73.978808 },
    title: "Top of the Rock Observation Deck",
    placeId: "ChIJPbfh-GFZwokRY7R5SP6jN8Q",
  },
];

return (
  <div>
      
      <Card style={{ textAlign: "center", width: "100%", borderRadius: "15px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header={<span style={{ fontWeight: "bold" }}>Itinerary Generator</span>} key="1">
          <Form
            form={form}
            name="itinerary"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ itinerary: "" }}
            style={{ marginBottom: '10px' }}
          >
              <Form.Item
                  name="dateRange"
                  label="Start and End Date"
                  rules={[{ required: true, message: 'Please input your date range!' }]}
              >
                  <DatePicker.RangePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
                  name="startEndHour"
                  label="Visting Hours"
                  rules={[{ required: true, message: 'Please select the start and end hour!' }]}
              >
                  <TimePicker.RangePicker format="HH" />
              </Form.Item>
              <Form.Item
                  name="busyness"
                  label="Preferred Busyness"
                  rules={[{ required: true, message: 'Please select your preferred busyness!' }]}
              >
                  <Select placeholder="Select a level">
                      <Option value="veryLow">Very Low</Option>
                      <Option value="low">Low</Option>
                      <Option value="medium">Medium</Option>
                      <Option value="high">High</Option>
                      <Option value="veryHigh">Very High</Option>
                  </Select>
              </Form.Item>
              
              <Form.Item
                  name="markers"
                  label="Markers for Itinerary"
                  rules={[{ required: true, message: 'Please select markers for your itinerary!' }]}
              >
                  <Select placeholder="Select a type">
                      <Option value="top20">Top 20</Option>
                      <Option value="saved">Saved</Option>
                  </Select>
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      Generate Itinerary
                  </Button>
              </Form.Item>
          </Form>
          </Panel>
          </Collapse>
          <Drawer
              title="Your Itinerary"
              placement="bottom"
              closable={false}
              onClose={() => setVisible(false)}
              open={visible}
              height={500}
          >
              <Collapse accordion>
                  {Object.keys(itineraryByDay).map(date => (
                      <Panel header={date} key={date}>
                          {itineraryByDay[date].map((item, index) => (
                              <List.Item>
                                  <Space direction="vertical">
                                      <Text strong>{item.time}</Text>
                                      <Text> - Visit {item.title}</Text>
                                  </Space>
                              </List.Item>
                          ))}
                      </Panel>
                  ))}
              </Collapse>
          </Drawer>
      </Card>
  </div>
);
};

export default Itinerary;