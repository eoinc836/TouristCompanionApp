import React, { useRef, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import * as echarts from "echarts";
import "./DestinationBusyness.scss";
import PubSub from 'pubsub-js'
export default function DestinationBusyness() {
  useEffect(() => {
    PubSub.publish("getData", {title1:'Destination',title2:'Busyness'});
  }, []);
  const chartsNode = useRef(null);
  const [search, setSearch] = useState(false);
  const onFinish = () => {
    setSearch(true);
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
    const mayCharts = chartsNode.current && echarts.init(chartsNode.current);
    mayCharts && mayCharts.setOption(option);
  };
  return (
    <div className="DestinationBusyness">
      {search ? (
        <div className="bottom">
          <div className="desc">
            <div>Destination:'123'</div>
            <div>Time:'22121'</div>
          </div>

          <div className="Echart" ref={chartsNode}></div>
        </div>
      ) : (
        <div className="top">
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 2 }}
              label="Destination "
              name="Destination "
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 2 }}
              label="Time"
              name="Time"
              rules={[{ required: true, message: "Please input your Email!" }]}
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
      )}
    </div>
  );
}
