import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./GetCompanyCoupons.module.css";
import CouponsTable from "../UI/CouponsTable";
const GetCompanyCouponsByCategoryId = (props) => {
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
          ":8080//api/company//getCompanyCouponsByCategory/" +
          categoryId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setSt(error);
      });
  };

  return (
    <div className={classes.formDiv}>
      <Form id="fetchCouponsByIdForm" onSubmit={fetchCouponsHandler}>
        <Form.Group>
          <Form.Label>CATEGORY ID: </Form.Label>
          <Form.Control id="categoryId" name="categoryId" />
        </Form.Group>
        <MyButton type="submit">FETCH</MyButton>
      </Form>
      <CouponsTable data={st} title={st.title} />
    </div>
  );
};

export default GetCompanyCouponsByCategoryId;
