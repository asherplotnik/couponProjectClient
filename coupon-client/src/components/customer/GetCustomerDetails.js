import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import CustomerTable from "../UI/CustomerTable";
const GetCustomerDetails = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/customer/getCustomerDetails", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  return <CustomerTable data={st} title={st.first_name + " " + st.last_name} />;
};

export default GetCustomerDetails;
