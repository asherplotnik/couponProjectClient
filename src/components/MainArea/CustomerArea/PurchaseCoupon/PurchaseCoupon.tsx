import { SyntheticEvent } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import globals from "../../../../Services/Globals";
import CouponsTable from "../../../UI/CouponsTable";
import { Form, Button } from "react-bootstrap";
import "./PurchaseCoupon.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface PcProps {
  token: string;
}

const PurchaseCoupon = (props: PcProps) => {
  const token = props.token;
  const [resState, setSt] = useState<CouponModel[]>(null);
  const [cp, setCp] = useState<CouponModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const purchaseCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#purchaseCoupon"));
    const couponId = parseInt(formData.get("couponId") as string);
    axios
      .post(
        globals.urls.localUrl +
          ":8080//api/customer/purchaseCoupon/" +
          couponId,
        {},
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setCp(response.data);
        alert("Coupon Purchased Successfully !!!");
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/customer/getAvailableCouponsforCustomer",
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(response.data);
        console.log(Object.keys(response.data).length);
      })
      .catch(function (error) {
        setErr(error);
      });
  }, [token, cp]);
  return (
    <div>
      <div className="PurchaseCoupon">
        <h3 className="h3Div">Purchase Coupon</h3>
        <Form id="purchaseCoupon" onSubmit={purchaseCouponHandler}>
          <Form.Label>ID: </Form.Label>
          <div className="FormColl">
            <Form.Control id="couponId" name="couponId" />
          </div>

          <Button type="submit">SUBMIT</Button>
        </Form>
      </div>
      {resState && (
        <CouponsTable
          err={err}
          showTitleWhenEmpty
          data={resState}
          title={
            Object.keys(resState).length > 0
              ? "AVAILABLE COUPONS"
              : "NO COUPONS AVAILABLE"
          }
        />
      )}
    </div>
  );
};

export default PurchaseCoupon;
