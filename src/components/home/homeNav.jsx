import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/slices/userSlice";
import styles from "../../styles/home.module.css";

const HomeNav = () => {
  const auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      userLogout(
        () => {
          navigate("/");
        },
        (message) => {
          alert(message);
        }
      )
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <h2
            className={`${styles.subtitleFont} text-yellow px-3 fw-bold`}
            href="/"
          >
            SABI
          </h2>

          <div className="py-3">
            {auth ? (
              <>
                <Link to="/dashboard">
                  <button className="btn btn-outline-yellow mx-2">
                    <i className="bi bi-person"></i>
                  </button>
                </Link>
                <Link to="/cart">
                  <button className="btn btn-outline-yellow mx-2">
                    <i className="bi bi-cart"></i>
                  </button>
                </Link>
                <button className="btn btn-danger mx-2" onClick={logout}>
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-yellow mx-2">
                    Log in
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline-yellow mx-2">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
