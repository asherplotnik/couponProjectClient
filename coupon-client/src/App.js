import "./App.css";
import Login from "./components/Login";
import Admin from "./components/admin/Admin";
import Company from "./components/company/Company";
import Customer from "./components/customer/Customer";
import { useSelector } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
const App = () => {
  let user = useSelector((state) => state.userType);
  const guard = (childComponent, usrtType) => {
    if (user === usrtType) {
      return childComponent;
    } else {
      return Login;
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />;
        <Route path="/admin" component={guard(Admin, 0)} />;
        <Route path="/company" component={guard(Company, 1)} />;
        <Route path="/customer" component={guard(Customer, 2)} />;
        <Route path="/" component={Login} />;
      </Switch>
    </BrowserRouter>
  );
};
export default App;
