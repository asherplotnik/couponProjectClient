import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
const DeleteCoupon = (props) => {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState("");
  const deleteCouponHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteCouponForm"));
    const id = parseInt(formData.get("id"));
    axios
      .delete(localUrl + ":8080//api/company/deleteCoupon/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form id="deleteCouponForm" onSubmit={deleteCouponHandler}>
        <label>ID to delete: </label>
        <input name="id" /> <button type="submit">SUBMIT</button>
      </form>
      <div>
        <p>{fetchedData}</p>
      </div>
    </div>
  );
};

export default DeleteCoupon;
