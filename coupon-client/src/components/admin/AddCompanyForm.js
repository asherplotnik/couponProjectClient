import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";

function AddCompanyForm(props) {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState("");
  const addCompanyHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addCompanyForm"));
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post(
        localUrl + ":8080//api/admin/addCompany",
        { id: 0, password: password, email: email, name: username },
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedData(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="addCompanyForm" onSubmit={addCompanyHandler}>
        <label>Name: </label>
        <input name="username" /> <label>Email: </label>
        <input name="email" /> <label>password: </label>
        <input name="password" /> <button type="submit">SUBMIT</button>
      </form>
      <div>
        <p>{fetchedData}</p>
      </div>
    </div>
  );
}

export default AddCompanyForm;
