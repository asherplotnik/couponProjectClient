import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCustomerCouponsByMaxPrice.css";
import { Form, Button } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCustomerCouponsByMaxPrice = () => {
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
          "api/customer/getCustomerCouponsByMaxPrice/" +
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
    <div>
      <div className="GetCustomerCouponsByMaxPrice">
        <h3 className="h3Div">Customer's Coupons by Max Price</h3>
        <Form id="fetchCouponsByPriceForm" onSubmit={fetchCouponsHandler}>
          <div className="FormColl">
            <Form.Group>
              <Form.Label>MAX PRICE: </Form.Label>
              <Form.Control
                id="mPrice"
                name="mPrice"
                type="number"
                step={0.1}
                min={1}
              />
            </Form.Group>
            <Button type="submit">FETCH</Button>
          </div>
        </Form>
      </div>
      <br />
      <CouponsTable err={err} data={st} title="Coupons List" />
    </div>
  );
};

export default GetCustomerCouponsByMaxPrice;
