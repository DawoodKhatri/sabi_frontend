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
    var query = `/bookings/?type=restaurant&id=${props.restaurant._id.toString()}`;
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
          image={bookingImage}
          name={bookings[curr].customer.name}
          description={getDescription(curr)}
        />
      )}
      <ItemsView
        type="customer"
        title="Bookings"
        items={bookings}
        image={[, , , bookingImage]}
        setCurr={setCurr}
        description="schedule"
        showItem
      />
    </>
  );
}
