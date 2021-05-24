import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CustomerTable from "../../../UI/CustomerTable/CustomerTable";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCustomerDetails = () => {
  const [dataState, setDataState] = useState<CustomerModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/customer/getCustomerDetails")
      .then(function (response) {
        setDataState(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
        console.log(error);
      });
  }, []);

  if (dataState) {
    return (
      <CustomerTable
        err={err}
        data={dataState}
        title={dataState.firstName + " " + dataState.lastName}
      />
    );
  } else {
    return null;
  }
};

export default GetCustomerDetails;
