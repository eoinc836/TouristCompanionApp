import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Switch, Button,Rate,  TreeSelect, DatePicker, Select, Tooltip, Radio, Checkbox, Spin, Form, TimePicker, Collapse, List, Space, Typography, Timeline} from "antd";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from "axios";
import { Card } from "react-bootstrap";
import { Autocomplete } from "@react-google-maps/api";
import "antd/dist/antd.css";
import "./Map.scss";
import moment from "moment";
import { useLocation } from "react-router-dom";
import WeeklyChart from "./weeklyCharts";
import DailyChart from "./dailyCharts";
// import component 
import Drawer from 'react-modern-drawer'
//import styles 
import 'react-modern-drawer/dist/index.css'
import WeatherForecast from './WeatherForecast';
import { forEach } from "vega-lite/build/src/encoding";

const { Option } = Select;
const { Panel } = Collapse;
const { Text, Title } = Typography;

function calculateAverageNonZeroBusyness(arr) {
  let sum = 0;
  let count = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      sum += arr[i];
      count++;
    }
  }

  // Avoid dividing by zero
  if (count === 0) {
    return 0;
  }

  return sum / count;
}

function convertStringToArray(apiResponse) {
  // Step 1: Remove square brackets
  const cleanedString = apiResponse.slice(1, -1);

  // Step 2: Split into individual elements
  const elements = cleanedString.split(',');

  // Step 3: Convert elements to integers
  const convertedArray = elements.map((val) => parseInt(val.trim(), 10));

  return convertedArray;
}
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
        top: "187px", // Change this value to 110px to move the legend 100px lower
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const darkMode = queryParams.get("darkMode") === "true";
  //console.log("dark mode value is:", darkMode)

  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 40.7831,
    lng: -73.9712,
  };

  const darkMapStyles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ]

  const defaultMapStyles = [];

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
  const [tourStops, setTourStops] = useState([]);
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
const [menuCollapse, setMenuCollapse] = useState(false);

//create a custom function that will change menucollapse state from false to true and true to false
const menuIconClick = () => {
  //condition checking to change state from true to false and vice versa
  menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
};
const [showBestTime, setShowBestTime] = useState(false);
const [showOtherContent, setShowOtherContent] = useState(false);
const [showAnotherContent, setShowAnotherContent] = useState(false);
const handleBestTimeClick = () => {
  setShowBestTime(!showBestTime);
  setShowItinerary(false);
    setShowTimeConfig(false);
};

const handleNextForBusynessPrediction = () => {
    setShowAnotherContent(true);
  };

const handleNextForBestTime = () => {
  setShowOtherContent(true);
};
const handleBusynessPredictionClick = () => {
  setShowTimeConfig(!showTimeConfig);
   setShowItinerary(false); // Hide other MenuItem's content
    setShowBestTime(false); // Hide other MenuItem's content
};
const [showTimeConfig, setShowTimeConfig] = useState(false);
const [showItinerary, setShowItinerary] = useState(false);

const handleItineraryRouteClick = () => {
  setShowItinerary(!showItinerary);
   setShowTimeConfig(false);
  setShowBestTime(false);

};
const [destinationKnown, setDestinationKnown] = useState(null);
const handleDestinationKnownChange = (event) => {
  setDestinationKnown(event.target.value);
};
const [showLegend, setShowLegend] = useState(false);

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
  const[returnedVenues,setReturnedVenues] = useState({})


  //BestTime Graph Variables
  const [mondayLevel, setMondayLevel] = useState(null);
  const [tuesdayLevel, setTuesdayLevel] = useState(null);
  const [wednesdayLevel, setWednesdayLevel] = useState(null);
  const [thursdayLevel, setThursdayLevel] = useState(null);
  const [fridayLevel, setFridayLevel] = useState(null);
  const [saturdayLevel, setSaturdayLevel] = useState(null);
  const [sundayLevel, setSundayLevel] = useState(null);

  const [dailyBusyness,setDailyBusyness] = useState([]);


const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  // Add a new state for route visibility
  const [isRoutingOn, setIsRoutingOn] = useState(false);

  // saved places toggle button
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [placeToggleStatus, setPlaceToggleStatus] = useState({}); 

  useEffect(() => {
    // Set isActive based on previous toggle state
    setIsActive(placeToggleStatus[selectedMarker?.title] || false); 
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "");
  }, [selectedMarker]);

  const handleToggle = () => {
    setIsPlaceSaved((prevIsPlaceSaved) => !prevIsPlaceSaved);
    // Update the toggle status for the selectedMarker's title
    setPlaceToggleStatus((prevStatus) => ({
      ...prevStatus,
      [selectedMarker.title]: !isPlaceSaved,
    }));

    if (!isPlaceSaved) {
      const data = {
        username: username,
        saved_place: selectedMarker.title,
        lat: selectedMarker.position.lat,
        lng: selectedMarker.position.lng
      };

      fetch("http://localhost:8000/api/saved_place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error is:", error);
        });
    }else {
      // If the toggle is disabled, remove the username and place detail from the database
      const data = {
        username: username,
        saved_place: selectedMarker.title,
      };

      fetch("http://localhost:8000/api/delete_saved_place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted successfully:", data);
        })
        .catch((error) => {
          console.error("Error is:", error);
        });
    }
  };
  
  // Saved places to array
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [showSavedPlaces, setShowSavedPlaces] = useState(false);
  const [isPlaceSaved, setIsPlaceSaved] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "");

    console.log(`Fetching saved places for user: ${storedUsername}`);

    const data = { username: storedUsername };
    fetch("http://localhost:8000/api/get_saved_places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
       // console.log("Received saved places data:", JSON.stringify(data, null, 2));

      // Just set the 'savedPlaces' state to be the data received from the API
      setSavedPlaces(data.saved_places);

      // Check if the selected marker is in the list of saved places
      const isMarkerSaved = data.saved_places.some(place => place.saved_place === selectedMarker?.title);
      setIsPlaceSaved(isMarkerSaved);
  })
  .catch((error) => {
      console.error("Error is:", error);
  });
}, [username, selectedMarker]);

