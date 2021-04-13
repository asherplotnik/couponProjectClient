import Header from "./Header/Header";
//import Side from "./Side/Side";
import "./Layout.css";
import Footer from "./Footer/Footer";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../MainArea/Login/Login";
import Admin from "../MainArea/AdminArea/Admin/Admin";
import Company from "../MainArea/CompanyArea/Company/Company";
import Customer from "../MainArea/CustomerArea/Cusotmer/Customer";
import store from "../../Redux/Store";
import { Component } from "react";
import { Unsubscribe } from "redux";
import Unauthorized from "../MainArea/Unauthorized/Unauthorized";

interface LayoutState {
  user: number;
}

class Layout extends Component<{}, LayoutState> {
  private unsubscribeMe: Unsubscribe;
  public constructor(props: {}) {
    super(props);
    this.state = { user: -1 };
  }

  public componentDidMount(): void {
    // On any AppState change - call this function:
    this.unsubscribeMe = store.subscribe(() => {
      this.setState({ user: store.getState().SessionState.session.userType });
    });
  }
  public componentWillUnmount(): void {
    this.unsubscribeMe(); // Unsubscribe from the subscribe operation.
  }

  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <div className="Layout">
          <header>
            <Header />
          </header>
          <main>
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route
                path="/admin"
                component={this.state.user === 0 ? Admin : Unauthorized}
                exact
              />
              <Route
                path="/company"
                component={this.state.user === 1 ? Company : Unauthorized}
                exact
              />
              <Route
                path="/customer"
                component={this.state.user === 2 ? Customer : Unauthorized}
                exact
              />
              <Redirect from="/" to="/login" />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;
