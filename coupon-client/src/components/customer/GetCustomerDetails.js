import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
const GetCustomerDetails = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/customer/getCustomerDetails", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  return <div>{st}</div>;
};

export default GetCustomerDetails;
