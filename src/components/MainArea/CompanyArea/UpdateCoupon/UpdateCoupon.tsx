import axios from "axios";
import { SyntheticEvent, useState } from "react";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import "./UpdateCoupon.css";
// CouponTable from "../../../UI/CouponTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../SharedArea/CouponCard/CouponCard";

interface UcProps {
  token: string;
}

const UpdateCoupon = (props: UcProps) => {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel>(null);
  const updateCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCouponForm"));
    formData.append("id", fetchedCoupon.id.toString());
    if (formData.get("imageFile") as File)
      formData.append("image", (formData.get("imageFile") as File).name);
    axios
      .post(
        globals.urls.localUrl + ":8080//api/company/updateCoupon",
        formData,
        {
          headers: { token: token, "Content-Type": "multipart/form-data" },
        }
      )
      .then(function (response) {
        setFetchedCoupon(null);
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };

  const fetchCouponByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const cId = parseInt(
      (document.querySelector("#couponId") as HTMLInputElement).value
    );
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/company/getCompanyCouponById/" +
          cId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        (document.getElementById(
          "updateCouponForm"
        ) as HTMLFormElement).reset();
        setFetchedCoupon(response.data);
      })
      .catch(function (error) {
        setErr(error);
        (document.getElementById(
          "updateCouponForm"
        ) as HTMLFormElement).reset();
      });
  };
  return (
    <div className="UpdateCouponWrapper">
      <h3 className="h3Div">Update Coupon</h3>
      <Form id="updateCouponForm" onSubmit={updateCouponHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <div className="UpdateCouponFormColl">
            <Form.Control
              id="couponId"
              name="couponId"
              defaultValue={fetchedCoupon && fetchedCoupon.id}
            />
          </div>
        </Form.Group>
        <Button id="fetch" onClick={fetchCouponByIdHandler}>
          FETCH
        </Button>
        <div className="UpdateCouponFormDiv">
          <div className="UpdateCouponFormDivColl">
            <Form.Group>
              <Form.Label>Category ID: </Form.Label>
              <Form.Control
                name="categoryId"
                type="number"
                min="1"
                max="5"
                defaultValue={fetchedCoupon && fetchedCoupon.categoryId}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control
                name="title"
                defaultValue={fetchedCoupon && fetchedCoupon.title}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                name="description"
                defaultValue={fetchedCoupon && fetchedCoupon.description}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date: </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                defaultValue={
                  fetchedCoupon && fetchedCoupon.startDate.toString()
                }
              />
            </Form.Group>
          </div>
          <div className="UpdateCouponFormDivColl">
            <Form.Group>
              <Form.Label>End date: </Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                defaultValue={fetchedCoupon && fetchedCoupon.endDate.toString()}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount: </Form.Label>
              <Form.Control
                name="amount"
                defaultValue={fetchedCoupon && fetchedCoupon.amount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control
                name="price"
                defaultValue={fetchedCoupon && fetchedCoupon.price}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image: </Form.Label>
              <Form.Control type="file" name="imageFile" />
            </Form.Group>
          </div>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <div>
        {fetchedCoupon && <CouponCard err={err} data={fetchedCoupon} />}
        {fetchedData && <h4>COUPON ADDED SUCCESSFULLY</h4>}
        {fetchedData && <CouponCard err={err} data={fetchedData} />}
      </div>
    </div>
  );
};

export default UpdateCoupon;
