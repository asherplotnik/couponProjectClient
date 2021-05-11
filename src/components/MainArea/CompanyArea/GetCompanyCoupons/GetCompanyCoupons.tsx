//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCompanyCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCompanyCoupons = () => {
  const [st, setSt] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);

  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons")
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
      });
  }, []);

  return (
    <div className="GetCompanyCoupons">
      <CouponsTable err={err} data={st} title="Coupons List" />
    </div>
  );
};

export default GetCompanyCoupons;
