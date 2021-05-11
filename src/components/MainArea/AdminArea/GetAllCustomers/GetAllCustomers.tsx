import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./GetAllCustomers.css";
import CustomerModel from "../../../../Models/CustomerModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetAllCustomers = () => {
  const [st, setSt] = useState(null);
  useEffect(() => {
    jwtAxios
      .get<CustomerModel[]>(globals.urls.localUrl + "api/admin/getAllCustomers")
      .then(function (response) {
        setSt(
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
        alert(error?.response?.data?.message);
        console.log(error);
      });
  }, []);
  return <div>{st}</div>;
};
export default GetAllCustomers;
