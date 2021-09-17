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

export const trackingperiod = (period) => {
  return {
    type: ActionTypes.TRACKING_PERIOD,
    payload: period,
  };
}