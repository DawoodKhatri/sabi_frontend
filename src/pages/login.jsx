import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAuth, userLogin } from "../redux/slices/userSlice";

const Login = () => {
  const [error, setError] = useState();

  const auth = useSelector((state) => state.user.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    var data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    dispatch(
      userLogin(
        data,
        () => {
          navigate("/");
        },
        (message) => {
          setError(message);
        }
      )
    );
  };

  useEffect(() => {
    if (auth) {
        console.log(auth);
      navigate("/");
    }
  }, [auth]);

  return (
    <div
      className="container-fluid min-vh-100 p-2 d-flex bg-grey"
    >
      <div className="card col-12 col-sm-8 col-md-6 col-xl-4 rounded rounded-4 text-center m-auto">
        <div className="card-header">
          <p className="card-title display-6 fw-normal py-3">Log in</p>
        </div>
        <div className="card-body px-4">
          <div className="card-text text-start">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                <label className="form-label mx-3 my-1 text-danger">{error}</label>
              </div>
            )}
            <div className="mt-4 mb-2 text-center">
              <button className="btn btn-yellow" onClick={login}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
