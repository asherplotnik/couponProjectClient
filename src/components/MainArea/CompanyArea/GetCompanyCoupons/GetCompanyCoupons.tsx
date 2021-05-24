import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import "./GetCompanyCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCompanyCoupons = () => {
  const [dataState, setDataState] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);

  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons")
      .then(function (response) {
        setDataState(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div className="GetCompanyCoupons">
      <CouponsTable err={err} data={dataState} title="Coupons List" />
    </div>
  );
};

export default GetCompanyCoupons;
