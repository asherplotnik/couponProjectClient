import axios from "axios";
import { localUrl } from "../helper";
import { useEffect, useState } from "react";
import classes from "./GetAllCompanies.module.css";
import Table from "react-bootstrap/Table";
const GetAllCompanies = (props) => {
  const token = props.token;
  const [st, setSt] = useState("");
  useEffect(() => {
    axios
      .get(localUrl + ":8080//api/admin/getAllCompanies", {
        headers: { token: token },
      })
      .then(function (response) {
        setSt(
          <div>
            <Table>
              <thead>
                <tr key="-1">
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>{" "}
              <tbody>
                {response.data.map((company, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{company.id}</td>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.password}</td>
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
  return <div className={classes.divClass}>{st}</div>;
};
export default GetAllCompanies;
