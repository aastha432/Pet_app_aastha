import { ActionTypes } from "../constants/action-types";

export const selected_deviceid = (deviceid) => {
  return {
    type: ActionTypes.SELECTED_DEVICEID,
    payload: deviceid,
  };
};