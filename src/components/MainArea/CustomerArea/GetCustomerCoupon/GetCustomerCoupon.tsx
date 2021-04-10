import CouponCard from "../../../UI/CouponCard/CouponCard";
import "./GetCustomerCoupon.css";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
  id?: number;
}
function GetCustomerCoupon(props: GcProps): JSX.Element {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCouponForm"));
    const couponId = parseInt(formData.get("couponId") as string);
    if (formData.get("couponId") === "") {
      setFetchedCoupon(null);
      return;
    }
    for (const coupon of fetchedData) {
      if (coupon.id === couponId) {
        setFetchedCoupon(coupon);
        break;
      }
      setErr(new ErrorModel());
    }
  };

  useEffect(() => {
    axios
      .get(globals.urls.localUrl + ":8080//api/customer/getCustomerCoupons/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);

  return (
    <div className="GetCustomerCoupon">
      <h3 className="h3Div">Get Coupon details</h3>
      <Form id="getCouponForm" onSubmit={fetchCouponHandler}>
        <div className="FormColl">
          <Form.Control name="couponId" as="select" id="couponId" size="lg">
            <option value="">-- choose one --</option>
            {fetchedData && (
              <>
                {fetchedData.map((opt: CouponModel) => {
                  return (
                    <option key={opt.id} value={opt.id}>
                      ID) {opt.id}
                      {"\u00A0"} {"\u00A0"}
                      {"\u00A0"}
                      Title: {opt.title}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Control>
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
