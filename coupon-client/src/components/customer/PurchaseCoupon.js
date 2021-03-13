import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { localUrl } from "../helper";
import CouponsTable from "../UI/CouponsTable";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./PurchaseCoupon.module.css";
const PurchaseCoupon = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  const [cp, setCp] = useState("");

  const purchaseCouponHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#purchaseCoupon"));
    const couponId = parseInt(formData.get("couponId"));
    axios
      .post(
        localUrl + ":8080//api/customer/purchaseCoupon/" + couponId,
        {},
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setCp(response.data);
        alert("Coupon Purchased Successefuly !!!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/customer/getAvailableCouponsforCustomer", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(response.data);
        console.log(Object.keys(response.data).length);
      })
      .catch(function (error) {
        setSt(error);
      });
  }, [token, cp]);
  return (
    <div>
      <div className={classes.formDiv}>
        <h3 className={classes.h3Div}>Purchase Coupon</h3>
        <Form id="purchaseCoupon" onSubmit={purchaseCouponHandler}>
          <Form.Label>ID: </Form.Label>
          <Form.Control id="couponId" name="couponId" />
          <MyButton type="submit">SUBMIT</MyButton>
        </Form>
      </div>
      <CouponsTable
        showTitleWhenEmpty
        data={st}
        title={
          Object.keys(st).length > 0
            ? "AVAILABLE COUPONS"
            : "NO COUPONS AVAILABLE"
        }
      />
    </div>
  );
};

export default PurchaseCoupon;
