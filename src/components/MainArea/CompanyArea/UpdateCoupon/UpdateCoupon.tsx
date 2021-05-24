import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import globals from "../../../../Services/Globals";
import "./UpdateCoupon.css";
import { Button, Form } from "react-bootstrap";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";

const UpdateCoupon = () => {
  let [fetchedCoupon, setFetchedCoupon] = useState<CouponModel>(null);
  let [fetchedUpdate, setFetchedUpdate] = useState<CouponModel>(null);
  let [fetchedData, setFetchedData] = useState<CouponModel[]>(null);
  let [formCategory, setFormCategory] = useState("0");
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const updateCouponHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    let formData = new FormData(formRef.current);
    formData.append("id", fetchedCoupon.id.toString());
    if (formData.get("imageFile") as File)
      formData.append("image", (formData.get("imageFile") as File).name);
    let cat = formData.get("categoryId") as string;
    if (cat === "0") {
      alert("Must choose category");
    }
    jwtAxios
      .put(globals.urls.localUrl + "api/company/updateCoupon", formData)
      .then((response) => {
        fetchCoupons();
        setFetchedCoupon(null);
        setFetchedUpdate(response.data);
      })
      .catch((error) => {
        setFetchedCoupon(null);
        setFetchedUpdate(null);
        setErr(error);
        errorAlert(error);
      });
  };

  const fetchCouponByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    let formData = new FormData(formRef.current);
    if ((formData.get("couponId") as string) === "") {
      return;
    }
    const couponId = parseInt(formData.get("couponId") as string);

    for (const coupon of fetchedData) {
      if (coupon.id === couponId) {
        (formRef.current as HTMLFormElement).reset();
        setFetchedCoupon(coupon);
        setFormCategory(coupon.categoryId.toString());
        return;
      }
    }
    (formRef.current as HTMLFormElement).reset();
    setErr(new ErrorModel());
  };

  const fetchCoupons = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/company/getCompanyCoupons")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const onSelectCategory = (e: SyntheticEvent) => {
    setFormCategory((e.target as HTMLInputElement).value as string);
  };

  return (
    <div className="UpdateCouponWrapper">
      <h3 className="h3Div">Update Coupon</h3>
      <Form ref={formRef} onSubmit={updateCouponHandler}>
        <Form.Group>
          <Form.Label>ID: </Form.Label>
          <div className="UpdateCouponFormColl">
            <Form.Control
              name="couponId"
              as="select"
              id="couponId"
              size="lg"
              onChange={fetchCouponByIdHandler}
            >
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
        <div className="UpdateCouponFormDiv">
          <div className="UpdateCouponFormDivColl">
            <Form.Group>
              <Form.Label>Category: </Form.Label>
              <Form.Control
                name="categoryId"
                as="select"
                className="FormEl"
                value={formCategory}
                onChange={onSelectCategory}
              >
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
              <Form.Control
                name="title"
                defaultValue={fetchedCoupon && fetchedCoupon.title}
                minLength={4}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                name="description"
                defaultValue={fetchedCoupon && fetchedCoupon.description}
                minLength={10}
                required
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
                type="number"
                name="amount"
                defaultValue={fetchedCoupon && fetchedCoupon.amount}
                required
                min={1}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control
                name="price"
                type="number"
                step="0.1"
                min={1}
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
        {fetchedUpdate && <h4>COUPON UPDATED SUCCESSFULLY</h4>}
        {fetchedUpdate && <CouponCard err={err} data={fetchedUpdate} />}
      </div>
    </div>
  );
};

export default UpdateCoupon;
