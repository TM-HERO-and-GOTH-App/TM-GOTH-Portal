import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import AssignmentDashboard from '../components/dashboard/Assignment_Dashboard';
import DashboardService from '../web_service/dashboard/DashboardService';
import DashboardSlider from '../components/slider/Slider';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard() {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
  const [fetchingData, setFetchingData] = useState(true);
  const [showAgentCaseDashboard, setShowAgentCaseDashboard] = useState(true);
  const [showGroupCaseDashboard, setShowGroupCaseDashboard] = useState(true);
  const [showStateCaseDashboard, setShowStateCaseDashboard] = useState(true);
  const [totalCaseResolveAgent, setTotalCaseResolveAgent] = useState([0]);
  const [totalCaseResolveGroup, setTotalCaseResolveGroup] = useState([0]);
  const [totalCaseResolveNation, setTotalCaseResolveNation] = useState([0]);
  const [agentCase, setAgentCase] = useState([0]);
  const [groupCase, setGroupCase] = useState([0]);
  const [nationCase, setNationCase] = useState([0]);
  const [stateCase, setStateCase] = useState([0]);
  const [registerUser, setRegisterUser] = useState([0]);
  const [stakeholderOption, setStakeholderOption] = useState('initialValue');

  //Below is all the function correspond to it's purpose:
  const getNationWideGroupData = async () => {
    await DashboardService.getTotalCaseByGroup(token, stakeholderOption).then((res, err) => {
      if (res === undefined) return;
      if (stakeholderOption === 0) return;
      if (err) return;
      // console.log(res);
      setNationCase(res);
      setFetchingData(false);
    })

    await DashboardService.getTotalResolvedByGroup(token, stakeholderOption).then((res, err) => {
      if (res === undefined) return
      if (err) return
      // console.log(res);
      setTotalCaseResolveNation(parseFloat(res[0].total));
      setFetchingData(false);

    })
  }

  useEffect(() => {
    const getAgentCase = () => {
      DashboardService.getTotalResolvedByAgent(token).then((res) => {
        if (res === undefined) return
        // console.log(res)
        setTotalCaseResolveAgent(parseFloat(res[0].total));
        setFetchingData(false);
      })

      DashboardService.getTotalCaseByAgent(token).then(res => {
        // console.log(res)
        setAgentCase(res);
        setFetchingData(false);
      })
    }

    const getGroupCase = () => {
      DashboardService.getTotalCaseByGroup(token, userData.shID).then(res => {
        if (res === undefined) return
        // console.log(res)
        setGroupCase(res);
        setFetchingData(false);
      })

      DashboardService.getTotalResolvedByGroup(token, userData.shID).then(res => {
        if (res === undefined) return
        // console.log(res)
        setTotalCaseResolveGroup(res[0].total);
        setFetchingData(false);
      })
    }

    const getRegisterUserData = () => {
      DashboardService.getTotalRegisteredUserByState(token).then(res => {
        if (res === undefined) return
        // console.log(res);
        setRegisterUser(res);
        setFetchingData(false);
      })
    }

    const getTotalCaseByStateData = () => {
      DashboardService.getTotalCaseByState(token).then(res => {
        // console.log(res)
        setStateCase(res);
        setFetchingData(false);
      });
    }

    getAgentCase();
    getGroupCase();
    getRegisterUserData();
    getTotalCaseByStateData();
    getNationWideGroupData();

    // During unmount, the DOM wil be empty without any data
    return () => { };
  }, [nationCase, stakeholderOption])

  return (
    <Layout
      pageTitle='Dashboard'
      pageContent={
        <>
          <div className="row">
            <DashboardSlider />
            <form>
              <div className="pull-right col-sm-4">
                <select className="chosen-select form-control" name="shID" value={stakeholderOption} onChange={(e) => setStakeholderOption(e.currentTarget.value)}>
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
            <AssignmentDashboard
              typesOfAssignment='My Assignment'
              assignmentData={agentCase}
              resolvedInFiveDays={totalCaseResolveAgent}
              widgetOnClick={() => setShowAgentCaseDashboard(!showAgentCaseDashboard)}
              chevronClassName={showAgentCaseDashboard === true ? "ace-icon fa fa-chevron-up" : "ace-icon fa fa-chevron-down"}
              display={showAgentCaseDashboard}
            />
            {/*  */}

            {/* Group assignment Table */}
            <AssignmentDashboard
              typesOfAssignment='My Group Assignment'
              assignmentData={groupCase}
              resolvedInFiveDays={totalCaseResolveGroup}
              widgetOnClick={() => setShowGroupCaseDashboard(!showGroupCaseDashboard)}
              chevronClassName={showGroupCaseDashboard === true ? "ace-icon fa fa-chevron-up" : "ace-icon fa fa-chevron-down"}
              display={showGroupCaseDashboard}
            />
            {/*  */}

            {/* Other group assignment table */}
            {/* Average API Call time is 2.6 minutes. Fastest API call time is 1.3 minutes */}
            <AssignmentDashboard
              typesOfAssignment='Others Group Assignment'
              assignmentData={nationCase}
              resolvedInFiveDays={totalCaseResolveNation}
              widgetOnClick={() => setShowStateCaseDashboard(!showStateCaseDashboard)}
              chevronClassName={showStateCaseDashboard === true ? "ace-icon fa fa-chevron-up" : "ace-icon fa fa-chevron-down"}
              display={showStateCaseDashboard}
            />
            {/*  */}

            <br />
            <br />

            <div className="row">
              <div className="col-sm-3 total-box">
                <h4 className="blue smaller">
                  <i className="ace-icon fa fa-user orange" />
                  Total Registered User
                </h4>
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                  {registerUser != null &&
                    registerUser.map((data, index) => {
                      return <div className="profile-info-row">
                        <div className="profile-info-name" style={{ width: '70%' }}>
                          <b>{data?.state ?? 'No data'}</b>
                        </div>
                        <div className="profile-info-value">
                          <span className="editable" id="username">
                            {data == undefined || data == null ? 0 : data?.total}
                          </span>
                        </div>
                      </div>
                    }
                    )}
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: "70%" }}>
                      <b>Total User</b>
                    </div>

                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <b>{registerUser != null && registerUser.reduce((total, currentValue) => total = total + currentValue.total, 0).toLocaleString()}</b>
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
                  {stateCase != null &&
                    stateCase.map((data, index) => {
                      return fetchingData ? <CircularProgress /> :
                        <div className="profile-info-row" key={index}>
                          <div className="profile-info-name" style={{ width: '70%' }}>
                            <b>{fetchingData ? "Fetching data" : data.state }</b>
                          </div>
                          <div className="profile-info-value">
                            <span className="editable" id="username">
                              {fetchingData ? "Fetching data" : data == null ? 0 : data.total}
                            </span>
                          </div>
                        </div>
                    }
                    )}
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: "70%" }}>
                      <b>Total Case</b>
                    </div>

                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <b>{fetchingData ? "Calling data" : (stateCase == null || stateCase === undefined) ? '0' : stateCase?.reduce((total, currentValue) => total = total + currentValue.total, 0).toLocaleString()}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export default Dashboard;
