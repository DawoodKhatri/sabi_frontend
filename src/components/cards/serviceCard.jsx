import React from "react";

const ServiceCard = ({ image, title, text }) => {
  return (
    <>
      <div className="container py-3" style={{ width: "17rem" }}>
        <img className="w-25 m-3" src={image} alt="" />
        <h5 className="card-title text-danger m-2">{title}</h5>
        <p className="card-text m-2">{text}</p>
      </div>
    </>
  );
};

export default ServiceCard;
