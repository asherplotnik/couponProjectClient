import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./GetCustomerForm.module.css";
import CouponsTable from "../UI/CouponsTable";
import CustomerTable from "../UI/CustomerTable";
const GetCustomer = (props) => {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState("");
  let [fetchedCoupons, setFetchedCoupons] = useState("");
  const fetchCustomerByIdHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCustomerForm"));
    const customerId = parseInt(formData.get("customerId"));
    axios
      .get(localUrl + ":8080//api/admin/getCustomer/" + customerId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(localUrl + ":8080//api/admin/getCustomerCoupons/" + customerId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCoupons(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.subformDiv}>
      <Form id="getCustomerForm" onSubmit={fetchCustomerByIdHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <Form.Control id="customerId" name="customerId" type="number" />
        </Form.Group>
        <MyButton type="submit">FETCH</MyButton>
      </Form>
      <div>
        <CustomerTable
          data={fetchedCustomer}
          title={fetchedCustomer.first_name + " " + fetchedCustomer.last_name}
        />
        <CouponsTable data={fetchedCoupons} title="Customer's Coupons" />
      </div>
    </div>
  );
};

export default GetCustomer;
