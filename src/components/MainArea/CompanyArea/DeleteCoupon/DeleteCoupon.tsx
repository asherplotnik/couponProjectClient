import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCoupon.css";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";
import jwtAxios from "../../../../Services/jwtAxios";

const DeleteCoupon = () => {
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const deleteCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const id = parseInt(formData.get("id") as string);
    if (id > 0) {
      jwtAxios
        .delete(globals.urls.localUrl + "api/company/deleteCoupon/" + id)
        .then(function (response) {
          fetchCoupons();
          setFetchedCoupon(response.data);
        })
        .catch(function (error) {
          setErr(error);
          console.log(error);
        });
    }
  };

  const fetchCoupons = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons/")
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <div className="DeleteCoupon">
      <h3 className="h3Div">Delete Coupon</h3>
      <Form ref={formRef} onSubmit={deleteCouponHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Control name="id" as="select" id="actionSelect" size="lg">
              <option value={0}>-- choose one --</option>
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
