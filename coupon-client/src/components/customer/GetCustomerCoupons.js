import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
const GetCustomerCoupons = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/customer/getCustomerCoupons", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(
          <div>
            {response.data.map((coupon, index) => (
              <p key={index}>{JSON.stringify(coupon)}</p>
            ))}
          </div>
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  return <div>{st}</div>;
};

export default GetCustomerCoupons;
