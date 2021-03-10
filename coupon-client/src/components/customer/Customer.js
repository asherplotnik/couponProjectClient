import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import PurchaseCoupon from "./PurchaseCoupon";
import GetCustomerCoupons from "./GetCustomerCoupons";
import GetCustomerCouponsByCategoryId from "./GetCustomerCouponsByCategoty";
import GetCustomerCouponsByMaxPrice from "./GetCompanyCouponsByMaxPrice";
import { useHistory } from "react-router-dom";
import GetCustomerDetails from "./GetCustomerDetails";

function Customer() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
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
    case 2:
      subForm = <GetCustomerCoupons token={token} />;
      break;
    case 3:
      subForm = <GetCustomerCouponsByCategoryId token={token} />;
      break;
    case 4:
      subForm = <GetCustomerCouponsByMaxPrice token={token} />;
      break;
    case 5:
      subForm = <GetCustomerDetails token={token} />;
      break;
    case 6:
      dispatch(actions.setSession("", -1));
      history.push("/login");
      break;
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
