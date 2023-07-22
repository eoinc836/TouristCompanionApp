import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
 const format = 'HH';
const validZones = [
  262, 261, 249, 246, 244, 243, 263, 238, 237, 236, 234, 233, 232, 239, 231,
  230, 229, 224, 211, 209, 202, 194, 186, 166, 170, 164, 163, 162, 161, 158,
  153, 148, 144, 143, 152, 142, 141, 137, 140, 151, 128, 127, 120, 116, 114,
  113, 107, 103, 100, 125, 90, 88, 87, 75, 74, 79, 68, 50, 48, 43, 42, 45, 41,
  13, 12, 24, 4
];

const Busyness = () => {
  const [date, setDate] = useState(null);

  const updateMap = useCallback(() => {
    if (!date) return;

    const year = 2023;
    const hour = date.format("HH");
    const month = date.format("MM") - 1;
    const dayOfMonth = date.format("DD");
    const dayOfWeek = new Date(year, month, dayOfMonth).getDay();

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7831, lng: -73.9712 },
      zoom: 13
    });

   const fetchGeoJSONData = () => {
            fetch('http://localhost:8000/api/geoJson')
              .then((response) => response.json())
              .then((data) => {
                console.log(data.features[0]); // Print out one feature
                data.features = data.features.filter((feature) =>
                  validZones.includes(parseInt(feature.properties.location_id))
                );
                map.data.addGeoJson(data);
                updateMap(); // Initial map update
              })
              .catch((error) => {
                console.error("Error fetching JSON data:", error);
              });
          };

       const getZoneColor = (busyness) => {
             if (busyness <= 28) {
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

       const predictPromises = [];

    map.data.forEach(function (feature) {
       const zoneId = parseInt(feature.getProperty("location_id"), 10);
       predictPromises.push(
         new Promise(function (resolve, reject) {
           if (date) {
             const hour = date.format(format);
             const month = date.format("MM");
             const dayOfMonth = date.format("DD");

             const url = `/api/predict?hour=${hour}&month=${month}&day_of_month=${dayOfMonth}`;

             axios
               .get(url)
               .then((response) => {
                 const busyness = response.data.busyness;
                 console.log("Busyness for zone " + zoneId + ": " + busyness);
                 const color = getZoneColor(busyness);
                 map.data.overrideStyle(feature, {
                   fillColor: color,
                   fillOpacity: 0.5,
                 });
                 feature.setProperty("color", color);
                 resolve();
               })
               .catch((error) => {
                 console.error(error);
                 reject();
               });
           }
         })
       );
     });

       Promise.all(predictPromises).then(function () {
         console.log("All predictions complete");
         window.google.maps.event.trigger(map, "resize");
       });

       fetchGeoJSONData();
     }, [date]);

     useEffect(() => {
       updateMap();
     }, [updateMap]);

     const handleTimeChange = (time, timeString) => {
       console.log(time, timeString);
     };

     const handleDateChange = (date, dateString) => {
       setDate(date);
       console.log(date, dateString);
     };



  return (
    <div>
      <DatePicker onChange={handleDateChange} onOk={updateMap} />
      <div id="map" style={{ height: "500px", width: "100%" }} />
    </div>
  );
};

export default Busyness;
