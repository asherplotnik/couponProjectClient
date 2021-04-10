import "./Login.css";
import axios from "axios";
//import { localUrl } from "../../helper";
import globals from "../../../Services/Globals";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../Redux/actions";
import { useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import { Form, Button } from "react-bootstrap";
function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(
      document.querySelector("#loginForm") as HTMLFormElement
    );
    const password = formData.get("password");
    const email = formData.get("email");
    const userType = parseInt(formData.get("userType") as string);
    setLoading(true);
    axios
      .post(globals.urls.localUrl + `:8080//login/${email}/${userType}`, {
        password: password,
      })
      .then((response) => {
        setLoading(false);
        dispatch(
          actions.setSession({
            token: response.data as string,
            userType: userType,
          })
        );
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert(error);
      });
  };

  let userT = useSelector<SessionState, any>((state) => state.session.userType);
  let loginView = <Spinner />;
  if (!loading) {
    loginView = (
      <div className="Login">
        <div className="wrapperDiv">
          <h3>LOGIN</h3>
          <Form className="ulForm" id="loginForm" onSubmit={fetchLogin}>
            <Form.Group>
              <Form.Label>Email :</Form.Label>
              <Form.Control
                // type="email"
                id="email"
                name="email"
                required
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                id="password"
                name="password"
                required
                // type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>User type:</Form.Label>
              <Form.Control
                as="select"
                id="userType"
                name="userType"
                required
                size="lg"
              >
                <option value="0">ADMIN</option>
                <option value="1">COMPANY</option>
                <option value="2">CUSTOMER</option>
              </Form.Control>
            </Form.Group>
            <Button id="submitButton" type="submit">
              SUBMIT
            </Button>
          </Form>
        </div>
      </div>
      // </div>
    );
  }
  console.log(userT);
  switch (userT) {
    case 0:
      history.push("/admin");
      break;
    case 1:
      history.push("/company");
      break;
    case 2:
      history.push("/customer");
      break;
    default:
  }
  return loginView;
}

export default Login;
