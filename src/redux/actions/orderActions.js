import { ActionTypes } from "../constants/action-types";

export const order_details = (order) => {
  return {
    type: ActionTypes.ORDER_DETAILS,
    payload: order,
  };
};