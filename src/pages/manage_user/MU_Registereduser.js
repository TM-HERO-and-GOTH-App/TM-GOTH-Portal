import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

class MU_Registereduser extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
  <a name="group-members" />
  {/*?php if ( isset($alertStatus) && !empty($alertStatus) ): ?*/}
  <div className="row">
    <div className="col-sm-12">
      <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
        <button type="button" className="close" data-dismiss="alert">
          <i className="ace-icon fa fa-times" />
        </button>
        <p>{/*?php echo urldecode($alertMessage); ?*/}</p>
      </div>
    </div>
    <br /><br />
    <div className="space-10" />	
  </div>
  {/*?php endif; ?*/}
  <div className="row">
    <div className="col-xs-6">
    </div>	
  </div>
  <div className="space-2" />
  {/*?php $totalSH = $totalTM = 0; ?*/}
  <div className="row">
    <div className="col-xs-12">
      <div className="clearfix">
        <div className="pull-right tableTools-container-1" style={{paddingTop: 5}} />
      </div>
      <div>
        <table id="dynamic-table-1" className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th width="5%"><div align="center">#</div></th>
              <th width="30%">Fullname</th>
              <th width="15%">Email</th>					
              <th width="10%">Category</th>
              <th width="15%">Stakeholder</th>
              <th width="15%">Joined Date</th>										
            </tr>
          </thead>
          <tbody>
            {/*?php if( empty($teamMembers) ){ ?*/}
            <tr><td colSpan={6}><span style={{color: 'red'}}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
            {/*?php } else { 
				
				for($i=0;$i<$teamMembersCount;$i++){ 
					if( $teamMembers[$i]['category'] == 'STAKEHOLDER' )	$totalSH++; 
					else $totalTM++; 
				?*/}
            <tr>
              <td><div align="center">{/*?php echo $i+1; ?*/}</div></td>
              <td>{/*?php echo ucwords($teamMembers[$i]['fullName']); ?*/}</td>
              <td>{/*?php echo strtolower($teamMembers[$i]['email']); ?*/}</td>					
              <td>{/*?php echo ucwords($teamMembers[$i]['category']); ?*/}</td>
              <td><div align="center">{/*?php echo (! empty($teamMembers[$i]['stakeholderName'])) ? ucwords($teamMembers[$i]['stakeholderName']) : 'n/a'; ?*/}</div></td>			
              <td><div align="right">{/*?php echo ucwords($teamMembers[$i]['registeredDate']); ?*/}</div></td>							
            </tr>
            {/*?php }} ?*/}
          </tbody>
        </table>
      </div>
    </div>{/* /.span */}
  </div>
  <h4 className="header green">Total Registered Users</h4>	
  <div className="row">
    <div className="col-sm-4">
      <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>
        <div className="profile-info-row">
          <div className="profile-info-name">TM/PUBLIC</div>
          <div className="profile-info-value">
            <span className="editable" id="username"><b>{/*?php echo $totalTM; ?*/}</b></span>
          </div>
        </div>
        <div className="profile-info-row">
          <div className="profile-info-name">STAKEHOLDER</div>
          <div className="profile-info-value">
            <span className="editable" id="username"><b>{/*?php echo $totalSH; ?*/}</b></span>
          </div>
        </div>
        <div className="profile-info-row">
          <div className="profile-info-name">TOTAL</div>
          <div className="profile-info-value">
            <span className="editable" id="username"><b style={{color: 'red'}}>{/*?php echo $totalTM+$totalSH; ?*/}</b></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <Footer />
      </div>
    );
  }
}

export default MU_Registereduser;