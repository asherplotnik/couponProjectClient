import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import CustomerTable from "../../../UI/CustomerTable";
import "./UpdateCustomer.css";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";

interface UcProps {
  token: string;
}

function UpdateCustomer(props: UcProps) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let [fetchedData, setFetchedData] = useState<CustomerModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const updateCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#updateCustomerForm")
    );
    let customer: CustomerModel = new CustomerModel();
    customer.id = fetchedCustomer.id;
    customer.email = formData.get("email") as string;
    customer.password = formData.get("password") as string;
    customer.first_name = formData.get("firstName") as string;
    customer.last_name = formData.get("lastName") as string;
    axios
      .post(
        globals.urls.localUrl + ":8080//api/admin/updateCustomer",
        customer,
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };
  const fetchCustomerByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const customerId = parseInt(
      (document.querySelector("#customerId") as HTMLInputElement).value
    );
    setFetchedData(null);
    setFetchedCustomer(null);
    setErr(null);
    axios
      .get(
        globals.urls.localUrl + ":8080//api/admin/getCustomer/" + customerId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        (document.getElementById(
          "updateCustomerForm"
        ) as HTMLFormElement).reset();
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        setErr(error);
        (document.getElementById(
          "updateCustomerForm"
        ) as HTMLFormElement).reset();
      });
  };

  return (
    <div className="UpdateCustomer">
      <h3 className="h3Div">Update Customer</h3>
      <Form id="updateCustomerForm" onSubmit={updateCustomerHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID: </Form.Label>
            <Form.Control
              required
              id="customerId"
              name="customerId"
              defaultValue={fetchedCustomer && fetchedCustomer.id}
            />
          </Form.Group>
          <Button
            variant="secondary"
            id="fetch"
            onClick={fetchCustomerByIdHandler}
          >
            FETCH
          </Button>
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control
              name="firstName"
              id="firstName"
              defaultValue={fetchedCustomer && fetchedCustomer.first_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              name="lastName"
              id="lastName"
              defaultValue={fetchedCustomer && fetchedCustomer.last_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              name="email"
              defaultValue={fetchedCustomer && fetchedCustomer.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              defaultValue={fetchedCustomer && fetchedCustomer.password}
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CustomerTable
        err={err}
        data={fetchedData}
        title="CUSTOMER UPDATED SUCCESSFULLY"
      />
    </div>
  );
}

export default UpdateCustomer;
