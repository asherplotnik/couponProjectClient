import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCompany.css";
import CompanyTable from "../../../UI/CompanyTable";
import { Button, Form } from "react-bootstrap";

interface DcProps {
  token: string;
}

function DeleteCompany(props: DcProps) {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState(null);
  let [err, setErr] = useState(null);
  const deleteCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteCompanyForm"));
    const id = parseInt(formData.get("id") as string);
    setFetchedCompany(null);
    axios
      .delete(globals.urls.localUrl + ":8080//api/admin/deleteCompany/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="DeleteCompany">
      <h3 className="h3Div">Delete Company</h3>
      <Form id="deleteCompanyForm" onSubmit={deleteCompanyHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID to delete: </Form.Label>
            <Form.Control name="id" /> <Button type="submit">SUBMIT</Button>
          </Form.Group>
        </div>
      </Form>
      <CompanyTable
        err={err}
        data={fetchedCompany}
        title="COMPANY DELETED SUCCESSFULLY"
      />
    </div>
  );
}

export default DeleteCompany;
