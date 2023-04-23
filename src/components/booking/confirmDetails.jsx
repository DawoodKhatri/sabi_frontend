import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpRequest from "../../utils/request";

const BookingConfirmDetails = ({ bookingDetails, setBookingDetails }) => {
  const { restaurant, products } = useSelector((state) => state.cart);
  const [chefs, setChefs] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    restaurant &&
      httpRequest(`/api/chefs/${restaurant._id}`, "GET").then((response) => {
        if (response.success) {
          setChefs(response.data);
        }
      }) &&
      httpRequest(`/api/tables/${restaurant?._id}`, "GET").then((response) => {
        if (response.success) {
          setTables(response.data.sort((a, b) => a.number - b.number));
        }
      });
  }, [restaurant]);

  useEffect(() => {
    restaurant &&
      setBookingDetails({
        ...bookingDetails,
        total_bill: getProductTotal() + getTableTotal(),
        advance_payment: 0,
      });
  }, [restaurant, chefs, tables]);

  const getChef = (productId) => {
    return chefs.filter(
      ({ _id }) =>
        _id ===
        bookingDetails.orders.filter(({ product }) => product === productId)[0]
          .chef
    )[0];
  };

  const getProductTotal = () => {
    let total = 0;

    products.forEach(({ product: { price }, quantity }) => {
      total += price * quantity;
    });

    return total;
  };

  const getTableTotal = () => {
    let total = 0;
    tables.forEach(({ _id, price }) => {
      if (bookingDetails.tables.includes(_id)) {
        total += price;
      }
    });
    return total;
  };

  if (chefs.length === 0 || tables.length === 0) return <></>;

  return (
    <div className="row">
      <div className="col-lg-5 container-fluid bg-white shadow p-2 p-md-4 rounded">
        <h3 className="text-center text-orange">{restaurant.name}</h3>
        <p className="text-center text-green">{restaurant.description}</p>
        <div className="mx-2 bg-yellow" style={{ height: "2px" }}></div>
        <div className="px-1 py-3 px-md-4 d-flex flex-column">
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
              {products.map(({ product: { _id, name, price }, quantity }) => (
                <tr>
                  <td>{name}</td>
                  <td>{getChef(_id).name}</td>
                  <td>{quantity}</td>
                  <td>₹{price * quantity}</td>
                </tr>
              ))}
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
              {tables.map(
                ({ _id, number, seats, price }) =>
                  bookingDetails.tables.includes(_id) && (
                    <tr>
                      <td>{number}</td>
                      <td>{seats}</td>
                      <td>₹{price}</td>
                      <td></td>
                    </tr>
                  )
              )}
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
                {/* <td>₹{Number(getProductTotal() / 2).toFixed(0)}</td> */}
              </tr>
              <tr>
                <td>Tables</td>
                <td>₹{getTableTotal()}</td>
                {/* <td>₹{Number(getTableTotal() / 4).toFixed(0)}</td> */}
              </tr>
              <tr>
                <th>Total Bill</th>
                <th>₹{getProductTotal() + getTableTotal()}</th>
                {/* <th>
                  ₹
                  {Number(Number(getProductTotal() / 2).toFixed(0)) +
                    Number(Number(getTableTotal() / 4).toFixed(0))}
                </th> */}
              </tr>
            </tbody>
          </table>
        </div>
        {/* <p className="text-center text-red fw-semibold my-3">
          To Book an Order you must Pay
          <br /> 50% of Products and 25% of Tables in Advance
        </p> */}
      </div>
    </div>
  );
};

export default BookingConfirmDetails;
