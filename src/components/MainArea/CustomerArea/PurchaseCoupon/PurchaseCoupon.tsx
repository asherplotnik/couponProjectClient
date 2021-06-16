import { useState, useEffect } from "react";
import globals from "../../../../Services/Globals";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import { Button, Modal } from "react-bootstrap";
import "./PurchaseCoupon.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const PurchaseCoupon = () => {
  const [resState, setResState] = useState<CouponModel[]>(null);
  const [couponState, setCouponState] = useState<CouponModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectId, setSelectedId] = useState<number>(-1);
  const purchaseCouponHandler = () => {
    setSelectedId(-1);
    jwtAxios
      .post(globals.urls.localUrl + "api/customer/purchaseCoupon/" + selectId)
      .then((response) => {
        setCouponState(response.data);
        changeShowModal();
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
        changeShowModal();
      });
  };

  useEffect(() => {
    jwtAxios
      .get(
        globals.urls.localUrl + "api/customer/getAvailableCouponsforCustomer"
      )
      .then((response) => {
        setResState(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, [couponState]);

  const changeShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectedRow = (id: number) => {
    setSelectedId(id);
    setShowModal(!showModal);
  };

  return (
    <div className="PurchaseCoupon">
      <Modal show={showModal} onHide={changeShowModal}>
        <Modal.Header closeButton>
          <p className="PurchaseCouponModal">ARE YOU SURE?</p>
        </Modal.Header>
        {selectId !== -1 && (
          <CouponCard
            noBorderBox={true}
            data={resState.filter((el) => el.id === selectId)[0]}
            err={err}
          />
        )}
        <Modal.Footer className="PurchaseCouponModal">
          <Button onClick={purchaseCouponHandler}>YES</Button>
          <Button variant="danger" onClick={changeShowModal}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="PurchaseCouponDiv">
        <h3 className="h3Div">Purchase Coupon</h3>
      </div>
      {resState && (
        <CouponsTable
          err={err}
          showTitleWhenEmpty
          data={resState}
          selectRow={handleSelectedRow}
          title={
            Object.keys(resState).length > 0
              ? "AVAILABLE COUPONS"
              : "NO COUPONS AVAILABLE"
          }
        />
      )}
      {couponState && (
        <>
          <h3>Coupon purchased successfully</h3>
          <CouponCard err={err} data={couponState} />
        </>
      )}
    </div>
  );
};

export default PurchaseCoupon;
