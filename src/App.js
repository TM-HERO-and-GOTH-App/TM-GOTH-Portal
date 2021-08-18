import Login from './pages/Login';
import Forgot from './pages/Forgotpassword';
import Activate from './pages/ActivateAcc';
import SignUp from './pages/Register';
import './App.css';
import Dashboard from './pages/Dashboard';
import Baselayout from './pages/LayoutBase';
import AdvancedSearch from './pages/AdvancedSearch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return ( 
    // Add navigation route so that it can run properly
    // Just change the route name to see all the dedicated page
    <Router> 
        <Switch>
        <Route path="/" exact component={Baselayout} />
        <Route path="/Dashboard/overall" component={Dashboard} />
        {/* For Login page, you need to create a background page Component */}
        <Route path="/login/auth/" component={Login} />
        <Route path="/login/forgotpassword" component={Forgot} />
        <Route path="/login/signupme" component={SignUp} />
        <Route path="/login/activate" component={Activate} />
        {/* Go to this route path to see the sign up box and no background image */}
        <Route path="/advance_search" component={AdvancedSearch} />
      </Switch>
    </Router>
    );
}

export default App;
