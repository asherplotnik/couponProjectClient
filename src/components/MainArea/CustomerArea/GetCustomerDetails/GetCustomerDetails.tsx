import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CustomerTable from "../../../UI/CustomerTable";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCustomerDetails = () => {
  const [st, setSt] = useState<CustomerModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/customer/getCustomerDetails")
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
        console.log(error);
      });
  }, []);

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
