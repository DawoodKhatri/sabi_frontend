import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpRequest from "../../utils/request";
import Map from "../../libs/map";

const RestaurantDashboardDetails = () => {
  const [restaurant, setRestaurant] = useState();
  const { id } = useParams();

  useEffect(() => {
    httpRequest(`/api/restaurant/${id}`, "GET").then((response) => {
      if (response.success) {
        setRestaurant(response.data);
      }
    });
  }, []);

  return (
    <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 m-4 rounded">
      {restaurant && (
        <>
          <img
            src={restaurant.thumbnail.url}
            className="restoImages d-block w-100 mx-auto rounded"
            style={{ objectFit: "cover", aspectRatio: 3 }}
          />
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 d-flex flex-wrap align-content-center">
              <div>
                <h2 className="text-yellow mt-4 mb-2 mx-2">
                  {restaurant.name}
                </h2>
                <p className="my-2 mx-3 fw-semibold">
                  {restaurant.description}
                </p>
                <p className="mx-3 my-1">{restaurant.address.line}</p>
                <p className="mx-3 my-1">{restaurant.address.locality}</p>
                <p className="mx-3 my-1">{restaurant.address.pinCode}</p>
                <p className="mx-3 my-1">
                  Cuisines: {restaurant.cuisines.toString()}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex flex-wrap justify-content-center align-content-center py-4">
              <Map
                location={restaurant.address.location}
                disableClick={true}
                className="w-100 rounded"
                style={{
                  border: "1px solid #d9d9d9",
                  height: "205px",
                }}
              />
            </div>
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default RestaurantDashboardDetails;
