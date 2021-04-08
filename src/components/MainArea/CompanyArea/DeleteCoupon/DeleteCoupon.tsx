import axios from "axios";
import { SyntheticEvent, useState } from "react";
//import { localUrl } from "../../../helper";
import globals from "../../../../Services/Globals";
import "./DeleteCoupon.css";
import CouponTable from "../../../UI/CouponTable";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface DcProps {
  token: string;
}

const DeleteCoupon = (props: DcProps) => {
  const token = props.token;
  let [fetchedData, setFetchedData] = useState<CouponModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const deleteCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteCouponForm"));
    const id = parseInt(formData.get("id") as string);
    axios
      .delete(globals.urls.localUrl + ":8080//api/company/deleteCoupon/" + id, {
        headers: { token: token },
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
    <div className="DeleteCoupon">
      <h3 className="h3Div">Delete Coupon</h3>
      <Form id="deleteCouponForm" onSubmit={deleteCouponHandler}>
        <Form.Group>
          <Form.Label>ID to delete: </Form.Label>
          <Form.Control name="id" /> <Button type="submit">SUBMIT</Button>
        </Form.Group>
      </Form>
      <CouponTable
        err={err}
        data={fetchedData}
        title="COUPON DELETED SUCCESSFULLY"
      />
    </div>
  );
};

export default DeleteCoupon;
