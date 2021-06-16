import { SyntheticEvent, useEffect, useRef, useState } from "react";
import CompanyTable from "../../../UI/CompanyTable/CompanyTable";
import globals from "../../../../Services/Globals";
import { Form } from "react-bootstrap";
import "./GetCompany.css";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import CompanyModel from "../../../../Models/CompanyModel";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCompany = () => {
  let [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  let [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(null);
  let [fetchedData, setFetchedData] = useState<CompanyModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const fetchCompanyByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const companyId = parseInt(formData.get("companyId") as string);
    setFetchedCompany(null);
    setFetchedCoupons(null);
    let found = false;
    for (const company of fetchedData) {
      if (company.id === companyId) {
        setFetchedCompany(company);
        found = true;
        break;
      }
    }
    if (!found) setErr(new ErrorModel());
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getCompanyCoupons/" + companyId)
      .then((response) => {
        setFetchedCoupons(response.data);
      })
      .catch((error) => {
        setErr(error);
      });
  };

  useEffect(() => {
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

  return (
    <div className="GetCompany">
      <h3 className="h3Div">Get Company details</h3>
      <Form ref={formRef}>
        <div className="FormColl">
          <Form.Control
            name="companyId"
            as="select"
            id="companyId"
            size="lg"
            onChange={fetchCompanyByIdHandler}
          >
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
        </div>
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
