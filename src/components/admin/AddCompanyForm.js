import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./AddCompanyForm.module.css";
import CompanyTable from "../UI/CompanyTable";
function AddCompanyForm(props) {
  const token = props.token;
  let [fetchedCompany, setfetchedCompany] = useState("");
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
        setfetchedCompany(response.data);
      })
      .catch(function (error) {
        setfetchedCompany(error);
        console.log(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <h3 className={classes.h3Div}>Add Company</h3>
      <Form id="addCompanyForm" onSubmit={addCompanyHandler}>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control name="username" />
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
      <CompanyTable data={fetchedCompany} title="COMPANY ADDED SUCCESSFULY" />
    </div>
  );
}

export default AddCompanyForm;
