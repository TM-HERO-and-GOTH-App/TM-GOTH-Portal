import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from './Layout';
import Footer from './Footer';
import DashboardService from '../web_service/dashboard/DashboardService';

function Dashboard() {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
  const [closeNavBar, setCloseNavBar] = useState(false);
  const [totalCaseResolveAgent, setTotalCaseResolveAgent] = useState(0);
  const [totalCaseResolveGroup, setTotalCaseResolveGroup] = useState('0');
  const [totalCaseResolveNation, setTotalCaseResolveNation] = useState(0);
  const [agentCase, setAgentCase] = useState([0]);
  const [groupCase, setGroupCase] = useState([0]);
  const [nationCase, setNationCase] = useState([0]);
  const [stateCase, setStateCase] = useState([0]);
  const [registerUser, setRegisterUser] = useState([]);
  const [stakeholderOption, setStakeholderOption] = useState('initialValue');

  //Below is all the function correspond to it's purpose:
  const getNationWideGroupData = async () => {
    await DashboardService.getTotalCaseByGroup(token, stakeholderOption).then(res => {
      if (res === undefined) return;
      if (stakeholderOption === 0) return;
      // console.log(res);
      setNationCase(res)
    })

    await DashboardService.getTotalResolvedByGroup(token, stakeholderOption).then(res => {
      if (res === undefined) return
      // console.log(res);
      setTotalCaseResolveNation(res[0].total)
    })
  }


  useEffect(() => {
    const getAgentCase = () => {
      DashboardService.getTotalResolvedByAgent(token).then((res) => {
        if (res === undefined) return
        // console.log(res)
        setTotalCaseResolveAgent(parseFloat(res[0].total))
      })

      DashboardService.getTotalCaseByAgent(token).then(res => {
        // console.log(res)
        setAgentCase(res)
      })
    }

    const getGroupCase = () => {
      DashboardService.getTotalCaseByGroup(token, userData.shID).then(res => {
        if (res === undefined) return
        // console.log(res)
        setGroupCase(res)
      })

      DashboardService.getTotalResolvedByGroup(token, userData.shID).then(res => {
        if (res === undefined) return
        console.log(res)
        setTotalCaseResolveGroup(res[0].total)
      })
    }

    const getRegisterUserData = () => {
      DashboardService.getTotalRegisteredUserByState(token).then(res => {
        if (res === undefined) return
        // console.log(res);
        setRegisterUser(res);
      })
    }

    const getTotalCaseByStateData = () => {
      DashboardService.getTotalCaseByState(token).then(res => {
        // console.log(res)
        // this.setState({ totalOverallCaseByState: res })
        setStateCase(res)
      });
    }
    getAgentCase();
    getGroupCase();
    getRegisterUserData();
    getTotalCaseByStateData();
    getNationWideGroupData();
  }, [nationCase, stakeholderOption])

  return (
    <Layout
      pageTitle='Dashboard'
      pageContent={
        <div className="row">
          <form>
            <div className="pull-right col-sm-4">
              {/* TODO: display the API data based on Option tag. Currently have side effects */}
              <select className="chosen-select form-control" name="shID" value={stakeholderOption} onChange={(e) => { setStakeholderOption(e.currentTarget.value); console.log(stakeholderOption); }}>
                <option value='initialValue'>Choose a group...</option>
                {
                  lovData.filter(lov => lov.lovGroup === 'STAKEHOLDER' && lov.lovName !== 'ADMIN').map((data) =>
                    <option value={data.lovID} key={data.lovID}>{data.lovName}</option>
                  )
                }
              </select>
            </div>
          </form>
          <br /><br /><br />

          {/* My assignment Table */}
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
                    {agentCase?.map((data, index) => {
                      return <tbody key={index}>
                          <tr>
                            <td>Resolved In 5 Days</td>
                            <td align="right">
                              <b className="green">{totalCaseResolveAgent === 0 ? 0 : (totalCaseResolveAgent / data.totalCase * 100).toFixed(2)}%</b>
                            </td>
                          </tr>
                          <tr>
                            <td>Closed</td>
                            <td align="right">
                              <b className="blue">{data?.totalClosed}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>In-Progress</td>
                            <td align="right">
                              <b className="blue">{data?.totalInProgress}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>Assigned</td>
                            <td align="right">
                              <b className="blue">{data?.totalAssigned}</b>
                            </td>
                          </tr>
                          <tr>
                            <td><b>Total Case</b></td>
                            <td align="right">
                              <b className="green">{data?.totalCase}</b>
                            </td>
                          </tr>
                        </tbody>
                    }) ?? <tbody>
                    <tr>
                      <td>Resolved In 5 Days</td>
                      <td align="right">
                        <b className="green">0%</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Closed</td>
                      <td align="right">
                        <b className="blue">0</b>
                      </td>
                    </tr>
                    <tr>
                      <td>In-Progress</td>
                      <td align="right">
                        <b className="blue">0</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Assigned</td>
                      <td align="right">
                        <b className="blue">0</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Un-Assigned</td>
                      <td align="right">
                        <b className="blue">0</b>
                      </td>
                    </tr>
                    <tr>
                      <td><b>Total Case</b></td>
                      <td align="right">
                        <b className="green">0</b>
                      </td>
                    </tr>
                  </tbody> 
                    }
                  </table>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
          </div>{/* /.col */}

          {/* Group assignment Table */}
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
                    {groupCase?.map((data, index) => {
                      return <tbody key={index}>
                        <tr>
                          <td>Resolved In 5 Days</td>
                          <td align="right">
                            <b className="green">{totalCaseResolveGroup !== 0 ? ((totalCaseResolveGroup / data.totalCase) * 100).toFixed(2) : 0}%</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Closed</td>
                          <td align="right">
                            <b className="blue">{data?.totalClosed}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>In-Progress</td>
                          <td align="right">
                            <b className="blue">{data?.totalInProgress}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Assigned</td>
                          <td align="right">
                            <b className="blue">{data?.totalAssigned}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Un-Assigned</td>
                          <td align="right">
                            <b className="blue">{data?.totalNew}</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total Case</b></td>
                          <td align="right">
                            <b className="green">{data?.totalCase}</b>
                          </td>
                        </tr>
                      </tbody>
                    }) ?? <tbody>
                        <tr>
                          <td>Resolved In 5 Days</td>
                          <td align="right">
                            <b className="green">0%</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Closed</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>In-Progress</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Assigned</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Un-Assigned</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total Case</b></td>
                          <td align="right">
                            <b className="green">0</b>
                          </td>
                        </tr>
                      </tbody>
                    }
                  </table>
                </div>{/* /.widget-main */}
              </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
          </div>{/* /.col */}

          {/* Other group assignment table */}
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
                    {nationCase?.map((data, index) => {
                      return <tbody key={index}>
                        <tr>
                          <td>Resolved In 5 Days</td>
                          <td align="right">
                            <b className="green">{totalCaseResolveNation !== 0 ? ((totalCaseResolveNation / data.totalCase) * '100').toFixed(2) : 0}%</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Closed</td>
                          <td align="right">
                            <b className="blue">{data !== 0 ? data.totalClosed : 0}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>In-Progress</td>
                          <td align="right">
                            <b className="blue">{data?.totalInProgress ?? 0}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Assigned</td>
                          <td align="right">
                            <b className="blue">{data?.totalAssigned ?? 0}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Un-Assigned</td>
                          <td align="right">
                            <b className="blue">{data?.totalNew ?? 0}</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total Case</b></td>
                          <td align="right">
                            <b className="green">{data?.totalCase ?? 0}</b>
                          </td>
                        </tr>
                      </tbody>
                    }) ?? <tbody>
                        <tr>
                          <td>Resolved In 5 Days</td>
                          <td align="right">
                            <b className="green">0%</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Closed</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>In-Progress</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Assigned</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Un-Assigned</td>
                          <td align="right">
                            <b className="blue">0</b>
                          </td>
                        </tr>
                        <tr>
                          <td><b>Total Case</b></td>
                          <td align="right">
                            <b className="green">0</b>
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
                {registerUser.map((data, index) => {
                  return <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '70%' }}>
                      <b>{data?.state ?? 'No data'}</b>
                    </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        {data?.total ?? 'No data'}
                      </span>
                    </div>
                  </div>
                }
                )}
              </div>
            </div>

            <div className="col-sm-3">
              <h4 className="blue smaller">
                <i className="ace-icon fa fa-folder orange" />
                Total Created Case (COMPLAINT)
              </h4>
              {stateCase.map((data, index) => {
                return <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }} key={index}>
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '70%' }}>
                      <b>{data.state}</b>
                    </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        {data.total}
                      </span>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      }
    />
  );
}

export default Dashboard;