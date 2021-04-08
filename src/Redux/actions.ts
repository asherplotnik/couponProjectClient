import { SET_SESSION } from "./actionTypes";

export const setSession = (session : ISession)=> ({
  type: SET_SESSION,
  session
});
