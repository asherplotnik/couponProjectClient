import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./DeleteCompanyForm.module.css";
import CompanyTable from "../UI/CompanyTable";
function DeleteCompanyForm(props) {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState("");
  const deleteCompanyHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteCompanyForm"));
    const id = parseInt(formData.get("id"));
    axios
      .delete(localUrl + ":8080//api/admin/deleteCompany/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setFetchedCompany(error);
        console.log(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <Form id="deleteCompanyForm" onSubmit={deleteCompanyHandler}>
        <Form.Group>
          <Form.Label>ID to delete: </Form.Label>
          <Form.Control name="id" /> <Button type="submit">SUBMIT</Button>
        </Form.Group>
      </Form>
      <CompanyTable data={fetchedCompany} title="COMPANY DELETED SUCCESSFULY" />
    </div>
  );
}

export default DeleteCompanyForm;
