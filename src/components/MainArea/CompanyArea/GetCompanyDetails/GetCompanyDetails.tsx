import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CompanyTable from "../../../UI/CompanyTable/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCompanyDetails = () => {
  const [companyState, setCompanyState] = useState<CompanyModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  useEffect(() => {
    jwtAxios
      .get<CompanyModel>(
        globals.urls.localUrl + "api/company/getCompanyDetails"
      )
      .then((response) => {
        setCompanyState(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);
  if (companyState) {
    return (
      <CompanyTable err={err} data={companyState} title={companyState.name} />
    );
  } else {
    return null;
  }
};

export default GetCompanyDetails;
