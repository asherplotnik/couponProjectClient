import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./Header.css";
import Logo from "./Logo/Logo";

function Header(): JSX.Element {
  const [name, setName] = useState(store.getState().SessionState.session.name);
  useEffect(() => {
    const unsubscribeMe = store.subscribe(() => {
      setName(store.getState().SessionState.session.name);
    });

    return () => {
      unsubscribeMe();
    };
  }, []);

  return (
    <div className="Header">
      <Logo />
      <h3>COUPON PROJECT</h3>
      <div>
        {name && <span>Hello {name} </span>}
        {!name && (
          <span>
            {" "}
            Hello user,
            <br /> please login.{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default Header;
