import { SyntheticEvent, useRef, useState } from "react";
import globals from "../../../../Services/Globals";
import Form from "react-bootstrap/Form";
import "./AddCompany.css";
import CompanyTable from "../../../UI/CompanyTable/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import { Button } from "react-bootstrap";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";

const AddCompany = () => {
  let [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  let [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  const addCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let company: CompanyModel = new CompanyModel();
    company.id = 0;
    company.name = formData.get("username") as string;
    company.email = formData.get("email") as string;
    company.password = formData.get("password") as string;

    jwtAxios
      .post(globals.urls.localUrl + "api/admin/addCompany", company)
      .then((response) => {
        setFetchedCompany(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  };

  return (
    <div className="AddCompany">
      <h3 className="h3Div">Add Company</h3>
      <Form ref={formRef} onSubmit={addCompanyHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control name="username" type="text" minLength={4} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control name="email" type="email" minLength={4} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              type="password"
              minLength={6}
              required
            />
          </Form.Group>
        </div>
        <Button type="submit">SUBMIT</Button>
      </Form>
      <CompanyTable
        err={err}
        data={fetchedCompany}
        title="COMPANY ADDED SUCCESSFULLY"
      />
    </div>
  );
};

export default AddCompany;
