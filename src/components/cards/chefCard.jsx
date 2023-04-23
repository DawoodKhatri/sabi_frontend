import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/cards.module.css";

const ChefCard = ({
  _id,
  photo,
  name,
  age,
  gender,
  rating,
  reviews,
  speciality,
  disabled,
}) => {
  return (
    <div className={`${styles.card_transparent} h-auto m-1 d-flex flex-column`}>
      <img
        className={`${styles.photo} mx-auto my-2 rounded rounded-circle`}
        src={photo.url}
        alt={photo.fileName}
      />
      <div className="px-2 mx-auto my-2">
        <p className="m-0 fw-bold fs-sm-5 text-center">{name}</p>
        <p className="m-0 text-center text-decoration-underline">
          <span className="fw-semibold">Speciality</span>
          <br />
          {speciality}
        </p>
      </div>
    </div>
  );
};
export default ChefCard;
