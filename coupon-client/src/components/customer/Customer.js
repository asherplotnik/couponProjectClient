import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import PurchaseCoupon from "./PurchaseCoupon";
import App from "../../App";

function Customer() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  let subForm = "";
  let token = useSelector((state) => state.token);

  const actionSelector = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#actionForm"));
    setSubFormState(parseInt(formData.get("action")));
  };

  switch (subFormState) {
    case 1:
      subForm = <PurchaseCoupon token={token} />;
      break;
    case 8:
      dispatch(actions.setSession("", -1));
      return <App />;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2>customer Menu</h2>
      <form id="actionForm" onSubmit={actionSelector}>
        <label>Choose Action: </label>
        <input name="action" />
        <button type="submit"> SUBMIT </button>
        <p>1) purchase coupon</p>
        <p>2) get customer coupons</p>
        <p>3) get customer coupons by category</p>
        <p>4) get customer coupons by max price</p>
        <p>5) get customer details</p>
        <p>6) exit</p>
      </form>
      <div>{subForm}</div>
    </div>
  );
}

export default Customer;
