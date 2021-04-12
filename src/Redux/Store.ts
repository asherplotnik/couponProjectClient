import { combineReducers, createStore } from "redux";
import { SessionReducer } from "./SessionState";


// Single Reducer: 
// const store = createStore(productsReducer);

// For getting ProductsState: 
// store.getState().products

// ----------------------------------------------------------

// Multiple Reducers: 
const reducers = combineReducers({ SessionState: SessionReducer /*, employeesState: employeesReducer, customersState: customersReducer */});
const store = createStore(reducers);

// For getting ProductsState: 
// store.getState().productsState.products
// store.getState().employeesState.employees
// store.getState().customersState.customers



export default store;
