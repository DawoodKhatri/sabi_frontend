import React, { useState } from "react";
import AddressDetails from "./addRestaurantForm/addressDetails";
import BasicDetails from "./addRestaurantForm/basicDetails";

const AddRestaurantForm = () => {
  const [error, setError] = useState();
  return (
    <>
      <div className="card rounded rounded-4 text-center m-auto w-100">
        <div className="card-header">
          <p className="card-title display-6 fw-normal py-3">Add Restaurant</p>
        </div>
        <div className="card-body px-4">
          <div className="card-text text-start">
            <div className="row">
              <div className="col-md-6">
                <BasicDetails />
              </div>
              <div className="col-md-6">
                <AddressDetails />
              </div>
            </div>

            {error && (
              <div className="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                <label className="form-label mx-3 my-1 text-danger">
                  {error}
                </label>
              </div>
            )}
            <div className="mt-4 mb-2 text-center">
              <button className="btn btn-warning">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRestaurantForm;
