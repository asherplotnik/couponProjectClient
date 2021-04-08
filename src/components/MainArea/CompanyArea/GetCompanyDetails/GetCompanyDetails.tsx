import axios from "axios";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CompanyTable from "../../../UI/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface CdProps {
  token: string;
}

const GetCompanyDetails = (props: CdProps) => {
  const token = props.token;
  const [cm, setCm] = useState<CompanyModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  useEffect(() => {
    axios
      .get<CompanyModel>(
        globals.urls.localUrl + ":8080//api/company/getCompanyDetails",
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setCm(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);
  if (cm) {
    return <CompanyTable err={err} data={cm} title={cm.name} />;
  } else {
    return null;
  }
};

export default GetCompanyDetails;
