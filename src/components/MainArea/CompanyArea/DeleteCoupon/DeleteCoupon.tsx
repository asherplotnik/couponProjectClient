import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCoupon.css";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";

interface DcProps {
  token: string;
}

const DeleteCoupon = (props: DcProps) => {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const deleteCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#deleteCouponForm"));
    const id = parseInt(formData.get("id") as string);
    axios
      .delete(globals.urls.localUrl + "api/company/deleteCoupon/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        fetchCoupons();
        setFetchedCoupon(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  const fetchCoupons = () => {
    axios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons/", {
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
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, [token]);

  return (
    <div className="DeleteCoupon">
      <h3 className="h3Div">Delete Coupon</h3>
      <Form id="deleteCouponForm" onSubmit={deleteCouponHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Control name="id" as="select" id="actionSelect" size="lg">
              <option value="">-- choose one --</option>
              {fetchedData && (
                <>
                  {fetchedData.map((opt: CouponModel) => {
                    return (
                      <option key={opt.id} value={opt.id}>
                        ID) {opt.id}
                        {"\u00A0"} {"\u00A0"}
                        {"\u00A0"}
                        Title: {opt.title}
                      </option>
                    );
                  })}
                </>
              )}
            </Form.Control>
            <Button type="submit">SUBMIT</Button>
          </Form.Group>
        </div>
      </Form>
      {fetchedCoupon && (
        <>
          <h3>COUPON DELETED SUCCESSFULLY</h3>
          <CouponCard err={err} data={fetchedCoupon} />{" "}
        </>
      )}
    </div>
  );
};

export default DeleteCoupon;
