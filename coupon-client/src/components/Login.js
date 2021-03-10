import axios from "axios";
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
        <div>
          <form id="loginForm" onSubmit={fetchLogin} className={classes.form}>
            <div className={classes.ulForm}>
              <div className={classes.ulFormList}>
                <label htmlFor="email">Email :</label>
                <input id="email" name="email" required />
              </div>
              <div className={classes.ulFormList}>
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  name="password"
                  required
                  type="password"
                />{" "}
              </div>
              <div className={classes.ulFormList}>
                <label htmlFor="userType">User type:</label>{" "}
                <select
                  id="userType"
                  name="userType"
                  required
                  className={classes.select}
                >
                  ><option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <button id="submitButtorm" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
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
