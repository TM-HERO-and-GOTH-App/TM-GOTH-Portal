import './App.css';
import AA_Assigned from './pages/all_assignments/AA_Assigned';
import AA_Inprogress from './pages/all_assignments/AA_Inprogress';
import AA_Unassigned from './pages/all_assignments/AA_Unassigned';
import ActionTaken from './pages/assignment/ActionTaken';
import Activate from './pages/ActivateAcc';
import AdvancedSearch from './pages/AdvancedSearch';
import AssignToOther from './pages/assignment/AssignToOthers';
import CaseDetail from './pages/CaseDetail';
import CautionReport from './pages/hero_cases_functionality/CautionReport';
import Createcase from './pages/user_profile/Createcase';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/user_profile/EditUserProfile';
import Forgot from './pages/Forgotpassword';
import Loginbox from './pages/Loginbox';
import Logger from './pages/chat/Logger';
import GA_Assigned from './pages/group_assignments/GA_Assigned';
import GA_Closed from './pages/group_assignments/GA_Closed';
import GA_Inprogress from './pages/group_assignments/GA_Inprogress';
import GA_Unassigned from './pages/group_assignments/GA_Unassigned';
import InternalChat from './pages/chat/InternalChat';
import InviteChat from './pages/chat/Invite';
import MA_Assigned from './pages/my_assignments/MA_Assigned';
import MA_Inprogress from './pages/my_assignments/MA_Inprogress';
import MA_Closed from './pages/my_assignments/MA_Closed';
import MC_Assigned from './pages/my_collaborations/MC_Assigned';
import MC_Inprogress from './pages/my_collaborations/MC_Inprogress';
import AA_Closed from './pages/all_assignments/AA_Closed';
import MU_Registereduser from './pages/manage_user/MU_Registereduser';
import MU_Groupmember from './pages/manage_user/MU_Groupmember';
import NonTechnicalCase from './pages/hero_cases_functionality/NonTechnicalCase';
import Quicksearch from './pages/Quicksearch';
import SignUp from './pages/Register';
import TechnicalCase from './pages/hero_cases_functionality/TechnicalCase';
import Userprofile from './pages/user_profile/Userprofile';
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
        <Route path="/MyAssignments_Assigned"               component={MA_Assigned} />
        <Route path="/MyAssignments_Inprogress"             component={MA_Inprogress} />
        <Route path="/MyAssignments_Closed"                 component={MA_Closed} />
        <Route path="/MyCollaboration_Assigned"             component={MC_Assigned} />
        <Route path="/MyCollaboration_Inprogress"           component={MC_Inprogress} />
        <Route path="/GroupAssignments_Assigned"            component={GA_Assigned} />
        <Route path="/GroupAssignments_Closed"              component={GA_Closed} />
        <Route path="/GroupAssignments_Inprogress"          component={GA_Inprogress} />
        <Route path="/GroupAssignments_Unassigned"          component={GA_Unassigned} />
        <Route path="/AllAssignments_Assigned"              component={AA_Assigned} />
        <Route path="/AllAssignments_Closed"                component={AA_Closed} />
        <Route path="/AllAssignments_Inprogress"            component={AA_Inprogress} />
        <Route path="/AllAssignments_Unassigned"            component={AA_Unassigned} />
        <Route path="/ManageUsers_RegisteredUser"           component={MU_Registereduser} />
        <Route path="/ManageUsers_Groupmembers"             component={MU_Groupmember} />
        <Route path="/advance_search"                       component={AdvancedSearch} />
        <Route path="/quick_search"                       component={Quicksearch} />
        <Route path="/user_profile"                       component={Userprofile} />
        <Route path='/edit_user'                          component={EditUser} />
        <Route path="/create_case"                       component={Createcase} />
        <Route path='/non_technical_case'                  component={NonTechnicalCase} />
        <Route path='/technical_case'                  component={TechnicalCase} />
        <Route path='/caution_report'                  component={CautionReport} />
        <Route path='/internal_chat'                   component={InternalChat}/>
        <Route path='/invite_chat'                   component={InviteChat}/>
        <Route path='/logger_chat'                   component={Logger}/>
        <Route path='/action_taken'                   component={ActionTaken}/>
        <Route path='/assign_to_other'                component={AssignToOther}/>
        <Route path='/case_detail'                component={CaseDetail}/>
      </Switch>
    </Router>
    );
}

export default App;
