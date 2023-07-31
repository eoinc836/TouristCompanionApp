import React, { useEffect, useState, useRef, useCallback } from "react";
import { GoogleMap, Marker, LoadScript, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer, Switch, Button, Cascader, DatePicker, Select, Form, Collapse, List, Typography, Space, Card, TimePicker, } from "antd";
import axios from "axios";
import { Autocomplete } from "@react-google-maps/api";
import "antd/dist/antd.css";
import "./Map.scss";
import moment from "moment";
import WeatherForecast from './WeatherForecast';

const { Panel } = Collapse;
const { Option } = Select;
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
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [date, setDate] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [newMarkers, setNewMarkers] = useState([]);

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

  // Google Maps API
  useEffect(() => {
    const getPlaceDetails = async (placeId) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&place_id=${placeId}&fields=name,rating,formatted_address,opening_hours`
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
  const getZoneColor = (busyness) => {
    console.log("Busyness Level:", busyness);
    if (busyness === 0 || isNaN(busyness)) {
      return "rgba(248, 248, 248, 0)"; // Fully transparent
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
>>>>>>> Stashed changes

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
        setNewMarkers([
          {
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            title: place.name,
            icon: {
              url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          },
        ]);
      }
  
      console.log(place);

    
    }
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


      <div className="map">

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
        checkedChildren={<div style={{fontSize: "16px"}}>Manhattan Zones</div>} //increased font size
        unCheckedChildren={<div style={{fontSize: "16px"}}>Basic Map</div>} //increased font size
        onChange={handlePredictionToggle}
        checked={showPrediction}
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