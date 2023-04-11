import React from "react";
import Places from "../../../libs/places";

const AddressDetails = () => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="line"
          placeholder="Enter your restaurant address"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Locality</label>
        <input
          className="form-control"
          name="locality"
          placeholder="Enter your restaurant locality"
        />
      </div>
      <Places/>
    </>
  );
};

export default AddressDetails;
