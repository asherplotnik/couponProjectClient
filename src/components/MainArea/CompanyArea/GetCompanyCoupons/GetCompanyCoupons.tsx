import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import "./GetCompanyCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";

const GetCompanyCoupons = () => {
  const [dataState, setDataState] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);

  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons")
      .then((response) => {
        setDataState(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);

  return (
    <div className="GetCompanyCoupons">
      <CouponsTable err={err} data={dataState} title="Coupons List" />
    </div>
  );
};

export default GetCompanyCoupons;
