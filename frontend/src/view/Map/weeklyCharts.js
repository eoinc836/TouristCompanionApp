import React from 'react';
import { VegaLite } from 'react-vega';

const WeeklyChart = ({ data }) => {
  // Convert the data to the format expected by Vega-Lite
  const formattedData = data.map(({ category, count }) => ({
    'Day of the Week': category,
    'Busyness': count !== null ? count : Math.floor(Math.random() * 81), // Replace null with a random number between 0 and 80
    'IsRandom': count === null,
  }));

  // Check if random values (null values) are present
  const hasRandomValues = formattedData.some(entry => entry.IsRandom);

  const spec = {
    // Vega-Lite specification goes here
    // You can define your visualization here and use the "data" prop as the data source
    mark: 'bar',
    width: 150,
    encoding: {
      x: { field: 'Day of the Week', type: 'ordinal' },
      y: {
        field: 'Busyness',
        type: 'quantitative',
        axis: { title: 'Busyness Percentage' }, // Y-axis title
      },
      color: { field: 'IsRandom', type: 'nominal', scale: { range: ['#65827E', 'red'] }, legend: null },
    },
    data: { values: formattedData }, // Pass the data to Vega-Lite
    config: {
      background: '#2b3345', // Background color of the entire chart area
      view: {
        stroke: 'transparent', // Border color of the chart area
      },
      axis: {
        labelFont: 'Arial',
        titleFont: 'Arial',
        titleColor: '#DCD7C9', // Axis and title color
        labelColor: '#DCD7C9', // Axis label color
      },
    },
  };

  return (
    <div>
      <VegaLite spec={spec} />
      {hasRandomValues && (
        <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>Note: Due to a lack of data for this location this graph is an example.</p>
      )}
    </div>
  );
};

export default WeeklyChart;
