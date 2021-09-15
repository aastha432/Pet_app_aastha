import { ActionTypes } from "../constants/action-types";

export const logged_in_user = (username) => {
  return {
    type: ActionTypes.LOGGED_IN_USER,
    payload: username,
  };
};