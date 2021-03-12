import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./DeleteCustomerForm.module.css";
import CustomerTable from "../UI/CustomerTable";
function DeleteCustomerForm(props) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState("");
  const deleteCustomerHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#deleteCustomerForm")
    );
    const id = parseInt(formData.get("id"));
    axios
      .delete(localUrl + ":8080//api/admin/deleteCustomer/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        setFetchedCustomer(error);
        console.log(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <Form id="deleteCustomerForm" onSubmit={deleteCustomerHandler}>
        <Form.Group>
          <Form.Label>ID to delete: </Form.Label>
          <Form.Control name="id" /> <MyButton type="submit">SUBMIT</MyButton>
        </Form.Group>
      </Form>
      <CustomerTable
        data={fetchedCustomer}
        title="CUSTOMER DELETED SUCCESSFULY"
      />
    </div>
  );
}

export default DeleteCustomerForm;
