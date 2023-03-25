import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import App from "../App";
import { userAuth } from "../redux/slices/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [setup, setSetup] = useState(false);

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

  if (setup) return children;

  return <></>;
};

export default AuthProvider;
