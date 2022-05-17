import './App.css';
import AA_Assigned from './pages/all_assignments/AA_Assigned';
import AA_Inprogress from './pages/all_assignments/AA_Inprogress';
import AA_Unassigned from './pages/all_assignments/AA_Unassigned';
import ActionTaken from './pages/assignment/ActionTaken';
import Activate from './pages/ActivateAcc';
import AdvancedSearch from './pages/AdvancedSearch';
// import AnnouncementForm from './pages/mock_screens/AnnouncementForm';
import AssignToOther from './pages/assignment/AssignToOthers';
import CaseDetail from './pages/case_detail/CaseDetail';
import CautionReport from './pages/hero_cases_functionality/CautionReport';
import Createcase from './pages/user_profile/Createcase';
import Dashboard from './pages/Dashboard';
import EditCaseDetail from './pages/case_detail/EditCaseDetail';
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
import SignUp from './pages/Registerbox';
import TechnicalCase from './pages/hero_cases_functionality/TechnicalCase';
import Userprofile from './pages/user_profile/Userprofile';
import All_Announcement from './pages/announcement/All_Announcement';
import PrivateRoute from './private-route/PrivateAuthRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    // Add navigation route so that it can run properly
    // Just change the route name to see all the dedicated page
    <Router>
      <Switch>
        {/* For Login page, you need to create a background page Component */}
        <Route path="/login" component={Loginbox} />
        <Route path="/forgotpassword" component={Forgot} />
        <Route path="/signup" component={SignUp} />
        <Route path="/activate" component={Activate} />
        <PrivateRoute>
          {/* <Route path="/announcement_form" component={AnnouncementForm} /> */}
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/MyAssignments-Assigned" component={MA_Assigned} />
          <Route exact path="/MyAssignments-Inprogress" component={MA_Inprogress} />
          <Route exact path="/MyAssignments-Closed" component={MA_Closed} />
          <Route exact path="/MyCollaboration-Assigned" component={MC_Assigned} />
          <Route exact path="/MyCollaboration-Inprogress" component={MC_Inprogress} />
          <Route exact path="/GroupAssignments-Assigned" component={GA_Assigned} />
          <Route exact path="/GroupAssignments-Closed" component={GA_Closed} />
          <Route exact path="/GroupAssignments-Inprogress" component={GA_Inprogress} />
          <Route exact path="/GroupAssignments-Unassigned" component={GA_Unassigned} />
          <Route exact path="/AllAssignments-Assigned" component={AA_Assigned} />
          <Route exact path="/AllAssignments-Closed" component={AA_Closed} />
          <Route exact path="/AllAssignments-Inprogress" component={AA_Inprogress} />
          <Route exact path="/AllAssignments-Unassigned" component={AA_Unassigned} />
          <Route exact path="/ManageUsers-RegisteredUser" component={MU_Registereduser} />
          <Route exact path="/ManageUsers-Groupmembers" component={MU_Groupmember} />
          <Route path="/advance-search" component={AdvancedSearch} />
          <Route path="/all_announcements" component={All_Announcement}/>
          <Route path="/user-profile" component={Userprofile} />
          <Route path='/edit-profile' component={EditUser} />
          <Route path="/create-case" component={Createcase} />
          <Route path='/non-technical-case' component={NonTechnicalCase} />
          <Route path='/technical-case' component={TechnicalCase} />
          <Route path='/caution-report' component={CautionReport} />
          <Route path='/internal-chat/:id' component={InternalChat} />
          <Route path='/invite-to-group-chat/:id' component={InviteChat} />
          <Route path='/hero-chat/:id' component={Logger} />
          <Route path='/action-taken/:id' component={ActionTaken} />
          <Route path='/assign-to-other/:id' component={AssignToOther} />
          <Route exact path='/case-detail/:id' component={CaseDetail} />
          <Route path='/edit-case/:id' component={EditCaseDetail} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
