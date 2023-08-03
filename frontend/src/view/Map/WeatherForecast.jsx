import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse } from 'antd';
const WeatherForecast = ({ onWeatherDataReceived }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Panel } = Collapse;
  const getWeatherData = async () => {
    // Check if already loading data
    if (isLoading) {
      console.log('Already loading weather data. Please wait.');
      return;
    }

    // Set loading flag to true
    setIsLoading(true);

    // Get the last API call timestamp from local storage
    const lastApiCallTimestamp = localStorage.getItem('lastApiCallTimestamp');

    // Check if the API was called today
    const today = new Date().toISOString().slice(0, 10);
    if (lastApiCallTimestamp === today) {
      // Weather data is available in local storage
      const savedWeatherData = JSON.parse(localStorage.getItem('weatherData'));
      setWeatherData(savedWeatherData);
      setIsLoading(false); // Reset loading flag
      return;
    }
    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: 40.7143,
            longitude: -74.006,
            daily: 'weathercode,temperature_2m_max',
            timezone: 'GMT',
            forecast_days: 6, // Fetching 6 days forecast as the JSON response has 6 days data
          },
        }
      );
      setWeatherData(response.data);
      onWeatherDataReceived(response.data);
      // Save the current timestamp and weather data in local storage
      localStorage.setItem('lastApiCallTimestamp', today);
      localStorage.setItem('weatherData', JSON.stringify(response.data));
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log('Too Many Requests. Please try again later.');
      } else {
        console.error('Error fetching weather data:', error);
      }
    } finally {
      setIsLoading(false); // Reset loading flag
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [onWeatherDataReceived]);

  const renderWeatherTable = () => {

    if (!weatherData || !weatherData.daily) {
      return "";
    }

    const formatDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      const options = {
        day: "numeric",
        month: "numeric",
      };
      return dateObj.toLocaleDateString("en-GB", options);
    };

    const weatherIcons = {
      0: require("../../assets/sun.png"),
      1: require("../../assets/partly-cloudy.gif"),
      2: require("../../assets/partly-cloudy.gif"),
      3: require("../../assets/partly-cloudy.gif"),
      45: require("../../assets/fog.gif"),
      48: require("../../assets/fog.gif"),
      51: require("../../assets/drizzle.gif"),
      53: require("../../assets/drizzle.gif"),
      55: require("../../assets/drizzle.gif"),
      56: require("../../assets/drizzle.gif"),
      57: require("../../assets/drizzle.gif"),
      61: require("../../assets/rain.gif"),
      63: require("../../assets/rain.gif"),
      65: require("../../assets/rain.gif"),
      66: require("../../assets/rain.gif"),
      67: require("../../assets/rain.gif"),
      80: require("../../assets/rain.gif"),
      81: require("../../assets/rain.gif"),
      82: require("../../assets/rain.gif"),
      71: require("../../assets/snowflake.gif"),
      73: require("../../assets/snowflake.gif"),
      75: require("../../assets/snowflake.gif"),
      77: require("../../assets/snowflake.gif"),
      85: require("../../assets/snowflake.gif"),
      86: require("../../assets/snowflake.gif"),
      95: require("../../assets/storm.gif"),
      96: require("../../assets/storm.gif"),
      99: require("../../assets/storm.gif"),
    };

    const getWeatherIconPath = (code) => {
      const weatherCodeGroup = Object.entries(weatherIcons).find(([key, value]) =>
        key.split(',').map(Number).includes(code)
      );
      return weatherCodeGroup ? weatherCodeGroup[1] : "";
    };

    return (
      <table className="table">
        <thead>
          <tr>

            {weatherData.daily.time.map((date, index) => (
              <th key={index}>{formatDate(date)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>

            {weatherData.daily.temperature_2m_max.map((temp, index) => (
              <td key={index}>{temp} &deg;C</td>
            ))}
          </tr>
          <tr>

            {weatherData.daily.weathercode.map((code, index) => (
              <td key={index}>
                <img
                  src={getWeatherIconPath(code)}
                  alt="Weather Icon"
                  className="weather-icon"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="weather-forecast">
         <Collapse defaultActiveKey={['1']}>
           <Panel header="Weather Forecast" key="1">
             {renderWeatherTable()}
           </Panel>
         </Collapse>
       </div>
     );
   };


export default WeatherForecast;