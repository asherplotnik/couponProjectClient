import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
import CouponsTable from "../UI/CouponsTable";
import classes from "./GetCustomerCoupons.module.css";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
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
        setSt(response.data);
      })
      .catch(function (error) {
        setSt(error);
      });
  };

  return (
    <div>
      <div className={classes.formDiv}>
        <h3 className={classes.h3Div}>Customer's Copouns by Category ID</h3>
        <Form id="fetchCouponsByIdForm" onSubmit={fetchCouponsHandler}>
          <Form.Group>
            <Form.Label>CATEGORY ID: </Form.Label>
            <Form.Control id="categoryId" name="categoryId" />
          </Form.Group>
          <MyButton type="submit">FETCH</MyButton>
        </Form>
      </div>
      <br />
      <CouponsTable data={st} title="Coupons List" />
    </div>
  );
};

export default GetCustomerCouponsByCategoryId;
