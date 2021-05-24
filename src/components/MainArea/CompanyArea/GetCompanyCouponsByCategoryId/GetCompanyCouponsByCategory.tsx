import globals from "../../../../Services/Globals";
import { SyntheticEvent, useRef, useState } from "react";
import "./GetCompanyCouponsByCategoryId.css";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import { Form } from "react-bootstrap";
import jwtAxios from "../../../../Services/jwtAxios";

const GetCompanyCouponsByCategoryId = () => {
  const [dataState, setDataState] = useState<CouponModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const fetchCouponsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const categoryId = parseInt(formData.get("categoryId") as string);
    if (formData.get("categoryId") === "") {
      setDataState(null);
      return;
    }
    jwtAxios
      .get(
        globals.urls.localUrl +
          "api/company/getCompanyCouponsByCategory/" +
          categoryId
      )
      .then(function (response) {
        setDataState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setErr(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="GetCompanyCouponsByCategoryId">
      <h3 className="h3Div">Get Company coupons by category ID</h3>
      <Form ref={formRef}>
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
      {dataState && (
        <CouponsTable err={err} data={dataState} title="Coupons list" />
      )}
    </div>
  );
};

export default GetCompanyCouponsByCategoryId;
