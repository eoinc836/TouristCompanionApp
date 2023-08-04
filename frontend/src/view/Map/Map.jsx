import React, { useEffect, useState, useRef, useCallback } from "react";
<<<<<<< Updated upstream
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Cascader, DatePicker, Select, Form, Collapse, List, Typography, Space, Card, TimePicker, } from "antd";
=======
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Card, TreeSelect, DatePicker, Select, Tooltip, Radio, Checkbox, Form, TimePicker, Collapse, List, Space, Typography,} from "antd";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
>>>>>>> Stashed changes
import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";
import "antd/dist/antd.css";
import "./Map.scss";
import moment from "moment";
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
import WeatherForecast from './WeatherForecast';

const { Panel } = Collapse;
const { Option } = Select;
<<<<<<< Updated upstream
const { Text, Title } = Typography;

// Top 20 attractions Markers
const tourStops = [

  {
    position: { lat: 40.779437, lng: -73.963244 },
    title: "The Metropolitan Museum of Art",
    placeId: "ChIJb8Jg9pZYwokR-qHGtvSkLzs",
  },
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
    position: { lat: 40.759012, lng: -73.984472 },
    title: "Broadway",
    placeId: "ChIJEcHIDhZYwokRSlKSVPyxiBw",
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
  {
    position: { lat: 40.689249, lng: -74.0445 },
    title: "Statue of Liberty",
    placeId: "ChIJPTacEpBQwokRKwIlDXelxkA",
  },
];

