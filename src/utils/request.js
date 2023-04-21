import { loading } from "../redux/slices/commonSlice";
import { dispatch } from "../redux/store";

const httpRequest = async (url, method, params = {}, ml = false) => {
  url = (ml ? process.env.REACT_APP_ML_API : process.env.REACT_APP_API) + url;

  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (!ml) {
    options["credentials"] = "include";
  }

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
