import classes from "./MyButton.module.css";
import Button from "react-bootstrap/Button";
const MyButton = (props) => {
  return (
    <Button className={classes.buttunClass} {...props}>
      {props.children}
    </Button>
  );
};

export default MyButton;
