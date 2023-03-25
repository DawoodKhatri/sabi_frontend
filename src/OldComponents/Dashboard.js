import { Navigate } from "react-router-dom";
import RestoDash from "./Restaurant/Dashboard";
import CustoDash from "./Customer/Dashboard";
export default function Dashboard(props) {
  return (
    <>
      {!props.userData && <Navigate to="/" replace={true} />}
      <nav className="navbar bg-warning p-0">
        <div className="container-fluid">
          <p className="navbar-brand t2 my-auto pt-3 fs-3 pb-0">S A B I</p>
          <div className="d-flex">
            <p className="my-auto mx-2 fs-5">
              <u>{props.userData && props.userData["name"]}</u>
            </p>
            <button
              className="btn btn-outline-danger mx-2"
              onClick={() => {
                props.setData();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
      {props.userData && props.userData.type === "restaurant" && (
        <>
          <RestoDash userData={props.userData} />
          {/* {props.userData.restaurant && <RestoDash />}
          {!props.userData.restaurant && <></>} */}
        </>
      )}
      {props.userData && props.userData.type === "customer" && (
        <CustoDash userData={props.userData} />
      )}
    </>
  );
}
