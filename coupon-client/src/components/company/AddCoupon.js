import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";

const AddCoupon = (props) => {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState("");

  const addCouponHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addCouponForm"));
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
        localUrl + ":8080//api/company/addCoupon",
        {
          id: 0,
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

  return (
    <div>
      <form id="addCouponForm" onSubmit={addCouponHandler}>
        <label>Category ID: </label>
        <input name="categoryId" />
        <label>Title: </label>
        <input name="title" />
        <label>Description: </label>
        <input name="description" />
        <label>Start date: </label>
        <input type="date" name="startDate" />
        <label>End date: </label>
        <input type="date" name="endDate" />
        <label>Amount: </label>
        <input name="amount" />
        <label>Price: </label>
        <input name="price" />
        <label>Image: </label>
        <input name="image" />
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <p>{fetchedData}</p>
      </div>
    </div>
  );
};

export default AddCoupon;
