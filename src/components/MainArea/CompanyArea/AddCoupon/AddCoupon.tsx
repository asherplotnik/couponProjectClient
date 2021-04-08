import axios from "axios";
import { SyntheticEvent, useState } from "react";
import globals from "../../../../Services/Globals";
import "./AddCoupon.css";
import CouponTable from "../../../UI/CouponTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface AcProps {
  token: string;
}

const AddCoupon = (props: AcProps) => {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState<CouponModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const addCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#addCouponForm"));
    let sentCoupon: CouponModel = new CouponModel();
    sentCoupon.categoryId = parseInt(formData.get("categoryId") as string);
    sentCoupon.title = formData.get("title") as string;
    sentCoupon.description = formData.get("description") as string;
    sentCoupon.startDate = new Date(formData.get("startDate") as string);
    sentCoupon.endDate = new Date(formData.get("endDate") as string);
    sentCoupon.amount = parseInt(formData.get("amount") as string);
    sentCoupon.price = parseFloat(formData.get("price") as string);
    sentCoupon.image = formData.get("image") as string;

    axios
      .post(
        globals.urls.localUrl + ":8080//api/company/addCoupon",
        sentCoupon,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="AddCoupon">
      <h3 className="h3Div">Add Coupon</h3>
      <Form id="addCouponForm" onSubmit={addCouponHandler}>
        <div className="AddCouponFormDiv">
          <div className="AddCouponFormDivColl">
            <Form.Group>
              <Form.Label>Category ID: </Form.Label>
              <Form.Control
                name="categoryId"
                type="number"
                min="1"
                max="5"
                className="FormEl"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control name="title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date: </Form.Label>
              <Form.Control type="date" name="startDate" />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date: </Form.Label>
              <Form.Control type="date" name="endDate" />
            </Form.Group>
          </div>
          <div className="AddCouponFormDivColl">
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control name="description" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount: </Form.Label>
              <Form.Control name="amount" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control name="price" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image: </Form.Label>
              <Form.Control name="image" />
            </Form.Group>
          </div>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <div>
        <CouponTable
          err={err}
          data={fetchedData}
          title="COUPON ADDED SUCCESSFULLY"
        />
      </div>
    </div>
  );
};

export default AddCoupon;
