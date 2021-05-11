import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCustomerCouponsByCategory.css";
import CouponModel from "../../../../Models/CouponModel";
import { Form } from "react-bootstrap";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCustomerCouponsByCategory = () => {
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
    jwtAxios
      .get(
        globals.urls.localUrl +
          "api/customer/getCustomerCouponsByCategory/" +
          categoryId
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
      <div className="GetCustomerCouponsByCategory">
        <h3 className="h3Div">Customer's Coupons by Category ID</h3>
        <Form id="fetchCouponsByIdForm">
          <div className="FormColl">
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
      </div>
      <br />
      {st && <CouponsTable err={err} data={st} title="Coupons List" />}
    </div>
  );
};

export default GetCustomerCouponsByCategory;