const handleSavedPlacesToggle = () => {
  setShowSavedPlaces(!showSavedPlaces);
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

// Itinerary Logic
const [itinerary, setItinerary] = useState(""); 
const [itineraryList, setItineraryList] = useState([]);
const [form] = Form.useForm();
const [displayRoute, setDisplayRoute] = useState(false);
const [visible, setVisible] = useState(false);
const [directionsRenderer, setDirectionsRenderer] = useState([]);
const [routeDirections, setRouteDirections] = useState(null); 
const [isFormSubmitted, setIsFormSubmitted] = useState(false);
const [isItineraryView, setIsItineraryView] = useState(false);
const allFieldNames = form.getFieldValue(); // Get all the field values
const fieldNamesToReset = Object.keys(allFieldNames).filter(name => name !== 'displayRoute'); // Exclude 'displayRoute'

const calculateTravelTime = async (location1, location2) => {
  const directionsService = new window.google.maps.DirectionsService();

  const result = await new Promise((resolve, reject) => {
    directionsService.route({
      origin: new window.google.maps.LatLng(location1.lat, location1.lng),
      destination: new window.google.maps.LatLng(location2.lat, location2.lng),
      travelMode: window.google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        resolve(result.routes[0].legs[0].duration.text);
      } else {
        reject(`error fetching directions ${result}`);
      }
    });
  });

  // Handle the cases where travel time might return in "1 hr 15 min" format
  let totalMinutes = 0;
  if (result.includes("hr")) {
    const hours = parseInt(result.split('hr')[0].trim());
    totalMinutes += hours * 60;
    const minutes = parseInt((result.split('hr')[1] || "").split(' ')[0]);
    totalMinutes += isNaN(minutes) ? 0 : minutes;
  } else {
    totalMinutes = parseInt(result.split(' ')[0]);
  }

  return totalMinutes;
};

const generateItinerary = async (startEndHour, dateRange, places) => {
  const totalHoursInDay = startEndHour[1] - startEndHour[0];
  let itinerary = [];
  let itineraryMapping = {}; 

  let currentDay = moment(dateRange[0]);
  let currentHour = startEndHour[0];

  let sortedTourStops = [...places];

  for (let i = 0; i < sortedTourStops.length; i++) {
    let visitStart = currentDay.clone().hour(currentHour).minute(0);
    let visitEnd;

    let timeAtAttraction = 2;  // Default duration value.

    if (i !== sortedTourStops.length - 1) { // Check if it's not the last location
      const travelTimeInMinutes = await calculateTravelTime(
          sortedTourStops[i].position,
          sortedTourStops[i + 1].position
      );

      let travelTimeInHours = travelTimeInMinutes / 60;
      visitEnd = visitStart.clone().add(timeAtAttraction, 'hours');

      itinerary.push({
        key: i,
        time: `${visitStart.format('HH:mm')} - ${visitEnd.format('HH:mm')}`,
        title: sortedTourStops[i].title,
        date: currentDay.format('YYYY-MM-DD'),
        position: sortedTourStops[i].position,
        travelTime: `${travelTimeInMinutes} min`,
        openingHours: sortedTourStops[i].openingHours,  // <-- Add this line
      });

      // Add both the visit time and the travel time to the currentHour
      currentHour += timeAtAttraction + travelTimeInHours;
    } else {
      visitEnd = visitStart.clone().add(timeAtAttraction, 'hours');
      itinerary.push({
        key: i,
        time: `${visitStart.format('HH:mm')} - ${visitEnd.format('HH:mm')}`,
        title: sortedTourStops[i].title,
        date: currentDay.format('YYYY-MM-DD'),
        position: sortedTourStops[i].position,
      });
      currentHour += timeAtAttraction;
    }

    while (currentHour + timeAtAttraction + (i !== sortedTourStops.length - 1 ? (await calculateTravelTime(sortedTourStops[i].position, sortedTourStops[i + 1].position)) / 60 : 0) > startEndHour[1]) {
      currentDay = currentDay.add(1, 'days');
      currentHour = (currentHour + timeAtAttraction) - totalHoursInDay;
    }
    
  }
  

  setItinerary(itineraryMapping);

  return itinerary;
};
  
  // Helper function to reorder an array
function reorderArray(array, order) {
  return order.map(index => array[index]);
}

