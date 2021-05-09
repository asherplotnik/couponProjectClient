import "./Logo.css";
import logoImage from "../../../../assets/images/logo.png";
function Logo(): JSX.Element {
  return (
    <div className="Logo">
      <img src={logoImage} alt="logo" />
    </div>
  );
}

export default Logo;
