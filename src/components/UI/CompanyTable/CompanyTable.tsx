import "./CompanyTable.css";
import { Table } from "react-bootstrap";
import CompanyModel from "../../../Models/CompanyModel";
import ErrorModel from "../../../Models/ErrorModel";

interface CtProps {
  title: string;
  data: CompanyModel;
  err?: ErrorModel;
}

const CompanyTable = (props: CtProps) => {
  let fetchedCompany = props.data;
  if (fetchedCompany) {
    return (
      <div className="CompanyTable">
        <div className="h3Div">
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
    if (props.err) {
      return (
        <div className="h3Div">
          <h3>{props.err.response && props.err.response.data.message}</h3>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default CompanyTable;
