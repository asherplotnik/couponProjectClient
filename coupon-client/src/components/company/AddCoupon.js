import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import classes from "./AddCoupon.module.css";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import CouponTable from "../UI/CouponTable";

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
        setFetchedData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <h3 className={classes.h3Div}>Add Coupon</h3>
      <Form id="addCouponForm" onSubmit={addCouponHandler}>
        <Form.Group>
          <Form.Label>Category ID: </Form.Label>
          <Form.Control name="categoryId" type="number" min="1" max="5" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control name="title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description: </Form.Label>
          <Form.Control name="description" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start date: </Form.Label>
          <Form.Control type="date" name="startDate" />
        </Form.Group>
        <Form.Group>
          <Form.Label>End date: </Form.Label>
          <Form.Control type="date" name="endDate" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount: </Form.Label>
          <Form.Control name="amount" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price: </Form.Label>
          <Form.Control name="price" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image: </Form.Label>
          <Form.Control name="image" />
        </Form.Group>
        <MyButton type="submit">SUBMIT</MyButton>
      </Form>
      <div>
        <CouponTable data={fetchedData} title="COUPON ADDED SUCCESSFULY" />
      </div>
    </div>
  );
};

export default AddCoupon;
