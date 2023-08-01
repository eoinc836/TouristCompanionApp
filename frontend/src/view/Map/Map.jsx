import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Cascader, DatePicker, Select, Tooltip } from "antd";

import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";
import "antd/dist/antd.css";
import "./Map.scss";
import moment from "moment";
import Itinerary from './Itinerary';

import WeatherForecast from './WeatherForecast';

const { Option } = Select;

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

// Busyness Legend
const BusyLegend = () => {
  const getColor = (busyness) => {
    if (busyness <= 28) {
      return "#008000"; // Deep Green for very low busyness
    } else if (busyness <= 138) {
      return "#90EE90"; // Light Green for low busyness
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
        top: "60px", // Change this value to 110px to move the legend 100px lower
        left: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        color: "#333",
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <div style={{ marginBottom: "15px", fontWeight: "bold", fontSize: "18px" }}>
        Area Busyness
      </div>
      {[
        { busyness: 28, label: 'Very Low' },
        { busyness: 138, label: 'Low' },
        { busyness: 536, label: 'Medium' },
        { busyness: 8000, label: 'High' },
        { busyness: 15001, label: 'Very High' },
      ].map(({ busyness, label }) => (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }} key={label}>
          <div
            className="legend-color"
            style={{
              backgroundColor: getColor(busyness),
              width: "20px",
              height: "20px",
              marginRight: "10px",
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.2)',
            }}
          ></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const libraries = ["places"];

// Map 
const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 40.7831,
    lng: -73.9712,
  };

  const [mapCenter, setMapCenter] = useState(center); // define a new state variable

  // Define new state for user geolocation
  const [userGeoLocation, setUserGeoLocation] = useState(null);

  // New function to get user's geolocation
  const getUserGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setUserGeoLocation({ lat, lng });
        setUserMarkers([{ lat, lng }]);
        setMapCenter({ lat, lng });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Function to handle user geolocation marker click
  const handleUserGeoMarkerClick = () => {
    setUserGeoLocation(null);
    setUserMarkers(userMarkers.filter(marker => marker.lat !== userGeoLocation.lat && marker.lng !== userGeoLocation.lng));
  };

  useEffect(() => {
    // update the map center only during the initial rendering
    setMapCenter(center);
  }, []);

  const zoom = 14;

  // Google Map API
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
  const [selectedFilters, setSelectedFilters] = useState({
    busyness: "",
    attraction_type: "",
    day: "",
    time: "",
    nearbyArea: false,
    latitude: null,
    longitude: null,
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [date, setDate] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [newMarkers, setNewMarkers] = useState([]);


  // BestTime Drawer Variables
  const [drawerTitle, setDrawerTitle] = useState(null)
  const [drawerOpening, setDrawerOpening] = useState(null)
  const [drawerAddress, setDrawerAddress] = useState(null)
  const [drawerRating, setDrawerRating] = useState(null)
  const [bestTimeUsed,setBestTimeUsed] = useState(false) 

  // BestTime Filter Variables
  const [busynessLevels, setBusynessLevels] = useState([])
  const[attractionTypes, setAttractionTypes] = useState([])
  const[nearBy,setNearBy] = useState(false)
  const[user_lat,setUser_lat] = useState(false)
  const[user_lng,setUser_lng] = useState(false)
  

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  // Add a new state for route visibility
  const [isRoutingOn, setIsRoutingOn] = useState(false);

  // Add a new state for the directions renderer instance
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [itinerary, setItinerary] = useState(""); // add this line to initialize itinerary state

  // saved places toggle button
const [isActive, setIsActive] = useState(false);
useEffect(() => {
    setIsActive(false);
  }, [selectedMarker, placeDetails]);
const username = localStorage.getItem('username');
console.log('username is:', username)
  const handleToggle = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    if (!isActive) {
      const data = {
        username: username,
        saved_place: selectedMarker.title
      };
      //const csrftoken = getCookie('csrftoken');
      fetch('http://localhost:8000/api/saved_place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Saved successfully:', data);
        })
        .catch((error) => {
          console.error('Error is:', error);
        });
    }
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const mapRef = useRef(null);

  // Routing 
  const handleRouting = () => {
    if (!isRoutingOn) {
      if (!userMarkers[0] || !newMarkers[0]) {
        alert("Both the user and the destination need to be defined for routing.");
      } else {
        const DirectionsService = new window.google.maps.DirectionsService();

        DirectionsService.route({
          origin: new window.google.maps.LatLng(userMarkers[0].lat, userMarkers[0].lng),
          destination: new window.google.maps.LatLng(newMarkers[0].position.lat, newMarkers[0].position.lng),
          travelMode: window.google.maps.TravelMode.WALKING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsRenderer(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    } else {
      setDirectionsRenderer(null); // Remove the route by setting the directions renderer to null
    }

    setIsRoutingOn(!isRoutingOn); // Toggle the routing state

  };
  const [weatherDataFromAPI, setWeatherDataFromAPI] = useState(null);
  const handleWeatherDataReceived = (data) => {
    setWeatherDataFromAPI(data);
  };

  // Best Times filters
  const options = [
  {
    label: "Busyness Level",
    value: "busyness",
    children: [
      {
        label: "Quiet",
        value: "quiet",
      },
      {
        label: "Busy",
        value: "busy",
      },
    ],
  },
  {
    label: "Attraction Type",
    value: "attraction_type",
    children: [
      {
        label: "Restaurants",
        value: "restaurants",
      },
      {
        label: "Bars",
        value: "bars",
      },
      {
        label: "Shops",
        value: "shops",
      },
      {
        label: "Gyms",
        value: "gyms",
      },
      {
        label: "Museums",
        value: "museums",
      },
      {
        label: "Theatres",
        value: "theatres",
      },
      {
        label: "Malls",
        value: "malls",
      },
      {
        label: "Beaches",
        value: "beaches",
      },
      {
        label: "Supermarkets",
        value: "supermarkets",
      },
      {
        label: "Theme parks",
        value: "theme_parks",
      },
    ],
  },
  {
    label: "Day",
    value: "day",
    children: [
      {
        label: "Monday",
        value: "monday",
      },
      {
        label: "Tuesday",
        value: "tuesday",
      },
      {
        label: "Wednesday",
        value: "wednesday",
      },
      {
        label: "Thursday",
        value: "thursday",
      },
      {
        label: "Friday",
        value: "friday",
      },
      {
        label: "Saturday",
        value: "saturday",
      },
      {
        label: "Sunday",
        value: "sunday",
      },
    ],
  },
  {
    label: "Time of Day",
    value: "time",
    children: [
      {
        label: "Morning",
        value: "morning",
      },
      {
        label: "Afternoon",
        value: "afternoon",
      },
      {
        label: "Evening",
        value: "evening",
      },
      {
        label: "Night",
        value: "night",
      },
    ],
  },
  {
    label: "Nearby Area",
    value: "nearbyArea",
  },
];
// Function to handle the API call for nearby attractions based on user's latitude and longitude
const handleNearbyAttractions = (latitude, longitude) => {
  // Use fetch or any other suitable method to send a GET request to the API, passing the user's latitude and longitude as parameters
  fetch(`http://localhost:8000/api/get_venues?latitude=${latitude}&longitude=${longitude}`)
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here, you can update the markers on the map or perform other operations based on the returned data
      console.log(data);
    })
    .catch((error) => {
      // Handle errors if the API call fails
      console.error(error);
    });
};

// Function to handle the nearby area checkbox
const handleNearbyAreaChange = (event) => {
  setSelectedFilters((prevFilters) => ({
    ...prevFilters,
    nearbyArea: event.target.checked,
  }));

  
  if (event.target.checked) {
    handleNearbyAttractions(
      selectedFilters.latitude,
      selectedFilters.longitude
    );
  }
};

  const onChange = (value) => {
    // console.log(options.value)
    // console.log(value[0][1]);
    // console.log(value.length)
    let busyness = []
    let types = []

    for(let i = 0; i < value.length; i++){
      if(value[i][0] == 'placeType'){types.push(value[i][1])}
      else if(value[i][0] == 'busynessLevel'){busyness.push(value[i][1])}
    }

    setAttractionTypes(types)
    setBusynessLevels(busyness)
    
  };
  useEffect(() => {

  }, [busynessLevels,attractionTypes,date]);

  // Google Maps API
  useEffect(() => {
    const getPlaceDetails = async (placeId) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&place_id=${placeId}&fields=name,rating,formatted_address,opening_hours`
        );
        const result = response.data;
        console.log(result)
        setPlaceDetails(result.result);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedMarker) {
      getPlaceDetails(selectedMarker.placeId);
    }
  }, [selectedMarker]);

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
    if (bestTimeUsed == true){
      setBestTimeUsed(false)
    }
  };

  const [firstSwitch, setFirstSwitch] = useState(true);

  function handlePredictionToggle(checked) {
    setShowPrediction(checked);

    // Only set to the current time and trigger the API request on the first switch to "Manhattan Zones".
    if (checked && firstSwitch) {
      setDate(moment());
      handleApiRequest(moment());
      setFirstSwitch(false);
    }

    if (dataLayerRef.current) {
      // If we're switching back to the Basic Map, clear the zones from the map.
      // If we're switching to the "Manhattan Zones", show the zones on the map.
      dataLayerRef.current.setMap(checked ? mapRef.current : null);
    }
  }

  // User marker behavior 
  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const position = { lat, lng };

    // If the user clicks on their geolocation marker, handle it separately
    if (userGeoLocation && userGeoLocation.lat === lat && userGeoLocation.lng === lng) {
      handleUserGeoMarkerClick();
    } else if (userMarkers.length === 0) {
      // If there are no user markers, add the new user marker
      setUserMarkers([position]);
      setIsMapClicked(true);
    } else {
      const [existingMarker] = userMarkers;
      // If the user clicks on the existing user marker, remove it
      if (existingMarker.lat === lat && existingMarker.lng === lng) {
        setUserMarkers([]);
      } else {
        // If the user clicks somewhere else, remove the old marker and create a new one
        setUserMarkers([position]);
      }
    }
  };



  const handleUserMarkerClick = (index) => {
    setUserMarkers((prevMarkers) => {
      return prevMarkers.filter((_, i) => i !== index);
    });
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

  // Prediction variables 
  const format = 'HH'; // The format for time (e.g., "HH:mm")
  const map = useRef(null); // Reference to the Google Maps instance
  const validZones = [262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231,
    230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158,
    153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114,
    113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41,
    13, 12, 24, 4];

  // Busyness Coloration 
  const getZoneColor = (busyness) => {
    console.log("Busyness Level:", busyness);
    const opacity = 1; // Set your desired opacity here

    if (busyness === 0 || isNaN(busyness)) {
      return `rgba(248, 248, 248, ${opacity})`; // Transparent color for no data or invalid busyness value
    } else if (busyness <= 28) {
      return `rgba(0, 128, 0, ${opacity})`; // Deep Green for very low busyness
    } else if (busyness <= 138) {
      return `rgba(144, 238, 144, ${opacity})`; // Green Yellow for low busyness
    } else if (busyness <= 536) {
      return `rgba(255, 255, 0, ${opacity})`; // Yellow for medium busyness
    } else if (busyness <= 8000) {
      return `rgba(255, 165, 0, ${opacity})`; // Orange for high busyness
    } else {
      return `rgba(255, 0, 0, ${opacity})`; // Deep Red for very high busyness
    }
  };

  // Handle time change event
  const handleTimeChange = (time, timeString) => {
    setSelectedTime(time);
    setShowPrediction(true);
    console.log(time, timeString);
  };

  // Handle date change event
  const handleDateChange = (date, dateString) => {
    setDate(date);
    setShowPrediction(true);
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
  }, []); // Assuming you only want to fetch data on initial render

  const dataLayerRef = useRef(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  // Geojson and Busyness coloration logic 
  useEffect(() => {
    if (!showPrediction) return;
    if (mapRef.current && jsonData) {
      const dataLayer = new window.google.maps.Data({
        clickable: true,
      });

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

      dataLayer.addListener('mouseover', (event) => {
        const zone = event.feature.getProperty('zone');
        const location_id = event.feature.getProperty('location_id');
        const busyness = predictions[location_id.toString()] || 0;
        setHoveredZone({ id: zone, location_id: location_id, busyness: busyness, position: event.latLng });
      });

      dataLayer.addListener('mouseout', () => {
        setHoveredZone(null);
      });

      dataLayer.addListener('click', handleMapClick);

      if (dataLayerRef.current) {
        dataLayerRef.current.setMap(null);
      }

      dataLayerRef.current = dataLayer;
      dataLayer.setMap(mapRef.current);
    }
  }, [jsonData, predictions, showPrediction]);

  const getBusynessDescription = (busyness) => {
    if (busyness === 0 || isNaN(busyness)) {
      return "No data";
    } else if (busyness <= 28) {
      return "Very Low";
    } else if (busyness <= 138) {
      return "Low";
    } else if (busyness <= 536) {
      return "Medium";
    } else if (busyness <= 8000) {
      return "High";
    } else {
      return "Very High";
    }
  };



  // Declare the new state variable
  const [previousDate, setPreviousDate] = useState(null);


  // Handle API request to get predictions
  const handleApiRequest = useCallback(() => {
    if (!showPrediction) return;
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
    if (date && (!previousDate || !date.isSame(previousDate))) {

      handleApiRequest();
      setPreviousDate(date);
    }
  }, [date, previousDate, handleApiRequest]);


  const handlePlaceSelected = (place) => {
    console.log(place);
    setDestination(place.name);
  };

  function getDay(d,m,y){
    const date = new Date(y, m - 1, d);
    const dayOfWeek = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayOfWeek];
  }

  const handleSearch = () => {
    setShouldRemoveMarkers(true);
    setIsSearchButtonClicked(true);
    setSelectedMarker(null);
    let venue_ids;
    const searchResults = []
    if (!date)
    {console.log('Please Select A Date and Time')}
    else{
      console.log(date)
    let queryParamsFilter;
    // {date.format('DD')
    queryParamsFilter =`?busyness=${busynessLevels}&attraction_type=${attractionTypes}&time=${date.format(format)}&day=${getDay(date.format('DD'),date.format('MM'),date.format('YYYY'))}`;
    
    axios.get(`api/get_venues${queryParamsFilter}`)
    .then((response) => {
      
      console.log(response.data)
      venue_ids =  Object.keys(response.data)
      venue_ids.forEach(id => {
        
      let resultMarker = {position: {lat:response.data[id].latitude, lng:response.data[id].longitude}, title: response.data[id].venue_name}
      searchResults.push(resultMarker)

      });

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

      
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

    // Add this part
    let searchResult = searchResults.find(
      (place) =>
        place.title.toLowerCase() === destination.toLowerCase()
    );

    if (searchResult) {
      // If the place was found in the predefined places, add a marker for it
      setNewMarkers([
        {
          ...searchResult,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        },
      ]);
    } else {
      // If the place was not found in the predefined places, use the Places API to search for it
      const service = new window.google.maps.places.PlacesService(mapRef.current);

      service.findPlaceFromQuery(
        {
          query: destination,
          fields: ["name", "geometry"],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
   
            setNewMarkers([
              {
                position: {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                },
                title: results[0].name,
                icon: {
                  url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                },
              },
            ]);
          }
        }
      );
    }
  };


  const autocompleteRef = useRef(null);

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();

      // Set the center of the map to the coordinates of the selected place
      if (place.geometry && place.geometry.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        // Add a new marker at the selected place
        let bestTimeMarker;

        bestTimeMarker = {
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
                    },
            title: place.name,
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
        }

        setNewMarkers([
          bestTimeMarker,
        ]);

        setSelectedMarker(bestTimeMarker)
       
      }


      const queryParams = `?venue_name=${place.name}&venue_address=${place.formatted_address}&venue_rating=${place.rating}`;

      axios.get(`http://localhost:8000/api/get_forecast${queryParams}`)
        .then((response) => {
          console.log('API Response:', response.data);

          setDrawerTitle(response['data'].venue_name)
          setDrawerAddress(response['data'].venue_address)
          setDrawerOpening(response['data'].venue_opening_hours)
          setDrawerRating(response['data'].rating)
          setBestTimeUsed(true)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    
    setDrawerVisible(true)
  };
  
  const bounds = {
      north: 40.915255,
      south: 40.477398,
      east: -73.700272,
      west: -74.259090,}

  // Info window when hovering on zone
  const HoveredZoneInfo = ({ hoveredZone, getBusynessDescription }) => {
    return (
      <div
        className="hovered-zone-info"
        style={{
          position: "absolute",
          top: "5px", // Reduce the top padding
          left: "200px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px 15px", // Reduce the top and bottom padding, keep the left and right padding
          borderRadius: "8px",
          color: "#333",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          fontFamily: '"Arial", sans-serif',
          display: hoveredZone ? "block" : "none", // Hide the Info Window if no zone is hovered
        }}
      >
        {hoveredZone && (
          <>
            <div>
              <span style={{ fontWeight: "bold" }}>Zone:</span>{" "}
              {hoveredZone.id}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Busyness:</span>{" "}
              {getBusynessDescription(hoveredZone.busyness)}
            </div>
          </>
        )}
      </div>
    );
  };

  // Add this to your state variable declarations
  const [showTourStops, setShowTourStops] = useState(true);

  // Add this function to handle the switch's change event
  const handleTourStopsToggle = () => {
    setShowTourStops(!showTourStops);
  };


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  // React Components Logic 
  return (
    <div className="map-container">
      <div className="sidebar">
        <div className="search-bar">
          {isLoaded && (
            <Autocomplete
              onLoad={handleLoad}
              onPlaceChanged={handlePlaceChanged}
              options={{ bounds: bounds }}
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
        <Button type="primary" onClick={handleSearch} className="button search-button">
          Search
        </Button>
        <Button type="primary" onClick={getUserGeoLocation} className="button geo-button">
          Locate Me
        </Button>
        <div className="routing-button-container">
          <Button type="primary" onClick={handleRouting} className="button routing-button">
            {isRoutingOn ? "Remove Route" : "Show Route"}
          </Button>
        </div>
        <Itinerary setItinerary={setItinerary} />  {/* Here we are using Itinerary component */}
      </div>


      <div className="map">

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={mapCenter} // use mapCenter instead of center
          onClick={handleMapClick}
          onLoad={map => {
            mapRef.current = map;
            setMapCenter({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
          }}
          ref={mapRef}>
          {directionsRenderer && <DirectionsRenderer directions={directionsRenderer} />}
          {hoveredZone && (
            <HoveredZoneInfo hoveredZone={hoveredZone} getBusynessDescription={getBusynessDescription} />
          )}
          {currentWeather && (
            <div
              className="weather-legend"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "15px",
                borderRadius: "8px",
                color: "#333",
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: '"Arial", sans-serif',
              }}
            >
              <div style={{ marginBottom: "15px", fontWeight: "bold", fontSize: "18px" }}>
                Current Weather
              </div>
              <p><strong>Temperature:</strong> {currentWeather.main.temp}°C</p>
              <p><strong>Condition:</strong> {currentWeather.weather[0].description}</p>
              {currentWeather.weather[0].icon && (
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img
                    src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
                    alt="Weather Icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </div>
              )}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "100px",
            }}
          >
            <Switch

              style={{
                width: "200px", //2x wider
                height: "40px" //2x taller
              }}
              checkedChildren={<div style={{ fontSize: "16px" }}>Top 20 Attractions</div>}
              unCheckedChildren={<div style={{ fontSize: "16px" }}>Top 20 Attractions</div>}
              onChange={handleTourStopsToggle}
              checked={showTourStops}
            />
          </div>


          <WeatherForecast onWeatherDataReceived={handleWeatherDataReceived} />
          {weatherDataFromAPI && (
            <div>
              <table>
              </table>
            </div>
          )}



          {showTourStops && tourStops.map(({ position, title, placeId }) => (
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
                <InfoWindow zIndex={10} onCloseClick={handleMarkerClose}>
                  <div>
                    <h3>{title}</h3>
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
              onClick={() => marker.lat === userGeoLocation?.lat && marker.lng === userGeoLocation?.lng ? handleUserGeoMarkerClick() : handleUserMarkerClick(index)}
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
              right: "100px",
            }}
          >
            <Switch
              style={{
                width: "200px", //2x wider
                height: "40px" //2x taller
              }}
              checkedChildren={<div style={{ fontSize: "16px" }}>Manhattan Zones</div>} //increased font size
              unCheckedChildren={<div style={{ fontSize: "16px" }}>Basic Map</div>} //increased font size
              onChange={handlePredictionToggle}
              checked={showPrediction}
            />
          </div>
          <BusyLegend />
        </GoogleMap>
      </div>
      <Drawer
        open={drawerVisible}
        onClose={handleDrawerClose}
        width={400}
        placement="right"
      >
        {selectedMarker && !bestTimeUsed ? (
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
            <div className={`toggle-btn ${isActive ? 'active' : ''}`} onClick={handleToggle}>
                    <div className="toggle-label">
                    </div>
                  </div>
          </div>
           ) : selectedMarker && bestTimeUsed ?( 
          <div>
            <img src={selectedMarker.image} alt="Location Image" />
            <h3>{drawerTitle}</h3>
            <p>Rating: {drawerRating}</p>
            <p>
              Opening Hours:{drawerOpening}
            </p>
            <p>Address: {drawerAddress}</p>
            <p>Reviews: {}</p>
            <div className={`toggle-btn ${isActive ? 'active' : ''}`} onClick={handleToggle}>
                    <div className="toggle-label">
                    </div>
                  </div>
          </div>
        )
        :(
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
                  <div className={`toggle-btn ${isActive ? 'active' : ''}`} onClick={handleToggle}>
                    <div className="toggle-label">
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Map;