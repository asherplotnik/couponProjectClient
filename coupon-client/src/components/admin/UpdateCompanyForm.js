import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CompanyTable from "../UI/CompanyTable";
import classes from "./UpdateCompanyForm.module.css";
function UpdateCompanyForm(props) {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState({
    id: "",
    password: "",
    email: "",
    name: "",
  });
  let [fetchedUpdate, setFetchedUpdate] = useState("");
  const updateCompanyHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCompanyForm"));
    const companyId = parseInt(fetchedUpdate.id);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = document.querySelector("#companyName").value;
    axios
      .post(
        localUrl + ":8080//api/admin/updateCompany",
        { id: companyId, password: password, email: email, name: name },
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setFetchedCompany(error);
      });
  };

  const fetchCompanyByIdHandler = (e) => {
    e.preventDefault();
    const companyId = parseInt(document.querySelector("#companyId").value);
    axios
      .get(localUrl + ":8080//api/admin/getCompany/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        document.getElementById("updateCompanyForm").reset();
        setFetchedUpdate(response.data);
      })
      .catch(function (error) {
        document.getElementById("updateCompanyForm").reset();
      });
  };
  return (
    <div className={classes.formDiv}>
      <Form id="updateCompanyForm" onSubmit={updateCompanyHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <Form.Control
            id="companyId"
            name="companyId"
            defaultValue={fetchedUpdate.id}
          />
        </Form.Group>
        <Button
          variant="secondary"
          id="fetch"
          onClick={fetchCompanyByIdHandler}
        >
          FETCH
        </Button>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            name="companyName"
            id="companyName"
            defaultValue={fetchedUpdate.name}
            disabled={true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control name="email" defaultValue={fetchedUpdate.email} />
        </Form.Group>
        <Form.Group>
          <Form.Label>password: </Form.Label>
          <Form.Control name="password" defaultValue={fetchedUpdate.password} />
        </Form.Group>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CompanyTable data={fetchedCompany} title="COMPANY UPDATED SUCCESSFULY" />
    </div>
  );
}

export default UpdateCompanyForm;
