import { ActionTypes } from "../constants/action-types";

export const continuousSigninStart = (aFunction) => {
  return {
    type: ActionTypes.CONTINUOUS_SIGNIN_TIMER_START,
    payload: aFunction,
  };
};

export const continuousSigninStop = () => {
    return {
      type: ActionTypes.CONTINUOUS_SIGNIN_TIMER_STOP,
      payload: {},
    };
  };

export const trackingperiod_normal = (aFunction) => {
  return {
    type: ActionTypes.TRACKING_PERIOD_NORMAL,
    payload: aFunction,
  };
}

export const trackingperiod_powersaving = (aFunction) => {
  return {
    type: ActionTypes.TRACKING_PERIOD_POWERSAVING,
    payload: aFunction,
  };
}

export const trackingperiod_tracking = (aFunction) => {
  return {
    type: ActionTypes.TRACKING_PERIOD_TRACKING,
    payload: aFunction,
  };
}