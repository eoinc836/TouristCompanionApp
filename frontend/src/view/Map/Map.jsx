import React, { useState, useEffect } from "react";
import { Button, ListGroup, Dropdown, Card } from "react-bootstrap";
import CardListComponent from "./CardListComponent";
import "./Map.scss";
import Example from "./DestinationChart";
import { Form, Input } from "antd";

const MapPage = () => {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const toggleLeftDrawer = () => {
    setShowLeftDrawer(!showLeftDrawer);
  };

  const toggleRightDrawer = () => {
    setShowRightDrawer(!showRightDrawer);
  };

  const handleFilterSelection = (filterKey) => {
    if (selectedFilters.includes(filterKey)) {
      setSelectedFilters(selectedFilters.filter((key) => key !== filterKey));
    } else {
      setSelectedFilters([...selectedFilters, filterKey]);
    }
  };

  const handleFilterCollapse = (event, filterKey) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    const index = selectedFilters.indexOf(filterKey);
    if (index > -1) {
      setSelectedFilters(selectedFilters.filter((key) => key !== filterKey));
    } else {
      setSelectedFilters([...selectedFilters, filterKey]);
    }
  };

  const handleParentFilterClick = (filterKey) => {
    handleFilterCollapse(filterKey);
  };

  const handleChildFilterClick = (event, filterKey) => {
    handleFilterCollapse(event, filterKey);
  };

  const handleSearch = () => {
    // Perform search based on selected filters
    console.log("Selected Filters:", selectedFilters);

    // Mocking search results
    const mockSearchResults = [
      {
        id: 1,
        title: "Result 1",
        description: "Description 1",
        img: "image1.jpg",
      },
      {
        id: 2,
        title: "Result 2",
        description: "Description 2",
        img: "image2.jpg",
      },
      {
        id: 3,
        title: "Result 3",
        description: "Description 3",
        img: "image3.jpg",
      },
    ];

    setSearchResults(mockSearchResults);
    setShowChart(true);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&callback=initMap`;
    script.async = true;
    window.initMap = function () {
      new window.google.maps.Map(document.getElementById("Map"), {
        center: { lat: 40.7831, lng: -73.9712 }, // Coordinates of Manhattan
        zoom: 13,
      });
    };
    document.head.appendChild(script);
  }, []);

  const [showChart, setShowChart] = useState(false);

  const filterData = [
    {
      title: "Filter",
      key: "0",
      children: [
        {
          title: "Time",
          key: "0-0",
          children: [
            {
              title: "Morning",
              key: "0-0-0",
            },
            {
              title: "Afternoon",
              key: "0-0-1",
            },
            {
              title: "Evening",
              key: "0-0-2",
            },
            {
              title: "Night",
              key: "0-0-3",
            },
            {
              title: "All day",
              key: "0-0-4",
            },
          ],
        },
        {
          title: "Location",
          key: "0-1",
          children: [
            {
              title: "Location 1",
              key: "0-1-0",
            },
            {
              title: "Location 2",
              key: "0-1-1",
            },
            {
              title: "Location 3",
              key: "0-1-2",
            },
          ],
        },
        {
          title: "Busyness Preference",
          key: "0-2",
          children: [
            {
              title: "Quiet",
              key: "0-2-0",
            },
            {
              title: "Moderate",
              key: "0-2-1",
            },
            {
              title: "Busy",
              key: "0-2-2",
            },
            {
              title: "Very busy",
              key: "0-2-3",
            },
          ],
        },
        {
          title: "Place Type",
          key: "0-3",
          children
          : [
            {
              title: "Restaurant",
              key: "0-3-0",
            },
            {
              title: "Cafe",
              key: "0-3-1",
            },
            {
              title: "Park",
              key: "0-3-2",
            },
            {
              title: "Museum",
              key: "0-3-3",
            },
            {
              title: "Shopping mall",
              key: "0-3-4",
            },
            {
              title: "Theater",
              key: "0-3-5",
            },
            {
              title: "Historical site",
              key: "0-3-6",
            },
            {
              title: "Art gallery",
              key: "0-3-7",
            },
            {
              title: "Nightclub",
              key: "0-3-8",
            },
            {
              title: "Sports stadium",
              key: "0-3-9",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="map-page">
      {/* Left drawer button */}
      <Button variant="primary" onClick={toggleLeftDrawer} className="me-3">
        Place Recommendation
      </Button>

      {/* Right drawer button */}
      <Button variant="primary" onClick={toggleRightDrawer} className="me-3">
        Destination Busyness
      </Button>

      {/* Left drawer */}
      <div
        className={`offcanvas offcanvas-start${showLeftDrawer ? " show" : ""}`}
        tabIndex="-1"
        id="leftDrawer"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title">Place Recommendation</h4>
          <button
            type="button"
            className="btn-close"
            onClick={toggleLeftDrawer}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ListGroup>
            {filterData.map((filter) => (
              <ListGroup.Item
                key={filter.key}
                onClick={() => handleParentFilterClick(filter.key)}
              >
                <Dropdown>
                  <Dropdown.Toggle variant="light" id={`filter-${filter.key}`}>
                    {filter.title}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filter.children &&
                      filter.children.map((child) => (
                        <Dropdown.Item
                          key={child.key}
                          onClick={(event) =>
                            handleChildFilterClick(event, child.key)
                          }
                        >
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              id={`filter-${child.key}`}
                            >
                              {child.title}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {child.children &&
                                child.children.map((grandChild) => (
                                  <Dropdown.Item key={grandChild.key}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={grandChild.key}
                                        checked={selectedFilters.includes(
                                          grandChild.key
                                        )}
                                        onChange={() =>
                                          handleFilterSelection(grandChild.key)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={grandChild.key}
                                      >
                                        {grandChild.title}
                                      </label>
                                    </div>
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="text-end mt-3">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
          {searchResults.length > 0 && showLeftDrawer && (
            <div className="card-list-container">
              <CardListComponent cards={searchResults} />
            </div>
          )}
        </div>
      </div>

      {/* Right drawer */}
      <div
        className={`offcanvas offcanvas-end${showRightDrawer ? " show" : ""}`}
        tabIndex="-1"
        id="rightDrawer"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title">Destination Busyness</h4>
          <button
            type="button"
            className="btn-close"
            onClick={toggleRightDrawer}
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* Add input fields */}
          <div className="input-group mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-destination"
            >
              Destination
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-destination"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-time">
              Time
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-time"
            />
          </div>

          {/* Add search button */}
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>

          {showChart && (
            <div
              className="overflow-auto"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              <ListGroup>
                {searchResults.map((result, index) => (
                  <ListGroup.Item key={index}>
                    <Example data={result.busynessData} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </div>
      </div>

      {/* Google Map */}
      <div
        id="Map"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      ></div>
    </div>
  );
};

export default MapPage;
