import React from 'react';
import Header from './Header';
import Footer from './Footer';

class AA_Assigned extends React.Component {
  render() {
    return (
      <div>
        <Header />

       <div className="row">
    <div className="col-sm-3">
      {/* <select className="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." onchange="submitForm('<?php echo $_SERVER['REQUEST_URI']; ?>')">
        <option 0="=" value={0} <?php echo ( $shid_opt ) ? 'selected="yes" ' : '';>&gt;All Group/Stakeholder ...</option>
        ?php $totalLov = count($lovStakeholder); ?
        ?php for($i=0;$i<$totalLov;$i++){ ?*/}
        {/*?php if( $lovStakeholder[$i]['lovName'] != 'ADMIN' ) { ?*/}
        {/* <option value="<?php echo $lovStakeholder[$i]['lovID']; ?>" <?php echo ( $lovstakeholder[$i]['lovid']="=" $shid_opt ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovStakeholder[$i]['lovName']; ?* </option> */}
        {/*?php } ?*/}
        {/*?php } ?*/}		
    
    <div className="col-sm-3">
      {/* <select className="chosen-select form-control" name="caseTypeID" data-placeholder="Choose a Case Type..." onchange="submitForm('<?php echo $_SERVER['REQUEST_URI']; ?>')">
        <option 0="=" value={0} <?php echo ( $casetypeid ) ? 'selected="yes" ' : '';>&gt;All Case Type ...</option> */}
        {/*?php $totalLov = count($lovCaseType); ?*/}
        {/*?php for($i=0;$i<$totalLov;$i++){ ?*/}
        {/* <option value="<?php echo $lovCaseType[$i]['lovID']; ?>" <?php echo ( $lovcasetype[$i]['lovid']="=" $casetypeid ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovCaseType[$i]['lovName']; ? </option> */}
        {/*?php } ?*/}
    </div>	
  <div className="col-xs-12">
    <div className="clearfix">
      <div className="pull-right tableTools-container" />
    </div>
    <div>
      30 ) ? 'danger' : 'warning';
      $ownerName = ( !empty($caseLs[$i]['ownerName']) ) ? ucwords($caseLs[$i]['ownerName']) : '<i style={{color: 'red'}}>Un-assigned</i>';
      if( $caseLs[$i]['caseStatus'] == 'NEW' ) {'{'}
      $statusLabel = 'N';
      $statusBadge = 'danger';
      {'}'} else if( $caseLs[$i]['caseStatus'] == 'IN-PROGRESS' ) {'{'} 
      $statusLabel = 'IP';
      $statusBadge = 'info';						
      {'}'} else if( $caseLs[$i]['caseStatus'] == 'ASSIGNED' ) {'{'} 
      $statusLabel = 'A';
      $statusBadge = 'info';												
      {'}'} else if( $caseLs[$i]['caseStatus'] == 'CLOSED' ) {'{'} 
      $statusLabel = 'C';
      $statusBadge = 'success';												
      {'}'} else if( $caseLs[$i]['caseStatus'] == 'CANCELLED' ) {'{'} 
      $statusLabel = 'D';
      $statusBadge = 'pink';												
      {'}'} else {'{'}
      $statusLabel = 'N/A';
      $statusBadge = 'pink';												
      {'}'}
      $agingKey = ( $caseLs[$i]['caseStatus'] == 'CLOSED' ) ? 'closedAging' : 'unclosedAging'; 
      if( $caseLs[$i]['caseStatus'] != 'CANCELLED' ) {'{'}
      ?&gt;
      <table id="dynamic-table" className="table table-striped table-bordered table-hover"> {/* id="simple-table" class="table table-bordered table-hover" */}
        <thead>
          <tr>
            <th>Case ID</th>
            <th><div align="center">Status</div></th>					
            <th width="6%">Aging</th>
            <th>Type</th>
            <th><div align="center">VIP</div></th>
            <th width="8%">Product</th>
            <th>Customer</th>
            <th>HERO</th>
            <th>Owner</th>
            <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell" /></div></th>
            <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o" /></div></th>														
          </tr>
        </thead>
        <tbody>
          {/*?php if( empty($caseLs) ){ ?*/}
          <tr><td colSpan={11}><span style={{color: 'red'}}>List is empty</span></td></tr>
          {/*?php } else { 
				
				for($i=0;$i<$caseCount;$i++){ 
					$badgeColor = ( $caseLs[$i]['unclosedAging'] */}<tr>
            <td>
              <a href="<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $caseLs[$i]['cToken']; ?>">
                {/*?php echo $caseLs[$i]['caseNum']; ?*/}
              </a>
            </td>
            <td><div align="center"><span className="badge badge-<?php echo $statusBadge; ?>">{/*?php echo $statusLabel; ?*/}</span></div></td>										
            <td>
              <div align="center">
                {/*?php echo ( $caseLs[$i][$agingKey] < 16 ) ? $caseLs[$i][$agingKey] : '<span class="badge badge-sm badge-'.$badgeColor.'"*/}'.$caseLs[$i][$agingKey].''; ?&gt;
              </div>
            </td>
            <td>{/*?php echo $caseLs[$i]['caseType']; ?*/}</td>
            <td>
              <div align="center">
                {/*?php echo ( !empty($caseLs[$i]['vip']) ) ? '<i class="menu-icon glyphicon glyphicon-ok"*/}' : '-'; ?&gt;
              </div>
            </td>
            <td>{/*?php echo $caseLs[$i]['productName']; ?*/}</td>
            <td>{/*?php echo ucwords($caseLs[$i]['customerName']); ?*/}</td>
            <td>{/*?php echo ( !empty($caseLs[$i]['vip']) ) ? '<span class="label label-success arrowed-right"*/}' . ucwords($caseLs[$i]['fullname']) . '' : ucwords($caseLs[$i]['fullname']); ?&gt;</td>
            <td>{/*?php echo $ownerName , ' - ' , $caseLs[$i]['stakeholderName']; ?*/}</td>
            <td>
              <div align="center" style={{fontSize: 10}}>
                {/*?php echo ( $caseLs[$i]['totalNewAlert'] */} 0 ) ? '<span style={{fontSize: 10}} className="badge badge-warning">' . $caseLs[$i]['totalNewAlert'] . '</span>' : 0; ?&gt;
              </div>
            </td>
            <td>
              <div align="center">
                <button className="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $caseLs[$i]['cToken']; ?>/aa/')">
                  Open
                  <i className="ace-icon fa fa-arrow-right icon-on-right" />
                </button>
              </div>
            </td>																				
          </tr>
          {/*?php }}} ?*/}
        </tbody>
      </table>
</div>
</div>
</div>
</div>


<Footer />
</div>
    );
  }
}

export default AA_Assigned;