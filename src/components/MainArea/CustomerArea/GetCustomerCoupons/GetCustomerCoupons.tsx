import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import "./GetCustomerCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCustomerCoupons = () => {
  const [dataState, setDataState] = useState<CouponModel[]>(null);
  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/customer/getCustomerCoupons")
      .then((response) => {
        setDataState(response.data);
      })
      .catch((error) => {
        setDataState(error);
        errorAlert(error);
      });
  }, []);
  return (
    <div className="GetCustomerCoupons">
      <CouponsTable data={dataState} title="Customer's Coupons" />
    </div>
  );
};

export default GetCustomerCoupons;
