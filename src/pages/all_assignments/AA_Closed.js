import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'
import { Link } from 'react-router-dom';

class AA_Closed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lovData: JSON.parse(sessionStorage.getItem('LovData')),
      token: JSON.parse(sessionStorage.getItem('userToken')),
      shID: JSON.parse(sessionStorage.getItem('UserData')),
      case: [],
      caseType: '0',
      groupType: '0',
    }
    this.allAssignmentData = this.allAssignmentData.bind(this);
  }

  componentDidMount() {
    this.allAssignmentData();
  }

  allAssignmentData() {
    const shID = this.state.shID.shID;
    AssignmentService.viewCaseByGroup(this.state.token, shID, 70).then(res => {
      console.log(res);
      this.setState({ case: res })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page-header">
          <h1>Nationwide Assignments : CLOSED</h1>
        </div> {/* <!-- /.page-header --> */}


        <div className="row">
          <form name="form" method="POST">

            <div className="col-sm-3">
              <select className="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." value={this.state.groupType} onChange={(e) => this.setState({ groupType: e.target.value })}>
                <option value="0"> All Group/Stakeholder ...</option>
                {this.state.lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                  return <option key={key} value={data.lovID}> {data.lovName} </option>
                })
                }
              </select>
            </div>
            <div className="col-sm-3">
              <select className="chosen-select form-control" name="caseTypeID" data-placeholder="Choose a Case Type..." value={this.state.caseType} onChange={(e) => this.setState({ caseType: e.target.value })}>
                <option value="0" >All Case Type ...</option>
                {
                  this.state.lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map((data, key) => {
                    return <option key={key} value={data.lovID}>{data.lovName}</option>
                  })
                }
              </select>
            </div>

          </form>

          <div className="col-xs-12">
            <div className="clearfix">
              <div className="pull-right tableTools-container"></div>
            </div>
            <div>
              <table id="dynamic-table" className="table table-striped table-bordered table-hover"> {/* <!-- id="simple-table" className="table table-bordered table-hover" --> */}
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
                    <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell"></i></div></th>
                    <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o"></i></div></th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.case === null ? 
                  <tr>
                    <td colSpan="11">
                      <span style={{ color: 'red' }}>List is empty</span>
                    </td>
                  </tr>
                    :
                    this.state.case.map((data) => {
                      return <tr>
                        <td>
                          <Link to={`/case-detail/${data.cToken}`}>
                            {data.caseNum}
                          </Link>
                        </td>
                        <td><div align="center">
                          <span className={`badge badge-${data.caseStatus ? 'info' : 'pink'}`}>{data.caseStatus ? 'C' : '-'}</span>
                        </div></td>
                        <td>
                          <div align="center">
                            {data.caseStatus === 'CLOSED' ? 'closedAging' : <span class={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>unclosedAging</span>}
                          </div>
                        </td>
                        <td>{data.caseType}</td>
                        <td>
                          <div align="center">
                            {data.vip ? <i className="menu-icon glyphicon glyphicon-ok"></i> : '-'}
                          </div>
                        </td>
                        <td>{data.productName}</td>
                        <td>{data.customerName}</td>
                        <td>{data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : data.fullname}</td>
                        <td>{data.ownerName + '-' + data.stakeholderName}</td>
                        <td>
                          <div align="center" style={{ fontSize: 10 }}>
                            {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning">{data.totalNewAlert}</span> : '0'}
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${data.cToken}`}>
                              Open
                              <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    })
                  }
                </tbody>

              </table>
            </div>
          </div>  {/* //<!-- /.span --> */}
        </div> {/* // <!-- /.row --> */}

        <Footer />
      </div>
    );
  }
}

export default AA_Closed;