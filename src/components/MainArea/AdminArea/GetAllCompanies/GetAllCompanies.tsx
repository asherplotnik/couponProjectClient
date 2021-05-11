import globals from "../../../../Services/Globals";
import { useEffect, useState } from "react";
import "./GetAllCompanies.css";
import Table from "react-bootstrap/Table";
import CompanyModel from "../../../../Models/CompanyModel";
import jwtAxios from "../../../../Services/jwtAxios";

const GetAllCompanies = () => {
  const [st, setSt] = useState(null);
  useEffect(() => {
    jwtAxios
      .get<CompanyModel[]>(globals.urls.localUrl + "api/admin/getAllCompanies")
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
        alert(error.response.data.message);
        console.log(error);
      });
  }, []);
  return <div className="GetAllCompanies">{st}</div>;
};
export default GetAllCompanies;
