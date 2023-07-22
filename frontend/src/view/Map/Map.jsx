import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, Polygon, Data } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Cascader, DatePicker, Select } from "antd";

import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";
import "antd/dist/antd.css";
import "./Map.scss";

const { Option } = Select;

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
const BusyLegend = () => {
  const getColor = (busyness) => {
    if (busyness <= 28) {
      return "#008000"; // Deep Green for very low busyness
    } else if (busyness <= 138) {
      return "#ADFF2F"; // Green Yellow for low busyness
    } else if (busyness <= 536) {
      return "#FFFF00"; // Yellow for medium busyness
    } else if (busyness <= 15000) {
      return "#FFA500"; // Orange for high busyness
    } else {
      return "#FF0000"; // Deep Red for very high busyness
    }
  };

  return (
    <div
      className="busy-legend"
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <div
          className="legend-color"
          style={{
            backgroundColor: getColor(28),
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></div>
        <span>Very Low</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <div
          className="legend-color"
          style={{
            backgroundColor: getColor(138),
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></div>
        <span>Low</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <div
          className="legend-color"
          style={{
            backgroundColor: getColor(536),
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></div>
        <span>Medium</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <div
          className="legend-color"
          style={{
            backgroundColor: getColor(15000),
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></div>
        <span>High</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="legend-color"
          style={{
            backgroundColor: getColor(15001),
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        ></div>
        <span>Very High</span>
      </div>
    </div>
  );
};

const libraries = ["places"];

const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 40.7831,
    lng: -73.9712,
  };

  const zoom = 14;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA",
     libraries: libraries,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [placeDetails, setPlaceDetails] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
 const [predictions, setPredictions] = useState({});
   const [showPrediction, setShowPrediction] = useState(false);
  const [isMarkerHovered, setMarkerHovered] = useState(null);
  const [userMarkers, setUserMarkers] = useState([]);
  const [shouldRemoveMarkers, setShouldRemoveMarkers] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
 const [date, setDate] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [newMarkers, setNewMarkers] = useState([]);

  const mapRef = useRef(null);


  const options = [
    {
      label: "Place Type",
      value: "placeType",
      children: [
        {
          label: "Restaurant",
          value: "restaurant",
        },
        {
          label: "Cafe",
          value: "cafe",
        },
        {
          label: "Park",
          value: "park",
        },
        {
          label: "Museum",
          value: "museum",
        },
        {
          label: "Shopping Mall",
          value: "shopping-mall",
        },
        {
          label: "Theater",
          value: "theater",
        },
        {
          label: "Historical Site",
          value: "historical-site",
        },
        {
          label: "Art Gallery",
          value: "art-gallery",
        },
        {
          label: "Nightclub",
          value: "nightclub",
        },
        {
          label: "Sports Stadium",
          value: "sports-stadium",
        },
      ],
    },
    {
      label: "Busyness Level",
      value: "busynessLevel",
      children: [
        {
          label: "Busy",
          value: "busy",
        },
        {
          label: "Moderate",
          value: "moderate",
        },
        {
          label: "Quiet",
          value: "quiet",
        },
      ],
    },
    {
      label: "Nearby Area",
      value: "nearbyArea",
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };

  useEffect(() => {
    const getPlaceDetails = async (placeId) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&place_id=${placeId}&fields=name,formatted_address,opening_hours`
        );
        const result = response.data;
        setPlaceDetails(result.result);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedMarker) {
      getPlaceDetails(selectedMarker.placeId);
    }
  }, [selectedMarker]);

  useEffect(() => {
    const getWeather = async (lat, lng) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=8c3cf13f8484456f6ede3a06d0a7d674&units=metric`
        );
        const weatherData = response.data;
        setCurrentWeather(weatherData);
      } catch (error) {
        console.error(error);
      }
    };

    const { lat, lng } = center;
    getWeather(lat, lng);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerVisible(true);
  };

  const handleMarkerClose = () => {
    setSelectedMarker(null);
    setDrawerVisible(false);
  };

  const handleMarkerMouseOver = (marker) => {
    setMarkerHovered(marker);
  };

  const handleMarkerMouseOut = () => {
    setMarkerHovered(null);
  };

  const handleDrawerClose = () => {
    setSelectedMarker(null);
    setDrawerVisible(false);
  };

  const handlePredictionToggle = (checked) => {
    setShowPrediction(checked);
  };
  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const position = { lat, lng };
    setUserMarkers([...userMarkers, position]);
    setIsMapClicked(true);
  };



  const userMarkerIcons = {
    purple: {
      url: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      scaledSize: new window.google.maps.Size(40, 40),
    },
  };

  const removeMarkers = () => {
    setShouldRemoveMarkers(true);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };
const format = 'HH'; // The format for time (e.g., "HH:mm")
const map = useRef(null); // Reference to the Google Maps instance
const validZones = [  262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231,
  230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158,
  153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114,
  113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41,
  13, 12, 24, 4 ];

  const getZoneColor = (busyness) => {
    console.log("Busyness Level:", busyness);
    if (busyness === 0 || isNaN(busyness)) {
      return "#F8F8F8"; // Lighter shade of white for no data or invalid busyness value
    } else if (busyness <= 28) {
      return "#008000"; // Deep Green for very low busyness
    } else if (busyness <= 138) {
      return "#ADFF2F"; // Green Yellow for low busyness
    } else if (busyness <= 536) {
      return "#FFFF00"; // Yellow for medium busyness
    } else if (busyness <= 15000) {
      return "#FFA500"; // Orange for high busyness
    } else {
      return "#FF0000"; // Deep Red for very high busyness
    }
  };

// Handle time change event
const handleTimeChange = (time, timeString) => {
  console.log(time, timeString);
};

// Handle date change event
const handleDateChange = (date, dateString) => {
  setDate(date);
  console.log(date, dateString);
};

// Fetch GeoJSON data and update the map
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/geoJson');
      const data = await response.json();

      // Log response details (optional)
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);

      // Log one feature to see its structure (optional)
      console.log(data.features[0]);

      // Update the state with the fetched data
      setJsonData(data);

      
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  fetchData();
}, []);

const dataLayerRef = useRef(null);

useEffect(() => {
  if (mapRef.current && jsonData) {
    const dataLayer = new window.google.maps.Data();

    const filteredData = {
      ...jsonData,
      features: jsonData.features.filter(feature =>
        validZones.includes(parseInt(feature.properties.location_id))
      )
    };

    dataLayer.addGeoJson(filteredData);

    dataLayer.setStyle(feature => {
      const zoneId = parseInt(feature.getProperty('location_id'), 10);
      const busyness = predictions[zoneId.toString()] || 0;
      const fillColor = getZoneColor(busyness);
      return {
        fillColor: fillColor,
        strokeColor: "#000000",
        strokeWeight: 1,
      };
    });

    if (dataLayerRef.current) {
      dataLayerRef.current.setMap(null);
    }

    dataLayerRef.current = dataLayer;
    dataLayer.setMap(mapRef.current);
  }
}, [jsonData, predictions]);


// Declare the new state variable
const [previousDate, setPreviousDate] = useState(null);


// Handle API request to get predictions
const handleApiRequest = useCallback(() => {
  if (date) {
    const hour = date.format(format);
    const month = date.format('MM');
    const dayOfMonth = date.format('DD');

    const url = `http://localhost:8000/api/predict?hour=${hour}&month=${month}&day_of_month=${dayOfMonth}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setPredictions(data);

        // Update the map with predictions
        if (mapRef.current && jsonData) {
          // Before you add a new dataLayer, remove the old one from the map
          if (dataLayerRef.current) {
            dataLayerRef.current.setMap(null);
          }

          const dataLayer = new window.google.maps.Data();
          const filteredData = {
            ...jsonData,
            features: jsonData.features.filter(feature =>
              validZones.includes(parseInt(feature.properties.location_id))
            )
          };
          
          dataLayer.addGeoJson(filteredData);
          dataLayer.setStyle(feature => {
            const zoneId = parseInt(feature.getProperty('location_id'), 10);
            const busyness = predictions[zoneId.toString()] || 0;
            const fillColor = getZoneColor(busyness);
            return {
              fillColor: fillColor,
              strokeColor: "#000000",
              strokeWeight: 1,
            };
          });
          dataLayerRef.current = dataLayer;
          dataLayer.setMap(mapRef.current);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log('Please select a date');
  }
}, [date, jsonData, predictions]); // Add jsonData and predictions as dependencies


// Update the map with busyness levels
const updateMap = useCallback((predictionsData) => {
  if (map.current && map.current.data) {
    map.current.data.setStyle((feature) => {
      const zoneId = parseInt(feature.getProperty('location_id'), 10);
      const busyness = predictionsData[zoneId.toString()] || 0;
      const fillColor = getZoneColor(busyness);
      return {
        fillColor: fillColor,
        strokeColor: "#000000",
        strokeWeight: 1,
      };
    });
  }
}, [map, getZoneColor]); // Add map and getZoneColor as dependencies

useEffect(() => {
  // Only perform an API request if the selected date has actually changed
  if (date && (!previousDate || date !== previousDate)) {
    handleApiRequest();
    setPreviousDate(date);
  }
}, [date, previousDate, handleApiRequest]);



  const handlePlaceSelected = (place) => {
    console.log(place);
    setDestination(place.name);
  };
  const handleSearch = () => {
    setShouldRemoveMarkers(true);
    setDrawerVisible(true);
    setIsSearchButtonClicked(true);

    setSelectedMarker(null);

    const searchResults = [
      { position: { lat: 40.7831, lng: -73.9712 }, title: "Central Park" },
      { position: { lat: 40.7589, lng: -73.9851 }, title: "Times Square" },
      {
        position: { lat: 40.7488, lng: -73.9854 },
        title: "Empire State Building",
      },
      {
        position: { lat: 40.7794, lng: -73.9632 },
        title: "The Metropolitan Museum of Art",
      },
    ];
setSearchedPlaces(searchResults);
    setNewMarkers(
      searchResults.map((marker) => ({
        ...marker,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      }))
    );
  };


  const autocompleteRef = useRef(null);

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      console.log(place);
      setDestination(place.name);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="map-container">
      <div className="sidebar">
        <div className="search-bar">
          {isLoaded && (
            <Autocomplete
              onLoad={handleLoad}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter your destination"
              />
            </Autocomplete>
          )}
        </div>
       <div className="time-configuration">
         <h5>Busyness Forecast Calendar</h5> {/* Display a heading for the time configuration */}
         <DatePicker
           value={date} // Set the selected date for the DatePicker
           onChange={handleDateChange} // Handle the date change event with the specified function
           onOk={handleApiRequest} // Handle the "OK" button click event with the specified function
           showTime={{ format: format }} // Display time selector with the specified time format
           format={`YYYY-MM-DD ${format}`} // Format for displaying the date and time in the DatePicker
           style={{ width: "100%" }} // Set the width of the DatePicker
         />
       </div>

        <div className="filter-section">
          <div className="filter-section">
            <Cascader
              style={{ width: "100%" }}
              options={options}
              onChange={onChange}
              placeholder="Not sure where to go? Click below for suggestions"
              multiple
              maxTagCount="responsive"
            />
          </div>
        </div>
        <div className="search-button-container">
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="map">
      <GoogleMap
  mapContainerStyle={mapContainerStyle}
  zoom={zoom}
  center={center}
  onClick={handleMapClick}
  onLoad={map => mapRef.current = map}
  ref={mapRef}
>
          {currentWeather && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                color: "black",
              }}
            >
              <h5>Current Weather</h5>
              <p>Temperature: {currentWeather.main.temp}°C</p>
              <p>Condition: {currentWeather.weather[0].description}</p>
              {currentWeather.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
          )}

          {!shouldRemoveMarkers &&
            tourStops.map(({ position, title, placeId }) => (
              <Marker
                key={`${position.lat}-${position.lng}`}
                position={position}
                onClick={() => handleMarkerClick({ position, title, placeId })}
                onMouseOver={() =>
                  handleMarkerMouseOver({ position, title, placeId })
                }
                onMouseOut={handleMarkerMouseOut}
              >
                {isMarkerHovered === `${position.lat}-${position.lng}` && (
                  <InfoWindow onCloseClick={handleMarkerClose}>
                    <div>
                      <h3>{title}</h3>
                      {/* Other information */}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {userMarkers.map((marker, index) => (
            <Marker
              key={`user-marker-${index}`}
              position={marker}
              icon={userMarkerIcons.purple}
            />
          ))}
          {newMarkers.map((marker, index) => (
            <Marker
              key={`new-marker-${index}`}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              color: "black",
            }}
          >
            <span>Show Prediction </span>
            <Switch
              checked={showPrediction}
              onChange={handlePredictionToggle}
            />
          </div>
          <BusyLegend />
        </GoogleMap>
      </div>
      <Drawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        width={400}
        placement="right"
      >
        {selectedMarker ? (
          <div>
            <img src={selectedMarker.image} alt="Location Image" />
            <h3>{selectedMarker.title}</h3>
            <p>Rating: {placeDetails.rating}</p>
            <p>
              Opening Hours:{" "}
              {placeDetails.opening_hours?.weekday_text?.join(", ")}
            </p>
            <p>Address: {placeDetails.formatted_address}</p>
            <p>Reviews: {placeDetails.reviews?.length}</p>
          </div>
        ) : (
          <div>

            {isSearchButtonClicked &&
              searchedPlaces.map((place) => (
                <div key={place.placeId} className="searched-place">
                  <h4>{place.title}</h4>
                  <p>{place.address}</p>

                  <p>Busyness: {place.busyness}</p>
                  <p>Opening Hours: {place.openingHours}</p>
                  <p>General Info: {place.generalInfo}</p>
                  <p>Rating: {place.rating}</p>
                </div>
              ))}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Map;