const onFinish = async (values) => {
  if (values.markers === "top20" || values.markers === "saved") {
    if (!Array.isArray(values.startEndHour) || values.startEndHour.length !== 2 || !Array.isArray(values.dateRange) || values.dateRange.length !== 2) {
        console.error('Invalid input for start and end hours or date range!');
        return;
    }
    const transformedSavedPlaces = savedPlaces
      .filter(place => place.latitude && place.longitude)
      .map(place => ({
      title: place.saved_place,
      position: { lat: place.latitude, lng: place.longitude },
      openingHours: place.opening_hours,   // <-- Add this line
  }))
 
    let dataSource = [];
    if (values.markers === 'top20') {
      dataSource = tourStops.map(stop => ({
        title: stop.title || stop.name,  // I assumed the title might be in these properties
        position: { lat: stop.position.lat, lng: stop.position.lng },
        openingHours: stop.opening_hours,
      }));
    } else if (values.markers === 'saved') {
      dataSource = transformedSavedPlaces;
    }
    if (form.getFieldValue('displayRoute')) {
      const waypoints = dataSource.map(stop => {
        return {
            location: new window.google.maps.LatLng(stop.position.lat, stop.position.lng),
            stopover: true,
        };
      });
      const directionsService = new window.google.maps.DirectionsService();
      const result = await new Promise((resolve, reject) => {
        directionsService.route({
            origin: waypoints[0].location, 
            destination: waypoints[waypoints.length - 1].location, 
            waypoints: waypoints.slice(1, waypoints.length - 1), 
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.WALKING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                resolve(result);
            } else {
                reject(`error fetching directions ${result}`);
            }
        });
      });
      setDirectionsRenderer([result]);
      const optimalRouteOrder = [0, ...result.routes[0].waypoint_order.map(x => x + 1), dataSource.length - 1]; // Adjusting the order array
      const reorderedTourStops = reorderArray(dataSource, optimalRouteOrder);
      const newItinerary = await generateItinerary(
          [values.startEndHour[0].hour(), values.startEndHour[1].hour()],
          [values.dateRange[0].format('YYYY-MM-DD'), values.dateRange[1].format('YYYY-MM-DD')],
          reorderedTourStops,
      );
      setItineraryList(newItinerary);
    } else {
        const newItinerary = await generateItinerary(
            [values.startEndHour[0].hour(), values.startEndHour[1].hour()],
            [values.dateRange[0].format('YYYY-MM-DD'), values.dateRange[1].format('YYYY-MM-DD')],
            dataSource,
        );
        setItineraryList(newItinerary);
    }
    setVisible(true);
    setIsFormSubmitted(true);
    form.resetFields(fieldNamesToReset);
  };
};



  const itineraryByDay = (Array.isArray(itineraryList) ? itineraryList : []).reduce((acc, curr) => {
    acc[curr["date"]] = acc[curr["date"]] || [];
    acc[curr["date"]].push(curr);
    return acc;
}, {});

  


  const mapRef = useRef(null);

  // Routing 
  const handleRouting = (markerPosition) => {
    if (!isRoutingOn) {
      if (!userMarkers[0] || !markerPosition) {
        alert("Both the user and the destination need to be defined for routing.");
      } else {
        const DirectionsService = new window.google.maps.DirectionsService();
  
        DirectionsService.route({
          origin: new window.google.maps.LatLng(userMarkers[0].lat, userMarkers[0].lng),
          destination: new window.google.maps.LatLng(markerPosition.lat, markerPosition.lng),
          travelMode: window.google.maps.TravelMode.WALKING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setRouteDirections(result);  // Set it as the response object
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    } else {
      setRouteDirections(null); // Remove the route by setting the directions renderer to null
    }

    setIsRoutingOn(!isRoutingOn); // Toggle the routing state

  };
  const [weatherDataFromAPI, setWeatherDataFromAPI] = useState(null);
  const handleWeatherDataReceived = (data) => {
    setWeatherDataFromAPI(data);
  };

  // Best Times filters
  const busynessOptions = [
    {
      label: 'Quiet',
      value: 'quiet',
    },
    {
      label: 'Busy',
      value: 'busy',
    },
  ];

  const attractionTypeOptions = [
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
    ];


  const nearbyAreaOptions = [
    {
      label: 'Nearby Area',
      value: 'nearbyArea',
    },
  ];
   const [busynessValue, setBusynessValue] = useState();
    const [attractionTypeValue, setAttractionTypeValue] = useState();
    const [nearbyAreaValue, setNearbyAreaValue] = useState();

    const handleBusynessSelect = (newValue) => {
      setBusynessLevels(newValue);
    };

    const handleAttractionTypeSelect = (newValue) => {
      setAttractionTypes(newValue);

    };

    useEffect(() => {
      console.log('Current attraction type value:', attractionTypeValue);
    }, [attractionTypeValue]);

    useEffect(() => {
      console.log('Current attraction type value:', attractionTypeValue);
    }, [attractionTypeValue]);

    const handleNearbyAreaSelect = () => {
      if(nearBy == false){
        setNearBy(true)
      }

      else if(nearBy == true){
        setNearBy(false)
      }
    };

 const onChange = (value) => {
    // console.log(options.value)
    // console.log(value[0][1]);
    // console.log(value.length)
    let busyness = []
    let types = []
    console.log(value)
    setNearBy(false)
    for(let i = 0; i < value.length; i++){
      if(value[i][0] == 'attraction_type'){types.push(value[i][1])}
      else if(value[i][0] == 'busyness'){busyness.push(value[i][1])}
      else if(value[i]=='nearbyArea' ) {
        setNearBy(true)
      }
      
    }



    setAttractionTypes(types)
    setBusynessLevels(busyness)
    
  };
  useEffect(() => {
    console.log(busynessLevels,attractionTypes)
  }, [busynessLevels,attractionTypes,date]);

 
  const handleMarkerClick = (marker) => {
    console.log(marker);
    setSelectedMarker(marker);
    setDrawerVisible(true);
  
    // Use existing data from the marker instead of making a new API call
    if (marker.isBestTime) {
      setDrawerTitle(marker.title)
      setDrawerAddress(marker.address)
      setDrawerOpening(marker.opening_hours) 
      setDrawerRating(marker.rating)
      setBestTimeUsed(true)
    }
  
    // Check if the place is in the saved places
    const isSaved = savedPlaces.some(savedPlace => savedPlace.title === marker.title);
    setIsPlaceSaved(isSaved);

    //Apply data to graphs if filter marker
    if(Object.keys(returnedVenues).includes(marker.title)){
      setMondayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][0]))
      setTuesdayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][1]))
      setWednesdayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][2]))
      setThursdayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][3]))
      setFridayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][4]))
      setSaturdayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][5]))
      setSundayLevel(calculateAverageNonZeroBusyness(returnedVenues[marker.title][6]))

      let selectedDay = (getDay(date.format('DD'), date.format('MM'), date.format('YYYY')))


      let selectedDayBusyness;
          
          if (selectedDay === 'Monday') {
            selectedDayBusyness = returnedVenues[marker.title][0];
          } else if (selectedDay === 'Tuesday') {
            selectedDayBusyness = returnedVenues[marker.title][1];
          } else if (selectedDay=== 'Wednesday') {
            selectedDayBusyness = returnedVenues[marker.title][2];
          } else if (selectedDay === 'Thursday') {
            selectedDayBusyness = returnedVenues[marker.title][3];
          } else if (selectedDay === 'Friday') {
            selectedDayBusyness = returnedVenues[marker.title][4];
          } else if (selectedDay === 'Saturday') {
            selectedDayBusyness = returnedVenues[marker.title][5];
          } else if (selectedDay === 'Sunday') {
            selectedDayBusyness = returnedVenues[marker.title][6];
          }
          
          setDailyBusyness(selectedDayBusyness)
    }

    console.log(Object.keys(returnedVenues),marker.title)
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
    // console.log("Busyness Level:", busyness);
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

  function translateTimes(time){
    let timeVar;
    if (6<=time<=11){timeVar = 'morning'}
    if (12<=time<=17){timeVar = 'afternoon'}
    if (18<=time<=0){timeVar = 'evening'}
    if (21<=time<=5){timeVar = 'night'}

    return timeVar
  }
