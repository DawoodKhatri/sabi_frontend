import { Loader } from "@googlemaps/js-api-loader";
import crossHair from "../assets/svg/mapCrosshair.svg";
import marker from "../assets/svg/mapMarker.svg";

export const mapLoader = new Loader({
  apiKey: "AIzaSyDYnsc3xs3i7xLMt30NFrl25Dbcx7_UXjU", //This is test api key
  libraries: ["places"],
});

export const mapButton = (type) => {
  const controlButton = document.createElement("button");
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.margin = "3px 10px";
  controlButton.style.padding = "0";
  controlButton.style.textAlign = "center";
  controlButton.style.backgroundImage = `url(${
    type === "current" ? crossHair : marker
  })`;
  controlButton.style.backgroundRepeat = "no-repeat";
  controlButton.style.width = "40px";
  controlButton.style.height = "40px";
  controlButton.type = "button";
  return controlButton;
};
