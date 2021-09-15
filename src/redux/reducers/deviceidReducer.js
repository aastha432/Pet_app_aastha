import { ActionTypes } from "../constants/action-types";

const intialState = {
  deviceid: "",
};

export const selectedDeviceidReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICEID:
      return { ...state, deviceid: payload };
    default:
      return state;
  }
};