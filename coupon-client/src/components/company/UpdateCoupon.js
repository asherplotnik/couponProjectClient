import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";

const UpdateCoupon = (props) => {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState({
    id: "",
    categoryId: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    amount: "",
    price: "",
    image: "",
  });
  let [fetchedData, setFetchedData] = useState("");
  const updateCouponHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCouponForm"));
    const couponId = parseInt(fetchedCoupon.id);
    const categoryId = parseInt(formData.get("categoryId"));
    const title = formData.get("title");
    const description = formData.get("description");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const amount = parseInt(formData.get("amount"));
    const price = parseFloat(formData.get("price"));
    const image = formData.get("image");

    axios
      .post(
        localUrl + ":8080//api/company/updateCoupon",
        {
          id: couponId,
          categoryId: categoryId,
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate,
          amount: amount,
          price: price,
          image: image,
        },
        { headers: { token: token } }
      )
      .then(function (response) {
        setFetchedData(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchCouponByIdHandler = (e) => {
    e.preventDefault();
    const cId = parseInt(document.querySelector("#couponId").value);
    axios
      .get(localUrl + ":8080//api/company/getCompanyCouponById/" + cId, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCoupon(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form id="updateCouponForm" onSubmit={updateCouponHandler}>
        <label>ID: </label>
        <input id="couponId" name="couponId" />
        <button id="fetch" onClick={fetchCouponByIdHandler}>
          FETCH
        </button>
        <label>Category ID: </label>
        <input name="categoryId" defaultValue={fetchedCoupon.categoryId} />
        <label>Title: </label>
        <input name="title" defaultValue={fetchedCoupon.title} />
        <label>Description: </label>
        <input name="description" defaultValue={fetchedCoupon.description} />
        <label>Start date: </label>
        <input
          type="date"
          name="startDate"
          defaultValue={fetchedCoupon.startDate}
        />
        <label>End date: </label>
        <input
          type="date"
          name="endDate"
          defaultValue={fetchedCoupon.endDate}
        />
        <label>Amount: </label>
        <input name="amount" defaultValue={fetchedCoupon.amount} />
        <label>Price: </label>
        <input name="price" defaultValue={fetchedCoupon.price} />
        <label>Image: </label>
        <input name="image" defaultValue={fetchedCoupon.image} />
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <p>{fetchedData}</p>
      </div>
    </div>
  );
};

export default UpdateCoupon;
