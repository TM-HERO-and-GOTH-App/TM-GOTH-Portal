import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'

class MA_Inprogress extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: JSON.parse(sessionStorage.getItem('userToken')),
      totalCase: [],
      statusLabel: '',
      statusBadge: '',
    }
    this.loggerCase = this.loggerCase.bind(this);
  }

  componentDidMount(){
    this.loggerCase();
  }

  loggerCase(){
    AssignmentService.viewCaseByOwner(this.state.token, 67).then(res => {
      console.log(res);
      if(res[0].response === 'FAILED'){
        this.setState({ totalCase: res })
      } else {
        this.setState({ totalCase: res })
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
          <div class="page-header">
            <h1>My Assignments : IN PROGRESS</h1>
          </div> {/* <!-- /.page-header --> */}
          <div class="row">
            <div class="col-xs-12">
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
                  { this.state.totalCase.length === 1 ? 
                    <tr><td colSpan={11}><span style={{ color: 'red' }}>List is empty</span></td></tr>
                  :
                  this.state.totalCase.map( data => {
                    // this.setState({ statusBadge: data.unclosedaging > 30 ? 'danger' : 'warning'})
                    // if(data.caseStatus === 'NEW'){
                    //   this.setState({ statusLabel: 'N'})
                    //   this.setState({ statusBadge: 'danger'})
                    // } else if( data.caseStatus === 'IN-PROGRESS' ) { 
                    //   this.setState({statusLabel: 'IP'});
                    //   this.setState({statusBadge: 'info'});						
                    // } else if( data.caseStatus === 'ASSIGNED' ) { 
                    //   this.setState({statusLabel: 'A'});
                    //   this.setState({statusBadge: 'info'});												
                    // } else if( data.caseStatus === 'CLOSED' ) { 
                    //   this.setState({statusLabel: 'C'});
                    //   this.setState({statusBadge: 'success'});												
                    // } else if( data.caseStatus === 'CANCELLED' ) { 
                    //   this.setState({statusLabel: 'D'});
                    //   this.setState({statusBadge: 'pink'});												
                    // } else {
                    //   this.setState({statusLabel: 'N/A'});
                    //   this.setState({statusBadge: 'pink'});												
                    // }
                    return <tr>
                    <td>
                      <a href="<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $caseLs[$i]['cToken']; ?>">
                        {data.caseNum}
                      </a>
                    </td>
                    <td>
                      <div align="center"><span className="badge badge">{data.caseStatus}</span></div>
                      </td>
                    <td>
                      <div align="center">
                        {/* ?php echo ( $caseLs[$i][$agingKey] < 16 ) ? $caseLs[$i][$agingKey] : '<span class="badge badge-sm badge-'.$badgeColor.'"'.$caseLs[$i][$agingKey].''; ?&gt; */}
                        {data.caseStatus === 'CLOSED' ? 'closedAging' : <span class={`badge badge-sm badge-${this.state.statusBadge}`}> 'aging' </span>}
                      </div>
                    </td>
                    <td>{data.caseType}</td>
                    <td>
                      <div align="center">
                        {/* ?php echo ( !empty($caseLs[$i]['vip']) ) ? '<i class="menu-icon glyphicon glyphicon-ok"' : '-'; ?&gt; */}
                        {data.vip ? data.vip : '-'}
                      </div>
                    </td>
                    <td>{data.productName}</td>
                    <td>{data.customerName}</td>
                    <td>
                      {/* ?php echo ( !empty($caseLs[$i]['vip']) ) ? '<span class="label label-success arrowed-right"' . ucwords($caseLs[$i]['fullname']) . '' : ucwords($caseLs[$i]['fullname']); ?&gt; */}
                      {data.vip ? <span class="label label-success arrowed-right"> {data.fullname} </span> : data.fullname}
                    </td>
                    <td>{data.ownerName}</td>
                    <td>
                      <div align="center" style={{ fontSize: 10 }}>
                       {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning"> {data.totalNewAlert} </span> : 0}
                      </div>
                    </td>
                    <td>
                      <div align="center">
                        <button className="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $caseLs[$i]['cToken']; ?>/ga/')">
                          Open
                          <i className="ace-icon fa fa-arrow-right icon-on-right" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  })
                  }
                </tbody>
              </table>
            </div> {/* <!-- /.span --> */}
          </div> {/* <!-- /.row --> */}
        <Footer />
      </div>
    );
  }
}

export default MA_Inprogress;