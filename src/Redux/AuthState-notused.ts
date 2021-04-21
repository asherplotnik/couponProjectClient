import UserModel from "../Models/UserModel";

// Auth state: 
export class AuthState {
    public user: UserModel = null;
    public constructor() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(storedUser) {
            this.user = storedUser;
        }
    }
}

// ----------------------------------------------------------------------------------

// Auth action types: 
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

// ----------------------------------------------------------------------------------

// Auth action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any; // The ? is for the Logout!
}

// ----------------------------------------------------------------------------------

// Auth Action creators:
export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload: user };
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

// ----------------------------------------------------------------------------------

// Auth reducer:
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState }; // Spread Operator = שכפול אובייקט לאובייקט חדש

    switch (action.type) {
        case AuthActionType.Login: // Here the payload is the logged in user sent from the server
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the local storage (won't be deleted)
            // sessionStorage.setItem("user", JSON.stringify(newState.user)); // Saving in the session storage (will be deleted when browser is closed)
            break;
        case AuthActionType.Logout: // Here we don't have payload!
            newState.user = null;
            localStorage.removeItem("user"); // clear user from the local storage.
            break;
    }

    return newState;
}

