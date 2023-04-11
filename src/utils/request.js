import { loading } from "../redux/slices/commonSlice";
import { dispatch } from "../redux/store";

const httpRequest = async (url, method, params = {}) => {
  url = process.env.REACT_APP_API + url;

  let options = {
    credentials: "include",
    method,

    headers: {
      "Content-Type": "application/json",
    },
  };

  switch (method) {
    case "GET":
      url += `?${new URLSearchParams(params).toString()}`;
      break;

    case "POST":
      options.body = JSON.stringify(params);
      break;
    default:
      break;
  }

  dispatch(loading(true));
  const data = await fetch(url, options);
  const response = await data.json();
  dispatch(loading(false));
  return response;
};

export default httpRequest;
