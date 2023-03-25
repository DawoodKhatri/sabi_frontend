import Intro from "./Intro";
import Bookings from "./Bookings";
import Restaurants from "./Restaurants";
import Dishes from "./Dishes";
import Chefs from "./Chefs";
export default function Dashboard(props) {
  return (
    <>
      <Intro />
      <Bookings id={props.userData._id} />
      <Restaurants />
      <Dishes />
      <Chefs />
    </>
  );
}
