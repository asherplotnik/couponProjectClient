import axios from "axios";
import globals from "../../../../Services/Globals";
import { SyntheticEvent, useState } from "react";
import CouponsTable from "../../../UI/CouponsTable";
import "./GetCustomerCouponsByCategory.css";
import CouponModel from "../../../../Models/CouponModel";
import { Form, Button } from "react-bootstrap";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}

const GetCustomerCouponsByCategory = (props: GcProps) => {
  const token = props.token;
  const [st, setSt] = useState<CouponModel[]>(null);
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
          ":8080//api/customer//getCustomerCouponsByCategory/" +
          categoryId,
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
    <div>
      <div className="GetCustomerCouponsByCategory">
        <h3 className="h3Div">Customer's Coupons by Category ID</h3>
        <Form id="fetchCouponsByIdForm" onSubmit={fetchCouponsHandler}>
          <div className="FormColl">
            <Form.Group>
              <Form.Label>CATEGORY ID: </Form.Label>
              <Form.Control id="categoryId" name="categoryId" />
            </Form.Group>
          </div>
          <Button type="submit">FETCH</Button>
        </Form>
      </div>
      <br />
      <CouponsTable err={err} data={st} title="Coupons List" />
    </div>
  );
};

export default GetCustomerCouponsByCategory;