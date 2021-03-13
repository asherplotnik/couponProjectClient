import { SET_SESSION } from "./actionTypes";

export const setSession = (token, userType )=> ({
  type: SET_SESSION,
  payload: { token : token , userType : userType }
});

