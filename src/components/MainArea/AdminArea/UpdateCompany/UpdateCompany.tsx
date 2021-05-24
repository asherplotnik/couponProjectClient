import { SyntheticEvent, useCallback, useEffect } from "react";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./UpdateCompany.css";
import CompanyTable from "../../../UI/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";

function UpdateCompany() {
  const [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  const [fetchedUpdate, setFetchedUpdate] = useState<CompanyModel>(null);
  const [fetchedData, setFetchedData] = useState<CompanyModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  const updateCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (fetchedUpdate === null) {
      return;
    }
    const formData = new FormData(document.querySelector("#updateCompanyForm"));
    let company: CompanyModel = new CompanyModel();
    company.id = fetchedUpdate.id;
    company.email = formData.get("email") as string;
    company.password = formData.get("password") as string;
    let conf = formData.get("confirm") as string;
    company.name = (
      document.querySelector("#companyName") as HTMLInputElement
    ).value;
    if (conf !== company.password) {
      alert("password don't match!!!");
      return;
    }
    jwtAxios
      .put(globals.urls.localUrl + "api/admin/updateCompany", company)
      .then(function (response) {
        fetchCompanies();
        setFetchedCompany(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
      });
  };

  const fetchCompanies = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getAllCompanies/")
      .then(function (response) {
        setFetchedData(response.data);
      })
      .catch(function (error) {
        setErr(error);
        alert(error.response.data.message);
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const fetchCompanyByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#updateCompanyForm"));
    if ((formData.get("companyId") as string) === "") {
      return;
    }
    const companyId = parseInt(formData.get("companyId") as string);

    for (const company of fetchedData) {
      if (company.id === companyId) {
        setFetchedUpdate(company);
        return;
      }
    }
    setErr(new ErrorModel());
  };

  return (
    <div className="UpdateCompany">
      <h3 className="h3Div">Update Company</h3>
      <Form id="updateCompanyForm" onSubmit={updateCompanyHandler}>
        <div className="FormColl">
          <Form.Group>
            <Form.Control
              id="companyId"
              name="companyId"
              as="select"
              size="lg"
              onChange={fetchCompanyByIdHandler}
            >
              <option value="">-- choose one --</option>
              {fetchedData && (
                <>
                  {fetchedData.map((opt: CompanyModel) => {
                    return (
                      <option key={opt.id} value={opt.id}>
                        ID)
                        {opt.id} Name: {opt.name}
                      </option>
                    );
                  })}
                </>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              name="companyName"
              id="companyName"
              defaultValue={fetchedUpdate && fetchedUpdate.name}
              disabled={true}
              type="text"
              minLength={4}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              name="email"
              type="email"
              minLength={4}
              defaultValue={fetchedUpdate && fetchedUpdate.email}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password: </Form.Label>
            <Form.Control
              name="password"
              type="password"
              minLength={6}
              defaultValue={fetchedUpdate && fetchedUpdate.password}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>confirm password: </Form.Label>
            <Form.Control
              name="confirm"
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
        title="COMPANY UPDATED SUCCESSFULLY"
      />
    </div>
  );
}

export default UpdateCompany;
