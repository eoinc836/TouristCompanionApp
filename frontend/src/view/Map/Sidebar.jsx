import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { TimePicker, DatePicker, Select, Button, Dropdown, Space, Menu, Cascader  } from "antd";
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import type { MenuProps } from 'antd';

const { Option } = Select;

const Sidebar = () => {
  const [destination, setDestination] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [date, setDate] = useState(null);


  const format = 'HH';

  const options = [
    {
      label: 'Place Type',
      value: 'placeType',
      children: [
        {
          label: 'Restaurant',
          value: 'restaurant',
        },
        {
          label: 'Cafe',
          value: 'cafe',
        },
        {
          label: 'Park',
          value: 'park',
        },
        {
          label: 'Museum',
          value: 'museum',
        },
        {
          label: 'Shopping Mall',
          value: 'shopping-mall',
        },
        {
          label: 'Theater',
          value: 'theater',
        },
        {
          label: 'Historical Site',
          value: 'historical-site',
        },
        {
          label: 'Art Gallery',
          value: 'art-gallery',
        },
        {
          label: 'Nightclub',
          value: 'nightclub',
        },
        {
          label: 'Sports Stadium',
          value: 'sports-stadium',
        },
      ],
    },
    {
      label: 'Busyness Level',
      value: 'busynessLevel',
      children: [
        {
          label: 'Busy',
          value: 'busy',
        },
        {
          label: 'Moderate',
          value: 'moderate',
        },
        {
          label: 'Quiet',
          value: 'quiet',
        },
      ],
    },
    {
      label: 'Nearby Area',
      value: 'nearbyArea',
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA",
    libraries: ["places"],
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  let autocomplete;

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
    // Perform search logic based on input and selected options
    // Show busy markers on the map
    // Display relevant destination cards in the sidebar
  };

  return (

      <div className="sidebar">
        <div className="search-bar">
          {isLoaded && (
            <Autocomplete
              onLoad={(auto) => (autocomplete = auto)}
              onPlaceChanged={() =>
                handlePlaceSelected(autocomplete.getPlace())
              }
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
                        style={{ width: '100%' }}
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
        {/* Destination cards in the sidebar */}
      </div>

  );
};

export default Sidebar;
