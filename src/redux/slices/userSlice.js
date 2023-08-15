import { createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/request";
import { loading } from "./commonSlice";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      return { ...state, auth: true, details: payload };
    },

    logout: (state) => {
      return {auth: false};
    },
  },
});

export const { login, logout } = userSlice.actions;

const userRegister = (data, onSuccess, onError) => async (dispatch) => {
  try {
    dispatch(loading(true));
    httpRequest(`/api/user/register`, "POST", data).then(async (response) => {
      dispatch(loading(false));
      if (response.success) {
        onSuccess();
      } else {
        onError(response.message);
      }
    });
  } catch (error) {
    onError(error.message);
  }
};

const userAuth =
  (onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/user`, "GET").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(login(response.data));
        } else {
          dispatch(logout());
          onError(response.message);
        }
      });
    } catch (error) {
      onError(error.message);
    }
  };

const userLogin = (data, onSuccess, onError) => async (dispatch) => {
  try {
    dispatch(loading(true));
    httpRequest(`/api/user/login`, "POST", data).then(
      async (response, headers) => {
        dispatch(loading(false));
        if (response.success) {
          dispatch(userAuth(onSuccess, onError));
        } else {
          onError(response.message);
        }
      }
    );
  } catch (error) {
    onError(error.message);
  }
};

const userLogout = () => async (dispatch) => {
  dispatch(loading(true));
  httpRequest(`/api/user/logout`, "POST").then(async (response) => {
    dispatch(loading(false));
    if (response.success) {
      await dispatch(logout());
    }
  });
};

export { userRegister, userAuth, userLogin, userLogout };

export default userSlice.reducer;
