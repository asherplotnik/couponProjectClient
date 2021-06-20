import { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import globals from "../../../../Services/Globals";
import { Form, Button } from "react-bootstrap";
import "./UpdateCompany.css";
import CompanyTable from "../../../UI/CompanyTable/CompanyTable";
import CompanyModel from "../../../../Models/CompanyModel";
import ErrorModel from "../../../../Models/ErrorModel";
import jwtAxios from "../../../../Services/jwtAxios";
import { errorAlert } from "../../../../Services/commonFunctionService";
const UpdateCompany = () => {
  const [fetchedCompany, setFetchedCompany] = useState<CompanyModel>(null);
  const [fetchedUpdate, setFetchedUpdate] = useState<CompanyModel>(null);
  const [fetchedData, setFetchedData] = useState<CompanyModel[]>(null);
  const [err, setErr] = useState<ErrorModel>(null);
  let formRef = useRef(null);
  let scrollDownRef = useRef(null);
  const updateCompanyHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (fetchedUpdate === null) {
      return;
    }
    const formData = new FormData(formRef.current);
    let company: CompanyModel = new CompanyModel();
    company.id = fetchedUpdate.id;
    company.email = formData.get("email") as string;
    company.password = formData.get("password") as string;
    let conf = formData.get("confirm") as string;
    company.name = fetchedUpdate.name;
    if (conf !== company.password) {
      alert("password don't match!!!");
      return;
    }
    jwtAxios
      .put(globals.urls.localUrl + "api/admin/updateCompany", company)
      .then((response) => {
        fetchCompanies();
        setFetchedCompany(response.data);
        scrollDownRef.current.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  };

  const fetchCompanies = useCallback(() => {
    jwtAxios
      .get(globals.urls.localUrl + "api/admin/getAllCompanies/")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        setErr(error);
        errorAlert(error);
      });
  }, []);
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const fetchCompanyByIdHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
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
      <Form ref={formRef} onSubmit={updateCompanyHandler}>
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
      <div ref={scrollDownRef}></div>
    </div>
  );
};

export default UpdateCompany;
