import { ActionTypes } from "../constants/action-types";

const intialState = {
  username: "",
};

export const orderDetailsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ORDER_DETAILS:
      return { ...state, ...payload };
    default:
      return state;
  }
};