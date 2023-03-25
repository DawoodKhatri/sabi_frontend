import { useState, useEffect } from "react";
import ItemsView from ".././ItemsView";

export default function Restaurants(props) {
  const [restaurants, setRestaurants] = useState();
  const [cuisines, setCuisines] = useState([]);
  const [filtered, setFiltered] = useState();

  var api = process.env.REACT_APP_SERVER;
  useEffect(() => {
    var query = `/all/?type=restaurants`;
    !restaurants &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          setRestaurants(result.data);
        });
      });
  });

  useEffect(() => {
    if (restaurants) {
      let allCuisines = [];
      for (let restaurant of restaurants) {
        allCuisines = allCuisines.concat(restaurant.cuisines);
        allCuisines = allCuisines.filter(
          (cuisine, i) => allCuisines.indexOf(cuisine) === i
        );
      }
      setCuisines(allCuisines);
    }
  }, [restaurants]);

  const filter = ({ target: { value } }) => {
    if (value === "Default") {
      setFiltered();
    } else {
      setFiltered(
        restaurants.filter((restaurant) => restaurant.cuisines.includes(value))
      );
    }
  };

  return (
    <>
      <ItemsView
      page={true}
        title="Top Restaurants"
        items={filtered ? filtered : restaurants}
        image="images"
        filter={
          <div className=" m-3 d-flex justify-content-between">
            <span className="my-auto mx-3">Filter By: </span>
            <select className="form-select w-auto" onChange={filter}>
              <option value="Default">Default</option>
              {cuisines.map((cuisine, i) => (
                <option value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
        }
        // setCurr={setCurr}
        // description="rating"
      />
    </>
  );
}
