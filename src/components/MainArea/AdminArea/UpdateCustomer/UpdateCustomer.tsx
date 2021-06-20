import React, { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import CustomerTable from "../../../UI/CustomerTable/CustomerTable";
import "./UpdateCustomer.css";
import ErrorModel from "../../../../Models/ErrorModel";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const UpdateCustomer = () => {
  let [fetchedUpdate, setFetchedUpdate] = useState<CustomerModel>(null);
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let scrollDownRef = useRef(null);
  const [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const updateCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let customer: CustomerModel = new CustomerModel();
    customer.id = fetchedUpdate.id;
    customer.email = formData.get("email") as string;
    customer.password = formData.get("password") as string;
    customer.firstName = formData.get("firstName") as string;
    customer.lastName = formData.get("lastName") as string;
    let conf = formData.get("confirm") as string;
    if (conf !== customer.password) {
      alert("Password don't match!!");
      return;
    }
    jwtAxios
      .put(globals.urls.localUrl + "api/admin/updateCustomer", customer)
      .then((response) => {
        fetchCustomers();
        setFetchedCustomer(response.data);
        scrollDownRef.current.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  };
  const fetchCustomerByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    if ((formData.get("customerId") as string) === "") {
      return;
    }
    const customerId = parseInt(formData.get("customerId") as string);

    for (const customer of fetchedData) {
      if (customer.id === customerId) {
        setFetchedUpdate(customer);
        return;
      }
    }
    setErr(new ErrorModel());
  };

  const fetchCustomers = useCallback(() => {
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
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="UpdateCustomer">
      <h3 className="h3Div">Update Customer</h3>
      <Form ref={formRef} onSubmit={updateCustomerHandler}>
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
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control
              name="firstName"
              id="firstName"
              defaultValue={fetchedUpdate && fetchedUpdate.firstName}
              minLength={2}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              name="lastName"
              id="lastName"
              defaultValue={fetchedUpdate && fetchedUpdate.lastName}
              minLength={2}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              name="email"
              type="email"
              defaultValue={fetchedUpdate && fetchedUpdate.email}
              minLength={4}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              type="password"
              minLength={6}
              defaultValue={fetchedUpdate && fetchedUpdate.password}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>confirm password: </Form.Label>
            <Form.Control
              name="confirm"
              type="password"
              minLength={6}
              required
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CustomerTable
        err={err}
        data={fetchedCustomer}
        title="CUSTOMER UPDATED SUCCESSFULLY"
      />
      <div ref={scrollDownRef}></div>
    </div>
  );
};

export default UpdateCustomer;
