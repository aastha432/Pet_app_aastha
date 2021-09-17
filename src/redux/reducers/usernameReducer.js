import { ActionTypes } from "../constants/action-types";

const intialState = {
  username: "",
};

export const loggedInUserReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGGED_IN_USER:
      return { ...state, username : payload };
    default:
      return state;
  }
};