import React, { SyntheticEvent, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCompany.css";
import CompanyTable from "../../../UI/CompanyTable";
import { Button, Form } from "react-bootstrap";
import CompanyModel from "../../../../Models/CompanyModel";

interface DcProps {
  token: string;
}

function DeleteCompany(props: DcProps) {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState(null);
  let [fetchedData, setFetchedData] = useState<CompanyModel[]>(null);

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
        fetchCompanies();
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  const fetchCompanies = () => {
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getAllCompanies/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getAllCompanies/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);

  return (
    <div className="DeleteCompany">
      <h3 className="h3Div">Delete Company</h3>
      <Form id="deleteCompanyForm" onSubmit={deleteCompanyHandler}>
        <div className="FormColl">
          <Form.Control name="id" as="select" id="actionSelect" size="lg">
            <option value="">-- choose one --</option>
            {fetchedData && (
              <>
                {fetchedData.map((opt: CompanyModel) => {
                  return (
                    <option key={opt.id} value={opt.id}>
                      ID)
                      {opt.id} Name: {opt.name}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Control>
          <Button type="submit">SUBMIT</Button>
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
