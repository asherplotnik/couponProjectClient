import { useEffect, useState } from "react";
import "./Customer.css";
import PurchaseCoupon from "../PurchaseCoupon/PurchaseCoupon";
import GetCustomerCoupons from "../GetCustomerCoupons/GetCustomerCoupons";
import GetCustomerCouponsByCategoryId from "../GetCustomerCouponsByCategory/GetCustomerCouponsByCategory";
import GetCustomerCouponsByMaxPrice from "../GetCustomerCouponsByMaxPrice/GetCustomerCouponsByMaxPrice";
import { useHistory } from "react-router-dom";
import GetCustomerDetails from "../GetCustomerDetails/GetCustomerDetails";
import Form from "react-bootstrap/Form";
import GetCustomerCoupon from "../GetCustomerCoupon/GetCustomerCoupon";
import store from "../../../../Redux/Store";
import { setSessionAction } from "../../../../Redux/SessionState";
import Unauthorized from "../../Unauthorized/Unauthorized";

function Customer() {
  const [subFormState, setSubFormState] = useState(0);
  let [token, setToken] = useState(store.getState().SessionState.session.token);
  const history = useHistory();

  useEffect(() => {
    setToken(store.getState().SessionState.session.token);
  }, [token]);

  const actionSelector = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    setSubFormState(parseInt(event.target.value as string));
  };

  let subForm: JSX.Element;
  if (!token || store.getState().SessionState.session.userType !== 2) {
    return <Unauthorized />;
  }
  switch (subFormState) {
    case 1:
      subForm = <PurchaseCoupon />;
      break;
    case 2:
      subForm = <GetCustomerCoupon />;
      break;
    case 3:
      subForm = <GetCustomerCoupons />;
      break;
    case 4:
      subForm = <GetCustomerCouponsByCategoryId />;
      break;
    case 5:
      subForm = <GetCustomerCouponsByMaxPrice />;
      break;
    case 6:
      subForm = <GetCustomerDetails />;
      break;
    case 7:
      store.dispatch(setSessionAction({ token: "", name: "", userType: -1 }));
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
                size="lg"
              >
                <option value="">-- choose one --</option>
                <option value="1"> purchase coupon</option>
                <option value="2"> get customer coupon by ID</option>
                <option value="3"> get customer coupons</option>
                <option value="4"> get customer coupons by category</option>
                <option value="5"> get customer coupons by max price</option>
                <option value="6"> get customer details</option>
                <option value="7"> exit</option>
              </Form.Control>
            </Form.Group>
          </div>
          {/* <MyButton type="submit"> SUBMIT </MyButton> */}
        </Form>
        <div className="SubFormCustomer">{subForm}</div>
      </div>
    </div>
  );
}

export default Customer;
