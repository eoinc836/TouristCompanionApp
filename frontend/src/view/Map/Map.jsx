import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Cascader, DatePicker, Select } from "antd";
import moment from "moment";
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

const BusyIndicator = () => {
  const busyColor = "crimson";
  const moderateColor = "yellow";
  const quietColor = "green";

  return (
    <div>
      <div
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
            width: "20px",
            height: "20px",
            marginRight: "5px",
            backgroundColor: busyColor,
          }}
        />
        <span>Busy</span>
        <div
          style={{
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            marginRight: "5px",
            backgroundColor: moderateColor,
          }}
        />
        <span>Moderate</span>
        <div
          style={{
            width: "20px",
            height: "20px",
            marginLeft: "10px",
            marginRight: "5px",
            backgroundColor: quietColor,
          }}
        />
        <span>Quiet</span>
      </div>
    </div>
  );
};

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
    libraries: ["places"],
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [placeDetails, setPlaceDetails] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [showPrediction, setShowPrediction] = useState(true);
  const [isMarkerHovered, setMarkerHovered] = useState(null);
  const [userMarkers, setUserMarkers] = useState([]);
  const [shouldRemoveMarkers, setShouldRemoveMarkers] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [date, setDate] = useState(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [newMarkers, setNewMarkers] = useState([]);

  const format = "HH";

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

  const handleTimeChange = (time, timeString) => {
    // Handle time change logic
    console.log(time, timeString);
  };

  const handleDateChange = (date, dateString) => {
    setDate(date);
    console.log(date, dateString);
  };

  const handlePlaceSelected = (place) => {
    console.log(place);
    setDestination(place.name);
  };
  const handleSearch = () => {
    try {
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

      const resultsWithDetails = Promise.all(
        searchResults.map((result) =>
          axios
            .get(
              `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&place_id=${result.placeId}&fields=name,formatted_address,opening_hours,rating`
            )
            .then((response) => {
              const placeDetails = response.data.result;
              return {
                ...result,
                busyness: "",
                openingHours:
                  placeDetails.opening_hours?.weekday_text?.join(", "),
                generalInfo: "",
                rating: placeDetails.rating,
              };
            })
            .catch((error) => {
              console.error(error);
              return result;
            })
        )
      );

      resultsWithDetails
        .then((updatedResults) => {

          setSearchedPlaces(updatedResults);

          // Call the backend API "/api/predict"
          axios
            .post("/api/predict", {
              searchResults, // Pass the search results to the backend
            })
            .then((response) => {
              // Handle the API response
              const data = response.data;
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });


      setNewMarkers(
        searchResults.map((marker) => ({
          ...marker,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        }))
      );
    } catch (error) {
      console.error(error);
    }
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
          <h5>Busyness Forecast Calendar</h5>
          <DatePicker
            value={date}
            onChange={handleDateChange}
            showTime={{ format: format }}
            format={`YYYY-MM-DD ${format}`}
            style={{ width: "100%" }}
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
          <BusyIndicator />
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
