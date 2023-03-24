import React, { useEffect } from "react";
import { ChakraProvider, theme } from '@chakra-ui/react'


function Map() {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }, []);

  return (
  
    <div id="map" style={{ height: "500px", width: "100%" }}>
      {/* map will be rendered here */}
    </div>
 
  );
}

export default Map;