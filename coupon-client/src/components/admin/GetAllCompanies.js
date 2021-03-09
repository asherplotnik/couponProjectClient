import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
const GetAllCompanies = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/admin/getAllCompanies", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(
          <div>
            {response.data.map((company, index) => (
              <p key={index}>{JSON.stringify(company)}</p>
            ))}
          </div>
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div>{st}</div>;
};
export default GetAllCompanies;
