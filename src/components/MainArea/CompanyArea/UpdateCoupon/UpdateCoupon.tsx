import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import "./UpdateCoupon.css";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";

interface UcProps {
  token: string;
}

const UpdateCoupon = (props: UcProps) => {
  const token = props.token;
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedUpdate, setFetchedUpdate] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
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
        fetchCoupons();
        setFetchedCoupon(null);
        setFetchedUpdate(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  };

  const fetchCouponByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCouponForm"));
    if ((formData.get("couponId") as string) === "") {
      return;
    }
    const couponId = parseInt(formData.get("couponId") as string);

    for (const coupon of fetchedData) {
      if (coupon.id === couponId) {
        (document.getElementById(
          "updateCouponForm"
        ) as HTMLFormElement).reset();
        setFetchedCoupon(coupon);
        return;
      }
    }
    (document.getElementById("updateCouponForm") as HTMLFormElement).reset();
    setErr(new ErrorModel());
  };

  const fetchCoupons = () => {
    axios
      .get(globals.urls.localUrl + ":8080//api/company/getAllCompanies/", {
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
      .get(globals.urls.localUrl + ":8080//api/company/getCompanyCoupons/", {
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
    <div className="UpdateCouponWrapper">
      <h3 className="h3Div">Update Coupon</h3>
      <Form id="updateCouponForm" onSubmit={updateCouponHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <div className="UpdateCouponFormColl">
            <Form.Control name="couponId" as="select" id="couponId" size="lg">
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
        {fetchedUpdate && <h4>COUPON ADDED SUCCESSFULLY</h4>}
        {fetchedUpdate && <CouponCard err={err} data={fetchedUpdate} />}
      </div>
    </div>
  );
};

export default UpdateCoupon;
