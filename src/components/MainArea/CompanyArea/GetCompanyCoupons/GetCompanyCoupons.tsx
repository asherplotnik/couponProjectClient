import axios from "axios";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCompanyCoupons.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}

const GetCompanyCoupons = (props: GcProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);

  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  }, [token]);

  return (
    <div className="GetCompanyCoupons">
      <CouponsTable err={err} data={st} title="Coupons List" />
    </div>
  );
};

export default GetCompanyCoupons;
