import classes from "./CustomerTable.module.css";
import Table from "react-bootstrap/Table";

const CustomerTable = (props) => {
  let fetchedCustomer = props.data;
  if (
    Object.keys(fetchedCustomer).includes("id") &&
    fetchedCustomer.id !== ""
  ) {
    return (
      <div>
        <div className={classes.h3Div}>
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
    if (Object.keys(fetchedCustomer).includes("response")) {
      return (
        <div className={classes.h3Div}>
          <h3>{fetchedCustomer.response.data.message}</h3>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default CustomerTable;