const [loading, setLoading] = useState(false);
const handleSearch = () => {
  setShouldRemoveMarkers(true);
  setIsSearchButtonClicked(true);
  setSelectedMarker(null);
  let venue_ids;
  const searchResults = [];

  if (!date) {
    console.log('Please Select A Date and Time');
    setLoading(false);
    return; // If no date is selected, terminate the function here
  }

  const fetchData = (queryParamsFilter) => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/get_venues${queryParamsFilter}`)
      .then((response) => {
        console.log(response.data);
        venue_ids = Object.keys(response.data);
        venue_ids.forEach(id => {
          let resultMarker = {
            position: {
              lat: response.data[id].latitude, 
              lng: response.data[id].longitude
            },
            title: response.data[id].venue_name,
            address: response.data[id].venue_address,
            opening_hours: response.data[id].venue_opening_hours,
            rating: response.data[id].rating,
            isBestTime: true
          };
          searchResults.push(resultMarker);
        });

        let busyness_dict = {}
        setReturnedVenues({})
        venue_ids.forEach(id => {
          let dict_name = response.data[id].venue_name
          busyness_dict[dict_name] = [response.data[id].busyness_monday,response.data[id].busyness_tuesday,response.data[id].busyness_wednesday,response.data[id].busyness_thursday,response.data[id].busyness_friday,response.data[id].busyness_saturday,response.data[id].busyness_sunday]
        })
        setReturnedVenues(busyness_dict)
        
        setSearchedPlaces(searchResults);
        setNewMarkers(searchResults.map((marker) => ({
          ...marker,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }
        })));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // Ensuring to stop the loading animation regardless of success or error
      });
  }

  if (nearBy && userMarkers[0]) {
    let userlat = userMarkers[0].lat;
    let userlng = userMarkers[0].lng;
    console.log(userlat, userlng);
    let queryParamsFilter = `?busyness=${busynessLevels}&attraction_type=${attractionTypes}&time=${translateTimes(date.format(format))}&day=${getDay(date.format('DD'), date.format('MM'), date.format('YYYY'))}&latitude=${userlat}&longitude=${userlng}`;
    fetchData(queryParamsFilter);
    
  } else if (nearBy && !userMarkers[0]) {
    console.log('Please set user location to use NearBy Search');
    setLoading(false);
  } else {
    let queryParamsFilter = `?busyness=${busynessLevels}&attraction_type=${attractionTypes}&time=${translateTimes(date.format(format))}&day=${getDay(date.format('DD'), date.format('MM'), date.format('YYYY'))}`;
    fetchData(queryParamsFilter);

  }

  let searchResult = searchResults.find(
    (place) => place.title.toLowerCase() === destination.toLowerCase()
  );

  if (searchResult) {
    setNewMarkers([{
      ...searchResult,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        scaledSize: new window.google.maps.Size(40, 40),
      }
    }]);
  } else {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.findPlaceFromQuery({
      query: destination,
      fields: ["name", "geometry"],
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNewMarkers([{
          position: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          },
          title: results[0].name,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        }]);
      }
    });
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
          }
      const queryParams = `?venue_name=${place.name}&venue_address=${place.formatted_address}&venue_rating=${place.rating}`;

      axios.get(`http://localhost:8000/api/get_forecast${queryParams}`)
        .then((response) => {
          console.log('API Response:', response.data);

        // Add a new marker at the selected place
        let bestTimeMarker;

        bestTimeMarker = {
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          title: place.name,
          address: place.formatted_address, // new property
          opening_hours: response['data'].venue_opening_hours, // new property
          rating: response['data'].rating, // new property
          isBestTime: true, // new property to indicate that this marker has extra info
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        }

        setNewMarkers([
          bestTimeMarker,
        ]);

        setSelectedMarker(bestTimeMarker);

          //Setting Busyness Graph Data(in placeChange)
          setMondayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_monday)))
          setTuesdayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_tuesday)))
          setWednesdayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_wednesday)))
          setThursdayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_thursday)))
          setFridayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_friday)))
          setSaturdayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_saturday)))
          setSundayLevel(calculateAverageNonZeroBusyness(convertStringToArray(response['data'].busyness_sunday)))

          let currentDayOfWeek = (moment().format('dddd'));
          let currentDayBusyness;
          
          if (currentDayOfWeek === 'Monday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_monday);
          } else if (currentDayOfWeek === 'Tuesday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_tuesday);
          } else if (currentDayOfWeek === 'Wednesday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_wednesnday);
          } else if (currentDayOfWeek === 'Thursday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_thursday);
          } else if (currentDayOfWeek === 'Friday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_friday);
          } else if (currentDayOfWeek === 'Saturday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_saturday);
          } else if (currentDayOfWeek === 'Sunday') {
            currentDayBusyness = convertStringToArray(response['data'].busyness_sunday);
          }
          
          setDailyBusyness(currentDayBusyness)


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

    
   
  };
  

  let weeklyChartData = [
    {"category": "Monday", "count": mondayLevel},
    {"category": "Tuesday", "count":tuesdayLevel},
    {"category": "Wednesday", "count": wednesdayLevel},
    {"category": "Thursday", "count": thursdayLevel},
    {"category": "Friday", "count": fridayLevel},
    {"category": "Saturday", "count": saturdayLevel},
    {"category": "Sunday", "count": sundayLevel},
  ]

  const hourlyChartData = [
    { "category": "00:00", "count": dailyBusyness[0]},
    { "category": "01:00", "count": dailyBusyness[1] },
    { "category": "02:00", "count": dailyBusyness[2] },
    { "category": "03:00", "count": dailyBusyness[3] },
    { "category": "04:00", "count": dailyBusyness[4] },
    { "category": "05:00", "count": dailyBusyness[5] },
    { "category": "06:00", "count": dailyBusyness[6] },
    { "category": "07:00", "count": dailyBusyness[7] },
    { "category": "08:00", "count": dailyBusyness[8]},
    { "category": "09:00", "count": dailyBusyness[9] },
    { "category": "10:00", "count": dailyBusyness[10]},
    { "category": "11:00", "count": dailyBusyness[11] },
    { "category": "12:00", "count": dailyBusyness[12] },
    { "category": "13:00", "count": dailyBusyness[13] },
    { "category": "14:00", "count": dailyBusyness[14] },
    { "category": "15:00", "count": dailyBusyness[15] },
    { "category": "16:00", "count": dailyBusyness[16] },
    { "category": "17:00", "count": dailyBusyness[17] },
    { "category": "18:00", "count": dailyBusyness[18] },
    { "category": "19:00", "count": dailyBusyness[19] },
    { "category": "20:00", "count": dailyBusyness[20] },
    { "category": "21:00", "count": dailyBusyness[21] },
    { "category": "22:00", "count": dailyBusyness[22]},
    { "category": "23:00", "count": dailyBusyness[23] },
  ];


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

    // Fetch tour stops when component mounts
    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/get_top_attractions")
        .then(response => {
          const newTourStops = Object.keys(response.data).map(name => {
            const stop = response.data[name];
            return {
              position: { lat: stop.latitude, lng: stop.longitude },
              title: name,
              id: `${stop.latitude}-${stop.longitude}`,
              address: stop.venue_address,
              opening_hours: stop.venue_opening_hours,
              rating: stop.rating,
              busyness: { 
                "Monday": stop.busyness_monday,
                "Tuesday": stop.busyness_tuesday,
                "Wednesday": stop.busyness_wednesday,
                "Thursday": stop.busyness_thursday,
                "Friday": stop.busyness_friday,
                "Saturday": stop.busyness_saturday,
                "Sunday": stop.busyness_sunday,
              },
            };
          });
          setTourStops(newTourStops);
        })
        .catch(err => {
          console.error(err);
        });
    }, []);

  const [showTourStops, setShowTourStops] = useState(true);

  // Add this function to handle the switch's change event
  const handleTourStopsToggle = () => {
    setShowTourStops(!showTourStops);
  };

  const isValidLatLng = (lat, lng) => {
    if (typeof lat !== 'number' || typeof lng !== 'number') return false;
    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) return false;
    return true;
  };
  


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  // React Components Logic 
  return (
   <div className="map-container">
    <div className="sidebar-map-container">

      <Sidebar collapsed={menuCollapse}>
        <div
          className="closemenu"
          onClick={menuIconClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "15px",
          }}
        >
          {/* changing menu collapse icon on click */}
          {menuCollapse ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
              />
            </svg>
          )}
        </div>

        <Menu iconShape="square" style={{ backgroundColor: "#2b3345" }}>
          <MenuItem
            icon={
              <Tooltip
                title={menuCollapse ? "Busyness Prediction" : ""}
                placement="right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bar-chart-line"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                </svg>
              </Tooltip>
            }
            style={{ backgroundColor: "#2b3345" }}
            onClick={handleBusynessPredictionClick}
          >
            Busyness Prediction
          </MenuItem>
         {showTimeConfig && !showAnotherContent && !menuCollapse && (
                                <Card
                                  style={{
                                    backgroundColor: "#3D5152",
                                    color: "#99A3C1",
                                    padding: "5px",
                                    margin: "15px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <h5>Welcome to BusyBudyy</h5>
                                  <p>Want to have a city adventure in Manhattan?</p>
                                  <p> Let's get started!</p>
                                  <Button
                                    type="primary"
                                    onClick={handleNextForBusynessPrediction}
                                    className="button next-button"
                                    style={{ backgroundColor: "#45656C" }}
                                  >
                                    NEXT
                                  </Button>
                                </Card>
                              )}


          {showTimeConfig && showAnotherContent && !menuCollapse && (
            <div className="time-configuration" style={{ padding: "15px" }}>
              {/* Display a heading for the time configuration */}
              <DatePicker
                value={date} // Set the selected date for the DatePicker
                onChange={handleDateChange} // Handle the date change event with the specified function
                onOk={handleApiRequest} // Handle the "OK" button click event with the specified function
                showTime={{ format: format }} // Display time selector with the specified time format
                format={`YYYY-MM-DD ${format}`} // Format for displaying the date and time in the DatePicker
                style={{
                  width: "100%",
                  borderRadius: "5px",
                }} // Set the width of the DatePicker
                    placeholder="Select a date to visit"
              />
            </div>
          )}
          <MenuItem
            active={true}
            icon={
              <Tooltip title={menuCollapse ? "BestTime" : ""} placement="right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                  />
                </svg>
              </Tooltip>
            }
            onClick={handleBestTimeClick}
          >
            BestTime
          </MenuItem>

          {showBestTime && !showOtherContent && !menuCollapse && (
            <Card
              style={{
                backgroundColor: "#3D5152",
                color: "#99A3C1",
                padding: "5px",
                margin: "15px",
                borderRadius: "10px",
              }}
            >
               <h5>Oops! Manhattan is really busy!</h5>
                         <p>Don't worry, you'll always find an exciting place to visit.</p>
              <Button
                type="primary"
                onClick={handleNextForBestTime}
                className="button next-button"
                style={{ backgroundColor: "#45656C" }}
              >
                NEXT
              </Button>
            </Card>
          )}

          {/* Show other content when showBestTime is true and showOtherContent is true */}
          {showBestTime && showOtherContent && !menuCollapse && (
            <>
              <Card
                style={{
                  backgroundColor: "#3D5152",
                  color: "#99A3C1",
                  padding: "10px",
                  margin: "15px",
                  borderRadius: "10px",
                }}
              >
                <p>Got any places in mind?</p>
                <Radio.Group
                  value={destinationKnown}
                  onChange={handleDestinationKnownChange}
                >
                  <Radio style={{ color: "#99A3C1" }} value={true}>
                    Yes, I can't wait to go there!
                  </Radio>
                  <Radio style={{ color: "#99A3C1" }} value={false}>
                    Not yet, but I'm excited to explore!
                  </Radio>
                </Radio.Group>
              </Card>

              {/* Conditionally render based on destinationKnown state */}
              {destinationKnown === true ? (
                // If the user knows the destination, show Autocomplete and "Locate Me" / "Show Route" buttons
                <>
                  <div className="search-bar custom-search-bar">
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
                  <div
                    className="button-container"
                    style={{ margin: "10px", marginLeft: "20px" }}
                  >
                    <Button
                      type="primary"
                      onClick={getUserGeoLocation}
                      className="button geo-button"
                      size="small"
                      style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
                    >
                      Current Location
                    </Button>
                  </div>
                  
                </>
              ) : destinationKnown === false ? (
                // If the user doesn't know the destination, show the filter and "Search" button
                <>
                  <div style={{ margin: "10px" }}>
                    <h6>Busyness Level</h6>
                    <TreeSelect
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                      value={busynessValue}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Select busyness level"
                      allowClear
                      treeDefaultExpandAll
                      onChange={handleBusynessSelect}
                      treeData={busynessOptions}
                    />

                    <h6>Attraction Type</h6>
                    <TreeSelect
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                      value={attractionTypeValue}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Select attraction type"
                      allowClear
                      treeDefaultExpandAll
                      onChange={handleAttractionTypeSelect}
                      treeData={attractionTypeOptions}
                    />

                    <h6>Nearby Area</h6>
                    <TreeSelect
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                      value={nearbyAreaValue}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Select nearby area"
                      allowClear
                      treeDefaultExpandAll
                      onChange={handleNearbyAreaSelect}
                      treeData={nearbyAreaOptions}
                    />

                    <div
                      className="button-container"
                      style={{
                        margin: "10px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={handleSearch}
                        className="button search-button"
                        size="small"
                        style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
                        loading={loading}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </>
              ) : null}
            </>
          )}

          <MenuItem
            icon={
              <Tooltip
                title={menuCollapse ? "Itinerary Route" : ""}
                placement="right"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-truck-front"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7ZM4 2a1 1 0 0 0-1 1v3.9c0 .625.562 1.092 1.17.994C5.075 7.747 6.792 7.5 8 7.5c1.208 0 2.925.247 3.83.394A1.008 1.008 0 0 0 13 6.9V3a1 1 0 0 0-1-1H4Zm0 1h8v3.9c0 .002 0 .001 0 0l-.002.004a.013.013 0 0 1-.005.002h-.004C11.088 6.761 9.299 6.5 8 6.5s-3.088.26-3.99.406h-.003a.013.013 0 0 1-.005-.002L4 6.9c0 .001 0 .002 0 0V3Z" />
                  <path d="M1 2.5A2.5 2.5 0 0 1 3.5 0h9A2.5 2.5 0 0 1 15 2.5v9c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.496 2.496 0 0 1-1-2v-9ZM3.5 1A1.5 1.5 0 0 0 2 2.5v9A1.5 1.5 0 0 0 3.5 13h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 1h-9Z" />
                </svg>
              </Tooltip>
            }
            style={{ backgroundColor: "#2b3345" }}
            onClick={handleItineraryRouteClick}
          >
            Itinerary Route
          </MenuItem>
          {showItinerary && !menuCollapse &&
  <div style={{ backgroundColor: "#2b3345", padding: "10px", borderRadius: "5px" }}>
    <Button 
      onClick={() => setIsItineraryView(!isItineraryView)}
      style={{ 
        marginBottom: '10px', 
        marginLeft: '40px',
        backgroundColor: "#45656C", 
        color: "#FFFFFF",
        display: "flex", 
        justifyContent: "center"
      }}
    >
      {isItineraryView ? "Go to Itinerary Form" : "Go to Itinerary"}
    </Button>
    
    {isItineraryView ? (
      <div
        title="Your Itinerary"
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        height={500}
      >
              <Collapse accordion style={{ borderRadius: '5px', backgroundColor: "#61677A" }}>
                {Object.keys(itineraryByDay).map((date) => (
                  <Panel header={date} key={date} style={{ backgroundColor: "#B7B7B7" }}>
                             <div style={{ backgroundColor: "#D8D9DA", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", padding: "15px" }}>
                             <Timeline>
                {itineraryByDay[date].reduce((acc, item, index) => {
                  let startTime;

                  // If it's the first attraction
                  if (index === 0) {
                    startTime = moment(item.time.split('-')[0].trim(), 'HH:mm');
                  } else {
                    // Otherwise, take the end time of the last attraction added to the accumulator
                    const previousEndTime = moment(acc[acc.length - 1].endTime, 'HH:mm');
                    const previousTravelTime = acc[acc.length - 1].travelTime ? parseInt(acc[acc.length - 1].travelTime.split(' ')[0]) : 0;
                    startTime = previousEndTime.clone().add(previousTravelTime, 'minutes');
                  }

                  // Calculate the end time as start time + 2 hours
                  const endTime = startTime.clone().add(2, 'hours').format('HH:mm');
                  startTime = startTime.format('HH:mm');

                  // Add the current attraction to the accumulator, including its calculated end time
                  acc.push({ ...item, startTime, endTime });
                  return acc;
                }, []).map((item, index, itemsArray) => (
                  <Timeline.Item key={index}>
                    <div>
                      <b>{`${item.startTime} - ${item.endTime}`}</b> <br />
                    </div>
                    <div>
                      Visit {item.title}
                    </div>
                    <div>
                      Hours: {item.openingHours}
                    </div>
                    {/* Check if it's not the last item before showing the walking time */}
                    {index !== itemsArray.length - 1 && (
                      <div>
                        Estimated walking time: {item.travelTime}
                      </div>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>

                             </div>
      
      
                  </Panel>
                ))}
              </Collapse>
            </div>
               ) : (
                 <Form
                   form={form}
                   name="itinerary"
                   layout="vertical"
                   onFinish={onFinish}
                   initialValues={{ itinerary: "" }}
                   style={{ padding: "15px" }}
                 >
                   <Form.Item
                     name="dateRange"
                     label="Start and End Date"
                     rules={[{ required: true, message: 'Please input your date range!' }]}
                   >
                     <DatePicker.RangePicker
                      format="YYYY-MM-DD"
                      disabledDate={(current) => {
                          // Disable dates that are before today's date
                          return current && current < moment().startOf('day');
                      }}
                  />


                                    </Form.Item>
                                    <Form.Item
                      name="startEndHour"
                      label="Visiting Hours"
                      rules={[{ required: true, message: 'Please select the start and end hour!' }]}
                  >
                  <TimePicker.RangePicker
                      format="HH"
                      hideDisabledOptions
                      disabledTime={() => {
                          return {
                              disabledHours: () => {
                                  return [...Array(8).keys(), 23];
                              }
                          };
                      }}
                  />


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
                   <Form.Item
                    name="displayRoute"
                    valuePropName="checked"
                  >
                      <Switch
                          checkedChildren={<span style={{ fontSize: '16px' }}>Display Route</span>}
                          unCheckedChildren={<span style={{ fontSize: '16px' }}>Hide Route</span>}
                          style={{ width: "150px", height: "40px" }}
                          onChange={(checked) => {
                              if (form.getFieldValue('markers') === 'top20') {
                                  setDisplayRoute(checked);
                                  setShowTourStops(!checked);  // Also toggle showTourStops
                              }
                              else {
                                  setDisplayRoute(checked);
                                  // here you may decide whether to setShowTourStops or not depending on your requirement.
                              }
                          }}
                      />
                  </Form.Item>
                   <Form.Item style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
                     <Button type="primary" htmlType="submit" style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}>
                       Generate Itinerary
                     </Button>
                   </Form.Item>
                 </Form>
               )}
             </div>
          }
            <MenuItem
                      icon={
                        <Tooltip
                          title={menuCollapse ? "Weather Forecast" : ""}
                          placement="right"
                        >
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                           <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                         </svg>
                        </Tooltip>
                      }
                      style={{ backgroundColor: "#2b3345" }}

                    >
                     <WeatherForecast onWeatherDataReceived={handleWeatherDataReceived} />
                                               {weatherDataFromAPI && (
                                                 <div>
                                                   <table>
                                                   </table>
                                                 </div>
                                               )}
                    </MenuItem>
          </Menu>
      </Sidebar>
    </div>



      <div className="map">

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={mapCenter} // use mapCenter instead of center
          options={{
            styles: darkMode ? darkMapStyles : defaultMapStyles, 
          }}
          onClick={handleMapClick}
          onLoad={map => {
            mapRef.current = map;
            setMapCenter({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
          }}
          ref={mapRef}>
          {displayRoute && directionsRenderer.map((result, i) => (
  <DirectionsRenderer directions={result} key={i} />
  ))}
    {routeDirections && <DirectionsRenderer directions={routeDirections} options={{ suppressMarkers: true }} />}
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
              <p><strong>Temperature:</strong> {currentWeather.main.temp}Ã‚Â°C</p>
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
                        top: "10px",
                        right: "249px",
                      }}
                    >
                      <Switch
                      size="small"
                        style={{
                          width: "150px", //2x wider
                          height: "35px" //2x taller
                        }}
                        checkedChildren={<div style={{ fontSize: "12px" }}>Manhattan Zones</div>} //increased font size
                        unCheckedChildren={<div style={{ fontSize: "12px" }}>Basic Map</div>} //increased font size
                        onChange={handlePredictionToggle}
                        checked={showPrediction}
                      />
                    </div>
                    <>
                      <Switch
                        checked={showLegend}
                        onChange={(checked) => setShowLegend(checked)}
                        style={{
                          position: "absolute",

                          top: "8px",
                          right: "68px",
                          fontFamily: "Arial, sans-serif",

                          color: "#333",
                          width: "150px", // 2x wider
                          height: "35px", // 2x taller
                          fontSize: "12px",
                        }}
                        checkedChildren={<div style={{ fontSize: "12px" }}>Legend</div>}
                        unCheckedChildren={<div style={{ fontSize: "12px" }}>Legend</div>}
                      ></Switch>

          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "249px",
            }}
          >
           <Switch
             size="small"
             style={{
               width: "150px", // 2x wider
               height: "35px", // 2x taller
             }}
             checkedChildren={<div style={{ fontSize: "12px" }}>Top 20 Attractions</div>}
             unCheckedChildren={<div style={{ fontSize: "12px" }}>Top 20 Attractions</div>}
             onChange={handleTourStopsToggle}
             checked={showTourStops}
           />
          </div>

          <div
            style={{
              position: "absolute",
              top: "56px",
              right: "68px",
            }}
          >
            <Switch
              size="small"
              style={{
                width: "150px",
                height: "35px",
              }}
              checkedChildren={<div style={{ fontSize: "12px" }}>Saved Places</div>}
              unCheckedChildren={<div style={{ fontSize: "12px" }}>Saved Places</div>}
              onChange={handleSavedPlacesToggle}
              checked={showSavedPlaces}
            />
            </div>

      {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#e6dcdc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div className="box">
              <div className="cat">
                <div className="cat__body"></div>
                <div className="cat__body"></div>
                <div className="cat__tail"></div>
                <div className="cat__head"></div>
              </div>

      <blockquote className="info">

      </blockquote>

      <div className="intro">
        Cat Loading
         <small>Meow</small>
      </div>
    </div>

            </div>
          )}
          {showSavedPlaces && savedPlaces.map((place) => {
  // Check if the lat and lng are valid before rendering the Marker
  if (!isValidLatLng(place.latitude, place.longitude)) return null;

  return (
    <Marker
      key={`${place.latitude}-${place.longitude}`}
      position={{ lat: place.latitude, lng: place.longitude }}
      icon={"http://maps.google.com/mapfiles/kml/pal3/icon63.png"}
      onClick={() => handleMarkerClick({ 
        position: { lat: place.latitude, lng: place.longitude }, 
        title: place.saved_place, 
        id: place.id,
        address: place.venue_address, 
        opening_hours: place.opening_hours,
        rating: place.rating,
        busyness: place.busyness
      })}
      onMouseOver={() =>
        handleMarkerMouseOver({ 
          position: { lat: place.latitude, lng: place.longitude }, 
          title: place.saved_place, 
          id: place.id,
          address: place.venue_address, 
          opening_hours: place.opening_hours,
          rating: place.rating,
          busyness: place.busyness
        })
      }
      onMouseOut={handleMarkerMouseOut}
    />
  );
})}


{showTourStops && tourStops.map(({ position, title, id, address, opening_hours, rating, busyness}) => (
            <Marker
              key={`${position.lat}-${position.lng}`}
              position={position}
    onClick={() => handleMarkerClick({ position, title, id, address, opening_hours, rating, busyness})}
              onMouseOver={() =>
      handleMarkerMouseOver({ position, title, id, address, opening_hours, rating, busyness })
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
              onClick={() => handleMarkerClick(marker)}
              onMouseOver={() => handleMarkerMouseOver(marker)}
              onMouseOut={handleMarkerMouseOut}
            />
          ))}

            {showLegend && (
              <>
                <BusyLegend />
               <Card
                              style={{
                                position: "absolute",
                                top: "457px", // Change this value to 110px to move the legend 100px lower
                                left: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                padding: "15px",
                                borderRadius: "8px",
                                color: "#333",
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(0, 0, 0, 0.1)",
                                fontFamily: "Arial, sans-serif",
                                height: "18vh",
                              }}

                >
                  <h3
                    style={{ marginBottom: "15px", fontWeight: "bold", fontSize: "18px" }}
                  >
                    Marker Legend
                  </h3>
                  <div
                    className="marker-legend"
                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img
                        src="https://maps.google.com/mapfiles/ms/icons/purple-dot.png"
                        alt="User Marker"
                      />
                      User Marker
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img
                        src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        alt="Top 20 Attractions Marker"
                      />
                      Top 20 Attractions
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img
                        src="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                        alt="Best Time Marker"
                      />
                      Best Time Marker
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <img
                        src="http://maps.google.com/mapfiles/kml/pal3/icon63.png"
                        alt="Saved Place Marker"
                      />
                      Saved Places
                    </div>
                  </div>
                </Card>
              </>
            )}
          </>;

        </GoogleMap>
      </div>
   <Drawer
     open={drawerVisible}
     onClose={handleDrawerClose}
     direction="right"
     width={600}
     disableOverlay={false}
     style={{ overflow: 'auto', backgroundColor: "#2b3345",
                                  color: "#DCD7C9",width: "380px",
                                                       height: "100vh"}}
   >
     {selectedMarker && !bestTimeUsed ? (
     <Card style={{ width: "100%", height: "1000px" , backgroundColor: "#2b3345",
                                                                                      color: "#DCD7C9"}} className="m-4">
       <Card.Header>
         <Card.Title
           style={{  fontSize: "16px", fontWeight: "bold",  color: "#DCD7C9" }}
         >
           {selectedMarker.title}
         </Card.Title>
       </Card.Header>
       <Card.Body >
         <Card.Text style={{ fontStyle: "italic", color: "#DCD7C9" }}>
         <span>Rating: {selectedMarker.rating}</span>
           <div className="rating ml-2" style={{ color: "yellow" }}>
           <Rate disabled allowHalf value={selectedMarker.rating} />
           </div>
         </Card.Text>

         <Card.Text style={{ fontStyle: "italic", color: "#DCD7C9" }}>
         Opening Hours: {selectedMarker.opening_hours}
         </Card.Text>
         <Card.Text style={{ fontStyle: "italic", color: "#DCD7C9" }}>
         Address: {selectedMarker.address}
         </Card.Text>
         <Card.Text style={{ fontStyle: "italic", color: "#DCD7C9" }}>
         Busyness:   
         </Card.Text>
         <div className="form-check form-switch">
           <Tooltip title="Saved Place" placement="right" size="small">
             <input
               className="form-check-input"
               type="checkbox"
               id="toggleSwitch"
             checked={isPlaceSaved}
               onChange={handleToggle}
             />
             <label className="form-check-label" htmlFor="toggleSwitch">
               {/* Toggle label */}
             </label>
           </Tooltip>
         </div>
         <Button
          type="primary"
          onClick={() => handleRouting(selectedMarker.position)}
          className="button routing-button mt-3" // added margin-top for some spacing
          size="small"
          style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
        >
          {isRoutingOn ? "Remove Route" : "Show Route"}
        </Button>

       </Card.Body>
     </Card>

     ) : selectedMarker && bestTimeUsed ? (
     <Card style={{ width: "100%", height: "1000px" , backgroundColor: "#2b3345",
                                                                                           color: "#DCD7C9"}} className="m-4">
            <Card.Header>
              <Card.Title
                style={{  fontSize: "16px", fontWeight: "bold",  color: "#DCD7C9" }}
          >
            {drawerTitle}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ fontStyle: 'italic' , color: "#DCD7C9" }}>
            {drawerRating 
              ? <>Rating: {drawerRating}
            <span className="rating ml-2" style={{ color: 'yellow' }}>
              <Rate disabled allowHalf value={drawerRating} />
            </span>
                </>
              : 'No Rating Available'
            }
          </Card.Text>
          <Card.Text style={{ fontStyle: 'italic' , color: "#DCD7C9" }}>Opening Hours: {drawerOpening}</Card.Text>
          <Card.Text style={{ fontStyle: 'italic', color: "#DCD7C9"  }}>Address: {drawerAddress}</Card.Text>
          <Card.Text style={{ fontStyle: 'italic', color: "#DCD7C9"  }}>Busyness: {}</Card.Text>

          <WeeklyChart data={weeklyChartData}></WeeklyChart>
              <br></br>
          <DailyChart data={hourlyChartData}></DailyChart>
          
          <div className="form-check form-switch">
          <div>
          <div>Save Place
            <Tooltip title="Save Place" placement="right" size="small">
              <div
                className={`toggle-btn ${isPlaceSaved ? 'active' : ''}`}
                onClick={handleToggle}
              >
              
                <div className="toggle-label"></div>
              </div>
            </Tooltip>
          </div>
            </div>
          </div>
          <Button
            type="primary"
            onClick={() => handleRouting(selectedMarker.position)}
            className="button routing-button mt-3" // added margin-top for some spacing
            size="small"
            style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
          >
            {isRoutingOn ? "Remove Route" : "Show Route"}
          </Button>

        </Card.Body>
      </Card>

     ) : (
       <div>
         {isSearchButtonClicked &&
           searchedPlaces.map((place) => (
            <div key={place.placeId} className="searched-place">
            <Card style={{ width: "100%", height: "1000px" , backgroundColor: "#2b3345",
                                                                                                  color: "#DCD7C9"}} className="m-4">
                   <Card.Header>
                     <Card.Title
                       style={{  fontSize: "16px", fontWeight: "bold",  color: "#DCD7C9" }}
                  >
                    {place.title}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text style={{ fontStyle: 'italic' , color: "#DCD7C9" }}>
                  {place.rating 
                    ? <>Rating: {place.rating}
                    <span className="rating ml-2" style={{ color: 'yellow' }}>
                      <Rate disabled allowHalf value={place.rating} />
                    </span>
                      </>
                    : 'No Rating Available'
                  }
                  </Card.Text>
                  <Card.Text style={{ fontStyle: 'italic' , color: "#DCD7C9" }}>
                    Opening Hours: {place.openingHours}
                  </Card.Text>
                  <Card.Text style={{ fontStyle: 'italic', color: "#DCD7C9"  }}>
                    Address: {place.address}
                  </Card.Text>
                  <Card.Text style={{ fontStyle: 'italic', color: "#DCD7C9"  }}>
                    Busyness: {place.busyness}
                  </Card.Text>
                  <div className="form-check form-switch">
                    <div className="save-place-wrapper">
                        <div className="save-place-label">Save Place</div>
                        <Tooltip 
                            title="Save Place" 
                            placement="right" 
                            size="small"
                        >
                            <div
                                className={`toggle-btn ${isPlaceSaved ? 'active' : ''}`}
                                onClick={handleToggle}
                            >
                                <div className="toggle-label"></div>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <Button
                  type="primary"
                  onClick={() => handleRouting(place.position)}
                  className="button routing-button mt-3" // added margin-top for some spacing
                  size="small"
                  style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
                >
                  {isRoutingOn ? "Remove Route" : "Show Route"}
                </Button>

                </Card.Body>
              </Card>
            </div>

           ))}
       </div>
     )}
   </Drawer>

    </div>

  );
};

export default Map;