import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
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
        setFetchedCompany(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(localUrl + ":8080//api/admin/getCompanyCoupons/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCoupons(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="getCompanyForm" onSubmit={fetchCompanyByIdHandler}>
        <label> ID: </label>
        <input id="companyId" name="companyId" />
        <button type="submit">FETCH</button>
      </form>
      <div>
        <p>{fetchedCompany}</p>
        <p>Company coupons: </p>
        <p>{fetchedCoupons}</p>
      </div>
    </div>
  );
};

export default GetCompany;
