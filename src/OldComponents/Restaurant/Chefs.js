import { useState, useEffect } from "react";
import AddChef from "./AddChef";
import ItemsView from ".././ItemsView";
export default function Chefs(props) {
  const [chefs, setChefs] = useState();
  const [curr, setCurr] = useState(0);

  var api = process.env.REACT_APP_SERVER;

  useEffect(() => {
    var query = `/chefs/?ids=${JSON.stringify(props.chefs)}`;
    !chefs &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          console.log(result);
          setChefs(result.chefData);
        });
      });
  });

  return (
    <>
      <AddChef />
      <ItemsView
        title="Chefs"
        btn_title="Add New Chef"
        btn_trigger="#addChefModal"
        items={chefs}
        image="photo"
        setCurr={setCurr}
        description="rating"
      />
    </>
  );
}
