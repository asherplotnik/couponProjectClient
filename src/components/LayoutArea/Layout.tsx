import Header from "./Header/Header";
//import Side from "./Side/Side";
import "./Layout.css";
import Footer from "./Footer/Footer";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../MainArea/Login/Login";
import Admin from "../MainArea/AdminArea/Admin/Admin";
import Company from "../MainArea/CompanyArea/Company/Company";
import Customer from "../MainArea/CustomerArea/Cusotmer/Customer";
import { useSelector } from "react-redux";
function Layout(): JSX.Element {
  let user = useSelector<SessionState, any>((state) => state.session.userType);
  const guard = (
    childComponent: JSX.Element,
    userType: number
  ): JSX.Element => {
    if (user === userType) return childComponent;
    return <Login />;
  };
  return (
    <BrowserRouter>
      <div className="Layout">
        <header>
          <Header />
        </header>

        <main>
          <Switch>
            {/* <Route path="/login" component={Login} />; */}
            <Route path="/login" component={Login} exact />;
            <Route path="/admin" component={() => guard(<Admin />, 0)} exact />;
            <Route
              path="/company"
              component={() => guard(<Company />, 1)}
              exact
            />
            ;
            <Route
              path="/customer"
              component={() => guard(<Customer />, 2)}
              exact
            />
            ;
            <Redirect from="/" to="/login" exact />;
            <Route component={Login} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
