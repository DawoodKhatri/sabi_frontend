import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/slices/userSlice";
import styles from "../../styles/home.module.css";

const Navbar = () => {
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
      <nav className="navbar bg-warning">
        <div className="container-fluid ">
          <h3 className={`${styles.subtitleFont} text-dark px-3`} href="/">
            SABI
          </h3>

          <div className="py-1">
          <Link to="/">
                  <button className="btn btn-outline-dark mx-2">
                    Home
                  </button>
                </Link>
            {auth ? (
              <>
                <Link to="/dashboard">
                  <button className="btn btn-outline-dark mx-2">
                    Dashboard
                  </button>
                </Link>
                <button className="btn btn-danger mx-2" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-dark mx-2">
                    Log in
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline-dark mx-2">
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

export default Navbar;
