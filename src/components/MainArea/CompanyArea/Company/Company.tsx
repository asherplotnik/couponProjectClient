import { SyntheticEvent, useEffect, useState } from "react";
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
  const actionSelector = (event: SyntheticEvent) => {
    event.preventDefault();
    if (parseInt((event.target as HTMLInputElement).value as string) === 9) {
      store.dispatch(setSessionAction({ token: "", name: "", userType: -1 }));
      history.push("/login");
    }
    setSubFormState(
      parseInt((event.target as HTMLInputElement).value as string)
    );
  };

  const [subFormState, setSubFormState] = useState(0);
  let [token, setToken] = useState(store.getState().SessionState.session.token);
  const history = useHistory();
  useEffect(() => {
    setToken(store.getState().SessionState.session.token);
  }, []);

  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      if (store.getState().SessionState.session.token === "") {
        history.push("/");
      }
    });
    return () => {
      unsubscribeMe();
    };
  }, [history]);

  let subForm: JSX.Element;
  if (!token || store.getState().SessionState.session.userType !== 1) {
    return <Unauthorized />;
  }
  switch (subFormState) {
    case 1:
      subForm = <AddCoupon />;
      break;
    case 2:
      subForm = <DeleteCoupon />;
      break;
    case 3:
      subForm = <UpdateCoupon />;
      break;
    case 4:
      subForm = <GetCompanyCoupon />;
      break;
    case 5:
      subForm = <GetCompanyCoupons />;
      break;
    case 6:
      subForm = <GetCompanyCouponsByCategoryId />;
      break;
    case 7:
      subForm = <GetCompanyCouponsByMaxPrice />;
      break;
    case 8:
      subForm = <GetCompanyDetails />;
      break;
    default:
      subForm = <div></div>;
  }
  return (
    <div className="Company">
      <h3>Company Menu</h3>
      <div className="FormDiv">
        <Form className="actionForm">
          <div className="Field">
            <Form.Group>
              <Form.Label>Choose Action: </Form.Label>
              <Form.Control
                onChange={actionSelector}
                value={subFormState}
                name="action"
                as="select"
                className="ActionSelect"
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
