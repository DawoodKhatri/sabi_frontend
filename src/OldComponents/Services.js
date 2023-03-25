import Steps from "./Steps";
import restaurant from "../images/restaurant.png";
import dish from "../images/menu.png";
import chef from "../images/cooking.png";
import schedule from "../images/schedule.png";
export default function Services() {
  return (
    <>
      <div className="container-fluid text-center bg-warning py-4">
        <div className="row justify-content-center">
          <Steps
            image={restaurant}
            title="Choose Restaurant"
            text="Choose your favourite restaurant near you to Dine."
          />
          <Steps
            image={dish}
            title="Choose Dish"
            text="Choose your favourite Dish."
          />
          <Steps
            image={chef}
            title="Choose Chef"
            text="Find the Chef of your choice whose food you enjoy."
          />
          <Steps
            image={schedule}
            title="Choose Table and Schedule Arrival"
            text="Book a table of your choice and schedule your visit."
          />
        </div>
      </div>
    </>
  );
}
