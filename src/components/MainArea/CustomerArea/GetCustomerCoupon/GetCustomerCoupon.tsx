import CouponCard from "../../../SharedArea/CouponCard/CouponCard";
import "./GetCustomerCoupon.css";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}
function GetCustomerCoupon(props: GcProps): JSX.Element {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCouponForm"));
    const couponId = parseInt(formData.get("couponId") as string);
    setFetchedCoupon(null);
    setErr(null);
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/customer/getCustomerCoupon/" +
          couponId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setFetchedCoupon(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="GetCustomerCoupon">
      <h3 className="h3Div">Get Coupon details</h3>
      <Form id="getCouponForm" onSubmit={fetchCouponHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID: </Form.Label>
            <Form.Control id="couponId" name="couponId" type="number" />
          </Form.Group>
        </div>
        <Button type="submit">FETCH</Button>
      </Form>
      <div>
        {fetchedCoupon && <CouponCard err={err} data={fetchedCoupon} />}
      </div>
    </div>
  );
}

export default GetCustomerCoupon;
