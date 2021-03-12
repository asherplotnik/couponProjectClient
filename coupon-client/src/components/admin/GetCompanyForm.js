import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import CompanyTable from "../UI/CompanyTable";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./GetCompanyForm.module.css";
import CouponsTable from "../UI/CouponsTable";
const GetCompany = (props) => {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState("");
  let [fetchedCoupons, setFetchedCoupons] = useState("");
  const fetchCompanyByIdHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCompanyForm"));
    const companyId = parseInt(formData.get("companyId"));
    axios
      .get(localUrl + ":8080//api/admin/getCompany/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(localUrl + ":8080//api/admin/getCompanyCoupons/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCoupons(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.subformDiv}>
      <Form id="getCompanyForm" onSubmit={fetchCompanyByIdHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <Form.Control id="companyId" name="companyId" type="number" />
        </Form.Group>
        <Button type="submit">FETCH</Button>
      </Form>
      <div>
        <CompanyTable data={fetchedCompany} title={fetchedCompany.name} />
        <CouponsTable data={fetchedCoupons} title="Company's Coupons" />
      </div>
    </div>
  );
};

export default GetCompany;
