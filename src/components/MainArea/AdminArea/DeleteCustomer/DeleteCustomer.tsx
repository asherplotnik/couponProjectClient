import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCustomer.css";
import CustomerTable from "../../../UI/CustomerTable/CustomerTable";
import { Button, Form } from "react-bootstrap";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";

function DeleteCustomerForm() {
  let [fetchedCustomer, setFetchedCustomer] = useState<CustomerModel>(null);
  let [fetchedData, setFetchedData] = useState<CustomerModel[]>(null);
  let [err, setErr] = useState(null);
  let formRef = useRef(null);
  const deleteCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const id = parseInt(formData.get("id") as string);
    setFetchedCustomer(null);
    if (id > 0) {
      jwtAxios
        .delete(globals.urls.localUrl + "api/admin/deleteCustomer/" + id)
        .then(function (response) {
          setFetchedCustomer(response.data);
          fetchCustomers();
        })
        .catch(function (error) {
          setErr(error);
          console.log(error);
        });
    }
  };
  const fetchCustomers = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getAllCustomers/")
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="DeleteCustomer">
      <h3 className="h3Div">Delete customer</h3>
      <Form ref={formRef} onSubmit={deleteCustomerHandler}>
        <div className="FormColl">
          <Form.Control name="id" as="select" id="actionSelect" size="lg">
            <option value={0}>-- choose one --</option>
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
