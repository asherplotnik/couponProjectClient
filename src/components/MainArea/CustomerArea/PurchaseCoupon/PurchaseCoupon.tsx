import { useState, useEffect } from "react";
import globals from "../../../../Services/Globals";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import { Button } from "react-bootstrap";
import "./PurchaseCoupon.css";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import CouponCard from "../../../UI/CouponCard/CouponCard";
import Modal from "../../../UI/Modal/Modal";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";

const PurchaseCoupon = () => {
  const [resState, setResState] = useState<CouponModel[]>(null);
  const [cp, setCp] = useState<CouponModel>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectId, setSelectedId] = useState<number>(-1);
  const purchaseCouponHandler = () => {
    jwtAxios
      .post(globals.urls.localUrl + "api/customer/purchaseCoupon/" + selectId)
      .then((response) => {
        setCp(response.data);
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
        alert(error.response.data.message);
      });
  }, [cp]);

  const changeShowModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectedRow = (id: number) => {
    setSelectedId(id);
    setShowModal(!showModal);
  };

  return (
    <div>
      <Modal
        show={showModal}
        modalClosed={changeShowModal}
        width="45%"
        left="27.5%"
      >
        <p>ARE YOU SURE?</p>
        {resState && (
          <CouponCard
            noBorderBox={true}
            data={resState.filter((el) => el.id === selectId)[0]}
            err={err}
          />
        )}

        <Button onClick={purchaseCouponHandler}>YES</Button>
        <Button variant="danger" onClick={changeShowModal}>
          NO
        </Button>
      </Modal>
      <div className="PurchaseCoupon">
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
      {cp && (
        <>
          <h3>Coupon purchased successfully</h3>
          <CouponCard err={err} data={cp} />
        </>
      )}
    </div>
  );
};

export default PurchaseCoupon;
