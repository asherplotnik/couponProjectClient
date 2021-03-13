import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./DeleteCoupon.module.css";
import CouponTable from "../UI/CouponTable";
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
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setFetchedData(error);
        console.log(error);
      });
  };
  return (
    <div className={classes.formDiv}>
      <h3 className={classes.h3Div}>Delete Coupon</h3>
      <Form id="deleteCouponForm" onSubmit={deleteCouponHandler}>
        <Form.Group>
          <Form.Label>ID to delete: </Form.Label>
          <Form.Control name="id" /> <MyButton type="submit">SUBMIT</MyButton>
        </Form.Group>
      </Form>
      <CouponTable data={fetchedData} title="COUPON DELETED SUCCESSFULY" />
    </div>
  );
};

export default DeleteCoupon;
