import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import CompanyTable from "../UI/CompanyTable";

const GetCompanyDetails = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/company/getCompanyDetails", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  return <CompanyTable data={st} title={st.name} />;
};

export default GetCompanyDetails;
