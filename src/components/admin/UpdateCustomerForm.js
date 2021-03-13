import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import CustomerTable from "../UI/CustomerTable";
import classes from "./UpdateCustomerForm.module.css";
function UpdateCustomerForm(props) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState({
    id: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  let [fetchedData, setFetchedData] = useState("");
  const updateCustomerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#updateCustomerForm")
    );
    const customerId = parseInt(fetchedCustomer.id);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    axios
      .post(
        localUrl + ":8080//api/admin/updateCustomer",
        {
          id: customerId,
          password: password,
          email: email,
          first_name: firstName,
          last_name: lastName,
        },
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setFetchedData(error);
      });
  };

  const fetchCustomerByIdHandler = (e) => {
    e.preventDefault();
    const customerId = parseInt(document.querySelector("#customerId").value);
    axios
      .get(localUrl + ":8080//api/admin/getCustomer/" + customerId, {
        headers: { token: token },
      })
      .then(function (response) {
        document.getElementById("updateCustomerForm").reset();
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        document.getElementById("updateCustomerForm").reset();
      });
  };

  return (
    <div className={classes.formDiv}>
      <h3 className={classes.h3Div}>Update Customer</h3>
      <Form id="updateCustomerForm" onSubmit={updateCustomerHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <Form.Control
            id="customerId"
            name="customerId"
            defaultValue={fetchedCustomer.id}
          />
        </Form.Group>
        <MyButton
          variant="secondary"
          id="fetch"
          onClick={fetchCustomerByIdHandler}
        >
          FETCH
        </MyButton>
        <Form.Group>
          <Form.Label>First Name: </Form.Label>
          <Form.Control
            name="firstName"
            id="firstName"
            defaultValue={fetchedCustomer.first_name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name: </Form.Label>
          <Form.Control
            name="lastName"
            id="lastName"
            defaultValue={fetchedCustomer.last_name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control name="email" defaultValue={fetchedCustomer.email} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password: </Form.Label>
          <Form.Control
            name="password"
            defaultValue={fetchedCustomer.password}
          />
        </Form.Group>
        <MyButton type="submit">SUBMIT</MyButton>
      </Form>
      <CustomerTable data={fetchedData} title="CUSTOMER UPDATED SUCCESSFULY" />
    </div>
  );
}

export default UpdateCustomerForm;
