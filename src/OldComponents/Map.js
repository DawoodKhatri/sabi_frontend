import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = ({ location, className, style }) => {
  const mapRef = useRef();

  const mapLoader = new Loader({
    // apiKey: "AIzaSyDYnsc3xs3i7xLMt30NFrl25Dbcx7_UXjU", //This is test api key
    libraries: ["places"],
  });
  console.log(location);

  useEffect(() => {
    mapLoader.load().then((google) => {
      const initMap = new google.maps.Map(mapRef.current, {
        zoom: 16,
        center: location,
        streetViewControl: false,
      });

      const marker = new google.maps.Marker({ map: initMap });
      marker.setPosition(location);
      initMap.panTo(location);
    });
  }, []);

  return <div ref={mapRef} className={className} style={style}></div>;
};

export default Map;
