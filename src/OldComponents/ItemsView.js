import { useState, useEffect } from "react";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
export default function ItemsView(props) {
  const getItemCount = () => {
    if (window.innerWidth >= 992) {
      return 4;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else if (window.innerWidth >= 576) {
      return 2;
    } else if (window.innerWidth < 576) {
      return 1;
    }
  };

  const [itemsCount, setItemsCount] = useState(getItemCount());
  const [show, setShow] = useState("Less");

  window.addEventListener("resize", () => {
    setItemsCount(getItemCount());
  });

  const handleShow = () => {
    if (show === "Less") {
      setShow("More");
    } else {
      setShow("Less");
    }
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between px-4">
          <p className="mx-3 my-auto text-warning fw-semibold fs-3">
            {props.title}
          </p>
          {props.button}
          {props.filter}
        </div>
        <div className="mx-3 bg-warning" style={{ height: "2px" }}></div>
        <div className="container-flex m-0 text-center">
          <div className="row p-4 m-0 ">
            {props.items &&
              props.items.map((item) => {
                if (show === "More" || props.items.indexOf(item) < itemsCount) {
                  return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 text-center">
                      <Link to={props.page ? `/restaurant/${item._id}` : "/"} className="text-dark text-decoration-none">
                        <div
                          id="itemCard"
                          className="itemCard h-auto m-1 rounded rounded-4 overflow-hidden"
                          data-bs-toggle={props.showItem ? "modal" : ""}
                          data-bs-target={
                            props.showItem ? "#showItemModal" : ""
                          }
                          onClick={() => {
                            props.setCurr(props.items.indexOf(item));
                          }}
                        >
                          <img
                            className="image w-100 mh-50"
                            src={
                              props.image.length === 2
                                ? item[props.image[0]][props.image[1]]
                                : props.image.length === 3
                                ? item[props.image[0]][props.image[1]][
                                    props.image[2]
                                  ]
                                : props.image.length === 4
                                ? props.image[3]
                                : item[props.image]
                            }
                            alt=""
                          />
                          <div className="row px-3 justify-content-between">
                            <p className="my-3 fs-5 col-8 text-start">
                              {props.type ? item[props.type].name : item.name}
                            </p>
                            {typeof item[props.description] === "object" && (
                              <div className="d-flex pt-0 pb-3 justify-content-between">
                                <p className="m-0 p-0">
                                  Date: {item[props.description]["date"]}
                                </p>
                                <p className="m-0 p-0">
                                  Time: {item[props.description]["time"]}
                                </p>
                              </div>
                            )}
                            {typeof item[props.description] !== "object" &&
                              props.description && (
                                <p className="my-auto col-4 text-danger text-end">
                                  {item[props.description]}
                                </p>
                              )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}

            {props.items &&
              props.items.length > itemsCount &&
              show === "More" && (
                <a
                  className="p-0 m-2 fs-5 text-warning text-center"
                  onClick={handleShow}
                >
                  View Less
                </a>
              )}
            {props.items &&
              props.items.length > itemsCount &&
              show === "Less" && (
                <a
                  className="p-0 m-2 fs-5 text-warning text-center"
                  onClick={handleShow}
                >
                  View More
                </a>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
