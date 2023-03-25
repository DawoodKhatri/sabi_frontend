import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookingImage from "../../images/schedule.png";
import ShowItem from ".././ShowItem";
import ItemsView from ".././ItemsView";

export default function Restaurants(props) {
  const [bookings, setBookings] = useState();
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();
  var api = process.env.REACT_APP_SERVER;
  useEffect(() => {
    var query = `/bookings/?type=customer&id=${props.id}`;
    !bookings &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          console.log(result.bookingDetails);

          setBookings(result.bookingDetails);
        });
      });
  });

  const getDescription = (i) => {
    var description = [
      [
        "Schedule",
        "Date: " + bookings[curr].schedule.date,
        "Time: " + bookings[curr].schedule.time
      ]
    ];
    bookings[i].dishes.forEach((dish) => {
      description.push(["Dish: " + dish.name, "Chef: " + dish.chef.name]);
    });
    return description;
  };

  return (
    <>
      {bookings && (
        <ShowItem
          title="Booking Details"
          image={bookings[curr].restaurant.images[0]}
          name={bookings[curr].restaurant.name}
          description={getDescription(curr)}
        />
      )}
      {bookings && (
        <ItemsView
          type="restaurant"
          title="Scheduled Bookings"
          items={bookings}
          image={["restaurant", "images", 0]}
          setCurr={setCurr}
          description="schedule"
          showItem
          button={
            <button
              className="btn btn-warning m-2"
              onClick={() => {
                navigate("/dashboard/newbooking");
              }}
            >
              Book a Table Now!
            </button>
          }
        />
      )}
      {!bookings && (
        <>
          <div className="d-flex justify-content-between px-4">
            <p className="mx-3 my-auto text-warning fw-semibold fs-3">
              Scheduled Bookings
            </p>
          </div>
          <div className="mx-3 bg-warning" style={{ height: "2px" }}></div>
          <div className="text-center mb-4">
            <p className="fs-4 fw-medium p-2 my-2 mt-3">
              You do not have any Scheduled Bookings yet.
            </p>
            <button
              className="btn btn-warning btn-lg m-3"
              onClick={() => {
                navigate("/dashboard/newbooking");
              }}
            >
              Book a Table Now!
            </button>
          </div>
        </>
      )}
    </>
  );
}
