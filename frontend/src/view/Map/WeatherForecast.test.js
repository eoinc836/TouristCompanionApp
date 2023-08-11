import React from 'react';
import { render } from '@testing-library/react';
import WeatherForecast from './WeatherForecast';

test('displays weather icons', () => {
  const weatherData = {
    daily: {
      weathercode: [0, 1, 2, 3, 45], // Add more weather codes if needed
    },
  };
  const { getAllByAltText } = render(<WeatherForecast onWeatherDataReceived={() => {}} />);
  
  const iconElements = getAllByAltText('Weather Icon');
  expect(iconElements.length).toBe(weatherData.daily.weathercode.length);
});

test('displays temperature', () => {
  const weatherData = {
    daily: {
      temperature_2m_max: [25, 30, 28, 26, 22], 
    },
  };
  const { getAllByText } = render(<WeatherForecast onWeatherDataReceived={() => {}} />);
  
  weatherData.daily.temperature_2m_max.forEach(temp => {
    const tempElement = getAllByText(`${temp} °C`);
    expect(tempElement.length).toBe(1);
  });
});
