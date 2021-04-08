import CouponModel from "../../../Models/CouponModel";
import ErrorModel from "../../../Models/ErrorModel";
import "./CouponCard.css";
import globals from "../../../Services/Globals";

interface CcProps {
  data: CouponModel;
  err: ErrorModel;
}

function CouponCard(props: CcProps): JSX.Element {
  console.log(globals.urls.couponImages + props.data.image);
  return (
    <div className="CouponCard">
      <div className="BorderBox">
        <div className="Box">
          <div>
            <p>ID: {props.data.id}</p>
            <p>TITLE: {props.data.title}</p>
            <p>DESCRIPTION: {props.data.description}</p>
            <p>CATEGORY ID: {props.data.categoryId}</p>
          </div>
          <div>
            <p>START DATE: {props.data.startDate}</p>
            <p>END DATE {props.data.endDate}</p>
            <p>PRICE: ${props.data.price}</p>
            <p>AVAILABLE: {props.data.amount}</p>
          </div>
        </div>
        <div className="BoxImage">
          <img src={props.data.image} alt={props.data.image} />
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
