import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Layout from "./Components/LayoutArea/Layout";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import sessionReducer from "./Redux/reducers/sessionReducer";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
const store: Store<SessionState, SessionAction> & {
  dispatch: DispatchType;
} = createStore(sessionReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
