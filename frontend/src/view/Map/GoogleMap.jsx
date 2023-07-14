import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";
import { Drawer } from "antd";
import axios from "axios";

const GoogleMapMap = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 40.7831,
                lng: -73.9712,
  };


  const zoom = 14;

 const tourStops = [
   {
     position: { lat: 40.7829, lng: -73.9654 },
     title: "Central Park",
     placeId: "ChIJ4zGFAZpYwokRGUGph3Mf37k",
   },
   {
     position: { lat: 40.7589, lng: -73.9851 },
     title: "Times Square",
     placeId: "ChIJmQJIxlVYwokRLgeuocVOGVU",
   },
   {
     position: { lat: 40.7488, lng: -73.9857 },
     title: "Empire State Building",
     placeId: "ChIJtcaxrqlZwokRfwmmibzPsTU",
   },

   {
     position: { lat: 40.7794, lng: -73.9632 },
     title: "The Metropolitan Museum of Art",
     placeId: "ChIJb8Jg9pZYwokR-qHGtvSkLzs",
   },
   {
     position: { lat: 40.7590, lng: -73.9845 },
     title: "Broadway",
     placeId: "ChIJEUd4ZVZYwokR9mtgzHTtv1s",
   },
   {
     position: { lat: 40.6892, lng: -74.0445 },
     title: "Statue of Liberty",
     placeId: "ChIJPTacEpBQwokRKwIlDXelxkA",
   },
   {
     position: { lat: 40.7587, lng: -73.9787 },
     title: "Rockefeller Center",
     placeId: "EiVSb2NrZWZlbGxlciBDZW50ZXIsIE5ldyBZb3JrLCBOWSwgVVNBIi4qLAoUChIJI6lzvP5YwokRf36nzqqs4_0SFAoSCTsIP9OlT8KJEWL-d-EGjwvI",
   },
   {
     position: { lat: 40.7479, lng: -74.0048 },
     title: "The High Line",
     placeId: "ChIJ5bQPhMdZwokRkTwKhVxhP1g",
   },
   {
     position: { lat: 40.7527, lng: -73.9772 },
     title: "Grand Central Terminal",
     placeId: "ChIJ-b2RmVlZwokRpb1pwEQjss0",
   },
   {
     position: { lat: 40.7115, lng: -74.0134 },
     title: "9/11 Memorial and Museum",
     placeId: "ChIJe7vKMf9YwokRIMYfDz7iF9o",
   },
   {
     position: { lat: 40.7614, lng: -73.9776 },
     title: "Museum of Modern Art (MoMA)",
     placeId: "ChIJe7vKMf9YwokRIMYfDz7iF9o",
   },
   {
     position: { lat: 40.7536, lng: -73.9832 },
     title: "Bryant Park",
     placeId: "ChIJKxDbe_lYwokRVf__s8CPn-o",
   },
   {
     position: { lat: 40.7423, lng: -74.0060 },
     title: "Chelsea Market",
     placeId: "ChIJvbGg56pZwokRp_E3JbivnLQ",
   },
   {
     position: { lat: 40.7411, lng: -73.9897 },
     title: "Flatiron Building",
     placeId: "ChIJw2lMFL9ZwokRosAtly52YX4",
   },
   {
     position: { lat: 40.7587, lng: -73.9763 },
     title: "St. Patrick's Cathedral",
     placeId: "ChIJZx8c96NZwokRJklw7SVhKt4",
   },
   {
     position: { lat: 40.7813, lng: -73.9738 },
     title: "American Museum of Natural History",
     placeId: "ChIJCXoPsPRYwokRsV1MYnKBfaI",
   },
   {
     position: { lat: 40.7714, lng: -73.9679 },
     title: "The Frick Collection",
     placeId: "ChIJHRH97uxYwokR6CBeDyn1jtg",
   },
   {
     position: { lat: 40.7308, lng: -73.9973 },
     title: "Washington Square Park",
     placeId: "ChIJjX494pBZwokRGH620d9eYfo",
   },
   {
     position: { lat: 40.7069, lng: -74.0113 },
     title: "Wall Street and the Financial District",
     placeId: "EhpXYWxsIFN0LCBOZXcgWW9yaywgTlksIFVTQSIuKiwKFAoSCavM7VsWWsKJEQGutQPw3bIsEhQKEgk7CD_TpU_CiRFi_nfhBo8LyA",
   },
   {
     position: { lat: 40.7587, lng: -73.9788 },
     title: "Top of the Rock Observation Deck",
     placeId: "ChIJe7vKMf9YwokRIMYfDz7iF9o",
   },
 ];


  const { isLoaded, loadError } = useLoadScript({
     googleMapsApiKey: "AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA",
     libraries: ["places"],
   });


  const [selectedMarker, setSelectedMarker] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [placeDetails, setPlaceDetails] = useState([]);

  useEffect(() => {
  const getPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA-vxxFyGSdqhaGkOwnfGhp-klnkMLRQJA&place_id=${placeId}&fields=name,formatted_address,opening_hours`
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

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <Drawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        width={400}
        placement="right"
      >
        {selectedMarker && (
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>Description: {placeDetails.name}</p>
            <p>Opening Hours: {placeDetails.opening_hours?.weekday_text?.join(", ")}</p>
            <p>Rating: {placeDetails.rating}</p>
            <p>Reviews: {placeDetails.reviews?.length}</p>
            {/* 其他地点详细信息的显示 */}
          </div>
        )}
      </Drawer>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}>
        {tourStops.map(({ position, title, placeId }) => (
          <Marker
            key={`${position.lat}-${position.lng}`}
            position={position}
            onClick={() => handleMarkerClick({ position, title, placeId })}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapMap;