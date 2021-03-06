import { SyntheticEvent, useEffect, useRef, useState } from "react";
import globals from "../../../../Services/Globals";
import { Form } from "react-bootstrap";
import "./GetCustomer.css";
import CouponsTable from "../../../UI/CouponsTable/CouponsTable";
import CustomerTable from "../../../UI/CustomerTable/CustomerTable";
import CustomerModel from "../../../../Models/CustomerModel";
import CouponModel from "../../../../Models/CouponModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const GetCustomer = () => {
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let [fetchedCoupons, setFetchedCoupons] = useState<CouponModel[]>(null);
  let [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const fetchCustomerByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
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
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getCustomerCoupons/" + customerId)
      .then((response) => {
        setFetchedCoupons(response.data);
      })
      .catch((error) => {
        setErr(error);
      });
  };

  useEffect(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getAllCustomers/")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);

  return (
    <div className="GetCustomer">
      <Form ref={formRef}>
        <div className="FormColl">
          <Form.Control
            id="customerId"
            name="customerId"
            as="select"
            size="lg"
            onChange={fetchCustomerByIdHandler}
          >
            <option value="">-- choose one --</option>
            {fetchedData && (
              <>
                {fetchedData.map((opt: CustomerModel) => {
                  return (
                    <option key={opt.id} value={opt.id}>
                      ID) {opt.id}
                      {"\u00A0"} {"\u00A0"}
                      {"\u00A0"} Name: {opt.firstName} {opt.lastName}
                    </option>
                  );
                })}
              </>
            )}
          </Form.Control>
        </div>
      </Form>
      <div>
        {fetchedCustomer && (
          <CustomerTable
            err={err}
            data={fetchedCustomer}
            title={fetchedCustomer.firstName + " " + fetchedCustomer.lastName}
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
