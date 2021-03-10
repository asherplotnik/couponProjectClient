import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
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
        setFetchedCustomer(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(localUrl + ":8080//api/admin/getCustomerCoupons/" + customerId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCoupons(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="getCustomerForm" onSubmit={fetchCustomerByIdHandler}>
        <label> ID: </label>
        <input id="customerId" name="customerId" />
        <button type="submit">FETCH</button>
      </form>
      <div>
        <p>{fetchedCustomer}</p>
        <p>Customer coupons: </p>
        <p>{fetchedCoupons}</p>
      </div>
    </div>
  );
};

export default GetCustomer;