=======
const { Panel } = Collapse;
const { Text, Title } = Typography;

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
      <div style={{marginBottom: "15px", fontWeight: "bold", fontSize: "18px"}}>
        Area Busyness    
      </div>
      {[
        { busyness: 28, label: 'Very Low'},
        { busyness: 138, label: 'Low'},
        { busyness: 536, label: 'Medium'},
        { busyness: 8000, label: 'High'},
        { busyness: 15001, label: 'Very High'},
      ].map(({busyness, label}) => (
        <div style={{display: "flex",  alignItems: "center", marginBottom: "10px"}} key={label}>
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes

  useEffect(() => {
    // update the map center only during the initial rendering
    setMapCenter(center);
<<<<<<< Updated upstream
}, []);
=======
  }, []);
>>>>>>> Stashed changes

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

const handleBestTimeClick = () => {
  setShowBestTime(!showBestTime);
};

const handleNext = () => {
  setShowOtherContent(true);
};
const handleBusynessPredictionClick = () => {
  setShowTimeConfig(!showTimeConfig); // Toggle the visibility of the time configuration
};
const [showTimeConfig, setShowTimeConfig] = useState(false);
const [showItinerary, setShowItinerary] = useState(false);

const handleItineraryRouteClick = () => {
  setShowItinerary(!showItinerary); // Toggle the visibility of the Itinerary component
};
const [destinationKnown, setDestinationKnown] = useState(null);
const handleDestinationKnownChange = (event) => {
  setDestinationKnown(event.target.value);
};


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

const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

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
    setIsActive((prevIsActive) => !prevIsActive);
    // Update the toggle status for the selectedMarker's title
    setPlaceToggleStatus((prevStatus) => ({
      ...prevStatus,
      [selectedMarker.title]: !isActive,
    }));

    if (!isActive) {
      const data = {
        username: username,
        saved_place: selectedMarker.title,
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
const [isFormSubmitted, setIsFormSubmitted] = useState(false);
const [isItineraryView, setIsItineraryView] = useState(false);
const allFieldNames = form.getFieldValue(); // Get all the field values
const fieldNamesToReset = Object.keys(allFieldNames).filter(name => name !== 'displayRoute'); // Exclude 'displayRoute'


  const calculateDistance = (location1, location2) => {
    const radlat1 = Math.PI * location1.lat / 180;
    const radlat2 = Math.PI * location2.lat / 180;
    const theta = location1.lng - location2.lng;
    const radtheta = Math.PI * theta / 180;
    let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  };
  
  const generateItinerary = (startEndHour, dateRange) => {
    const totalHoursInDay = startEndHour[1] - startEndHour[0];
    const hoursPerAttraction = 2;
    let itinerary = [];
    let itineraryMapping = {}; 
  
    let currentDay = moment(dateRange[0]);
    let currentHour = startEndHour[0];
  
    let sortedTourStops = [...tourStops];
  
    // Finding two farthest places
    let maxDist = -1;
    let farthestPair = [0, 1];  // initialize with the first two places
    for (let i = 0; i < sortedTourStops.length - 1; i++) {
        for (let j = i + 1; j < sortedTourStops.length; j++) {
            let dist = calculateDistance(
                sortedTourStops[i].position,
                sortedTourStops[j].position
            );
            if (dist > maxDist) {
                maxDist = dist;
                farthestPair = [i, j];
            }
        }
    }

    // Set the first and last stops to be the farthest pair
    const startAttraction = sortedTourStops[farthestPair[0]];
    const endAttraction = sortedTourStops[farthestPair[1]];
    sortedTourStops = sortedTourStops.filter((stop, index) => index !== farthestPair[0] && index !== farthestPair[1]);
    sortedTourStops.unshift(startAttraction);
    sortedTourStops.push(endAttraction);
  
    sortedTourStops.forEach((stop, index) => {
      if (currentHour + hoursPerAttraction > startEndHour[1]) {
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
        position: stop.position, 
      });
  
      itineraryMapping[stop.title] = stop.position; 
  
      currentHour += hoursPerAttraction;
    });
  
    setItinerary(itineraryMapping);
  
    return itinerary;
  }
  
    
  const onFinish = async (values) => {
    if (values.markers === "top20") {
      if (!Array.isArray(values.startEndHour) || values.startEndHour.length !== 2 || !Array.isArray(values.dateRange) || values.dateRange.length !== 2) {
        console.error('Invalid input for start and end hours or date range!');
        return;
      }
      const newItinerary = generateItinerary(
        [values.startEndHour[0].hour(), values.startEndHour[1].hour()],
        [values.dateRange[0].format('YYYY-MM-DD'), values.dateRange[1].format('YYYY-MM-DD')]
      );
      setItineraryList(newItinerary);
      setVisible(true);
      setIsFormSubmitted(true);
  
      // If displayRoute is enabled, calculate route for tour stops
  if (form.getFieldValue('displayRoute')) {
    // Create an array of waypoints for all tour stops except the first and last ones
    const waypoints = newItinerary.slice(1, newItinerary.length - 1).map(stop => {
      return {
        location: new window.google.maps.LatLng(stop.position.lat, stop.position.lng),
        stopover: true,
      };
    });

    // Create a new directions service
    const directionsService = new window.google.maps.DirectionsService();

    // Request a direction route from Google Maps API
    const result = await new Promise((resolve, reject) => {
      directionsService.route({
        origin: new window.google.maps.LatLng(newItinerary[0].position.lat, newItinerary[0].position.lng),
        destination: new window.google.maps.LatLng(newItinerary[newItinerary.length - 1].position.lat, newItinerary[newItinerary.length - 1].position.lng),
        waypoints: waypoints,
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

    // Add new result to directionsRenderer array
    setDirectionsRenderer([result]);
  }
  // Reset form fields
  form.resetFields(fieldNamesToReset);
};
  };
  
   
    const itineraryByDay = itineraryList.reduce((acc, curr) => {
      acc[curr["date"]] = acc[curr["date"]] || [];
      acc[curr["date"]].push(curr);
      return acc;
    }, {});
  


// Add a new state for route visibility
const [isRoutingOn, setIsRoutingOn] = useState(false);
// Add a new state for the directions renderer instance
const [directionsRenderer, setDirectionsRenderer] = useState([]);
const [itinerary, setItinerary] = useState({});
const [displayRoute, setDisplayRoute] = useState(false);

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [itineraryList, setItineraryList] = useState([]);
  const [directionsServiceOptions, setDirectionsServiceOptions] = useState(null);
const [directionsServiceCallback, setDirectionsServiceCallback] = useState(null);
const [displayTourStopsRoute, setDisplayTourStopsRoute] = useState(false);


const calculateDistance = (location1, location2) => {
  const radlat1 = Math.PI * location1.lat / 180;
  const radlat2 = Math.PI * location2.lat / 180;
  const theta = location1.lng - location2.lng;
  const radtheta = Math.PI * theta / 180;
  let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
      dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
};

const generateItinerary = (startEndHour, dateRange) => {
  const totalHoursInDay = startEndHour[1] - startEndHour[0];
  const hoursPerAttraction = 2;
  let itinerary = [];
  let itineraryMapping = {}; 

  let currentDay = moment(dateRange[0]);
  let currentHour = startEndHour[0];

  let sortedTourStops = [...tourStops];

  // Force start at "The Metropolitan Museum of Art"
  const startAttraction = sortedTourStops.find(stop => stop.title === "The Metropolitan Museum of Art");
  sortedTourStops = sortedTourStops.filter(stop => stop.title !== "The Metropolitan Museum of Art");
  sortedTourStops.unshift(startAttraction);

  for (let i = 0; i < sortedTourStops.length - 1; i++) {
    let minDistIndex = i + 1;
    let minDist = calculateDistance(
      sortedTourStops[i].position,
      sortedTourStops[i + 1].position
    );
    for (let j = i + 2; j < sortedTourStops.length; j++) {
      let dist = calculateDistance(
        sortedTourStops[i].position,
        sortedTourStops[j].position
      );
      if (dist < minDist) {
        minDistIndex = j;
        minDist = dist;
      }
    }
    let temp = sortedTourStops[i + 1];
    sortedTourStops[i + 1] = sortedTourStops[minDistIndex];
    sortedTourStops[minDistIndex] = temp;
  }

  // Force end at "Statue of Liberty"
  const endAttraction = sortedTourStops.find(stop => stop.title === "Statue of Liberty");
  sortedTourStops = sortedTourStops.filter(stop => stop.title !== "Statue of Liberty");
  sortedTourStops.push(endAttraction);

  sortedTourStops.forEach((stop, index) => {
    if (currentHour + hoursPerAttraction > startEndHour[1]) {
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
      position: stop.position, 
    });

    itineraryMapping[stop.title] = stop.position; 

    currentHour += hoursPerAttraction;
  });

  setItinerary(itineraryMapping);

  return itinerary;
}



const onFinish = (values) => {
  if (values.markers === "top20") {
    if (!Array.isArray(values.startEndHour) || values.startEndHour.length !== 2 || !Array.isArray(values.dateRange) || values.dateRange.length !== 2) {
      console.error('Invalid input for start and end hours or date range!');
      return;
    }
    const newItinerary = generateItinerary(
      [values.startEndHour[0].hour(), values.startEndHour[1].hour()],
      [values.dateRange[0].format('YYYY-MM-DD'), values.dateRange[1].format('YYYY-MM-DD')]
    );
    setItineraryList(newItinerary);
    setVisible(true);

    // If displayRoute is enabled, calculate route for tour stops
    if (form.getFieldValue('displayRoute')) {
      // Create an array of waypoints for all tour stops except the first and last ones
      const waypoints = newItinerary.slice(1, newItinerary.length - 1).map(stop => {
        return {
          location: new window.google.maps.LatLng(stop.position.lat, stop.position.lng),
          stopover: true,
        };
      });

      // Create a new directions service
      const directionsService = new window.google.maps.DirectionsService();
  
      // Request a direction route from Google Maps API
      directionsService.route({
        origin: new window.google.maps.LatLng(newItinerary[0].position.lat, newItinerary[0].position.lng),
        destination: new window.google.maps.LatLng(newItinerary[newItinerary.length - 1].position.lat, newItinerary[newItinerary.length - 1].position.lng),
        waypoints: waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Add new result to directionsRenderer array
          setDirectionsRenderer(prevState => [...prevState, result]);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  }
};






  const itineraryByDay = itineraryList.reduce((acc, curr) => {
    acc[curr["date"]] = acc[curr["date"]] || [];
    acc[curr["date"]].push(curr);
    return acc;
  }, {});


    
    

  const mapRef = useRef(null);
  // Add a new state for route rendering status
  const [isRouteRendered, setIsRouteRendered] = useState(false);
  const [directionsResult, setDirectionsResult] = useState(null); // Directions result state
  // In your handleRouting function, remove the part where you instantiate DirectionsService yourself and set the options for DirectionsService
const handleRouting = () => {
  if (!isRoutingOn) {
    if (!userMarkers[0] || !newMarkers[0]) {
      alert("Both the user and the destination need to be defined for routing.");
    } else {
      setDirectionsServiceOptions({
        origin: new window.google.maps.LatLng(userMarkers[0].lat, userMarkers[0].lng),
        destination: new window.google.maps.LatLng(newMarkers[0].position.lat, newMarkers[0].position.lng),
        travelMode: window.google.maps.TravelMode.WALKING,
      });
      setIsRoutingOn(true);  // Update routing state here
    }
  } else {
    setDirectionsResult(null);
    setDirectionsServiceOptions(null);
    setIsRoutingOn(false);
  }
};

<<<<<<< Updated upstream
// Define a new callback for the DirectionsService component
const handleDirectionsResult = (result) => {
  if (directionsServiceOptions) {
    setDirectionsResult(result);
  } else {
    setDirectionsResult(null);
  }
};
  

// Best Times filters
  const options = [
=======
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
  const busynessOptions = [
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======

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
      setBusynessValue(newValue);
    };

    const handleAttractionTypeSelect = (newValue) => {
      setAttractionTypeValue(newValue);
    };

    const handleNearbyAreaSelect = (newValue) => {
      setNearbyAreaValue(newValue);
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream

  // Prediction variables 
const format = 'HH'; // The format for time (e.g., "HH:mm")
const map = useRef(null); // Reference to the Google Maps instance
const validZones = [  262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231,
  230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158,
  153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114,
  113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41,
  13, 12, 24, 4 ];

<<<<<<< Updated upstream
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
=======
=======

  // Prediction variables 
  const format = 'HH'; // The format for time (e.g., "HH:mm")
  const map = useRef(null); // Reference to the Google Maps instance
  const validZones = [262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231,
    230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158,
    153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114,
    113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41,
    13, 12, 24, 4];

  // Busyness Coloration 
>>>>>>> Stashed changes
  const getZoneColor = (busyness) => {
    console.log("Busyness Level:", busyness);
    const opacity = 1; // Set your desired opacity here

    if (busyness === 0 || isNaN(busyness)) {
<<<<<<< Updated upstream
      return "rgba(248, 248, 248, 0)"; // Fully transparent
=======
      return `rgba(248, 248, 248, ${opacity})`; // Transparent color for no data or invalid busyness value
>>>>>>> Stashed changes
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
>>>>>>> Stashed changes

<<<<<<< Updated upstream
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
=======
  // Handle time change event
  const handleTimeChange = (time, timeString) => {
    setSelectedTime(time);
    setShowPrediction(true);
    console.log(time, timeString);
>>>>>>> Stashed changes
  };
  fetchData();
}, []); // Assuming you only want to fetch data on initial render

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes



  // Declare the new state variable
  const [previousDate, setPreviousDate] = useState(null);


<<<<<<< Updated upstream
// Handle API request to get predictions
const handleApiRequest = useCallback(() => {
  if (!showPrediction) return;
  if (date) {
    const hour = date.format(format);
    const month = date.format('MM');
    const dayOfMonth = date.format('DD');

=======
  // Handle API request to get predictions
  const handleApiRequest = useCallback(() => {
    if (!showPrediction) return;
    if (date) {
      const hour = date.format(format);
      const month = date.format('MM');
      const dayOfMonth = date.format('DD');
>>>>>>> Stashed changes


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

<<<<<<< Updated upstream
=======

  useEffect(() => {
    // Only perform an API request if the selected date has actually changed
    if (date && (!previousDate || !date.isSame(previousDate))) {

      handleApiRequest();
      setPreviousDate(date);
    }
  }, [date, previousDate, handleApiRequest]);
>>>>>>> Stashed changes

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

  const handleSearch = () => {
    setShouldRemoveMarkers(true);
    setIsSearchButtonClicked(true);
    setSelectedMarker(null);
<<<<<<< Updated upstream
  
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
=======
    let venue_ids;
    const searchResults = []
    if (!date)
    {console.log('Please Select A Date and Time')}

    else if(nearBy && userMarkers[0]){
      let userlat = userMarkers[0].lat
      let userlng = userMarkers[0].lng
      setNearBy(false)
      console.log(userlat,userlng)
      //CODE TO IMPLEMENT NEAR BY SEARCH
      let queryParamsFilter;
      queryParamsFilter =`?busyness=${busynessLevels}&attraction_type=${attractionTypes}&time=${translateTimes(date.format(format))}&day=${getDay(date.format('DD'),date.format('MM'),date.format('YYYY'))}&latitude=${userlat}&longitude=${userlng}`;
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

    else if(nearBy && !userMarkers[0]){
      console.log('Please set user location to use NearBy Search')
    }
    else if (date && !nearBy){
    let queryParamsFilter;
    queryParamsFilter =`?busyness=${busynessLevels}&attraction_type=${attractionTypes}&time=${translateTimes(date.format(format))}&day=${getDay(date.format('DD'),date.format('MM'),date.format('YYYY'))}`;
    
    axios.get(`http://localhost:8000/api/get_venues${queryParamsFilter}`)
    .then((response) => {
      
      console.log(response.data)
      venue_ids =  Object.keys(response.data)
      venue_ids.forEach(id => {
        
      let resultMarker = {position: {lat:response.data[id].latitude, lng:response.data[id].longitude}, title: response.data[id].venue_name}
      searchResults.push(resultMarker)

      });

      setSearchedPlaces(searchResults);
      setNewMarkers(
>>>>>>> Stashed changes
      searchResults.map((marker) => ({
        ...marker,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      }))

    );

<<<<<<< Updated upstream
    // Add this part
let searchResult = searchResults.find(
  (place) =>
    place.title.toLowerCase() === destination.toLowerCase()
);
  
=======
      
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
      service.findPlaceFromQuery(
        {
          query: destination,
          fields: ["name", "geometry"],
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
<<<<<<< Updated upstream
=======
   
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
=======

>>>>>>> Stashed changes
      // Set the center of the map to the coordinates of the selected place
      if (place.geometry && place.geometry.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        // Add a new marker at the selected place
<<<<<<< Updated upstream
        setNewMarkers([
          {
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
=======
        let bestTimeMarker;

        bestTimeMarker = {
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
                    },
>>>>>>> Stashed changes
            title: place.name,
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
<<<<<<< Updated upstream
          },
        ]);
      }
  
      console.log(place);

    
=======
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
>>>>>>> Stashed changes
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

    // Fetch tour stops when component mounts
    useEffect(() => {
      // replace 'http://127.0.0.1:8000' with your backend's URL
      axios.get('http://127.0.0.1:8000/api/get_top_attractions')
        .then(response => {
          // Convert received data into tourStops format
          const newTourStops = Object.keys(response.data).map(name => {
            const stop = response.data[name];
            return {
              position: { lat: stop.latitude, lng: stop.longitude },
              title: name,
              // Add a unique ID for each stop since we no longer have placeId
              id: `${stop.latitude}-${stop.longitude}`
            };
          });
          setTourStops(newTourStops);
        })
        .catch(error => console.error(error));
    }, []);

  const [showTourStops, setShowTourStops] = useState(true);

  // Add this function to handle the switch's change event
  const handleTourStopsToggle = () => {
    setShowTourStops(!showTourStops);
  };


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
   <div className="map-container" style={{ backgroundColor: '#2b3345' }}>
    <div style={{ backgroundColor: "#2b3345" }}>
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

<<<<<<< Updated upstream
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
    <Form.Item
  name="displayRoute"
  valuePropName="checked"
>
  <Switch 
    checkedChildren={<span style={{ fontSize: '16px' }}>Display Route</span>} 
    unCheckedChildren={<span style={{ fontSize: '16px' }}>Hide Route</span>}
    style={{ width: "150px", height: "40px" }} 
    onChange={(checked) => setDisplayRoute(checked)} 
  />
</Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Show Itinerary
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
              visible={visible}
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
      </div>
=======
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
>>>>>>> Stashed changes

          {showTimeConfig && (
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

          {showBestTime && !showOtherContent && (
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
                onClick={handleNext}
                className="button next-button"
                style={{ backgroundColor: "#45656C" }}
              >
                NEXT
              </Button>
            </Card>
          )}

          {/* Show other content when showBestTime is true and showOtherContent is true */}
          {showBestTime && showOtherContent && (
            <>
              <Card
                style={{
                  backgroundColor: "#3D5152",
                  color: "#99A3C1",
                  padding: "5px",
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
                  <div
                    className="button-container"
                    style={{ margin: "10px", marginLeft: "20px" }}
                  >
                    <Button
                      type="primary"
                      onClick={handleRouting}
                      className="button routing-button"
                      size="small"
                      style={{ backgroundColor: "#45656C", color: "#FFFFFF" }}
                    >
                      {isRoutingOn ? "Remove Route" : "Show Route"}
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
                  class="bi bi-truck-front"
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
          {showItinerary && 
  <div style={{ backgroundColor: "#2b3345", padding: "10px", borderRadius: "5px" }}>
    <Button 
      onClick={() => setIsItineraryView(!isItineraryView)}
      style={{ marginBottom: '10px' }}
    >
      {isItineraryView ? "Go to Form View" : "Go to Itinerary View"}
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
                  <div style={{ backgroundColor: "#D8D9DA", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", padding: "10px" }}>
                    {itineraryByDay[date].map((item, index) => (
                      <List.Item key={index}>
                        <Space direction="vertical">
                          <Text strong>{item.time}</Text>
                          <Text> - Visit {item.title}</Text>
                        </Space>
                      </List.Item>
                    ))}
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
                        setDisplayRoute(checked);
                        setShowTourStops(!checked);  // Also toggle showTourStops
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
          </Menu>
      </Sidebar>
    </div>;

      <div className="map">

<<<<<<< Updated upstream
      <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={zoom}
    center={mapCenter}
    onClick={handleMapClick}
    onLoad={map => {
        mapRef.current = map;
    }}
    ref={mapRef}
>

{displayRoute &&
    directionsRenderer.map((result, index) => (
      <DirectionsRenderer
        options={{ 
          directions: result, 
          preserveViewport: true, // Add this line
        }}
        key={index}
      />
  ))
}
{directionsServiceOptions && (
    <DirectionsService
      options={directionsServiceOptions}
      callback={handleDirectionsResult}
    />
)}
{isRoutingOn && directionsResult && (
    <DirectionsRenderer options={{ directions: directionsResult, preserveViewport: true }} />
)}

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
    <div style={{marginBottom: "15px", fontWeight: "bold", fontSize: "18px"}}>
      Current Weather
    </div>
    <p><strong>Temperature:</strong> {currentWeather.main.temp}°C</p>
        <p><strong>Condition:</strong> {currentWeather.weather[0].description}</p>
    {currentWeather.weather[0].icon && (
      <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
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
=======
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
          {displayRoute && directionsRenderer.map((result, i) => (
  <DirectionsRenderer directions={result} key={i} />
  ))}
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

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
      


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
=======


          {showTourStops && tourStops.map(({ position, title, id }) => (
                <Marker
                  key={id}
                  position={position}
                  onClick={() => handleMarkerClick({ position, title, id })}
                  onMouseOver={() => handleMarkerMouseOver({ position, title, id })}
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
>>>>>>> Stashed changes
          {newMarkers.map((marker, index) => (
            <Marker
              key={`new-marker-${index}`}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
            />
          ))}
<<<<<<< Updated upstream
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
        checkedChildren={<div style={{fontSize: "16px"}}>Manhattan Zones</div>} //increased font size
        unCheckedChildren={<div style={{fontSize: "16px"}}>Basic Map</div>} //increased font size
        onChange={handlePredictionToggle}
        checked={showPrediction}
    />
</div>
=======
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
>>>>>>> Stashed changes
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