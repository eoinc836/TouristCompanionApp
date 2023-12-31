import React, { useState } from "react";
import "./Home.scss";
import ZapierEmbed from './ZapierEmbed'; 

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  const nextCarouselItem = () => {
    setActiveCarouselItem((prevItem) => (prevItem + 1) % totalCarouselItems);
  };

  const totalCarouselItems = 3;

  return (
    <div className="custom-background">
    <div className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}>
                <button onClick={toggleChatbot} className="transparent-button">
                  <img src={require("../../assets/chatbot.png")} alt="Chatbot" style={{ maxWidth: "30px", maxHeight: "30px" }}
                    title="Ask Me Anything About New York"
                  />

                </button>
                {isChatbotOpen && <ZapierEmbed pageId="cll4zocco131960omgcfmdy4qx" />}
              </div>
      <div className="carousel-container">
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" >

        <div className="carousel-inner">
          <div className={`carousel-item ${activeCarouselItem === 0 ? 'active' : ''}`}>
            <img
              src={require("../../assets/manhattan2.jpg")}
              className="d-block mx-auto"
               style={{ maxWidth: "100%", maxHeight: "100%", height: "75vh" }}
              alt="Slide 1"
            />
            <div className="container">
            <div className="carousel-caption text-start">
    
                <h1>Unlocking Manhattan's Marvels</h1>
                <h5>Your Ultimate Guide to Exploring New York with BusyBuddy</h5>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeCarouselItem === 1 ? 'active' : ''}`}>
            <img
              src={require("../../assets/manhattan1.jpg")}
              className="d-block mx-auto"
             style={{ maxWidth: "100%", maxHeight: "100%", height: "75vh" }}
              alt="Slide 2"
            />
            <div className="container">
              <div className="carousel-caption">
              <h1>Discover the Iconic Beauty of Manhattan</h1>
                <h5>Experience the Pulse of New York City</h5>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeCarouselItem === 2 ? 'active' : ''}`}>
            <img
              src={require("../../assets/manhattan3.jpg")}
              className="d-block mx-auto"
               style={{ maxWidth: "100%", maxHeight: "100%", height: "75vh" }}
              alt="Slide 3"
            />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1> Manhattan Unveiled</h1>
                <h5>Your Trusted Companion for Navigating New York's Vibrant Heart with BusyBuddy</h5>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          //data-bs-slide="prev"
          onClick={nextCarouselItem}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          //data-bs-slide="next"
          onClick={nextCarouselItem}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container marketing">
        <div className="row">
          <div className="col-lg-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-houses"
              viewBox="0 0 16 16"
            >
              <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708L5.793 1Zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207l-4.5-4.5Z" />
            </svg>
            <h2>Venue Recommendation</h2>
            <p>Find venues based on attraction type, proximity, busyness, and more</p>
          </div>
          <div className="col-lg-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-graph-up-arrow"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
            <h2>Destination Busyness</h2>
            <p>Get insights about your favorite venue</p>
          </div>
          <div className="col-lg-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              className="bi bi-pin-map"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
              />
              <path
                fillRule="evenodd"
                d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
              />
            </svg>
            <h2>BusyBuddy Map</h2>
            <p>Explore BusyBuddy's features using our interactive map</p>
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
            Navigate Manhattan: Uncover Hidden Gems and Urban Treasures
            </h2>
            <p className="lead">
            Embark on a journey through Manhattan's vibrant streets and avenues, guided by BusyBuddy. Explore iconic landmarks, hidden gems, and the pulse of the city, all at your fingertips.
            </p>
          </div>
          <div className="col-md-5">
            <div className="col-md-5 order-md-1">
              <img
                src={require("../../assets/manhattancity.jpg")}
                alt="Manhattan City"
                width={380}
                height={300}
                 style={{ marginBottom: '70px' }}
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading fw-normal lh-1 ">
              Culinary Discovery in Manhattan: Experience Unparalleled Flavors
              </h2>
              <p className="lead">
              Dive into the culinary riches of Manhattan with BusyBuddy. Delight in a range of tastes, from street food to fine dining, as you explore the city's vibrant gastronomic landscape.
              </p>
            </div>
            <div className="col-md-5 order-md-1 ">
              <img
                src={require("../../assets/manhattanfood.jpg")}
                alt="Manhattan Food"
                width={380}
                height={300}
                 style={{ marginBottom: '70px' }}
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading fw-normal lh-1 ">
              Artistic Enchantment in Manhattan: Immerse Yourself in Cultural Grandeur
              </h2>
              <p className="lead">
              Delve into the cultural marvels of Manhattan with BusyBuddy. Encounter world-renowned museums, theaters, and artistic havens. Immerse yourself in the city's artistic tapestry, and let its cultural richness inspire your soul.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                src={require("../../assets/manhattanculture.jpg")}
                alt="Manhattan Culture"
                width={380}
                height={300}
                 style={{ marginBottom: '40px' }}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
);
};

export default Home;





