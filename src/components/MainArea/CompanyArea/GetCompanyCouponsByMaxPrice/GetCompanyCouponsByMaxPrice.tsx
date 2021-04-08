import axios from "axios";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import "./GetCompanyCouponsByMaxPrice.css";
import CouponsTable from "../../../UI/CouponsTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GpProps {
  token: string;
}

const GetCompanyCouponsByMaxPrice = (props: GpProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByPriceForm")
    );
    const mPrice = parseFloat(formData.get("mPrice") as string);
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/company//getCompanyCouponsByMaxPrice/" +
          mPrice,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };

  return (
    <div className="GetCompanyCouponsByMaxPrice">
      <h3 className="h3Div">Get Company coupons by Max Price</h3>
      <Form id="fetchCouponsByPriceForm" onSubmit={fetchCouponsHandler}>
        <div className="innerFormDiv">
          <Form.Group>
            <Form.Label>CATEGORY ID: </Form.Label>
            <Form.Control id="mPrice" name="mPrice" />
          </Form.Group>
          <Button type="submit">FETCH</Button>
        </div>
      </Form>
      <CouponsTable err={err} data={st} title="Coupons List" />
    </div>
  );
};

export default GetCompanyCouponsByMaxPrice;
