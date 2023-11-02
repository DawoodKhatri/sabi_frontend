import React from "react";
import styles from "../../styles/cards.module.css";
import httpRequest from "../../utils/request";

const BookingCard = ({
  _id,
  restaurant,
  user,
  orders,
  tables,
  time_slot,
  date,
  status,
  comments,
  total_bill,
  advance_payment,
  type,
  change,
  setChange,
}) => {
  const getProductTotal = () => {
    let total = 0;

    orders.forEach(({ product: { price }, quantity }) => {
      total += price * quantity;
    });

    return total;
  };

  const getTableTotal = () => {
    let total = 0;
    tables.forEach(({ price }) => {
      total += price;
    });
    return total;
  };

  const confirmBooking = () => {
    httpRequest(`/api/booking/confirmBooking/${_id}`, "PUT").then(
      (response) => {
        if (response.success) {
          setChange(!change);
        } else {
          alert(response.message);
        }
      }
    );
  };

  const rejectBooking = () => {
    httpRequest(`/api/booking/rejectBooking/${_id}`, "DELETE").then(
      (response) => {
        if (response.success) {
          setChange(!change);
        } else {
          alert(response.message);
        }
      }
    );
  };
  const cancelBooking = () => {
    httpRequest(`/api/booking/cancelBooking/${_id}`, "DELETE").then(
      (response) => {
        if (response.success) {
          setChange(!change);
        } else {
          alert(response.message);
        }
      }
    );
  };

  const completeBooking = () => {
    httpRequest(`/api/booking/completeBooking/${_id}`, "POST").then(
      (response) => {
        if (response.success) {
          setChange(!change);
        } else {
          alert(response.message);
        }
      }
    );
  };

  const getBookingStatusClass = () => {
    if (status === "Pending") return "bg-orange";
    if (status === "Rejected") return "bg-red";
    if (status === "Confirmed") return "bg-yellow";
    if (status === "Completed") return "bg-green";
  };

  return (
    <>
      <div
        className={`${styles.card} accordion-item rounded rounded-4 mx-3 my-5`}
      >
        <div class="accordion-header">
          <button
            class="accordion-button rounded rounded-4 px-5 text-purple"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#booking_card_id_${_id}`}
          >
            <div className="col-3">
              {type === "customer" ? (
                <img
                  className="w-100 m-4 rounded rounded-4"
                  src={restaurant.thumbnail.url}
                  alt={restaurant.thumbnail.fileName}
                />
              ) : (
                <div className="text-center">
                  <h3 className="text-orange">{user.name}</h3>
                  <p className="text-green"> {user.email}</p>
                </div>
              )}
            </div>
            <div className="col-9 px-4">
              {type === "customer" && (
                <div className="text-center">
                  <h3 className="text-orange">{restaurant.name}</h3>
                  <p className="text-green"> {restaurant.description}</p>
                </div>
              )}
              <div className="mx-5 d-flex justify-content-between">
                <div>
                  <p>
                    Total Bill: ₹<span>{total_bill}</span>
                  </p>
                  <p>
                    Advance Payment: ₹<span>{advance_payment}</span>
                  </p>
                  <p>
                    Pending Payment: ₹
                    <span>{total_bill - advance_payment}</span>
                  </p>
                </div>
                <div className="text-end">
                  <p>
                    Date: <span>{date}</span>
                  </p>
                  <p>
                    Time Slot: <span>{time_slot}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={`${getBookingStatusClass()} text-white px-2 rounded`}
                    >
                      {status}
                    </span>
                  </p>
                </div>
              </div>
              {type === "customer" ? (
                <div className="text-end mx-4">
                  status === "Pending" && (
                  <button
                    className="btn btn-red btn-sm text-white mx-4"
                    onClick={cancelBooking}
                  >
                    <i className="bi bi-x-lg px-1" />
                    Cancel
                  </button>
                  )
                </div>
              ) : (
                <div className="text-end mx-4">
                  {status === "Pending" && (
                    <>
                      <button
                        className="btn btn-red btn-sm text-white"
                        onClick={rejectBooking}
                      >
                        <i className="bi bi-x-lg px-1" />
                        Reject
                      </button>
                      <button
                        className="btn btn-yellow btn-sm text-white mx-4"
                        onClick={confirmBooking}
                      >
                        <i className="bi bi-check2 px-1" />
                        Accept
                      </button>
                    </>
                  )}
                  {status === "Confirmed" && (
                    <button
                      className="btn btn-green btn-sm text-white mx-4"
                      onClick={completeBooking}
                    >
                      <i className="bi bi-check2 px-1" />
                      Complete
                    </button>
                  )}
                </div>
              )}
            </div>
          </button>
        </div>
        <div
          id={`booking_card_id_${_id}`}
          data-bs-parent="#bookingCards"
          class="accordion-collapse collapse"
        >
          <div class="accordion-body">
            <div className="row">
              <div className="col-12 col-lg-6 mx-auto">
                <div className="px-1 pb-3 px-md-4 d-flex flex-column">
                  <table class="table table-borderless text-purple mb-0 text-center">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Chef</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(
                        ({
                          chef: { name: chefName },
                          product: { name, price },
                          quantity,
                        }) => (
                          <tr>
                            <td>{name}</td>
                            <td>{chefName}</td>
                            <td>{quantity}</td>
                            <td>₹{price * quantity}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
                <div className="px-1 py-3 px-md-4 d-flex flex-column">
                  <table class="table table-borderless text-purple mb-0 text-center">
                    <thead>
                      <tr>
                        <th>Table Number</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tables.map(({ number, seats, price }) => (
                        <tr>
                          <td>{number}</td>
                          <td>{seats}</td>
                          <td>₹{price}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>{" "}
                <div className="px-1 py-3 px-md-4 d-flex flex-column">
                  <table class="table table-borderless text-purple mb-0 text-center">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Total Price</th>
                        {/* <th>Advance Payment</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Products</td>
                        <td>₹{getProductTotal()}</td>
                      </tr>
                      <tr>
                        <td>Tables</td>
                        <td>₹{getTableTotal()}</td>
                      </tr>
                      <tr>
                        <th>Total Bill</th>
                        <th>₹{total_bill}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
