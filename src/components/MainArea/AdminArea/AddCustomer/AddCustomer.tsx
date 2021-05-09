import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./AddCustomer.css";
import CustomerTable from "../../../UI/CustomerTable";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";

interface AcProps {
  token: string;
}

function AddCustomer(props: AcProps) {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState<CustomerModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const addCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addCustomerForm"));
    let customer: CustomerModel = new CustomerModel();
    customer.id = 0;
    customer.last_name = formData.get("lastname") as string;
    customer.first_name = formData.get("firstname") as string;
    customer.email = formData.get("email") as string;
    customer.password = formData.get("password") as string;
    axios
      .post(globals.urls.localUrl + "api/admin/addCustomer", customer, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="AddCustomer">
      <h3 className="h3Div">Add Customer</h3>
      <Form id="addCustomerForm" onSubmit={addCustomerHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control name="firstname" minLength={2} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control name="lastname" minLength={2} required />
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
}

export default AddCustomer;
