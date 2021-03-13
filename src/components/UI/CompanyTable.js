import classes from "./CompanyTable.module.css";
import Table from "react-bootstrap/Table";

const CompanyTable = (props) => {
  let fetchedCompany = props.data;
  if (Object.keys(fetchedCompany).includes("id") && fetchedCompany.id !== "") {
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
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{fetchedCompany.id}</td>
              <td>{fetchedCompany.name}</td>
              <td>{fetchedCompany.email}</td>
              <td>{fetchedCompany.password}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    if (Object.keys(fetchedCompany).includes("response")) {
      return (
        <div className={classes.h3Div}>
          <h3>{fetchedCompany.response.data.message}</h3>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default CompanyTable;
