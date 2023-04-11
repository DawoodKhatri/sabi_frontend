import { createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/request";
import { loading } from "./commonSlice";

const initialState = null;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, { payload }) => {
      return payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;

const getCart =
  (onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/cart`, "GET").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(updateCart(response.data));
        } else {
          dispatch(updateCart(null));
          onError(response.message);
        }
      });
    } catch (error) {
      dispatch(updateCart(null));
      onError(error.message);
    }
  };

const addToCart =
  (productId, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/cart/${productId}`, "POST").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(getCart());
        } else {
          onError(response.message);
        }
      });
    } catch (error) {
      onError(error.message);
    }
  };

const reduceFromCart =
  (productId, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/cart/${productId}`, "PATCH").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(getCart());
        } else {
          onError(response.message);
        }
      });
    } catch (error) {
      onError(error.message);
    }
  };

const removeFromCart =
  (productId, onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/cart/${productId}`, "DELETE").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(getCart());
        } else {
          onError(response.message);
        }
      });
    } catch (error) {
      onError(error.message);
    }
  };

const clearCart =
  (onSuccess = () => {}, onError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(loading(true));
      httpRequest(`/api/cart`, "DELETE").then(async (response) => {
        dispatch(loading(false));
        if (response.success) {
          onSuccess();
          dispatch(getCart());
        } else {
          onError(response.message);
        }
      });
    } catch (error) {
      onError(error.message);
    }
  };

export { getCart, addToCart, reduceFromCart, removeFromCart, clearCart };

export default cartSlice.reducer;
