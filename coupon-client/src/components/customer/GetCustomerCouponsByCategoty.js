import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
const GetCustomerCouponsByCategoryId = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  const fetchCouponsHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByIdForm")
    );
    const categoryId = parseInt(formData.get("categoryId"));
    axios
      .get(
        localUrl +
          ":8080//api/customer//getCustomerCouponsByCategory/" +
          categoryId,
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
        <label>CATEGORY ID: </label>
        <input id="categoryId" name="categoryId" />
        <button type="submit">FETCH</button>
      </form>
      <div>{st}</div>
    </div>
  );
};

export default GetCustomerCouponsByCategoryId;
