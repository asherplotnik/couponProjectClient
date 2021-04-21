import axios from "axios";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CustomerTable from "../../../UI/CustomerTable";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";

interface CdProps {
  token: string;
}
const GetCustomerDetails = (props: CdProps) => {
  const token = props.token;
  const [st, setSt] = useState<CustomerModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "api/customer/getCustomerDetails", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);

  if (st) {
    return (
      <CustomerTable
        err={err}
        data={st}
        title={st.first_name + " " + st.last_name}
      />
    );
  } else {
    return null;
  }
};

export default GetCustomerDetails;
