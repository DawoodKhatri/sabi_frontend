import React, { useEffect, useRef, useState } from "react";
import { mapButton, mapLoader } from "../utils/map";
import blueMarker from "../assets/svg/blueMapMarker.svg";

const Map = ({
  address,
  location,
  setLocation,
  setMapData,
  disableClick,
  className,
  style,
}) => {
  const mapRef = useRef();
  const [map, setMap] = useState();
  const [currLocation, setCurrLocation] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrLocation({ lat: latitude, lng: longitude });
      }
    );
    mapLoader.load().then((google) => {
      const initMap = new google.maps.Map(mapRef.current, {
        zoom: 16,
        streetViewControl: false,
      });

      setMap(initMap);
      setMarker(new google.maps.Marker({ map: initMap }));
    });
  }, []);

  useEffect(() => {
    if (map && currLocation) {
      map.setCenter(currLocation);

      if (!disableClick) {
        map.addListener("click", (event) => {
          setLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
        });
      } else {
        if (marker) {
          marker.setPosition(location);
          map.panTo(location);
        }
      }

      mapLoader.load().then((google) => {
        const currPosButton = mapButton("current");
        currPosButton.addEventListener("click", () => {
          map.panTo(currLocation);
          map.setZoom(16);
        });

        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
          currPosButton
        );

        const markPosButton = mapButton("marker");
        markPosButton.addEventListener("click", () => {
          if (marker.position) {
            map.panTo(marker.position);
            map.setZoom(16);
          }
        });

        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
          markPosButton
        );

        new google.maps.Marker({
          position: currLocation,
          map: map,
          icon: blueMarker,
        });
      });
    }
  }, [map, currLocation]);

  useEffect(() => {
    if (marker) {
      marker.setPosition(location);
      map.panTo(location);

      if (setMapData) {
        mapLoader.load().then((google) => {
          new google.maps.Geocoder().geocode({ location }, (data) => {
            const address = data[0].formatted_address;

            const locality = data[0].address_components
              .filter(
                (component) =>
                  component.types.includes("sublocality") ||
                  component.types.includes("locality")
              )
              .map((component) => component.long_name)
              .join(", ");

            const areaPinCode = data[0].address_components.filter((component) =>
              component.types.includes("postal_code")
            )[0].long_name;

            setMapData({
              address,
              locality,
              areaPinCode,
            });
          });
        });
      }
    }
  }, [location]);

  useEffect(() => {
    mapLoader.load().then((google) => {
      new google.maps.Geocoder().geocode({ address }, (data) => {
        data &&
          setLocation({
            lat: data[0].geometry.location.lat(),
            lng: data[0].geometry.location.lng(),
          });
      });
    });
  }, [address]);

  return <div ref={mapRef} className={className} style={style}></div>;
};

export default Map;
