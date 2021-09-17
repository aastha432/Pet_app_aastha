import { ActionTypes } from "../constants/action-types";

const intialState = {
  deviceid: "",
};

const initialdevicelist = {
  devicelist : [],
}

export const selectedDeviceidReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICEID:
      return { ...state, deviceid: payload };
    default:
      return state;
  }
};

export const List_of_devices_Reducer = (state = initialdevicelist, { type, payload }) => {
  switch (type) {
    case ActionTypes.LIST_OF_DEVICES:
      return { ...state, devicelist : payload };
    default:
      return state;
  }
};