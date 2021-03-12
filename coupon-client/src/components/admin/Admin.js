import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import AddCompanyForm from "./AddCompanyForm";
import AddCustomerForm from "./AddCustomerForm";
import DeleteCompanyForm from "./DeleteCompanyForm";
import DeleteCustomerForm from "./DeleteCustomerForm";
import UpdateCompanyForm from "./UpdateCompanyForm";
import UpdateCustomerForm from "./UpdateCustomerForm";
import GetAllCompanies from "./GetAllCompanies";
import GetAllCustomers from "./GetAllCustomers";
import GetCompany from "./GetCompanyForm";
import GetCustomer from "./GetCustomerForm";
import classes from "./Admin.module.css";
import Form from "react-bootstrap/Form";
function Admin() {
  const [subFormState, setSubFormState] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  let subForm = "";
  let token = useSelector((state) => state.token);

  const actionSelector = (e) => {
    setSubFormState(parseInt(e.target.value));
  };

  switch (subFormState) {
    case 1:
      subForm = <AddCompanyForm token={token} />;
      break;
    case 2:
      subForm = <DeleteCompanyForm token={token} />;
      break;
    case 3:
      subForm = <UpdateCompanyForm token={token} />;
      break;
    case 4:
      subForm = <GetCompany token={token} />;
      break;
    case 5:
      subForm = <GetAllCompanies token={token} />;
      break;
    case 6:
      subForm = <AddCustomerForm token={token} />;
      break;
    case 7:
      subForm = <DeleteCustomerForm token={token} />;
      break;
    case 8:
      subForm = <UpdateCustomerForm token={token} />;
      break;
    case 9:
      subForm = <GetCustomer token={token} />;
      break;
    case 10:
      subForm = <GetAllCustomers token={token} />;
      break;
    case 11:
      dispatch(actions.setSession("", -1));
      history.replace("/login");
      break;
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2 className={classes.h2}>Admin Menu</h2>
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
      <div>{subForm}</div>
    </div>
  );
}

export default Admin;
