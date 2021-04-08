import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./UpdateCompany.css";
import CompanyTable from "../../../UI/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface UcProps {
  token: string;
}

function UpdateCompany(props: UcProps) {
  const token = props.token;
  const [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  const [fetchedUpdate, setFetchedUpdate] = useState<CompanyModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const updateCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCompanyForm"));
    let company: CompanyModel;
    company.id = fetchedUpdate.id;
    company.email = formData.get("email") as string;
    company.password = formData.get("password") as string;
    company.name = (document.querySelector(
      "#companyName"
    ) as HTMLInputElement).value;
    axios
      .post(globals.urls.localUrl + ":8080//api/admin/updateCompany", company, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };

  const fetchCompanyByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const companyId = parseInt(
      (document.querySelector("#companyId") as HTMLInputElement).value
    );
    setFetchedCompany(null);
    setFetchedUpdate(null);
    setErr(null);
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getCompany/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        console.log(response.data);
        (document.getElementById(
          "updateCompanyForm"
        ) as HTMLFormElement).reset();
        setFetchedUpdate(response.data);
      })
      .catch(function (error) {
        setErr(error);
        (document.getElementById(
          "updateCompanyForm"
        ) as HTMLFormElement).reset();
      });
  };
  return (
    <div className="UpdateCompany">
      <h3 className="h3Div">Update Company</h3>
      <Form id="updateCompanyForm" onSubmit={updateCompanyHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID: </Form.Label>
            <Form.Control
              required
              id="companyId"
              name="companyId"
              defaultValue={fetchedUpdate && fetchedUpdate.id}
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
              defaultValue={fetchedUpdate && fetchedUpdate.name}
              disabled={true}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              name="email"
              defaultValue={fetchedUpdate && fetchedUpdate.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              defaultValue={fetchedUpdate && fetchedUpdate.password}
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CompanyTable
        err={err}
        data={fetchedCompany}
        title="COMPANY UPDATED SUCCESSFULLY"
      />
    </div>
  );
}

export default UpdateCompany;
