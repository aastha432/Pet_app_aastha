import { combineReducers } from "redux";
import { selectedDeviceidReducer } from "./deviceidReducer";
import { loggedInUserReducer } from "./usernameReducer";
import { orderDetailsReducer } from "./orderReducer";

const reducers = combineReducers({
    selectedDeviceid : selectedDeviceidReducer,
    loggedInUser : loggedInUserReducer,
    orderDetails : orderDetailsReducer,
});
export default reducers;