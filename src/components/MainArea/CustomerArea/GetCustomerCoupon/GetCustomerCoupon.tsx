import CouponCard from "../../../UI/CouponCard/CouponCard";
import "./GetCustomerCoupon.css";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCustomerCoupon = (): JSX.Element => {
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const fetchCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
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
    jwtAxios
      .get(globals.urls.localUrl + "api/customer/getCustomerCoupons/")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);

  return (
    <div className="GetCustomerCoupon">
      <h3 className="h3Div">Get Coupon details</h3>
      <Form ref={formRef}>
        <div className="FormColl">
          <Form.Control
            onChange={fetchCouponHandler}
            name="couponId"
            as="select"
            id="couponId"
            size="lg"
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
      <br />
      <div>
        {fetchedCoupon && <CouponCard err={err} data={fetchedCoupon} />}
      </div>
    </div>
  );
};

export default GetCustomerCoupon;
