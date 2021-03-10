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
function Admin() {
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
      history.push("/login");
    default:
      subForm = <div></div>;
  }

  return (
    <div>
      <h2>Admin Menu</h2>
      <form id="actionForm" onSubmit={actionSelector}>
        <label>Choose Action: </label>
        <input name="action" />
        <button type="submit"> SUBMIT </button>
        <p>1) add new company</p>
        <p>2) delete company</p>
        <p>3) update company details</p>
        <p>4) get company details</p>
        <p>5) get all companies</p>
        <p>6) add customer</p>
        <p>7) delete customer</p>
        <p>8) update customer details</p>
        <p>9) get customer details</p>
        <p>10) get all customers</p>
        <p>11) exit</p>
      </form>
      <div>{subForm}</div>
    </div>
  );
}

export default Admin;
