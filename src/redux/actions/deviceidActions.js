import { ActionTypes } from "../constants/action-types";

export const selected_deviceid = (deviceid) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: deviceid,
  };
};

export const list_of_devices = (devices) => {
  return {
    type: ActionTypes.LIST_OF_DEVICES,
    payload: devices,
  };
};