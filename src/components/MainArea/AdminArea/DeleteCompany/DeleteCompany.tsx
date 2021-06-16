import React, { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCompany.css";
import CompanyTable from "../../../UI/CompanyTable/CompanyTable";
import { Button, Form } from "react-bootstrap";
import CompanyModel from "../../../../Models/CompanyModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const DeleteCompany = () => {
  let [fetchedCompany, setFetchedCompany] = useState(null);
  let [fetchedData, setFetchedData] = useState<CompanyModel[]>(null);
  let [err, setErr] = useState(null);
  let formRef = useRef();
  const deleteCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const id = parseInt(formData.get("id") as string);
    setFetchedCompany(null);
    if (id > 0) {
      jwtAxios
        .delete(globals.urls.localUrl + "api/admin/deleteCompany/" + id)
        .then(function (response) {
          setFetchedCompany(response.data);
          fetchCompanies();
        })
        .catch((error) => {
          setErr(error);
          errorAlert(error);
        });
    }
  };

  const fetchCompanies = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getAllCompanies/")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="DeleteCompany">
      <h3 className="h3Div">Delete Company</h3>
      <Form ref={formRef} onSubmit={deleteCompanyHandler}>
        <div className="FormColl">
          <Form.Control name="id" as="select" id="actionSelect" size="lg">
            <option value={0}>-- choose one --</option>
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
};

export default DeleteCompany;
