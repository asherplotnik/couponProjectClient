import axios from "axios";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCustomerCoupons.css";
import CouponModel from "../../../../Models/CouponModel";

interface GcProps {
  token: string;
}

const GetCustomerCoupons = (props: GcProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>(null);
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "api/customer/getCustomerCoupons", {
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
    <div className="GetCustomerCoupons">
      <CouponsTable data={st} title="Customer's Coupons" />
    </div>
  );
};

export default GetCustomerCoupons;
