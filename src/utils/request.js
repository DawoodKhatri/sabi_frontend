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

  return await (
    await fetch(url, {
      ...options,
    })
  ).json();
};

export default httpRequest;
