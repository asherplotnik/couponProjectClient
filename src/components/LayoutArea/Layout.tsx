import Header from "./Header/Header";
//import Side from "./Side/Side";
import "./layout.css";
import Footer from "./Footer/Footer";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../MainArea/Auth/Login";
import Admin from "../MainArea/AdminArea/Admin/Admin";
import Company from "../MainArea/CompanyArea/Company/Company";
import Customer from "../MainArea/CustomerArea/Cusotmer/Customer";

const Layout = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/company" component={Company} exact />
            <Route path="/customer" component={Customer} exact />
            <Redirect from="/" to="/login" />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default Layout;
