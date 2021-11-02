import React from 'react';
import {Redirect} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DashboardService from '../web_service/dashboard/DashboardService';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shID: JSON.parse(sessionStorage.getItem('UserData')),
      token: JSON.parse(sessionStorage.getItem('userToken')),
      lovData: JSON.parse(sessionStorage.getItem('LovData')),
      closeDashboard: false,
      totalCaseResolveAgent: 0,
      totalCancelAgent: 0,
      totalNewCaseAgent: 0,
      totalClosedAgent: 0,
      totalInProgressAgent: 0,
      totalAssignedAgent: 0,
      totalCaseAgent: 0,
      totalGroupCase: 0,
      totalGroupCancelCase: 0,
      totalGroupNewCase: 0,
      totalGroupAssignCase: 0,
      totalGroupInprogressCase: 0,
      totalGroupCloseCase: 0,
      nationWideTotalAssign: 0,
      nationWideTotalCancel: 0,
      nationWideTotalCase: 0,
      nationWideTotalClose: 0,
      nationWideTotalInProgress: 0,
      nationWideTotalResolvedCase: 0,
      totalRegisterUser: [],
      totalOverallCaseByState: [],
      nationValue: 'initialValue',
    }
    this.getTotalResolvedByAgentData = this.getTotalResolvedByAgentData.bind(this);
    this.getTotalCaseByAgentData = this.getTotalCaseByAgentData.bind(this);
    this.getTotalCaseByGroupData = this.getTotalCaseByGroupData.bind(this);
    this.getRegisterUserData = this.getRegisterUserData.bind(this);
    this.getTotalCaseByStateData = this.getTotalCaseByStateData.bind(this);
    this.getNationWideGroupData = this.getNationWideGroupData.bind(this);
  }

  //Below is all the function correspond to it's purpose:
  getTotalResolvedByAgentData() {
    DashboardService.getTotalResolvedByAgent(this.state.token).then((res) => {
      // console.log(res)
      this.setState({ totalCaseResolveAgent: res.map(data => data.total) ?? 0 })
    });
  }

  getTotalCaseByAgentData() {
    DashboardService.getTotalCaseByAgent(this.state.token).then(res => {
      // console.log(res)
      this.setState({ 
        totalAssignedAgent: res.map(data => data.totalAssigned) ?? 0,
        totalCancelAgent: res.map(data => data.totalCancelled) ?? 0,
        totalCaseAgent: res.map(data => data.totalCase) ?? 0,
        totalClosedAgent: res.map(data => data.totalClosed) ?? 0,
        totalInProgressAgent: res.map(data => data.totalInProgress) ?? 0,
        totalNewCaseAgent: res.map(data => data.totalNew) ?? 0
      })
    })
  }

  getTotalCaseByGroupData() {
    const userSHID = this.state.shID.shID
    DashboardService.getTotalCaseByGroup(this.state.token, userSHID).then(res => {
      // console.log(res)
      this.setState({ 
        totalGroupCase: res.map(data => data.totalCase) ?? 0,
        totalGroupCancelCase: res.map(data => data.totalCancelled) ?? 0,
        totalGroupNewCase: res.map(data => data.totalNew) ?? 0,
        totalGroupAssignCase: res.map(data => data.totalAssigned) ?? 0,
        totalGroupInprogressCase: res.map(data => data.totalInProgress) ?? 0,
        totalGroupCloseCase: res.map(data => data.totalClosed) ?? 0
      })
    })
  }

  getNationWideGroupData() {
    DashboardService.getTotalCaseByGroup(this.state.token, this.state.nationValue).then(res => {
      console.log(res);
      this.setState({ 
        nationWideTotalAssign: res[0].totalAssigned ?? 0,
        nationWideTotalCancel: res[0].totalCancelled ?? 0,
        nationWideTotalCase: res[0].totalCase ?? 0,
        nationWideTotalClose: res[0].totalClosed ?? 0,
        nationWideTotalInProgress: res[0].totalInProgress ?? 0
      })
    })

    DashboardService.getTotalResolvedByGroup(this.state.token, this.state.nationValue).then(res => {
      console.log(res);
      this.setState({ nationWideTotalResolvedCase: res[0].total ?? 0})
    })
  }

  getRegisterUserData() {
    DashboardService.getTotalRegisteredUserByState(this.state.token).then(res => {
      // console.log(res);
      this.setState({ totalRegisterUser: res.reduce((prevData, currentData) => prevData + currentData.total, 0) ?? 0});
      // this.setState({ totalRegisterUserInAllStatesData: res })
    })
  }

  getTotalCaseByStateData() {
    DashboardService.getTotalCaseByState(this.state.token).then(res => {
      // console.log(res)
      // this.setState({ totalOverallCaseByState: res })
      this.setState({ totalOverallCaseByState: res.reduce((prevData, currentData) => prevData + currentData.total, 0) ?? 0})
    });
  }

  componentDidMount() {
    this.getTotalResolvedByAgentData();
    this.getTotalCaseByAgentData();
    this.getTotalCaseByGroupData();
    this.getRegisterUserData();
    this.getTotalCaseByStateData();
  }


  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="page-header">
            <h1>Dashboard</h1>
          </div>
          <form>
            <div className="pull-right col-sm-4">
              {/* TODO: display the API data based on Option tag. Currently have side effects */}
              <select className="chosen-select form-control" onClick={this.getNationWideGroupData} name="shID" value={this.state.nationValue} onChange={(e) => { this.setState({ nationValue: e.target.value }); console.log(this.state.nationValue);}}>
                <option value='initialValue'>Choose a group...</option>
                {
                  this.state.lovData.filter(lov => lov.lovGroup === 'STAKEHOLDER' && lov.lovName !== 'ADMIN').map((data) =>
                    <option value={data.lovID} key={data.lovID}>{data.lovName}</option>
                  )
                }
              </select>
            </div>
          </form>
          <br /><br /><br />
          <div className="col-sm-4">
            <div className="widget-box transparent">
              <div className="widget-header widget-header-flat">
                <h4 className="widget-title lighter">
                  <i className="ace-icon fa fa-star orange" />
                  My Assignments
                </h4>
                <div className="widget-toolbar">
                  <a href="#" data-action="collapse">
                    <i className="ace-icon fa fa-chevron-up" />
                  </a>
                </div>
              </div>
              <div className="widget-body">
                <div className="widget-main no-padding">
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Resolved In 5 Days</td>
                        <td align="right">
                          <b className="green">{this.state.totalCaseResolveAgent}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Closed</td>
                        <td align="right">
                          <b className="blue">{this.state.totalClosedAgent}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>In-Progress</td>
                        <td align="right">
                          <b className="blue">{this.state.totalInProgressAgent}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Assigned</td>
                        <td align="right">
                          <b className="blue">{this.state.totalAssignedAgent}</b>
                        </td>
                      </tr>
                      <tr>
                        <td><b>Total Case</b></td>
                        <td align="right">
                          <b className="green">{this.state.totalCaseAgent}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
          </div>{/* /.col */}
          <div className="col-sm-4">
            <div className="widget-box transparent">
              <div className="widget-header widget-header-flat">
                <h4 className="widget-title lighter" style={{ color: 'blue' }}>
                  <i className="ace-icon fa fa-group orange" />
                  My Group Assignments
                </h4>

                <div className="widget-toolbar">
                  <a href="#" data-action="collapse">
                    <i className="ace-icon fa fa-chevron-up" />
                  </a>
                </div>
              </div>
              <div className="widget-body">
                <div className="widget-main no-padding">
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Resolved In 5 Days</td>
                        <td align="right">
                          <b className="green">{this.state.totalGroupCase}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Closed</td>
                        <td align="right">
                          <b className="blue">{this.state.totalGroupCloseCase}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>In-Progress</td>
                        <td align="right">
                          <b className="blue">{this.state.totalGroupInprogressCase}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Assigned</td>
                        <td align="right">
                          <b className="blue">{this.state.totalGroupAssignCase}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>Un-Assigned</td>
                        <td align="right">
                          <b className="blue">{this.state.totalGroupCancelCase}</b>
                        </td>
                      </tr>
                      <tr>
                        <td><b>Total Case</b></td>
                        <td align="right">
                          <b className="green">{this.state.totalGroupCase}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
          </div>{/* /.col */}
          <div className="col-sm-4">
            <div className="widget-box transparent">
              <div className="widget-header widget-header-flat">
                <h4 className="widget-title lighter" style={{ color: 'purple' }}>
                  <i className="ace-icon fa fa-globe orange" />
                  Others Group Assignments
                </h4>
                <div className="widget-toolbar">
                  <a href="#" data-action="collapse">
                    <i className="ace-icon fa fa-chevron-up" />
                  </a>
                </div>
              </div>
              <div className="widget-body">
                <div className="widget-main no-padding">
                  <table className="table table-bordered table-striped">
                    {this.state.nationValue &&
                      <tbody>
                        <tr>
                          <td>Resolved In 5 Days</td>
                          <td align="right">
                            <b className="green">{this.state.nationWideTotalResolvedCase}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Closed</td>
                          <td align="right">
                            <b className="blue">{this.state.nationWideTotalClose}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>In-Progress</td>
                          <td align="right">
                            <b className="blue">{this.state.nationWideTotalInProgress}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Assigned</td>
                          <td align="right">
                            <b className="blue">{this.state.nationWideTotalAssign}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Un-Assigned</td>
                          <td align="right">
                            <b className="blue">{this.state.nationWideTotalCancel}</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total Case</b></td>
                          <td align="right">
                            <b className="green">{this.state.nationWideTotalCase}</b>
                          </td>
                        </tr>
                      </tbody>
                    }
                  </table>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
          </div>{/* /.col */}{/* /.row */}
          <br /><br />
          <div className="row">
            <div className="col-sm-3">
              <h4 className="blue smaller">
                <i className="ace-icon fa fa-user orange" />
                Total Registered User
              </h4>
              <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                <div className="profile-info-row">
                  <div className="profile-info-name" style={{ width: '70%' }}>
                    <b>Total User</b>
                  </div>
                  <div className="profile-info-value">
                    <span className="editable" id="username">
                      {this.state.totalRegisterUser}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <h4 className="blue smaller">
                <i className="ace-icon fa fa-folder orange" />
                Total Created Case (COMPLAINT)
              </h4>
              <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                <div className="profile-info-row">
                  <div className="profile-info-name" style={{ width: '70%' }}>
                    <b>Total Case</b>
                  </div>
                  <div className="profile-info-value">
                    <span className="editable" id="username">
                      {this.state.totalOverallCaseByState}
                    </span>
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

export default Dashboard;