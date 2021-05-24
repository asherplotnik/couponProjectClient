import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./GetAllCustomers.css";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";
import axios from "axios";
import { errorAlert } from "../../../../Services/commonFunctionService";

const GetAllCustomers = () => {
  const [dataState, setDataState] = useState(null);
  useEffect(() => {
    const source = axios.CancelToken.source();
    jwtAxios
      .get<CustomerModel[]>(globals.urls.localUrl + "api/admin/getAllCustomers")
      .then((response) => {
        setDataState(
          <div>
            <h3 className="GetAllCustomers">Customers List</h3>
            <Table>
              <thead>
                <tr key="-1">
                  <th>#</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      })
      .catch((error) => {
        errorAlert(error);
      });

    return () => {
      source.cancel();
    };
  }, []);
  return <div>{dataState}</div>;
};
export default GetAllCustomers;
