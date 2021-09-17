import { combineReducers } from "redux";
import { selectedDeviceidReducer } from "./deviceidReducer";
import { loggedInUserReducer } from "./usernameReducer";
import { orderDetailsReducer } from "./orderReducer";
import {continuousSigninStartReducer,  trackingPeriodReducer} from "./continuousSigninTimerReducer"

const reducers = combineReducers({
    selectedDeviceid : selectedDeviceidReducer,
    loggedInUser : loggedInUserReducer,
    orderDetails : orderDetailsReducer,
    continuousSigninStart : continuousSigninStartReducer,
    trackingPeriod : trackingPeriodReducer,
});
export default reducers;