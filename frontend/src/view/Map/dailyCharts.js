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
    width: 280,
    encoding: {
      x: { field: 'Hour', type: 'ordinal' },
      y: { field: 'Busyness', type: 'quantitative' },
    },
    data: { values: formattedData }, // Pass the data to Vega-Lite
  };

  return <VegaLite spec={spec} />;
};

export default DailyChart;