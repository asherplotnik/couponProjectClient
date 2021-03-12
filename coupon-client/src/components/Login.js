import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { localUrl } from "./helper";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../redux/actions";
import classes from "./Login.module.css";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#loginForm"));
    const password = formData.get("password");
    const email = formData.get("email");
    const userType = parseInt(formData.get("userType"));
    axios
      .post(localUrl + `:8080//login/${email}/${userType}`, {
        password: password,
      })
      .then(function (response) {
        dispatch(actions.setSession(response.data, userType));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let userT = useSelector((state) => state.userType);
  let loginView = (
    <div className={classes.windowDiv}>
      <div className={classes.wrraperDiv}>
        <h1 className={classes.h1}>COUPONS API</h1>
        <Form className={classes.ulForm} id="loginForm" onSubmit={fetchLogin}>
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
            <Form.Control as="select" id="userType" name="userType" required>
              <option value="0">ADMIN</option>
              <option value="1">COMPANY</option>
              <option value="2">CUSTOMER</option>
            </Form.Control>
          </Form.Group>
          <Button
            className={classes.submitButton}
            id="submitButtorm"
            type="submit"
          >
            SUBMIT
          </Button>
        </Form>
      </div>
    </div>
    // </div>
  );
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
