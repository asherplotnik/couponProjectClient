import axios from "axios";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import "./GetCompanyCouponsByCategoryId.css";
import CouponsTable from "../../../UI/CouponsTable";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import { Form } from "react-bootstrap";

interface GpProps {
  token: string;
}

const GetCompanyCouponsByCategoryId = (props: GpProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#fetchCouponsByIdForm")
    );
    const categoryId = parseInt(formData.get("categoryId") as string);
    if (formData.get("categoryId") === "") {
      setSt(null);
      return;
    }
    axios
      .get(
        globals.urls.localUrl +
          ":8080/api/company/getCompanyCouponsByCategory/" +
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
      <Form id="fetchCouponsByIdForm">
        <div className="innerFormDiv">
          <Form.Control
            name="categoryId"
            as="select"
            id="categoryId"
            size="lg"
            onChange={fetchCouponsHandler}
          >
            <option value="">-- choose one --</option>
            <option value="1">1) Food</option>
            <option value="2">2) Movie</option>
            <option value="3">3) Discount</option>
            <option value="4">4) Restaurant</option>
            <option value="5">5) Vacation</option>
          </Form.Control>
        </div>
      </Form>
      {st && <CouponsTable err={err} data={st} title="Coupons list" />}
    </div>
  );
};

export default GetCompanyCouponsByCategoryId;
