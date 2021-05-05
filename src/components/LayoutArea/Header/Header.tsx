import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./Header.css";

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
      <h3>COUPON PROJECT</h3>
      {name && <span>Hello {name.substring(0, 10)}, you are logged in</span>}
      {!name && <span> Hello user, please login. </span>}
    </div>
  );
}

export default Header;
