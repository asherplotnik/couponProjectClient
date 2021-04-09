import "./CouponTable.css";
import { Table } from "react-bootstrap";
import CouponModel from "../../Models/CouponModel";
import ErrorModel from "../../Models/ErrorModel";

interface CtProps {
  title: string;
  data: CouponModel;
  err?: ErrorModel;
}

const CouponTable = (props: CtProps) => {
  let coupon = props.data;
  if (coupon) {
    return (
      <div className="CouponTable">
        <div className="h3Div">
          <h3>{props.title}</h3>
        </div>
        <Table>
          <thead>
            <tr className="tableRow">
              <th>ID</th>
              <th>Category ID</th>
              <th>Company ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr className="tableRow">
              <td>{coupon.id}</td>
              <td>{coupon.categoryId}</td>
              <td>{coupon.company.id}</td>
              <td>{coupon.title}</td>
              <td>{coupon.description}</td>
              <td>{coupon.startDate}</td>
              <td>{coupon.endDate}</td>
              <td>{coupon.amount}</td>
              <td>{coupon.price}</td>
              <td>{coupon.image}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    if (props.err) {
      return (
        <div className="h3Div">
          <h3>{props.err.response.data.message}</h3>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default CouponTable;
