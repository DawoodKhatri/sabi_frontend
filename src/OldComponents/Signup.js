import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
export default function Signup(props) {
  const [State, setState] = useState("Continue");
  const [OTP, setOtp] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();
  var api = process.env.REACT_APP_SERVER;
  // var api = "http://localhost:4040";

  const handleRestoCust = (event) => {
    document.getElementsByClassName("active")[0].classList.remove("active");
    event.target.classList.add("active");
  };

  const handleState = () => {
    if (State === "Continue") {
      validateData();
    } else {
      validateOTP();
    }
  };

  const validateData = () => {
    if (document.getElementById("name").value.length < 4) {
      document.getElementById("name").classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].innerText =
        "Name should contain atleast 4 characters";
    } else {
      if (document.getElementById("name").classList.contains("is-invalid")) {
        document.getElementById("name").classList.remove("is-invalid");
        document.getElementsByClassName("invalid-feedback")[0].innerText = "";
      }
      document.getElementById("name").classList.add("is-valid");
    }

    if (!validator.isEmail(document.getElementById("email").value)) {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[1].innerText =
        "Please enter a valid email";
    } else {
      if (document.getElementById("email").classList.contains("is-invalid")) {
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementsByClassName("invalid-feedback")[1].innerText = "";
      }
      document.getElementById("email").classList.add("is-valid");
    }

    if (
      !validator.isStrongPassword(document.getElementById("password").value, {
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minLength: 0
      })
    ) {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[2].innerText =
        "Password should contain a lowercase letter";
    } else {
      if (
        !validator.isStrongPassword(document.getElementById("password").value, {
          minLowercase: 0,
          minUppercase: 1,
          minNumbers: 0,
          minSymbols: 0,
          minLength: 0
        })
      ) {
        document.getElementById("password").classList.add("is-invalid");
        document.getElementsByClassName("invalid-feedback")[2].innerText =
          "Password should contain a uppercase letter";
      } else {
        if (
          !validator.isStrongPassword(
            document.getElementById("password").value,
            {
              minLowercase: 0,
              minUppercase: 0,
              minNumbers: 1,
              minSymbols: 0,
              minLength: 0
            }
          )
        ) {
          document.getElementById("password").classList.add("is-invalid");
          document.getElementsByClassName("invalid-feedback")[2].innerText =
            "Password should contain a number";
        } else {
          if (
            !validator.isStrongPassword(
              document.getElementById("password").value,
              {
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 1,
                minLength: 0
              }
            )
          ) {
            document.getElementById("password").classList.add("is-invalid");
            document.getElementsByClassName("invalid-feedback")[2].innerText =
              "Password should contain a symbol";
          } else {
            if (
              !validator.isStrongPassword(
                document.getElementById("password").value,
                {
                  minLowercase: 0,
                  minUppercase: 0,
                  minNumbers: 0,
                  minSymbols: 0,
                  minLength: 8
                }
              )
            ) {
              document.getElementById("password").classList.add("is-invalid");
              document.getElementsByClassName("invalid-feedback")[2].innerText =
                "Password should contain atleast 8 characters";
            } else {
              if (
                document
                  .getElementById("password")
                  .classList.contains("is-invalid")
              ) {
                document
                  .getElementById("password")
                  .classList.remove("is-invalid");
                document.getElementsByClassName(
                  "invalid-feedback"
                )[2].innerText = "";
              }
              document.getElementById("password").classList.add("is-valid");
            }
          }
        }
      }
    }

    if (
      !validator.isStrongPassword(document.getElementById("password").value, {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLength: 8
      }) ||
      document.getElementById("confirmpassword").value !==
        document.getElementById("password").value
    ) {
      document.getElementById("confirmpassword").classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[3].innerText =
        "Invalid confirm password";
    } else {
      if (
        document
          .getElementById("confirmpassword")
          .classList.contains("is-invalid")
      ) {
        document
          .getElementById("confirmpassword")
          .classList.remove("is-invalid");
        document.getElementsByClassName("invalid-feedback")[3].innerText = "";
      }
      document.getElementById("confirmpassword").classList.add("is-valid");
    }

    var valid = true;
    for (let i = 0; i < 4; i++) {
      var input = document.getElementsByTagName("input")[i];
      if (!input.classList.contains("is-valid")) {
        valid = false;
        break;
      }
    }
    if (valid) {
      setData({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        type: document.getElementsByClassName("active")[0].innerText
      });
      var otp = Math.random() * 1000000;
      otp = otp.toFixed(0).toString();
      setOtp(otp);
      var query = `/?to=${document.getElementById("email").value}&OTP=${otp}`;
      fetch(api + "/sendemail" + query).then((response) => {
        response.json().then((result) => {
          if (result["result"] === "success") {
            setState("Submit");
          }
        });
      });
    }
  };

  const validateOTP = () => {
    if (document.getElementById("otp").value !== OTP) {
      document.getElementById("otp").classList.add("is-invalid");
      document.getElementsByClassName("invalid-feedback")[0].innerText =
        "Incorrect OTP";
    } else {
      if (document.getElementById("otp").classList.contains("is-invalid")) {
        document.getElementById("otp").classList.remove("is-invalid");
        document.getElementsByClassName("invalid-feedback")[0].innerText = "";
      }
      document.getElementById("otp").classList.add("is-valid");
      registerUser();
    }
  };

  const registerUser = () => {
    var query = `/?name=${data["name"]}&email=${data["email"]}&password=${
      data["password"]
    }&type=${data["type"].toLowerCase()}`;
    fetch(api + "/signup" + query).then((response) => {
      response.json().then((result) => {
        if (result["result"] === "success") {
          var dataT = data;
          delete dataT["password"];
          dataT["_id"] = result.id;

          props.update(dataT);
          navigate("/dashboard");
        }
      });
    });
  };

  return (
    <div
      className="container-fluid min-vh-100 p-2 d-flex"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="card col-12 col-sm-8 col-md-6 col-xl-4 rounded rounded-4 text-center m-auto">
        <div className="card-header">
          <p className="card-title display-6 fw-normal py-3">
            Sign Up as {data ? data["type"] : ""}
          </p>
          {State === "Continue" && (
            <ul className="nav nav-pills card-header-pills p-2">
              <li
                className="btn btn-outline-warning rounded rounded-3 px-3 mx-auto active"
                onClick={handleRestoCust}
              >
                Customer
              </li>
              <li
                className="btn btn-outline-warning rounded rounded-3 px-3 mx-auto"
                onClick={handleRestoCust}
              >
                Restaurant
              </li>
            </ul>
          )}
        </div>
        <div className="card-body px-4">
          <div className="card-text text-start">
            {State === "Continue" && (
              <>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    id="name"
                    type="name"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    id="confirmpassword"
                    type="password"
                    className="form-control"
                    placeholder="Re-enter your password"
                  />
                  <div className="invalid-feedback"></div>
                </div>
              </>
            )}
            {State === "Submit" && (
              <div className="mb-3">
                <label className="form-label">OTP</label>
                <input
                  id="otp"
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                />
                <div className="invalid-feedback"></div>
              </div>
            )}
            <div className="mt-4 mb-2 text-center">
              <button className="btn btn-warning" onClick={handleState}>
                {State}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
