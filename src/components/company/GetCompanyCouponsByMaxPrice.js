import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
import classes from "./GetCompanyCoupons.module.css";
import CouponsTable from "../UI/CouponsTable";
const GetCompanyCouponsByMaxPrice = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  const fetchCouponsHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByPriceForm")
    );
    const mPrice = parseFloat(formData.get("mPrice"));
    axios
      .get(
        localUrl + ":8080//api/company//getCompanyCouponsByMaxPrice/" + mPrice,
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
    <div className={classes.formDiv}>
      <h3 className={classes.h3Div}>Get Company coupons by Max Price</h3>
      <Form id="fetchCouponsByPriceForm" onSubmit={fetchCouponsHandler}>
        <div className={classes.innerFormDiv}>
          <Form.Group>
            <Form.Label>CATEGORY ID: </Form.Label>
            <Form.Control id="mPrice" name="mPrice" />
          </Form.Group>
          <MyButton type="submit">FETCH</MyButton>
        </div>
      </Form>
      <CouponsTable data={st} title={st.title} />
    </div>
  );
};

export default GetCompanyCouponsByMaxPrice;
