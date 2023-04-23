import React, { useState } from "react";

const SlotCard = ({ time_slot, active, setActive, disabled }) => {
  return (
    <button
      className={`btn ${
        !active
          ? disabled
            ? "btn-red"
            : "btn-outline-yellow"
          : "btn-yellow text-white"
      }`}
      onClick={() => setActive(!active)}
      disabled={disabled}
    >
      {time_slot}
    </button>
  );
};

export default SlotCard;
