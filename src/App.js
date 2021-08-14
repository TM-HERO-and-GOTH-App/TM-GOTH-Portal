import Login from './pages/Login';
import Forgot from './pages/Forgotpassword';
import Activate from './pages/ActivateAcc';
import SignUp from './pages/Register';
import Function from './pages/Login';
import './App.css';
import Loginbox from './pages/Loginbox';
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
        <Route path="/login" component={Login} />
        <Route path="/forgot_password" component={Forgot} />
        {/* Go to this route path to see the sign up box and no background image */}
        <Route path="/signup" component={SignUp} />
        <Route path="/advance_search" component={AdvancedSearch} />
      </Switch>
    </Router>
    );
}

export default App;
