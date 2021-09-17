import { ActionTypes } from "../constants/action-types";

const intialState = {
  timer: null,
};

const initialPeriod = {
  period_timer : null
}

export const continuousSigninStartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.CONTINUOUS_SIGNIN_TIMER_START: 
      return { ...state , timer : setInterval(payload,2000)}
    case ActionTypes.CONTINUOUS_SIGNIN_TIMER_STOP:
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
      case ActionTypes.TRACKING_PERIOD_NORMAL:
        return { ...state , period_timer : clearInterval(state.period_timer), period_timer : setInterval(payload,10000)};

      case ActionTypes.TRACKING_PERIOD_POWERSAVING:
        return { ...state ,period_timer : clearInterval(state.period_timer), period_timer : setInterval(payload,60000)};

      case ActionTypes.TRACKING_PERIOD_TRACKING:
        return { ...state ,period_timer : clearInterval(state.period_timer), period_timer : setInterval(payload,1000)};

      default:
        return state;
    }
  };