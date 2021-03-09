import axios from 'axios';
import {localUrl} from './helper';
import {useSelector ,useDispatch} from 'react-redux'
import * as actions from '../redux/actions';
import App from '../App';
function Login() {
 const dispatch = useDispatch();
    const fetchLogin = (e) => {
      e.preventDefault();
      const formData = new FormData(document.querySelector("#loginForm"));
		  const password = formData.get("password");
		  const email = formData.get("email");
		  const userType = parseInt(formData.get("userType"));
      axios.post(localUrl+`:8080//login/${email}/${userType}`,{"password":password})
      .then(function (response) {
        dispatch(actions.setSession(response.data,userType));
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
    let userT = useSelector(state => state.userType);

    let  loginView = (
      <div>
        <h1>MY COUPON API</h1>
        <div>
          <form id="loginForm" onSubmit={fetchLogin}>
            <label>Email :</label> <input id="email" name="email" /> <label>Password:</label>
            <input id="password" name="password" /> <label>User type:</label> <input
              id="userType" name="userType" />
            <button id="submitButtorm" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    )
    if (userT !== -1) {
       loginView = <App/>;
    }
  return loginView;
}

export default Login;
