import { useState, useEffect } from "react";
import ItemsView from ".././ItemsView";
export default function Dishes(props) {
  const [dishes, setDishes] = useState();
  const [curr, setCurr] = useState();

  var api = process.env.REACT_APP_SERVER;

  useEffect(() => {
    var query = `/dishes/?ids=${JSON.stringify(props.dishes)}`;
    !dishes &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          console.log(result);
          setDishes(result.dishData);
        });
      });
  });

  return (
    <>
      <ItemsView
        title="Dishes"
        items={dishes}
        image="image"
        description="rate"
        setCurr={setCurr}
      />
    </>
  );
}
