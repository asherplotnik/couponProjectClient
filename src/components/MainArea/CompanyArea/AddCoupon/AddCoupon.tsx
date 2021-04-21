import axios from "axios";
import { SyntheticEvent, useState } from "react";
import globals from "../../../../Services/Globals";
import "./AddCoupon.css";
//import CouponTable from "../../../UI/CouponTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";

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
    formData.append("id", "0");
    formData.append("image", (formData.get("imageFile") as File).name);
    let cat = formData.get("categoryId") as string;
    if (+cat === 0) {
      alert("Must choose category");
    }
    axios
      .post(globals.urls.localUrl + "api/company/addCoupon", formData, {
        headers: { token: token, "Content-Type": "multipart/form-data" },
      })
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
              <Form.Label>Category: </Form.Label>
              <Form.Control name="categoryId" as="select" className="FormEl">
                <option value="0">-- Choose one --</option>
                <option value="1"> Food</option>
                <option value="2"> Movie</option>
                <option value="3"> Discount</option>
                <option value="4"> Restaurant</option>
                <option value="5"> Vacation</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Title: </Form.Label>
              <Form.Control name="title" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date: </Form.Label>
              <Form.Control type="date" name="startDate" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date: </Form.Label>
              <Form.Control type="date" name="endDate" required />
            </Form.Group>
          </div>
          <div className="AddCouponFormDivColl">
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control name="description" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount: </Form.Label>
              <Form.Control type="number" name="amount" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control type="number" step="0.1" name="price" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image: </Form.Label>
              <Form.Control name="imageFile" type="file" required />
            </Form.Group>
          </div>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <div>
        {fetchedData && <h4>COUPON ADDED SUCCESSFULLY</h4>}
        {fetchedData && <CouponCard err={err} data={fetchedData} />}
      </div>
    </div>
  );
};

export default AddCoupon;
