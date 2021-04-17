import CouponCard from "../../../UI/CouponCard/CouponCard";
import "./GetCompanyCoupon.css";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}
function GetCompanyCoupon(props: GcProps): JSX.Element {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);

  const fetchCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCouponForm"));
    const couponId = parseInt(formData.get("couponId") as string);
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
      .get(globals.urls.localUrl + ":8080//api/company/getCompanyCoupons/", {
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
    <div className="GetCompanyCoupon">
      <h3 className="h3Div">Get Coupon details</h3>
      <Form id="getCouponForm">
        <div className="FormColl">
          <Form.Control
            name="couponId"
            as="select"
            id="couponId"
            size="lg"
            onChange={fetchCouponHandler}
          >
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
      </Form>
      <div>
        {fetchedCoupon && <CouponCard err={err} data={fetchedCoupon} />}
      </div>
    </div>
  );
}

export default GetCompanyCoupon;
