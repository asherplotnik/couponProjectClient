import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import "./GetCompanyCouponsByMaxPrice.css";
import CouponsTable from "../../../UI/CouponsTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCompanyCouponsByMaxPrice = () => {
  const [st, setSt] = useState<CouponModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByPriceForm")
    );
    const mPrice = parseFloat(formData.get("mPrice") as string);
    jwtAxios
      .get(
        globals.urls.localUrl +
          "api/company//getCompanyCouponsByMaxPrice/" +
          mPrice
      )
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="GetCompanyCouponsByMaxPrice">
      <h3 className="h3Div">Get Company coupons by Max Price</h3>
      <Form id="fetchCouponsByPriceForm" onSubmit={fetchCouponsHandler}>
        <div className="innerFormDiv">
          <Form.Group>
            <Form.Label>MAXIMUM PRICE: </Form.Label>
            <Form.Control
              type="number"
              id="mPrice"
              name="mPrice"
              min={1}
              step={0.1}
            />
          </Form.Group>
          <Button type="submit">FETCH</Button>
        </div>
      </Form>
      {st && <CouponsTable err={err} data={st} title="Coupons List" />}
    </div>
  );
};

export default GetCompanyCouponsByMaxPrice;
