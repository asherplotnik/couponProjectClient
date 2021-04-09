import "./Admin.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../Redux/actions";
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
function Admin() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  let token = useSelector<SessionState, any>((state) => state.session.token);
  const actionSelector = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubFormState(parseInt(event.target.value as string));
  };
  let subForm: JSX.Element;
  switch (subFormState) {
    case 1:
      subForm = <AddCompany token={token} />;
      break;
    case 2:
      subForm = <DeleteCompany token={token} />;
      break;
    case 3:
      subForm = <UpdateCompany token={token} />;
      break;
    case 4:
      subForm = <GetCompany token={token} />;
      break;
    case 5:
      subForm = <GetAllCompanies token={token} />;
      break;
    case 6:
      subForm = <AddCustomer token={token} />;
      break;
    case 7:
      subForm = <DeleteCustomer token={token} />;
      break;
    case 8:
      subForm = <UpdateCustomer token={token} />;
      break;
    case 9:
      subForm = <GetCustomer token={token} />;
      break;
    case 10:
      subForm = <GetAllCustomers token={token} />;
      break;
    case 11:
      dispatch(actions.setSession({ token: "", userType: -1 }));
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className="h2">Admin Menu</h2>
      <div className="Admin">
        <Form id="actionForm">
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
              <option value="1"> add new company</option>
              <option value="2"> delete company</option>
              <option value="3"> update company details</option>
              <option value="4"> get company details</option>
              <option value="5"> get all companies</option>
              <option value="6"> add customer</option>
              <option value="7"> delete customer</option>
              <option value="8"> update customer details</option>
              <option value="9"> get customer details</option>
              <option value="10"> get all customers</option>
              <option value="11"> exit</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="SubFormAdmin">{subForm}</div>
    </div>
  );
}

export default Admin;
