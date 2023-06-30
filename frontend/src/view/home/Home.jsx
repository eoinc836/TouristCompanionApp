import React, { useEffect } from "react";
import { Button } from "antd";
import "./Home.scss";
import PubSub from "pubsub-js";
export default function Home() {
  useEffect(() => {
    PubSub.publish("getData", { title1: "BUSY", title2: "BUDDY" });
  }, []);
  return (
    <div className="home">
      <div className="title">Incredible City Features</div>
      <div className="title_sub">
        <div>
          <div>
            <p> Restaurant Explorer</p>
            <p>Find the perfect cuisine and ambiance for any occasion</p>
          </div>
          <div>
            <p>Busyness Indicator</p>
            <p>Avoid rush hours with our real-time crowding monitor</p>
          </div>
        </div>
        <div>
          <div>
            <p>BusyBuddy Map</p>
            <p>Discover Manhattan: Navigate with Ease, Know Your Distance</p>
          </div>
          <div>
            <p>Events & Entertainment</p>
            <p>Stay updated with the city's dazzling events and happenings</p>
          </div>
        </div>
      </div>

      <div className="img-text">
        <div className="box">
          <div className="text">
            <p className="title">
              Explore the city's finestdining options with ourRestaurant Finder
            </p>
            <p>
              Search based on cuisine, allergy-friendliness,
              seatingavailability, health scores, and eco-friendliness. Chec!out
              menus, read reviews, and book your reservations directly!
            </p>
          </div>
          <img src={require("../../assets/1.png")} alt="" />
        </div>

        <div className="box">
          <img src={require("../../assets/2.png")} alt="" />

          <div className="text">
            <p className="title">
              Experience New York'sculturaland artisticCCUA02101imagination
            </p>
            <p>
              Discover endless possibilities from renownec museums, theaters,
              shopping districts, and recreational hotspots L et yourself be
              enchanted by the city's creative brilliance
            </p>
          </div>
        </div>
      </div>

      <div className="bottom">
        <p>Ready to uncover New</p>
        <p>York's gems on</p>
        <p>BusyBuddy? Dive right in!</p>
      </div>

      <Button
        style={{
          backgroundColor: "#fbf6d7",
          color: "#000",
          borderColor: "#fbf6d7",
          marginRight: "10px",
          marginTop: "50px",
        }}
      >
        Explore Now
      </Button>
      <Button
        style={{
          backgroundColor: "#eebf9f",
          color: "#000",
          borderColor: "#eebf9f",
          marginRight: "10px",
          marginTop: "50px",
        }}
      >
        Join Us
      </Button>

      <footer>2023</footer>
    </div>
  );
}
