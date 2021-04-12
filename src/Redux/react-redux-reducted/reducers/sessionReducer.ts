import { SET_SESSION } from "../actionTypes";

const initialState : SessionState  = {
 session :{
     token : "",
     userType : -1, 
 }
};

function sessionReducer(state = initialState, action: SessionAction) {
  switch (action.type) {
    case SET_SESSION: {
     return {
        ...state,
        session:{
            token: action.session.token,
            userType: action.session.userType
        }
      };
    }
    default:
      return state;
  }
}
export default sessionReducer;
