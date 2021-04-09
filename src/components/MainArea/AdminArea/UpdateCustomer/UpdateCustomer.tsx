import React, { SyntheticEvent, useEffect } from "react";
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
  let [fetchedUpdate, setFetchedUpdate] = useState<CustomerModel>(null);
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  const [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const updateCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#updateCustomerForm")
    );
    let customer: CustomerModel = new CustomerModel();
    customer.id = fetchedUpdate.id;
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
        fetchCustomers();
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };
  const fetchCustomerByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#updateCustomerForm")
    );
    if ((formData.get("customerId") as string) === "") {
      return;
    }
    const customerId = parseInt(formData.get("customerId") as string);

    for (const customer of fetchedData) {
      if (customer.id === customerId) {
        setFetchedUpdate(customer);
        return;
      }
    }
    setErr(new ErrorModel());
  };

  const fetchCustomers = () => {
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getAllCustomers/", {
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
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getAllCustomers/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);

  return (
    <div className="UpdateCustomer">
      <h3 className="h3Div">Update Customer</h3>
      <Form id="updateCustomerForm" onSubmit={updateCustomerHandler}>
        <div className="FormColl">
          <Form.Control id="customerId" name="customerId" as="select" size="lg">
            <option value="">-- choose one --</option>
            {fetchedData && (
              <>
                {fetchedData.map((opt: CustomerModel) => {
                  return (
                    <option key={opt.id} value={opt.id}>
                      ID) {opt.id}
                      {"\u00A0"} {"\u00A0"}
                      {"\u00A0"} Name: {opt.first_name} {opt.last_name}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Control>
          <Button
            type="button"
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
              defaultValue={fetchedUpdate && fetchedUpdate.first_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              name="lastName"
              id="lastName"
              defaultValue={fetchedUpdate && fetchedUpdate.last_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              name="email"
              defaultValue={fetchedUpdate && fetchedUpdate.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              defaultValue={fetchedUpdate && fetchedUpdate.password}
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CustomerTable
        err={err}
        data={fetchedCustomer}
        title="CUSTOMER UPDATED SUCCESSFULLY"
      />
    </div>
  );
}

export default UpdateCustomer;
