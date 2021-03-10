import "./App.css";
import Login from "./components/Login";
import Admin from "./components/admin/Admin";
import Company from "./components/company/Company";
import Customer from "./components/customer/Customer";
import { useSelector } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
const App = () => {
  let user = useSelector((state) => state.userType);
  const guard = (childComponent) => {
    if (user > -1) {
      return childComponent;
    } else {
      return Login;
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />;
        <Route path="/admin" component={guard(Admin)} />;
        <Route path="/company" component={guard(Company)} />;
        <Route path="/customer" component={guard(Customer)} />;
        <Route path="/" component={Login} />;
      </Switch>
    </BrowserRouter>
  );
};
export default App;
