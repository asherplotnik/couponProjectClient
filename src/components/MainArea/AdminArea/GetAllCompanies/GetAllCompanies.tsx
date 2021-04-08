import axios from "axios";
import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import "./GetAllCompanies.css";
import Table from "react-bootstrap/Table";
import CompanyModel from "../../../../Models/CompanyModel";

interface GcProps {
  token: string;
}

const GetAllCompanies = (props: GcProps) => {
  const token = props.token;
  const [st, setSt] = useState(null);
  useEffect(() => {
    axios
      .get<CompanyModel[]>(
        globals.urls.localUrl + ":8080//api/admin/getAllCompanies",
        {
          headers: { token: token },
        }
      )
      .then(function (response) {
        setSt(
          <div>
            <h3>Companies List</h3>
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
  return <div className="GetAllCompanies">{st}</div>;
};
export default GetAllCompanies;
