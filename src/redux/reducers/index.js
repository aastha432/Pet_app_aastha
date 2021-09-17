import { combineReducers } from "redux";
import { selectedDeviceidReducer , List_of_devices_Reducer} from "./deviceidReducer";
import { loggedInUserReducer } from "./usernameReducer";
import { orderDetailsReducer } from "./orderReducer";
import {continuousSigninStartReducer,  trackingPeriodReducer} from "./continuousSigninTimerReducer"

const reducers = combineReducers({
    listOfDevices : List_of_devices_Reducer,
    selectedDeviceid : selectedDeviceidReducer,
    loggedInUser : loggedInUserReducer,
    orderDetails : orderDetailsReducer,
    continuousSigninStart : continuousSigninStartReducer,
    trackingPeriod : trackingPeriodReducer,
});
export default reducers;