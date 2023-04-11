import React, { useEffect, useRef, useState } from "react";
import { mapButton, mapLoader } from "../utils/map";
import blueMarker from "../assets/svg/blueMapMarker.svg";

const Places = () => {
  const inputRef = useRef();
  const [autoComplete, setAutoComplete] = useState();
  useEffect(() => {
    mapLoader.load().then((google) => {
      setAutoComplete(
        new google.maps.places.Autocomplete(inputRef.current, {
          fields: ["address_components", "geometry", "icon", "name"],
        })
      );
    });
  }, []);

  const getPlaces = () => {
    console.log(autoComplete.getPlaces());
  };
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={getPlaces}>Get Places</button>
    </div>
  );
};

export default Places;
