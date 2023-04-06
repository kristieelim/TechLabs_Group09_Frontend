import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

export default function GoogleMap2(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }
  async function getCurrentLocation() {
    // Try HTML5 geolocation.
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            resolve(pos);
          },
          () => {
            reject("Error querying geolocation");
          }
        );
      } else {
        reject("Browser doesn't support Geolocation");
      }
    });
  }
  async function calculateRoute() {
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }

    let points = Object.values(props.points_of_interest);
    let current_location;
    try {
      current_location = await getCurrentLocation();
    } catch (error) {
      current_location = null;
      alert(`Could not get geolocation: ${error}`);
    }
    if (current_location !== null) points.unshift(current_location);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      waypoints: points
        .slice(1, points.length - 1)
        .map((v) => ({ location: v })),
      origin: points[0],
      destination: points[points.length - 1],
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="70%" w="70%">
        {/* Google Map Box */}
        <GoogleMap
          center={props.points_of_interest.center}
          zoom={15}
          mapContainerStyle={{ width: "60%", height: "80%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {/* <Marker position={center} />
          <Marker position={kaufland} />
          <Marker position={nobisPriten} />
          <Marker position={aldi} />
          <Marker position={lemongrass} />
          <Marker position={backwerk} />
          <Marker position={hilal} /> */}

          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      {/* <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      > */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button colorScheme='teal' size='lg'
            type="button"
            value="Calculate Routes"
            onClick={calculateRoute}
          >
            Calculate Routes
          </Button>
        </div>
      

      {/* </Box> */}
    </Flex>
  );
}
