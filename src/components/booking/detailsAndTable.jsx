import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpRequest from "../../utils/request";
import TableCard from "../cards/tableCard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { WEEKS } from "../../constants";
import SlotCard from "../cards/slotCard";

const BookingDetailsAndTable = ({ bookingDetails, setBookingDetails }) => {
  const [slots, setSlots] = useState([]);
  const [tables, setTables] = useState([]);

  const { details } = useSelector((state) => state.user);
  const { restaurant, products } = useSelector((state) => state.cart);

  useEffect(() => {
    setBookingDetails({
      ...bookingDetails,
      name: details.name,
      email: details.email,
    });
  }, [details]);

  useEffect(() => {
    restaurant &&
      bookingDetails.date &&
      httpRequest(`/api/booking/availableSlots`, "GET", {
        id: restaurant?._id,
        date: bookingDetails.date,
      }).then((response) => {
        if (response.success) {
          setSlots(response.data);
        }
      });
  }, [restaurant, bookingDetails.date]);

  useEffect(() => {
    restaurant &&
      httpRequest(`/api/tables/${restaurant?._id}`, "GET").then((response) => {
        if (response.success) {
          setTables(response.data.sort((a, b) => a.number - b.number));
        }
      });
  }, [restaurant]);

  const updateTableSelection = (tableId) => {
    if (bookingDetails.tables.includes(tableId)) {
      setBookingDetails({
        ...bookingDetails,
        tables: bookingDetails.tables.filter(
          (bookingTableId) => bookingTableId !== tableId
        ),
      });
    } else {
      setBookingDetails({
        ...bookingDetails,
        tables: [...bookingDetails.tables, tableId],
      });
    }
  };

  if (!slots && !tables) return <></>;

  return (
    <>
      <div className="row my-4">
        <div className="col-4">
          <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 rounded">
            <div className="d-flex justify-content-between align-items-center mx-2">
              <h2 className="text-yellow">Basic Details</h2>
            </div>
            <div
              className="mx-2 bg-yellow mb-4"
              style={{ height: "2px" }}
            ></div>

            <div className="mb-4">
              <label className="form-label">Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter visitors full name"
                value={bookingDetails.name}
                onChange={({ target: { value } }) =>
                  setBookingDetails({ ...bookingDetails, name: value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter visitors email address"
                value={bookingDetails.email}
                onChange={({ target: { value } }) =>
                  setBookingDetails({ ...bookingDetails, email: value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Phone number</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter visitors phone number"
                value={bookingDetails.phone}
                onChange={({ target: { value } }) =>
                  setBookingDetails({ ...bookingDetails, phone: value })
                }
              />
            </div>
            <div className="mb-3 pb-1">
              <label className="form-label">Comments</label>
              <textarea
                rows={2}
                type="text"
                className="form-control"
                placeholder="Any Comments"
                value={bookingDetails.comments}
                onChange={({ target: { value } }) =>
                  setBookingDetails({ ...bookingDetails, comments: value })
                }
              />
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 rounded">
            <div className="d-flex justify-content-between align-items-center mx-2">
              <h2 className="text-yellow">Select Date & Time Slot</h2>
            </div>
            <div
              className="mx-2 mb-3 bg-yellow"
              style={{ height: "2px" }}
            ></div>
            <div className="my-2 d-flex gap-3">
              <div className="border rounded rounded-2 d-flex justify-content-center align-items-center">
                <DayPicker
                  selected={new Date(bookingDetails.date)}
                  onSelect={(date) => {
                    date &&
                      setBookingDetails({
                        ...bookingDetails,
                        date: date.toLocaleDateString(),
                        time_slot: null,
                        tables: []
                      });
                  }}
                  mode="single"
                  disabled={(date) =>
                    date <
                      new Date(new Date().setDate(new Date().getDate() - 1)) ||
                    restaurant.service.daysOff.includes(WEEKS[date.getDay()])
                  }
                />
              </div>
              <div className="border rounded rounded-2 flex-grow-1 p-2 d-flex flex-wrap justify-content-center align-items-center">
                {slots.map(({ time_slot, tables: slotTables }) => (
                  <div className="p-2 w-auto">
                    <SlotCard
                      time_slot={time_slot}
                      active={bookingDetails.time_slot === time_slot}
                      setActive={(activate) =>
                        setBookingDetails({
                          ...bookingDetails,
                          time_slot: activate ? time_slot : null,
                          tables: [],
                        })
                      }
                      disabled={slotTables.length === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-white shadow w-auto p-2 p-md-4 my-4 rounded">
        <div className="d-flex justify-content-between align-items-center mx-2">
          <h2 className="text-yellow">Select Tables</h2>
        </div>
        <div className="mx-2 mb-3 bg-yellow" style={{ height: "2px" }}></div>
        <div className="row">
          {tables.map((table) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-2 p-3">
              <TableCard
                {...table}
                availability={slots
                  .filter(
                    ({ time_slot }) => time_slot === bookingDetails.time_slot
                  )[0]
                  ?.tables.includes(table._id)}
                selected={bookingDetails.tables.includes(table._id)}
                onSelect={() => updateTableSelection(table._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingDetailsAndTable;
