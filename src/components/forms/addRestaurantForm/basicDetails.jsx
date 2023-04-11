import React from "react";

const BasicDetails = () => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Restaurant Name</label>
        <input
          className="form-control"
          name="name"
          placeholder="Enter your restaurant name"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Restaurant Thumbnail</label>
        <input className="form-control" type="file"></input>
      </div>
      <div className="mb-3">
        <label className="form-label">Restaurant Description</label>
        <textarea
          className="form-control"
          name="description"
          placeholder="Enter your restaurant description"
        />
      </div>
    </>
  );
};

export default BasicDetails;
