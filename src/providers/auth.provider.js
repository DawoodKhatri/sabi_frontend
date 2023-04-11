import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../redux/slices/userSlice";
import { getCart, } from "../redux/slices/cartSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [setup, setSetup] = useState(false);
  const { auth, details } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      userAuth(
        () => {
          setSetup(true);
        },
        () => {
          setSetup(true);
        }
      )
    );
  }, []);

  useEffect(() => {
    if (auth && !details.isBusiness) {
      dispatch(getCart());
    }
  }, [auth]);

  if (setup) return children;

  return <></>;
};

export default AuthProvider;
