import { ActionTypes } from "../constants/action-types";

const intialState = {
  timer: null,
};

const initialPeriod = {
  period: "normal"
}

export const continuousSigninStartReducer = (state = intialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.CONTINUOUS_SIGNIN_TIMER_START: 
      console.log(state);
      return { ...state , timer : setInterval(payload,2000)}
    case ActionTypes.CONTINUOUS_SIGNIN_TIMER_STOP:
        console.log(state);
       return { ...state, timer : clearInterval(state.timer)}
    default:
      return state;
  }
};

/*export const continuousSigninStopReducer = (state = intialState, { type, payload }) => {
  console.log(type);
    switch (type) {
      case ActionTypes.CONTINUOUS_SIGNIN_TIMER_STOP:
         console.log(state);
        return { ...state, timer : clearInterval(state.timer)}
      default:
        return state;
    }
  };*/

  export const trackingPeriodReducer = (state = initialPeriod, { type, payload }) => {
    switch (type) {
      case ActionTypes.TRACKING_PERIOD:
        return { ...state, period: payload };
      default:
        return state;
    }
  };