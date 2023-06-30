import { Input, Tree, Card } from "antd";
import { useState,useEffect } from "react";
import PubSub from "pubsub-js";
import "./Placerecommenclation.scss";
const { Search } = Input;
const x = 3;
const y = 2;
const z = 1;
const defaultData = [];
const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || defaultData;
  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({
      key,
      title: key,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export default function Placerecommenclation() {
  useEffect(() => {
    PubSub.publish("getData", { title1: "Place", title2: "Recommenclation" });
  }, []);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  const treeData = [
    {
      title: "Time",
      key: "0-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0",
        },
      ],
    },
    {
      title: "Location",
      key: "1-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0",
        },
      ],
    },
    {
      title: "Busyness Preference",
      key: "2-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0",
        },
      ],
    },
    {
      title: "Place Typ",
      key: "0-0",
      children: [
        {
          title: "leaf",
          key: "0-0-0",
        },
      ],
    },
  ];
  return (
    <div className="place">
      <div className="left">
        <Search
          style={{
            marginBottom: 8,
          }}
          placeholder="Search"
          onChange={onChange}
        />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
        />
      </div>
      <div className="right">
        {searchValue ? (
          <div className="card">
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card
              size="small"
              title="Small size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>
        ) : (
          <img src={require("../../assets/1.png")} alt="" />
        )}
      </div>
    </div>
  );
}
