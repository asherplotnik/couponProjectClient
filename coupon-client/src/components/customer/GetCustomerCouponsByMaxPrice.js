import axios from "axios";
import { localUrl } from "../helper";
import { useState } from "react";
import CouponsTable from "../UI/CouponsTable";
import classes from "./GetCustomerCoupons.module.css";
import Form from "react-bootstrap/Form";
import MyButton from "../UI/MyButton";
const GetCustomerCouponsByMaxPrice = (props) => {
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
        localUrl + ":8080//api/customer/getCustomerCouponsByMaxPrice/" + mPrice,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={classes.formDiv}>
        <Form id="fetchCouponsByPriceForm" onSubmit={fetchCouponsHandler}>
          <Form.Group>
            <Form.Label>MAX PRICE: </Form.Label>
            <Form.Control id="mPrice" name="mPrice" />
          </Form.Group>
          <MyButton type="submit">FETCH</MyButton>
        </Form>
      </div>
      <br />
      <CouponsTable data={st} title={st.title} />
    </div>
  );
};

export default GetCustomerCouponsByMaxPrice;
