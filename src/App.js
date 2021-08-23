import Loginbox from './pages/Loginbox';
import Forgot from './pages/Forgotpassword';
import Activate from './pages/ActivateAcc';
import SignUp from './pages/Register';
import './App.css';
import Dashboard from './pages/Dashboard';
import MA_Assigned from './pages/MA_Assigned';
import MA_Inprogress from './pages/MA_Inprogress';
import MA_Closed from './pages/MA_Closed';
import MC_Assigned from './pages/MC_Assigned';
import MC_Inprogress from './pages/MC_Inprogress';
import GA_Assigned from './pages/GA_Assigned';
import GA_Closed from './pages/GA_Closed';
import GA_Inprogress from './pages/GA_Inprogress';
import GA_Unassigned from './pages/GA_Unassigned';
import AA_Assigned from './pages/AA_Assigned';
import AA_Closed from './pages/AA_Closed';
import AA_Inprogress from './pages/AA_Inprogress';
import AA_Unassigned from './pages/AA_Unassigned';
import MU_Registereduser from './pages/MU_Registereduser';
import MU_Groupmember from './pages/MU_Groupmember';
import AdvancedSearch from './pages/AdvancedSearch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return ( 
    // Add navigation route so that it can run properly
    // Just change the route name to see all the dedicated page
    <Router> 
        <Switch>
        <Route path="/" exact component={Dashboard} />
        {/* For Login page, you need to create a background page Component */}
        <Route path="/login" component={Loginbox} />
        <Route path="/forgotpassword" component={Forgot} />
        <Route path="/signup" component={SignUp} />
        <Route path="/activate" component={Activate} />
        {/* Go to this route path to see the sign up box and no background image */}
        <Route path="/assignment/self/assigned"               component={MA_Assigned} />
        <Route path="/assignment/self/in-progress"            component={MA_Inprogress} />
        <Route path="/assignment/self/closed"                 component={MA_Closed} />
        <Route path="/assignment/collaboration/assigned"      component={MC_Assigned} />
        <Route path="/assignment/collaboration/in-progress"   component={MC_Inprogress} />
        <Route path="/assignment/group/assigned"              component={GA_Assigned} />
        <Route path="/assignment/group/closed"                component={GA_Closed} />
        <Route path="/assignment/group/in-progress"           component={GA_Inprogress} />
        <Route path="/assignment/group/unassigned"            component={GA_Unassigned} />
        <Route path="/assignment/all/assigned"                component={AA_Assigned} />
        <Route path="/assignment/all/closed"                  component={AA_Closed} />
        <Route path="/assignment/all/in-progress"             component={AA_Inprogress} />
        <Route path="/assignment/all/unassigned"              component={AA_Unassigned} />
        <Route path="/admin/alluser"                          component={MU_Registereduser} />
        <Route path="/admin/groupmembers"                     component={MU_Groupmember} />
        <Route path="/advance_search"                          component={AdvancedSearch} />
      </Switch>
    </Router>
    );
}

export default App;
