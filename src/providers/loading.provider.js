import React from "react";
import { useSelector } from "react-redux";
import { Loading } from "../components";

const LoadingProvider = ({ children }) => {
  const { isLoading } = useSelector((state) => state.common);
  console.log(isLoading);
  return (
    <div className="relative">
      {isLoading && <Loading />}
      {children}
    </div>
  );
};

export default LoadingProvider;
