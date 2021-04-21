import { useEffect, useState } from "react";
import "./Company.css";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import AddCoupon from "../AddCoupon/AddCoupon";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../UpdateCoupon/UpdateCoupon";
import GetCompanyCouponsByCategoryId from "../GetCompanyCouponsByCategoryId/GetCompanyCouponsByCategory";
import GetCompanyCoupons from "../GetCompanyCoupons/GetCompanyCoupons";
import GetCompanyCouponsByMaxPrice from "../GetCompanyCouponsByMaxPrice/GetCompanyCouponsByMaxPrice";
import GetCompanyDetails from "../GetCompanyDetails/GetCompanyDetails";
import GetCompanyCoupon from "../GetCompanyCoupon/GetCompanyCoupon";
import store from "../../../../Redux/Store";
import { setSessionAction } from "../../../../Redux/SessionState";
import Unauthorized from "../../Unauthorized/Unauthorized";

const Company = (): JSX.Element => {
  const actionSelector = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    setSubFormState(parseInt(event.target.value as string));
  };
  const [subFormState, setSubFormState] = useState(0);
  let [token, setToken] = useState(store.getState().SessionState.session.token);
  const history = useHistory();
  useEffect(() => {
    setToken(store.getState().SessionState.session.token);
  }, [token]);

  let subForm: JSX.Element;
  if (!token) {
    return <Unauthorized />;
  }
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
      subForm = <GetCompanyCoupon token={token} />;
      break;
    case 5:
      subForm = <GetCompanyCoupons token={token} />;
      break;
    case 6:
      subForm = <GetCompanyCouponsByCategoryId token={token} />;
      break;
    case 7:
      subForm = <GetCompanyCouponsByMaxPrice token={token} />;
      break;
    case 8:
      subForm = <GetCompanyDetails token={token} />;
      break;
    case 9:
      store.dispatch(setSessionAction({ token: "", userType: -1 }));
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div className="Company">
      <h3>Company Menu</h3>
      <div className="FormDiv">
        <Form id="actionForm">
          <div className="Field">
            <Form.Group>
              <Form.Label>Choose Action: </Form.Label>
              <Form.Control
                onChange={actionSelector}
                value={subFormState}
                name="action"
                as="select"
                id="actionSelect"
                size="lg"
              >
                <option value="">-- choose one --</option>
                <option value="1"> add new coupon</option>
                <option value="2"> delete coupon</option>
                <option value="3"> update coupon details</option>
                <option value="4"> get company coupon by ID</option>
                <option value="5"> get company coupons</option>
                <option value="6"> get company coupons by category</option>
                <option value="7"> get company coupons by max price</option>
                <option value="8"> get company details</option>
                <option value="9"> exit</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Form>
        <div className="SubFormCompany">{subForm}</div>
      </div>
    </div>
  );
};

export default Company;
