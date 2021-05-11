import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCustomerCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCustomerCoupons = () => {
  const [st, setSt] = useState<CouponModel[]>(null);
  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/customer/getCustomerCoupons")
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setSt(error);
        alert(error.response.data.message);
      });
  }, []);
  return (
    <div className="GetCustomerCoupons">
      <CouponsTable data={st} title="Customer's Coupons" />
    </div>
  );
};

export default GetCustomerCoupons;
