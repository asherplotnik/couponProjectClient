import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCustomer.css";
import CustomerTable from "../../../UI/CustomerTable";
import { Button, Form } from "react-bootstrap";
import CustomerModel from "../../../../Models/CustomerModel";

interface DcProps {
  token: string;
}

function DeleteCustomerForm(props: DcProps) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  let [err, setErr] = useState(null);
  const deleteCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#deleteCustomerForm")
    );
    const id = parseInt(formData.get("id") as string);
    setFetchedCustomer(null);
    axios
      .delete(globals.urls.localUrl + "api/admin/deleteCustomer/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCustomer(response.data);
        fetchCustomers();
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };
  const fetchCustomers = () => {
    axios
      .get(globals.urls.localUrl + "api/admin/getAllCustomers/", {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get(globals.urls.localUrl + "api/admin/getAllCustomers/", {
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
    <div className="DeleteCustomer">
      <h3 className="h3Div">Delete customer</h3>
      <Form id="deleteCustomerForm" onSubmit={deleteCustomerHandler}>
        <div className="FormColl">
          {/* <Form.Group>
            <Form.Label>ID to delete: </Form.Label>
            <Form.Control name="id" /> <Button type="submit">SUBMIT</Button>
          </Form.Group> */}
          <Form.Control name="id" as="select" id="actionSelect" size="lg">
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
          <Button type="submit">SUBMIT</Button>
        </div>
      </Form>
      <CustomerTable
        err={err}
        data={fetchedCustomer}
        title="CUSTOMER DELETED SUCCESSFULLY"
      />
    </div>
  );
}

export default DeleteCustomerForm;
