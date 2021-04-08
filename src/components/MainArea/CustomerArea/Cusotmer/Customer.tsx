import { useState } from "react";
import "./Customer.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../Redux/actions";
import PurchaseCoupon from "../PurchaseCoupon/PurchaseCoupon";
import GetCustomerCoupons from "../GetCustomerCoupons/GetCustomerCoupons";
import GetCustomerCouponsByCategoryId from "../GetCustomerCouponsByCategory/GetCustomerCouponsByCategory";
import GetCustomerCouponsByMaxPrice from "../GetCustomerCouponsByMaxPrice/GetCustomerCouponsByMaxPrice";
import { useHistory } from "react-router-dom";
import GetCustomerDetails from "../GetCustomerDetails/GetCustomerDetails";
import "./Customer.css";
import Form from "react-bootstrap/Form";

function Customer() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  let subForm: JSX.Element;
  let token = useSelector<SessionState, any>((state) => state.session.token);

  const actionSelector = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    setSubFormState(parseInt(event.target.value as string));
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
      dispatch(actions.setSession({ token: "", userType: -1 }));
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className="CustomerH2">customer Menu</h2>
      <div className="Customer">
        <Form id="actionForm">
          <div className="FormColl">
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
          </div>
          {/* <MyButton type="submit"> SUBMIT </MyButton> */}
        </Form>
      </div>
      <div className="SubFormCustomer">{subForm}</div>
    </div>
  );
}

export default Customer;
