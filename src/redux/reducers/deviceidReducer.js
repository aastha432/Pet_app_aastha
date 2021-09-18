import { ActionTypes } from "../constants/action-types";

const intialStateDeviceID = {
  deviceid: ""
};

const initialDeviceInfo = {
  info : {}
}

const initialDeviceLat = {
  latitude : ""
}

const initialDeviceLong= {
  longitude : ""
}

const initialdevicelist = {
  devicelist : [],
}

export const selectedDeviceidReducer = (state = intialStateDeviceID, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICEID:
      return { ...state, deviceid: payload };
    default:
      return state;
  }
};

export const selectedDeviceInfoReducer = (state = initialDeviceInfo, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICE_INFO:
      return { ...state,
        info : payload};
    default:
      return state;
  }
};

export const selectedDeviceLatReducer = (state = initialDeviceLat, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICE_LATITUDE:
      return { ...state,
        latitude : payload};
    default:
      return state;
  }
};

export const selectedDeviceLongReducer = (state = initialDeviceLong, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_DEVICE_LONGITUDE:
      return { ...state,
        longitude : payload};
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