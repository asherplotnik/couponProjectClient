import "./Admin.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AddCompany from "../AddCompany/AddCompany";
import AddCustomer from "../AddCustomer/AddCustomer";
import DeleteCompany from "../DeleteCompany/DeleteCompany";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import UpdateCompany from "../UpdateCompany/UpdateCompany";
import UpdateCustomer from "../UpdateCustomer/UpdateCustomer";
import GetAllCompanies from "../GetAllCompanies/GetAllCompanies";
import GetAllCustomers from "../GetAllCustomers/GetAllCustomers";
import GetCompany from "../GetCompany/GetCompany";
import GetCustomer from "../GetCustomer/GetCustomer";
import Form from "react-bootstrap/Form";
import store from "../../../../Redux/Store";
import { setSessionAction } from "../../../../Redux/SessionState";
import Unauthorized from "../../Unauthorized/Unauthorized";
const Admin = () => {
  const [subFormState, setSubFormState] = useState(0);
  let [token, setToken] = useState(store.getState().SessionState.session.token);
  const history = useHistory();

  const actionSelector = (event: SyntheticEvent) => {
    event.preventDefault();
    if (parseInt((event.target as HTMLInputElement).value as string) === 11) {
      store.dispatch(setSessionAction({ token: "", name: "", userType: -1 }));
      history.push("/login");
    }
    setSubFormState(
      parseInt((event.target as HTMLInputElement).value as string)
    );
  };

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

  let subForm = <div></div>;
  if (!token || store.getState().SessionState.session.userType !== 0) {
    return <Unauthorized />;
  }
  switch (subFormState) {
    case 1:
      subForm = <AddCompany />;
      break;
    case 2:
      subForm = <DeleteCompany />;
      break;
    case 3:
      subForm = <UpdateCompany />;
      break;
    case 4:
      subForm = <GetCompany />;
      break;
    case 5:
      subForm = <GetAllCompanies />;
      break;
    case 6:
      subForm = <AddCustomer />;
      break;
    case 7:
      subForm = <DeleteCustomer />;
      break;
    case 8:
      subForm = <UpdateCustomer />;
      break;
    case 9:
      subForm = <GetCustomer />;
      break;
    case 10:
      subForm = <GetAllCustomers />;
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className="h2">Admin Menu</h2>
      <div className="Admin">
        <Form className="AdminForm">
          <Form.Group>
            <Form.Label>Choose Action: </Form.Label>
            <Form.Control
              onChange={actionSelector}
              name="action"
              as="select"
              id="actionSelect"
              size="lg"
            >
              <option value="">-- Choose one --</option>
              <option value="1"> Add new company</option>
              <option value="2"> Delete company</option>
              <option value="3"> Update company details</option>
              <option value="4"> Get company details</option>
              <option value="5"> Get all companies</option>
              <option value="6"> Add customer</option>
              <option value="7"> Delete customer</option>
              <option value="8"> Update customer details</option>
              <option value="9"> Get customer details</option>
              <option value="10"> Get all customers</option>
              <option value="11"> Exit</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div className="SubFormAdmin">{subForm}</div>
      </div>
    </div>
  );
};

export default Admin;
