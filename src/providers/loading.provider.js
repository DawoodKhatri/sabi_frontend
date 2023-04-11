import React from "react";
import { useSelector } from "react-redux";
import { Loading } from "../components";

const LoadingProvider = ({ children }) => {
  const { isLoading } = useSelector((state) => state.common);
  return (
    <div className="relative min-vh-100">
      {isLoading && <Loading />}
      {children}
    </div>
  );
};

export default LoadingProvider;
