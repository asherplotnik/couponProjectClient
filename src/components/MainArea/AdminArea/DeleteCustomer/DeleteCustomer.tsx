import axios from "axios";
import { SyntheticEvent, useState } from "react";
import globals from "../../../../Services/Globals";
import "./DeleteCustomer.css";
import CustomerTable from "../../../UI/CustomerTable";
import { Button, Form } from "react-bootstrap";

interface DcProps {
  token: string;
}

function DeleteCustomerForm(props: DcProps) {
  const token = props.token;
  let [fetchedCustomer, setFetchedCustomer] = useState(null);
  let [err, setErr] = useState(null);
  const deleteCustomerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#deleteCustomerForm")
    );
    const id = parseInt(formData.get("id") as string);
    setFetchedCustomer(null);
    axios
      .delete(globals.urls.localUrl + ":8080//api/admin/deleteCustomer/" + id, {
        headers: { token: token },
      })
      .then(function (response) {
        setFetchedCustomer(response.data);
      })
      .catch(function (error) {
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="DeleteCustomer">
      <h3 className="h3Div">Delete customer</h3>
      <Form id="deleteCustomerForm" onSubmit={deleteCustomerHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>ID to delete: </Form.Label>
            <Form.Control name="id" /> <Button type="submit">SUBMIT</Button>
          </Form.Group>
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
