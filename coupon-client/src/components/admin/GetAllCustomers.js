import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import classes from "./GetAllCustomers.module.css";
const GetAllCustomers = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/admin/getAllCustomers", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(
          <div>
            <h3 className={classes.h3Div}>Customers List</h3>
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
              </thead>{" "}
              <tbody>
                {response.data.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.id}</td>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  return <div>{st}</div>;
};
export default GetAllCustomers;
