import { SET_SESSION } from "../actionTypes.js";

const initialState = {
    token: "",
    userType: -1,
    email: "",
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_SESSION: {
        const { token, userType } = action.payload;
        return {
          ...state ,
            token : token, 
            userType : userType
            }
          };
      default:
        return state;
    }
  }