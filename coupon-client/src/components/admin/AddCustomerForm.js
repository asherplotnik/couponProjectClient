import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./AddCustomerForm.module.css";
import CustomerTable from "../UI/CustomerTable";
function AddCustomerForm(props) {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState("");
  const addCustomerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addCustomerForm"));
    const lastName = formData.get("lastname");
    const firstName = formData.get("firstname");
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post(
        localUrl + ":8080//api/admin/addCustomer",
        {
          id: 0,
          password: password,
          email: email,
          last_name: lastName,
          first_name: firstName,
        },
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setFetchedData(error);
        console.log(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <Form id="addCustomerForm" onSubmit={addCustomerHandler}>
        <Form.Group>
          <Form.Label>First Name: </Form.Label>
          <Form.Control name="firstname" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control name="lastname" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control name="email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password: </Form.Label>
          <Form.Control name="password" />
        </Form.Group>
        <MyButton type="submit">SUBMIT</MyButton>
      </Form>
      <CustomerTable data={fetchedData} title="CUSTOMER ADDED SUCCESSFULY" />
    </div>
  );
}

export default AddCustomerForm;
