import React from "react";
import tableImage from "../../assets/images/table.jpg";
import styles from "../../styles/cards.module.css";

const TableCard = ({
  number,
  seats,
  price,
  availability,
  selected = true,
  onSelect,
}) => {
  return (
    <div
      className={`${
        styles.card
      } position-relative rounded rounded-4 overflow-hidden border border-2 ${
        selected ? "border-orange" : "border-grey"
      } ${!availability ? " opacity-50" : ""}`}
      onClick={availability ? onSelect : () => {}}
    >
      <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-2 p-2">
        <p className="fw-semibold fs-5 m-0 text-purple text-decoration-underline">
          Table No - {number}
        </p>
        <p className="m-0">
          <span className="fw-bold mx-2 text-purple">{seats} - Seats</span>
          <span
            className={`${styles.tag} bg-yellow text-white px-1 mx-2 rounded-1`}
          >
            ₹{price}
          </span>
        </p>
        <p className="fw-semibold m-0">
          <span
            className={`text-white px-2 rounded-1 ${
              availability ? "bg-green" : "bg-red"
            }`}
          >
            {availability ? "Available" : "Not Available"}
          </span>
        </p>
      </div>
      <img className="rounded rounded-2 w-100" src={tableImage} />
    </div>
  );
};

export default TableCard;
