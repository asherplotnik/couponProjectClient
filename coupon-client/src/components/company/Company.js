import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { useHistory } from "react-router-dom";
import AddCoupon from "./AddCoupon";
import DeleteCoupon from "./DeleteCoupon";
import UpdateCoupon from "./UpdateCoupon";
import GetCompanyCoupons from "./GetCompanyCoupons";
import GetCompanyCouponsByCategory from "./GetCompanyCouponsByCategory";
import GetCompanyCouponsByMaxPrice from "./GetCompanyCouponsByMaxPrice";
import GetCompanyDetails from "./GetCompanyDetails";
function Company() {
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
      subForm = <AddCoupon token={token} />;
      break;
    case 2:
      subForm = <DeleteCoupon token={token} />;
      break;
    case 3:
      subForm = <UpdateCoupon token={token} />;
      break;
    case 4:
      subForm = <GetCompanyCoupons token={token} />;
      break;
    case 5:
      subForm = <GetCompanyCouponsByCategory token={token} />;
      break;
    case 6:
      subForm = <GetCompanyCouponsByMaxPrice token={token} />;
      break;
    case 7:
      subForm = <GetCompanyDetails token={token} />;
      break;
    case 8:
      dispatch(actions.setSession("", -1));
      history.push("/login");
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2>company Menu</h2>
      <form id="actionForm" onSubmit={actionSelector}>
        <label>Choose Action: </label>
        <input name="action" />
        <button type="submit"> SUBMIT </button>
        <p>1) add new coupon</p>
        <p>2) delete coupon</p>
        <p>3) update coupon details</p>
        <p>4) get company coupons</p>
        <p>5) get company coupons by category</p>
        <p>6) get company coupons by max price</p>
        <p>7) get company details</p>
        <p>8) exit</p>
      </form>
      <div>{subForm}</div>
    </div>
  );
}

export default Company;
