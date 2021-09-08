import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DashboardService from '../web_service/dashboard/DashboardService';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shID: JSON.parse(localStorage.getItem('UserData')),
      token: JSON.parse(localStorage.getItem('userToken')),
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
      totalGroupCloseCase: 0
    }
    this.getTotalResolvedByAgentData = this.getTotalResolvedByAgentData.bind(this);
    this.getTotalCaseByAgentData = this.getTotalCaseByAgentData.bind(this);
    this.getTotalCaseByGroupData = this.getTotalCaseByGroupData.bind(this);
  }

  componentDidMount(){
    this.getTotalCaseByAgentData();
    this.getTotalCaseByGroupData();
  }

  getTotalResolvedByAgentData(e) {
    e.preventDefault();
    DashboardService.getTotalResolvedByAgent(this.state.token).then((res) => {
      console.log(res)
      if(res !== null){
        this.setState({totalAgentCase: res[0].total});
      } else{
        return this.setState({ totalAgentCase: 0 })
      }
    });
  }

  getTotalCaseByAgentData(e){
    // e.preventDefault();
    DashboardService.getTotalCaseByAgent(this.state.token).then(res => {
      // const data = res[0]
      console.log(res)
      // console.log(data)
      if(res !== null){
        this.setState({ totalAssignedAgent: res[0].totalAssigned })
        this.setState({ totalCancelAgent: res[0].totalCancelled })
        this.setState({ totalCaseAgent: res[0].totalCase })
        this.setState({ totalClosedAgent: res[0].totalClosed })
        this.setState({ totalInProgressAgent: res[0].totalInProgress })
        this.setState({ totalNewCaseAgent: res[0].totalNew })
      } else {
        return 0
      }
    })
  }

  getTotalCaseByGroupData(){
    // e.preventDefault();
    const userSHID = this.state.shID.shID
    DashboardService.getTotalCaseByGroup(this.state.token, userSHID).then(res => {
      console.log(res)
      // const data = res[0];
      if(res !== null){
        this.setState({ totalGroupCase: res[0].totalCase })
        this.setState({ totalGroupCancelCase: res[0].totalCancelled })
        this.setState({ totalGroupNewCase: res[0].totalNew })
        this.setState({ totalGroupAssignCase: res[0].totalAssigned })
        this.setState({ totalGroupInprogressCase: res[0].totalInProgress })
        this.setState({ totalGroupCloseCase: res[0].totalClosed })
      }
    })

  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="page-header">
            <h1> Dashboard</h1>
          </div>
          <form onSubmit={this.getTotalCaseByGroupData}>
            <div className="pull-right col-sm-4">
              <select className="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." onChange="submitForm('<?php echo APPNAME; ?>/dashboard/overall/')">
                <option value={0}> </option>
                {/* <option $shid_opt></option> */}
                <option></option>
              </select>
            </div>
            <button>Test</button>
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
                          <b className="green">{this.state.totalCaseAgen}</b>
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
                    <tbody>
                      <tr>
                        <td>Resolved In 5 Days</td>
                        <td align="right">
                          <b className="green"></b>
                        </td>
                      </tr>
                      <tr>
                        <td>Closed</td>
                        <td align="right">
                          <b className="blue"></b>
                        </td>
                      </tr>
                      <tr>
                        <td>In-Progress</td>
                        <td align="right">
                          <b className="blue"></b>
                        </td>
                      </tr>
                      <tr>
                        <td>Assigned</td>
                        <td align="right">
                          <b className="blue"></b>
                        </td>
                      </tr>
                      <tr>
                        <td>Un-Assigned</td>
                        <td align="right">
                          <b className="blue"></b>
                        </td>
                      </tr>
                      <tr>
                        <td><b>Total Case</b></td>
                        <td align="right">
                          <b className="green"></b>
                        </td>
                      </tr>
                    </tbody>
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
                  <div className="profile-info-name" style={{ width: '70%' }}></div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"></span>
                  </div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-name" style={{ width: '70%' }}> <b>Total User</b> </div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"><b></b></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <h4 className="blue smaller">
                <i className="ace-icon fa fa-folder orange" />
                Total Created Case
              </h4>
              <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                <div className="profile-info-row">
                  <div className="profile-info-name" style={{ width: '70%' }}></div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"></span>
                  </div>
                </div>

                <div className="profile-info-row">
                  <div className="profile-info-name" style={{ width: '70%' }}> <b>Total Case</b> </div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"><b></b></span>
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