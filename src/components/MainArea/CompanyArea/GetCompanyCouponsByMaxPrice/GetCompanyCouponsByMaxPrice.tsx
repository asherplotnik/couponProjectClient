import globals from "../../../../Services/Globals";
import { SyntheticEvent, useRef, useState } from "react";
import "./GetCompanyCouponsByMaxPrice.css";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCompanyCouponsByMaxPrice = () => {
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
          "api/company/getCompanyCouponsByMaxPrice/" +
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
    <div className="GetCompanyCouponsByMaxPrice">
      <h3 className="h3Div">Get Company coupons by Max Price</h3>
      <Form ref={formRef} onSubmit={fetchCouponsHandler}>
        <div className="innerFormDiv">
          <Form.Group>
            <Form.Label>MAXIMUM PRICE: </Form.Label>
            <Form.Control type="number" name="maxPrice" min={1} step={0.1} />
          </Form.Group>
          <Button type="submit">FETCH</Button>
        </div>
      </Form>
      {dataState && (
        <CouponsTable err={err} data={dataState} title="Coupons List" />
      )}
    </div>
  );
};

export default GetCompanyCouponsByMaxPrice;
