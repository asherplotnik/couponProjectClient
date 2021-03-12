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
import classes from "./Company.module.css";
import Form from "react-bootstrap/Form";
function Company() {
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
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className={classes.h2}>Company Menu</h2>
      <div className={classes.formDiv}>
        <Form id="actionForm">
          <Form.Group>
            <Form.Label>Choose Action: </Form.Label>
            <Form.Control
              onChange={actionSelector}
              name="action"
              as="select"
              id="actionSelect"
            >
              <option value="">-- choose one --</option>
              <option value="1"> add new coupon</option>
              <option value="2"> delete coupon</option>
              <option value="3"> update coupon details</option>
              <option value="4"> get company coupons</option>
              <option value="5"> get company coupons by category</option>
              <option value="6"> get company coupons by max price</option>
              <option value="7"> get company details</option>
              <option value="8"> exit</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div>{subForm}</div>
    </div>
  );
}

export default Company;
