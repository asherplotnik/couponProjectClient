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
  //let user = useSelector<SessionState, any>((state) => state.session.userType);
  public guard = (
    childComponent: JSX.Element,
    userType: number
  ): JSX.Element => {
    if (this.state.user === userType) {
      return childComponent;
    }
    <Redirect from="/" to="/login" exact />;
    return null;
  };

  public render(): JSX.Element {
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
              <Route
                path="/admin"
                component={() => this.guard(<Admin />, 0)}
                exact
              />
              ;
              <Route
                path="/company"
                component={() => this.guard(<Company />, 1)}
                exact
              />
              ;
              <Route
                path="/customer"
                component={() => this.guard(<Customer />, 2)}
                exact
              />
              ;
              <Redirect from="/" to="/login" />;
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
