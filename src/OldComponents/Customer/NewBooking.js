import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
export default function NewBooking(props) {
  const [State, setState] = useState("restaurant");
  const [curr, setCurr] = useState();
  const [data, setData] = useState();
  const [selection, setSelection] = useState();
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  var api = process.env.REACT_APP_SERVER;
  // api = "http://localhost:4040";

  useEffect(() => {
    var query = "";
    if (State === "restaurant") {
      query = `/all/?type=restaurants`;
    } else if (State === "dish") {
      query = `/dishes/?ids=${JSON.stringify(selection.restaurant.dishes)}`;
    } else if (State === "chef") {
      var ids = [];
      for (let dish of selection.dishes) {
        ids.push(dish._id.toString());
      }
      query = `/dish/chefs/?ids=${JSON.stringify(ids)}`;
    }
    query &&
      !data &&
      fetch(api + query).then((response) => {
        response.json().then((result) => {
          console.log(result);
          State === "restaurant" && setData(result.data);
          State === "dish" && setData(result.dishData);
          State === "chef" && setData(result.chefData);
        });
      });
  });

  const handleValid = (valid, index) => {
    if (valid == null && index == null) {
      let flag = true;
      let elements = [
        document.getElementById("date"),
        document.getElementById("time")
      ];
      elements.forEach((element) => {
        if (!element.value) {
          flag = false;
          if (!element.classList.contains("is-invalid")) {
            element.classList.add("is-invalid");
          }
          if (element.classList.contains("is-valid")) {
            element.classList.remove("is-valid");
          }
        } else {
          if (element.classList.contains("is-invalid")) {
            element.classList.remove("is-invalid");
          }
          if (!element.classList.contains("is-valid")) {
            element.classList.add("is-valid");
          }
        }
      });
      return flag;
    } else if (index == null) {
      if (valid) {
        Array.from(document.getElementsByClassName("itemTitle")).forEach(
          (element) => {
            element.classList.remove("border-danger");
            element.classList.add("border-white");
          }
        );
      } else {
        Array.from(document.getElementsByClassName("itemTitle")).forEach(
          (element) => {
            element.classList.remove("border-white");
            element.classList.add("border-danger");
          }
        );
      }
    } else {
      if (valid) {
        document
          .getElementsByClassName("itemTitle")
          [index].classList.remove("border-danger");
        document
          .getElementsByClassName("itemTitle")
          [index].classList.add("border-white");
      } else {
        document
          .getElementsByClassName("itemTitle")
          [index].classList.remove("border-white");
        document
          .getElementsByClassName("itemTitle")
          [index].classList.add("border-danger");
      }
    }
  };

  const isValid = () => {
    if (State === "chef") {
      let flag = true;
      if (!curr) {
        handleValid(false);
        flag = false;
      } else {
        for (let c in curr) {
          if (curr[c] === null) {
            handleValid(false, c);
            flag = false;
          } else {
            handleValid(true, c);
          }
        }
      }
      return flag;
    } else if (State === "booking") {
      return handleValid();
    } else {
      if (curr === undefined || curr === null) {
        handleValid(false);
        return false;
      } else {
        handleValid(true);
        return true;
      }
    }
  };

  const bookTable = () => {
    var query = `/newBooking/?details=${JSON.stringify(details)}`;
    fetch(api + query).then((response) => {
      response.json().then((result) => {
        if (result.result === "success") {
          setState("done");
        }
      });
    });
  };

  const handleBtn1 = () => {
    setCurr();
    setData();
    State === "restaurant" && navigate("../");
    State === "dish" && setState("restaurant");
    State === "chef" && setState("dish");
    State === "booking" && setState("chef");
  };

  const handleBtn2 = () => {
    if (State === "restaurant" && isValid()) {
      setSelection({ restaurant: data[curr] });
      setCurr();
      setData();
      setState("dish");
    }
    if (State === "dish" && isValid()) {
      let dishes = [];
      for (let c in curr) {
        dishes.push(data[c]);
      }
      setSelection({
        restaurant: selection.restaurant,
        dishes: dishes
      });
      setCurr();
      setData();
      setState("chef");
    }
    if (State === "chef" && isValid()) {
      let chefs = [];
      for (let c in curr) {
        chefs.push(data[c][curr[c]]);
      }
      setSelection({
        restaurant: selection.restaurant,
        dishes: selection.dishes,
        chefs: chefs
      });
      setCurr();
      setData();
      setState("booking");
    }
    if (State === "booking" && isValid()) {
      let dishes = [];
      for (let i in selection.dishes) {
        dishes[i] = {
          dish: selection.dishes[i]._id.toString(),
          chef: selection.chefs[i]._id.toString()
        };
      }
      setDetails({
        customer: props.id,
        restaurant: selection.restaurant._id.toString(),
        dishes: dishes,
        schedule: {
          date: document.getElementById("date").value,
          time: document.getElementById("time").value
        }
      });
      setCurr();
      setData();
      bookTable();
    }
  };

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <div
      className="container-fluid min-vh-100 p-2 d-flex"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="card col-12 col-sm-10 col-lg-8 rounded rounded-4 text-center m-auto">
        <div className="card-header">
          {State !== "done" && (
            <p className="card-title display-6 fw-normal py-3">
              Booking a Table
            </p>
          )}
          {State === "done" && (
            <p className="card-title display-5 font2 fw-semibold py-3 ">
              Table Booked Successfully
            </p>
          )}
        </div>
        {State === "booking" && (
          <div className="mx-4">
            <div className="col-12 col-sm-10 col-lg-8 mx-auto mt-4 p-4 border border-2 border-warning rounded shadow">
              <img
                src={selection.restaurant.images[0]}
                className="restoImages w-100 rounded rounded-2 "
                alt=""
              />
              <div className="text-center mx-auto">
                <h1 className="text-warning my-4 mb-2">
                  {selection.restaurant.name}
                </h1>
                <p className="my-2">{selection.restaurant.speciality}</p>
                <p className="my-2">{selection.restaurant.address}</p>
                <p className="my-2">
                  Contact: {selection.restaurant.contacts.toString()}
                </p>
              </div>
            </div>
          </div>
        )}
        {State === "done" && (
          <p className="font2 fs-2 p-3">Thank you for using SABI</p>
        )}
        {State !== "done" && State !== "chef" && (
          <>
            <h5 className="card-title itemTitle mt-4 mb-0 mx-auto p-2 border border-2 border-white rounded">
              {State === "restaurant" && "Choose a Restaurant"}
              {State === "dish" && "Choose a Dish"}
              {State === "booking" && "Schedule Booking"}
            </h5>
            <div className="card-body vh-50 px-4 py-2 row">
              {State === "restaurant" &&
                data &&
                data.map((item) => {
                  return (
                    <ItemCard
                      image={item.images[0]}
                      text={item.name}
                      index={data.indexOf(item)}
                      setSelection={setCurr}
                    />
                  );
                })}

              {State === "dish" &&
                data &&
                data.map((item) => {
                  return (
                    <ItemCard
                      type="dish"
                      image={item.image}
                      text={item.name}
                      index={data.indexOf(item)}
                      multiple
                      setSelection={(c) => {
                        if (typeof c === "string") {
                          var all = curr;
                          all.pop(Number(c));
                        } else if (typeof curr === "object") {
                          var all = curr;
                          all.push(c);
                        } else {
                          var all = [];
                          all.push(c);
                        }
                        setCurr(all);
                      }}
                    />
                  );
                })}
              {State === "booking" && (
                <div className="row mx-auto">
                  <div className="mb-3 col-12 col-sm-6 text-start">
                    <label className="form-label mx-2">Date</label>
                    <input
                      id="date"
                      type="date"
                      className="form-control"
                      min={today}
                    />
                    <label className="invalid-feedback">Enter Date</label>
                  </div>
                  <div className="mb-3 col-12 col-sm-6 text-start">
                    <label className="form-label mx-2">Time</label>
                    <input id="time" type="time" className="form-control" />
                    <label className="invalid-feedback">Enter Time</label>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {State === "chef" &&
          selection.dishes.map((dish) => {
            return (
              <>
                <h5 className="card-title itemTitle mt-4 mb-0 mx-auto p-2 border border-2 border-white rounded">
                  Select Chef for: {dish.name}
                </h5>
                <div className="card-body vh-50 px-4 py-2 row">
                  {data &&
                    data[selection.dishes.indexOf(dish)].map((item) => {
                      return (
                        <ItemCard
                          type="chef"
                          image={item.photo}
                          text={item.name}
                          index={data[selection.dishes.indexOf(dish)].indexOf(
                            item
                          )}
                          item={selection.dishes.indexOf(dish)}
                          setSelection={(arr, removed) => {
                            var all = [];
                            selection.dishes.forEach(() => {
                              all.push(null);
                            });
                            if (curr) all = curr;
                            if (removed) {
                              all[arr[0]] = null;
                            } else {
                              all[arr[0]] = arr[1];
                            }
                            console.log(all);

                            setCurr(all);
                          }}
                        />
                      );
                    })}
                </div>
              </>
            );
          })}
        {State !== "done" && (
          <div className="card-footer mb-2 px-4 d-flex justify-content-between">
            <button
              id="btn1"
              className="btn btn-secondary"
              onClick={handleBtn1}
            >
              {State === "restaurant" && "Cancel"}
              {State === "dish" && "Back"}
              {State === "chef" && "Back"}
              {State === "booking" && "Back"}
            </button>
            <button id="btn2" className="btn btn-warning" onClick={handleBtn2}>
              {State === "restaurant" && "Next"}
              {State === "dish" && "Next"}
              {State === "chef" && "Next"}
              {State === "booking" && "Book"}
            </button>
          </div>
        )}
        {State === "done" && (
          <div className="card-footer mb-2 px-4 d-flex justify-content-end">
            <button
              id="btn2"
              className="btn btn-warning"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
