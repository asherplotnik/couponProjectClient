import globals from "../../../../Services/Globals";
import { SyntheticEvent, useRef, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import "./GetCustomerCouponsByMaxPrice.css";
import { Form, Button } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCustomerCouponsByMaxPrice = () => {
  const [dataState, setDataState] = useState<CouponModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const maxPrice = parseFloat(formData.get("maxPrice") as string);
    jwtAxios
      .get(
        globals.urls.localUrl +
          "api/customer/getCustomerCouponsByMaxPrice/" +
          maxPrice
      )
      .then((response) => {
        setDataState(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  };

  return (
    <div>
      <div className="GetCustomerCouponsByMaxPrice">
        <h3 className="h3Div">Customer's Coupons by Max Price</h3>
        <Form ref={formRef} onSubmit={fetchCouponsHandler}>
          <div className="FormColl">
            <Form.Group>
              <Form.Label>MAX PRICE: </Form.Label>
              <Form.Control name="maxPrice" type="number" step={0.1} min={1} />
            </Form.Group>
            <Button type="submit">FETCH</Button>
          </div>
        </Form>
      </div>
      <br />
      <CouponsTable err={err} data={dataState} title="Coupons List" />
    </div>
  );
};

export default GetCustomerCouponsByMaxPrice;
