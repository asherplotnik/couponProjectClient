import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./GetCustomer.css";
import CouponsTable from "../../../UI/CouponsTable";
import CustomerTable from "../../../UI/CustomerTable";
import CustomerModel from "../../../../Models/CustomerModel";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";

interface GcProps {
  token: string;
}

const GetCustomer = (props: GcProps) => {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(null);
  let [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  const fetchCustomerByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#getCustomerForm"));
    const customerId = parseInt(formData.get("customerId") as string);
    setFetchedCustomer(null);
    setFetchedCoupons(null);
    let found = false;
    for (const customer of fetchedData) {
      if (customer.id === customerId) {
        setFetchedCustomer(customer);
        found = true;
        break;
      }
    }
    if (!found) setErr(new ErrorModel());
    axios
      .get(
        globals.urls.localUrl +
          ":8080//api/admin/getCustomerCoupons/" +
          customerId,
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setFetchedCoupons(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(globals.urls.localUrl + ":8080//api/admin/getAllCustomers/", {
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
    <div className="GetCustomer">
      <Form id="getCustomerForm" onSubmit={fetchCustomerByIdHandler}>
        <div className="FormColl">
          <Form.Control id="customerId" name="customerId" as="select" size="lg">
            <option value="">-- choose one --</option>
            {fetchedData && (
              <>
                {fetchedData.map((opt: CustomerModel) => {
                  return (
                    <option key={opt.id} value={opt.id}>
                      ID) {opt.id}
                      {"\u00A0"} {"\u00A0"}
                      {"\u00A0"} Name: {opt.first_name} {opt.last_name}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Control>
        </div>
        <Button type="submit">FETCH</Button>
      </Form>
      <div>
        {fetchedCustomer && (
          <CustomerTable
            err={err}
            data={fetchedCustomer}
            title={fetchedCustomer.first_name + " " + fetchedCustomer.last_name}
          />
        )}
        {fetchedCoupons && (
          <CouponsTable data={fetchedCoupons} title="Customer's Coupons" />
        )}
      </div>
    </div>
  );
};

export default GetCustomer;
