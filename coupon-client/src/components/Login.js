import axios from "axios";
import { localUrl } from "./helper";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../redux/actions";

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
    <div>
      <h1>MY COUPON API</h1>
      <div>
        <form id="loginForm" onSubmit={fetchLogin}>
          <label>Email :</label> <input id="email" name="email" />{" "}
          <label>Password:</label>
          <input id="password" name="password" /> <label>User type:</label>{" "}
          <input id="userType" name="userType" />
          <button id="submitButtorm" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
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
