import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";

function UpdateCustomerForm(props) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCompany] = useState({
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
        setFetchedData(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchCompanyByIdHandler = (e) => {
    e.preventDefault();
    const customerId = parseInt(document.querySelector("#customerId").value);
    axios
      .get(localUrl + ":8080//api/admin/getCustomer/" + customerId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="updateCustomerForm" onSubmit={updateCustomerHandler}>
        <label> ID: </label>
        <input id="customerId" name="customerId" />
        <button id="fetch" onClick={fetchCompanyByIdHandler}>
          {" "}
          FETCH{" "}
        </button>
        <label> First name: </label>
        <input
          id="firstName"
          name="firstName"
          defaultValue={fetchedCustomer.first_name}
        />
        <label> Last name: </label>
        <input
          id="lastName"
          name="lastName"
          defaultValue={fetchedCustomer.last_name}
        />
        <label> Email: </label>
        <input name="email" defaultValue={fetchedCustomer.email} />
        <label> password: </label>
        <input name="password" defaultValue={fetchedCustomer.password} />
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <p>{fetchedData}</p>
      </div>
    </div>
  );
}

export default UpdateCustomerForm;
