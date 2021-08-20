import React from 'react';
import Header from './Header';
import Footer from './Footer';

class MA_Assigned extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row">
  <div className="col-xs-12">
    {/*?php if ( isset($alertStatus) && !empty($alertStatus) ): ?*/}
    <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
      <button type="button" className="close" data-dismiss="alert">
        <i className="ace-icon fa fa-times" />
      </button>
      <p>
        <strong>
          <i className="ace-icon fa fa-check" />
          Well done!
        </strong>
        {/*?php echo urldecode($alertMessage); ?*/}
      </p>
    </div>
    {/*?php endif; ?*/}
    <div className="clearfix">
      <div className="pull-right tableTools-container" style={{paddingTop: 5}} />
    </div>
    <div>
      30 ) ? 'danger' : 'warning';
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
      ?&gt;
      <table id="dynamic-table" className="table table-striped table-bordered table-hover">
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
            <td>{/*?php echo $caseLs[$i]['customerName']; ?*/}</td>
            <td>{/*?php echo ( !empty($caseLs[$i]['vip']) ) ? '<span class="label label-success arrowed-right"*/}' . ucwords($caseLs[$i]['fullname']) . '' : ucwords($caseLs[$i]['fullname']); ?&gt;</td>
            <td>{/*?php echo ucwords($caseLs[$i]['ownerName']); ?*/}</td>					
            <td>
              <div align="center" style={{fontSize: 10}}>
                {/*?php echo ( $caseLs[$i]['totalNewAlert'] */} 0 ) ? '<span style={{fontSize: 10}} className="badge badge-warning">' . $caseLs[$i]['totalNewAlert'] . '</span>' : 0; ?&gt;
              </div>
            </td>
            <td>
              <div align="center">
                <button className="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $caseLs[$i]['cToken']; ?>/ma/')">
                  Open
                  <i className="ace-icon fa fa-arrow-right icon-on-right" />
                </button>
              </div>
            </td>															
          </tr>
          {/*?php }} ?*/}
        </tbody>
      </table>
    </div>
  </div>{/* /.span */}
</div>{/* /.row */}

        <Footer />
      </div>
    );
  }
}

export default MA_Assigned;