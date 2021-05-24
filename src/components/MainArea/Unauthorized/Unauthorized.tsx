import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

function Unauthorized(): JSX.Element {
  const history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };
  console.log("UNAUTHORIZED");
  return (
    <div className="Unauthorized">
      <p>YOU ARE UNAUTHORIZED</p>
      <Button variant="danger" onClick={handleClick}>
        Return to login
      </Button>
    </div>
  );
}

export default Unauthorized;
