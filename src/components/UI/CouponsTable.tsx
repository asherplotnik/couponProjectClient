import "./CouponsTable.css";
import { Table } from "react-bootstrap";
import CouponModel from "../../Models/CouponModel";
import ErrorModel from "../../Models/ErrorModel";
import { useState } from "react";

interface CpProps {
  data: CouponModel[];
  title: string;
  showTitleWhenEmpty?: boolean;
  err?: ErrorModel;
  selectRow?: Function;
}

const CouponsTable = (props: CpProps) => {
  const [rowHovered, setRowHovered] = useState(-1);
  const cat = ["", "FOOD", "MOVIE", "DISCOUNT", "RESTAURANT", "VACATION"];

  const handleHover = (row: number) => {
    setRowHovered(row);
  };

  const handleSelect = (id: number) => {
    if (props.selectRow) props.selectRow(id);
  };
  let fetchedCoupons = props.data;
  if (fetchedCoupons) {
    return (
      <div className="CouponsTable">
        <div className="h3Div">
          <h3>{props.title}</h3>
        </div>
        <Table>
          <thead>
            <tr className="tableRow">
              <th>ID</th>
              <th>Category</th>
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
              <tr
                key={index}
                className={
                  rowHovered === index ? "tableRow HoveredRow" : "tableRow"
                }
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(-1)}
                onClick={() => handleSelect(coupon.id)}
              >
                <td>{coupon.id}</td>
                <td>
                  #{coupon.categoryId} -- {cat[coupon.categoryId]}
                </td>
                <td>{coupon.company.id}</td>
                <td>{coupon.title}</td>
                <td>{coupon.description}</td>
                <td>{coupon.startDate}</td>
                <td>{coupon.endDate}</td>
                <td>{coupon.amount}</td>
                <td>{coupon.price}</td>
                <td>
                  <div className="BoxImage">
                    <img src={coupon.image} alt={coupon.image} />
                  </div>
                </td>
              </tr>
            ))}
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
      if (props.showTitleWhenEmpty === true) {
        return <h3 className="h3Div"> {props.title} </h3>;
      } else {
        return null;
      }
    }
  }
};

export default CouponsTable;
