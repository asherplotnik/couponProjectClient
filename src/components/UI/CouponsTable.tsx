import classes from "./CouponsTable.module.css";
import { Table } from "react-bootstrap";
import CouponModel from "../../Models/CouponModel";
import ErrorModel from "../../Models/ErrorModel";

interface CpProps {
  data: CouponModel[];
  title: string;
  showTitleWhenEmpty?: boolean;
  err?: ErrorModel;
}

const CouponsTable = (props: CpProps) => {
  let fetchedCoupons = props.data;
  if (fetchedCoupons) {
    return (
      <div className={classes.tableDiv}>
        <div className={classes.h3Div}>
          <h3>{props.title}</h3>
        </div>
        <Table>
          <thead>
            <tr className={classes.tableRow}>
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
            {fetchedCoupons.map((coupon, index) => (
              <tr key={index} className={classes.tableRow}>
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
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    if (props.err) {
      return (
        <div className={classes.h3Div}>
          <h3>{props.err.response.data.message}</h3>
        </div>
      );
    } else {
      if (props.showTitleWhenEmpty === true) {
        return <h3 className="h3Div"> {props.title} </h3>;
      } else {
        return null;
      }
    }
  }
};

export default CouponsTable;
