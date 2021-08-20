import React from 'react';
import Header from './Header';
import Footer from './Footer';

class AdvancedSearch extends React.Component{

    render(){
        return(
          <div>
          <Header />
      <div className="row">
      <div className="page-header">
      <h1> AdvancedSearch </h1>
      </div>
  <div className="col-sm-12">Please enter your keywords...</div>
  <div className="space-2" />
    <form name="form" method="POST" action="<?php echo APPNAME; ?>/search/enquiry/">
      <div className="col-sm-2">
        <input type="text" name="inputs[keyFullname]" placeholder="HERO Name" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keyEmail]" placeholder="Email" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keyNricNum]" placeholder="NRIC Number" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keyCaseNum]" placeholder="Case ID" />
      </div>	
      <div className="space-20" />
      <br />
      <div className="col-sm-2">
        <input type="text" name="inputs[keyVipName]" placeholder="VIP Name" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keyCustomerName]" placeholder="Customer Name" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keySrNum]" placeholder="SR Number" />
      </div>	
      <div className="col-sm-2" style={{paddingLeft: 10}}>
        <input type="text" name="inputs[keyTtNum]" placeholder="TT Number" />
      </div>	
      <div className="col-sm-3" style={{paddingLeft: 10}}>
        <button type="button" className="btn btn-sm btn-inverse" onclick="redirect('<?php echo APPNAME; ?>/search/enquiry/')">
          <i className="ace-icon fa fa-repeat align-top bigger-125" />
          <span>Reset</span>
        </button>
        <button type="submit" className="btn btn-sm btn-primary">
          <i className="ace-icon fa fa-search align-top bigger-125" />
          Search
        </button>
      </div>	
    </form>
    <div className="col-xs-12">
      <div className="clearfix">
        <div className="pull-right tableTools-container-search" style={{paddingTop: 10}} />
      </div>
      {/* <div>
        30 ) ? 'danger' : 'warning';
        $ownerName = ( !empty($caseLs[$i]['ownerName']) ) ? ucwords($caseLs[$i]['ownerName']) : '<i style={{color: 'red'}}>Un-Assigned</i>';
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
        $statusLabel = 'CL';
        $statusBadge = 'success';												
        {'}'} else if( $caseLs[$i]['caseStatus'] == 'CANCELLED' ) {'{'} 
        $statusLabel = 'CA';
        $statusBadge = 'pink';												
        {'}'} else {'{'}
        $statusLabel = 'TBD';
        $statusBadge = 'pink';												
        {'}'} 
        $sh = '<span className="badge badge-info">' . $caseLs[$i]['stakeholderName'] . '</span>';
        ?&gt;*/}
        <table id="dynamic-table-search" className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Case ID</th>
              <th><div align="center">Status</div></th>
              <th style={{width: '6%'}}>Aging</th>
              <th>Type</th>
              <th><div align="center">VIP</div></th>
              <th width="8%">Product</th>
              <th>Customer</th>
              <th>HERO</th>
              <th>Owner</th>
              <th>Latest Remark</th>
              <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell" /></div></th>
              <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o" /></div></th>										
            </tr>
          </thead>
          <tbody>
            {/*?php if( !isset($caseCount) || $caseCount == 0 ){ ?*/}
            <tr><td colSpan={11}><span style={{color: 'red'}}>Search result is empty</span></td></tr>
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
                <div align="center" style={{fontSize: 10}}>
                  {/*?php echo ( $caseLs[$i]['unclosedAging'] < 16 ) ? $caseLs[$i]['unclosedAging'] : '<span style="font-size:10px" class="badge badge-sm badge-'.$badgeColor.'"*/}'.$caseLs[$i]['closedAging'].''; ?&gt;
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
              <td>{/*?php echo $ownerName , ' ' , $sh; ?*/}</td>
              <td>{/*?php echo nl2br($caseLs[$i]['remark']); ?*/}</td>					
              <td>
                <div align="center">
                  {/*?php echo ( $caseLs[$i]['totalNewAlert']  0 ) ? '<span style={{fontSize: 10}} className="badge badge-warning">' . $caseLs[$i]['totalNewAlert'] . '</span>' : 0; ?&gt; */}
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
      </div>{/* /.span */}
  {/* /.row */}
  </div>
  <Footer />
  </div>
        );
    }
  }



export default AdvancedSearch;