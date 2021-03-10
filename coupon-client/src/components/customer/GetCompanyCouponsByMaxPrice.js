import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
const GetCustomerCouponsByMaxPrice = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  const fetchCouponsHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByIdForm")
    );
    const mPrice = parseFloat(formData.get("mPrice"));
    axios
      .get(
        localUrl + ":8080//api/customer/getCustomerCouponsByMaxPrice/" + mPrice,
        {
          headers: { token: token },
        }
      )
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
  };

  return (
    <div>
      <form id="fetchCouponsByIdForm" onSubmit={fetchCouponsHandler}>
        <label>Max Price: </label>
        <input id="mPrice" name="mPrice" />
        <button type="submit">FETCH</button>
      </form>
      <div>{st}</div>
    </div>
  );
};

export default GetCustomerCouponsByMaxPrice;
