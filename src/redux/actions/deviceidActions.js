import { ActionTypes } from "../constants/action-types";

export const selected_deviceid = (deviceid) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: deviceid,
  };
};

export const selected_device_info = (info) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: info
  };
};

export const selected_device_latitude = (latitude) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: latitude
  };
};

export const selected_device_longitude = (longitude) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: longitude
  };
};

export const list_of_devices = (devices) => {
  return {
    type: ActionTypes.LIST_OF_DEVICES,
    payload: devices,
  };
};