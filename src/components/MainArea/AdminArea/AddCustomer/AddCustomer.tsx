import { SyntheticEvent, useRef } from "react";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./AddCustomer.css";
import CustomerTable from "../../../UI/CustomerTable/CustomerTable";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const AddCustomer = () => {
  let [fetchedData, setFetchedData] = useState<CustomerModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const addCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let customer: CustomerModel = new CustomerModel();
    customer.id = 0;
    customer.lastName = formData.get("lastName") as string;
    customer.firstName = formData.get("firstName") as string;
    customer.email = formData.get("email") as string;
    customer.password = formData.get("password") as string;
    jwtAxios
      .post(globals.urls.localUrl + "api/admin/addCustomer", customer)
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  };

  return (
    <div className="AddCustomer">
      <h3 className="h3Div">Add Customer</h3>
      <Form ref={formRef} onSubmit={addCustomerHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control name="firstName" minLength={2} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control name="lastName" minLength={2} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control name="email" type="email" minLength={4} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              type="password"
              minLength={6}
              required
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CustomerTable
        err={err}
        data={fetchedData}
        title="CUSTOMER ADDED SUCCESSFULLY"
      />
    </div>
  );
};

export default AddCustomer;
