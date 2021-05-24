import "./CustomerTable.css";
import Table from "react-bootstrap/Table";
import CustomerModel from "../../Models/CustomerModel";
import ErrorModel from "../../Models/ErrorModel";

interface CtProps {
  title: string;
  data: CustomerModel;
  err?: ErrorModel;
}

const CustomerTable = (props: CtProps) => {
  let fetchedCustomer = props.data;
  if (fetchedCustomer) {
    return (
      <div>
        <div className="CustomerTable">
          <h3>{props.title}</h3>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{fetchedCustomer.id}</td>
              <td>{fetchedCustomer.first_name}</td>
              <td>{fetchedCustomer.last_name}</td>
              <td>{fetchedCustomer.email}</td>
              <td>{fetchedCustomer.password}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    if (props.err) {
      return (
        <div className="CustomerTable">
          <h3>{props.err.response.data.message}</h3>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default CustomerTable;
