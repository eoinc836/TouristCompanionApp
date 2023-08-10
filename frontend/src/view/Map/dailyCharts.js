import React from 'react';
import { VegaLite } from 'react-vega';

const DailyChart = ({ data }) => {
  // Convert the data to the format expected by Vega-Lite
  const formattedData = data.map(({ category, count }) => ({
    'Hour': category,
    'Busyness': count,
  }));

  console.log(formattedData)

  const spec = {
    // Vega-Lite specification goes here
    // You can define your visualization here and use the "data" prop as the data source
    mark: 'bar',
    width: 300,
    encoding: {
      x: { field: 'Hour', type: 'ordinal' },
       y: {
              field: 'Busyness',
              type: 'quantitative',
              axis: { title: 'Busyness Percentage' }, // Y-axis title
            },
       color: { value: '#65827E' },
    },
    data: { values: formattedData },
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

  return <VegaLite spec={spec} />;
};

export default DailyChart;