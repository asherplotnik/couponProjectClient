import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import CouponsTable from "../UI/CouponsTable";
import classes from "./GetCompanyCoupons.module.css";
const GetcouponCoupons = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/company/getCompanyCoupons", {
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
      <CouponsTable data={st} title="Coupons List" />
    </div>
  );
};

export default GetcouponCoupons;
