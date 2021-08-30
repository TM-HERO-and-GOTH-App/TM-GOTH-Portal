import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

class MU_Groupmember extends React.Component {
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
      <form name="form" method="POST" action="<?php echo APPNAME; ?>/admin/groupmembers/">
        <div className="input-group">
          <span className="input-group-addon">
            <i className="ace-icon fa fa-check" />
          </span>
          <input type="text" className="form-control search-query" name="keyword" placeholder="Search Profile by Name" />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-inverse btn-white">
              <span className="ace-icon fa fa-search icon-on-right bigger-110" />
              Search
            </button>
          </span>
        </div>
      </form>			
    </div>
    <div className="col-xs-6 pull-right">
    </div>	
  </div>
  <div className="space-2" />
  {/*?php if(! empty($searchMembers) ){ ?*/}
  <div><span className="input-group-btn">
      <button className="pull-left btn btn-sm btn-inverse" onclick="redirect('<?php echo APPNAME; ?>/admin/groupmembers/')">
        <i className="ace-icon fa fa-refresh" />
        <span className="bigger-110">Reset Search Keyword</span>
      </button></span></div>
  <br />	
  <h4 className="header blue">Search Result</h4>	
  <p>* Showing for Activated Users ONLY</p>
  <div className="row">	
    <div className="col-xs-12">
      <table id="simple-table" className="table  table-bordered table-hover">
        <thead>
          <tr>
            <th width="5%"><div align="center">#</div></th>
            <th width="30%">Fullname</th>
            <th width="25%">Email</th>
            <th width="15%">Category</th>
            <th width="15%"><div align="center">Stakeholder</div></th>
            <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
          </tr>
        </thead>
        <tbody>
          {/*?php for($i=0;$i<$searchMembersCount;$i++){ ?*/}
          <tr>
            <td><div align="center">{/*?php echo $i+1; ?*/}</div></td>
            <td>{/*?php echo ucwords(strtolower($searchMembers[$i]['fullName'])); ?*/}</td>
            <td>{/*?php echo strtolower($searchMembers[$i]['email']); ?*/}</td>
            <td>{/*?php echo ucwords($searchMembers[$i]['category']); ?*/}</td>
            <td><div align="center">{/*?php echo (! empty($searchMembers[$i]['stakeholderName'])) ? ucwords($searchMembers[$i]['stakeholderName']) : 'n/a'; ?*/}</div></td>
            <td>
              <div align="center">
                {/*?php if( strtoupper($searchMembers[$i]['category']) == 'PUBLIC' || strtoupper($searchMembers[$i]['category']) == 'TM' ){ ?*/}
                <button className="btn btn-minier btn-success" onclick="redirect('<?php echo APPNAME; ?>/admin/invitetogroup/<?php echo $searchMembers[$i]['hToken']; ?>/')">Add to Group</button>
                {/*?php } ?*/}							
              </div>
            </td>
          </tr>
          {/*?php } ?*/}
        </tbody>
      </table>	
    </div>
  </div>
  {/*?php } else { ?*/}
  <div className="row">
    <div className="col-xs-12">
      <table id="simple-table" className="table  table-bordered table-hover">
        <thead>
          <tr>
            <th width="5%"><div align="center">#</div></th>
            <th width="30%">Fullname</th>
            <th width="15%">Email</th>					
            <th width="10%">Position</th>
            <th width="10%"><div align="center">Agent</div></th>
            <th width="10%"><div align="center">Coordinator</div></th>
            <th width="10%"><div align="center">Admin</div></th>
            <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
          </tr>
        </thead>
        <tbody>
          {/*?php if( empty($teamMembers) ){ ?*/}
          <tr><td colSpan={4}><span style={{color: 'red'}}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
          {/*?php } else { 
				
				for($i=0;$i<$teamMembersCount;$i++){ 
				?*/}
          <tr>
            <td><div align="center">{/*?php echo $i+1; ?*/}</div></td>
            <td>{/*?php echo ucwords($teamMembers[$i]['fullName']); ?*/}</td>
            <td>{/*?php echo strtolower($teamMembers[$i]['email']); ?*/}</td>					
            <td>{/*?php echo ( strtoupper($teamMembers[$i]['positionName']) == 'ADMIN' ) ? '<span class="label label-warning arrowed-right"*/}' . $teamMembers[$i]['positionName'] . '' : $teamMembers[$i]['positionName']; ?&gt;
            </td>
            <td>
              <div align="center">
                <input name="set_agent" type="checkbox"   onclick="redirect('{/*?php echo APPNAME; ?*/}/admin/setasagent/{/*?php echo $teamMembers[$i]['hToken']; ?*/}/')" className="lbl" />
              </div>
            </td>
            <td>
              <div align="center">
                <input name="set_co" type="checkbox"  onclick="redirect('{/*?php echo APPNAME; ?*/}/admin/setascoordinator/{/*?php echo $teamMembers[$i]['hToken']; ?*/}/')"  className="lbl" />
              </div>
            </td>					
            <td>
              <div align="center">
                <input name="set_admin" type="checkbox"  onclick="redirect('{/*?php echo APPNAME; ?*/}/admin/setasadmin/{/*?php echo $teamMembers[$i]['hToken']; ?*/}/')"  className="lbl" />
              </div>
            </td>					
            <td><div align="center">
                {/*?php if( $hID != $teamMembers[$i]['hID'] && strtoupper($teamMembers[$i]['positionName']) != 'ADMIN' ){ ?*/}
                <button className="btn btn-minier btn-danger" onclick="redirect('<?php echo APPNAME; ?>/admin/removefromgroup/<?php echo $teamMembers[$i]['hToken']; ?>/')">Remove</button>
                {/*?php } ?*/}
              </div>
            </td>
          </tr>
          {/*?php }} ?*/}
        </tbody>
      </table>
    </div>{/* /.span */}
  </div>
  {/*?php } ?*/}<br />
</div>

        <Footer />
      </div>
    );
  }
}

export default MU_Groupmember;