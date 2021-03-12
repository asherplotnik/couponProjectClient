import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import PurchaseCoupon from "./PurchaseCoupon";
import GetCustomerCoupons from "./GetCustomerCoupons";
import GetCustomerCouponsByCategoryId from "./GetCustomerCouponsByCategoty";
import GetCustomerCouponsByMaxPrice from "./GetCompanyCouponsByMaxPrice";
import { useHistory } from "react-router-dom";
import GetCustomerDetails from "./GetCustomerDetails";
import classes from "./Customer.module.css";
import Form from "react-bootstrap/Form";
function Customer() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  let subForm = "";
  let token = useSelector((state) => state.token);

  const actionSelector = (e) => {
    e.preventDefault();
    setSubFormState(parseInt(e.target.value));
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
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className={classes.h2}>customer Menu</h2>
      <div className={classes.formDiv}>
        <Form id="actionForm" onSubmit={actionSelector}>
          <Form.Group>
            <Form.Label>Choose Action: </Form.Label>
            <Form.Control
              onChange={actionSelector}
              name="action"
              as="select"
              id="actionSelect"
            >
              <option value="">-- choose one --</option>
              <option value="1"> purchase coupon</option>
              <option value="2"> get customer coupons</option>
              <option value="3"> get customer coupons by category</option>
              <option value="4"> get customer coupons by max price</option>
              <option value="5"> get customer details</option>
              <option value="6"> exit</option>
            </Form.Control>
          </Form.Group>
          {/* <button type="submit"> SUBMIT </button> */}
        </Form>
      </div>
      <div>{subForm}</div>
    </div>
  );
}

export default Customer;
