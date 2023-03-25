import Details from "./Details";
import Bookings from "./Bookings";
import Dishes from "./Dishes";
import Chefs from "./Chefs";

export default function Dashboard(props) {
  return (
    <>
      <Details data={props.userData.restaurant} />
      <Bookings restaurant={props.userData.restaurant} />
      <Dishes dishes={props.userData.restaurant.dishes} />
      <Chefs chefs={props.userData.restaurant.chefs} />
    </>
  );
}
