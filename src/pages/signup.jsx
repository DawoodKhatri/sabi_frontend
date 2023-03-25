import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { userRegister } from "../redux/slices/userSlice";

const Signup = () => {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();

  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);

  const handleRestoCust = (event) => {
    document.getElementsByClassName("active")[0].classList.remove("active");
    event.target.classList.add("active");
  };

  const register = () => {
    if (!validator.isEmail(emailRef.current.value)) {
      setError("Invalid Email Address");
    } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords does not match");
    } else {
      let data = {
        isBusiness:
          document.getElementsByClassName("active")[0].innerText ===
          "Restaurant",
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(
        userRegister(
          data,
          () => {
            navigate("/login");
          },
          (message) => {
            setError(message);
          }
        )
      );
    }
  };

  useEffect(() => {
    if (auth) {
      console.log(auth);
      navigate("/dashboard");
    }
  }, [auth]);
  return (
    <div
      className="container-fluid min-vh-100 p-2 d-flex"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="card col-12 col-sm-8 col-md-6 col-xl-4 rounded rounded-4 text-center m-auto">
        <div className="card-header">
          <p className="card-title display-6 fw-normal py-3">Sign Up as</p>
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
        </div>
        <div className="card-body px-4">
          <div className="card-text text-start">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                ref={nameRef}
                type="name"
                className="form-control"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                ref={passwordConfirmRef}
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
              />
            </div>
            {error && (
              <div className="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                <label className="form-label mx-3 my-1 text-danger">{error}</label>
              </div>
            )}
            <div className="mt-4 mb-2 text-center">
              <button className="btn btn-warning" onClick={register}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
