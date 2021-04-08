import axios from "axios";
import { SyntheticEvent, useState } from "react";
import CompanyTable from "../../../UI/CompanyTable";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./GetCompany.css";
import CouponsTable from "../../../UI/CouponsTable";
import CompanyModel from "../../../../Models/CompanyModel";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}

const GetCompany = (props: GcProps) => {
  const token = props.token;
  let [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  let [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const fetchCompanyByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCompanyForm"));
    const companyId = parseInt(formData.get("companyId") as string);
    setFetchedCompany(null);
    setFetchedCoupons(null);
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getCompany/" + companyId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/admin/getCompanyCoupons/" +
          companyId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setFetchedCoupons(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="GetCompany">
      <h3 className="h3Div">Get Company details</h3>
      <Form id="getCompanyForm" onSubmit={fetchCompanyByIdHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID: </Form.Label>
            <Form.Control id="companyId" name="companyId" type="number" />
          </Form.Group>
        </div>
        <Button type="submit">FETCH</Button>
      </Form>
      <div>
        {fetchedCompany && (
          <CompanyTable
            err={err}
            data={fetchedCompany}
            title={fetchedCompany.name}
          />
        )}
        {fetchedCoupons && (
          <CouponsTable data={fetchedCoupons} title="Company's Coupons" />
        )}
      </div>
    </div>
  );
};

export default GetCompany;
