import React from "react";
import axios from "axios";
import { useState } from "react";
import { localUrl } from "../helper";
import classes from "./AddCoupon.module.css";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import CouponTable from "../UI/CouponTable";
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
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setFetchedData(error);
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
        document.getElementById("updateCouponForm").reset();
        setFetchedCoupon(response.data);
      })
      .catch(function (error) {
        document.getElementById("updateCouponForm").reset();
      });
  };
  return (
    <div className={classes.formDiv}>
      <Form id="updateCouponForm" onSubmit={updateCouponHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <Form.Control
            id="couponId"
            name="couponId"
            defaultValue={fetchedCoupon.id}
          />
        </Form.Group>
        <MyButton id="fetch" onClick={fetchCouponByIdHandler}>
          FETCH
        </MyButton>
        <Form.Group>
          <Form.Label>Category ID: </Form.Label>
          <Form.Control
            name="categoryId"
            type="number"
            min="1"
            max="5"
            defaultValue={fetchedCoupon.id}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control name="title" defaultValue={fetchedCoupon.title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description: </Form.Label>
          <Form.Control
            name="description"
            defaultValue={fetchedCoupon.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start date: </Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            defaultValue={fetchedCoupon.startDate}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End date: </Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            defaultValue={fetchedCoupon.endDate}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount: </Form.Label>
          <Form.Control name="amount" defaultValue={fetchedCoupon.amount} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price: </Form.Label>
          <Form.Control name="price" defaultValue={fetchedCoupon.price} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image: </Form.Label>
          <Form.Control name="image" defaultValue={fetchedCoupon.image} />
        </Form.Group>
        <MyButton type="submit">SUBMIT</MyButton>
      </Form>
      <div>
        <CouponTable data={fetchedData} title="COUPON UPDATED SUCCESSFULY" />
      </div>
    </div>
  );
};

export default UpdateCoupon;
