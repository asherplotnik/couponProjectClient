import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import CouponsTable from "../UI/CouponsTable";
import classes from "./GetCustomerCoupons.module.css";
const GetCustomerCoupons = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/customer/getCustomerCoupons", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setSt(error);
      });
  }, [token]);
  return (
    <div className={classes.divClass}>
      <CouponsTable data={st} title="Customer's Copouns" />
    </div>
  );
};

export default GetCustomerCoupons;
