import './App.css';
import {useSelector} from 'react-redux'
import Login from './components/Login';
import Admin from './components/admin/Admin';
import Company from './components/company/Company';
import Customer from './components/customer/Customer';

function App() {
  const userType = useSelector(state => state.userType);
  const token = useSelector(state => state.token);
  let viewPage = {};
  switch (userType) {
    case -1 :
      viewPage = <Login/>;
      break;
    case 0 :
      viewPage = <Admin token = {token} />;
      break;
    case 1 :
      viewPage = <Company token = {token} />;
      break;
    case 2 :
      viewPage =<Customer token = {token} />;
      break;
    default:
  }
  return viewPage;
}

export default App;
