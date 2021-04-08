import axios from "axios";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import "./GetCompanyCouponsByCategoryId.css";
import CouponsTable from "../../../UI/CouponsTable";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import { Form, Button } from "react-bootstrap";

interface GpProps {
  token: string;
}

const GetCompanyCouponsByCategoryId = (props: GpProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>([]);
  const [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByIdForm")
    );
    const categoryId = parseInt(formData.get("categoryId") as string);
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/company//getCompanyCouponsByCategory/" +
          categoryId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setErr(error);
      });
  };

  return (
    <div className="GetCompanyCouponsByCategoryId">
      <h3 className="h3Div">Get Company coupons by category ID</h3>
      <Form id="fetchCouponsByIdForm" onSubmit={fetchCouponsHandler}>
        <div className="innerFormDiv">
          <Form.Group>
            <Form.Label>CATEGORY ID: </Form.Label>
            <Form.Control id="categoryId" name="categoryId" />
          </Form.Group>
          <Button type="submit">FETCH</Button>
        </div>
      </Form>
      <CouponsTable err={err} data={st} title="Coupons list" />
    </div>
  );
};

export default GetCompanyCouponsByCategoryId;
