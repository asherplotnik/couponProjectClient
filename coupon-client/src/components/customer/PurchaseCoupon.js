import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { localUrl } from "../helper";
const PurchaseCoupon = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");

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
        setSt(JSON.stringify(response.data));
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
        setSt(
          <div>
            {response.data.map((coupon, index) => (
              <p key={index}>{JSON.stringify(coupon)}</p>
            ))}
          </div>
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  return (
    <div>
      <p>Coupon List</p>
      <div>{st}</div>
      <form id="purchaseCoupon" onSubmit={purchaseCouponHandler}>
        <label>ID: </label>
        <input id="couponId" name="couponId" />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default PurchaseCoupon;
