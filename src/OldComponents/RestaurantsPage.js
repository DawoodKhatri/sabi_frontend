import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "./Map";
import Details from "./Restaurant/Details";

const RestaurantsPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState();
  const api = process.env.REACT_APP_SERVER;

  useEffect(() => {
    fetch(`${api}/restaurant/${id}`).then((res) =>
      res.json().then((data) => {
        setRestaurant(data.restaurant);
      })
    );
  }, []);
  return (
    <>
      {restaurant && (
        <div className="container-fluid shadow w-auto my-3 mx-3 p-4 rounded">
          <img
            src={restaurant.images[0]}
            className="restoImages d-block w-100 mx-auto rounded"
            style={{ width: "100%", objectFit: "cover", aspectRatio: 2.8 }}
          />
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 d-flex flex-wrap align-content-center">
              <div>
                <h1 className="text-warning mt-4 mb-2 mx-2">
                  {restaurant.name}
                </h1>
                <p className="my-2 mx-3 fs-5">
                  {restaurant.cuisines.map(
                    (cuisine, i) => `${i > 0 ? ", " : ""}${cuisine}`
                  )}
                </p>
                <p className="mx-3 my-1">{restaurant.address}</p>
                <p className="mx-3 my-1">
                  Contact: {restaurant.contacts.toString()}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex flex-wrap justify-content-center align-content-center py-4">
              <Map location={restaurant.location} className="w-100 rounded-8"
            style={{
              border: "1px solid #d9d9d9",
              height: "205px",
            }}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantsPage;
