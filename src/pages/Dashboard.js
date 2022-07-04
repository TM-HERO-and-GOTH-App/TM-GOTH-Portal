import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import AssignmentDashboard from '../components/dashboard/Assignment_Dashboard';
import DashboardService from '../web_service/dashboard/DashboardService';
import DashboardSlider from '../components/slider/Slider';
import CircularProgress from '@mui/material/CircularProgress';
import AnnouncementService from '../web_service/announcement_service/AnnouncementService';

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem('UserData'));
  const token = JSON.parse(sessionStorage.getItem('userToken'));
  const lovData = JSON.parse(sessionStorage.getItem('LovData'));
  let [fetchingData, setFetchingData] = useState(true);
  let [showAgentCaseDashboard, setShowAgentCaseDashboard] = useState(true);
  let [showGroupCaseDashboard, setShowGroupCaseDashboard] = useState(true);
  let [showStateCaseDashboard, setShowStateCaseDashboard] = useState(true);
  let [totalCaseResolveAgent, setTotalCaseResolveAgent] = useState([]);
  let [totalCaseResolveGroup, setTotalCaseResolveGroup] = useState([0]);
  let [totalCaseResolveNation, setTotalCaseResolveNation] = useState([0]);
  let [agentCase, setAgentCase] = useState([]);
  let [groupCase, setGroupCase] = useState([]);
  let [nationCase, setNationCase] = useState([0]);
  let [stateCase, setStateCase] = useState([]);
  let [registerUser, setRegisterUser] = useState([]);
  let [stakeholderOption, setStakeholderOption] = useState('0');
  let [announcementList, setAnnouncementList] = useState([])

  //Below is all the function correspond to it's purpose:
  //Other Group Assignment
  const getNationWideGroupData = async () => {
    const shID = '0' //All stakeholder
    await DashboardService.getTotalCaseByGroup(token, shID, userData.hID).then((res, err) => {
      if (res.data === undefined) return;
      if (stakeholderOption === 0) return;
      if (err) return;
      // console.log(res.data, 'getTotalCaseByOtherStakeholder');
      setNationCase(res?.data);
      setFetchingData(false);
    })

    await DashboardService.getTotalResolvedByGroup(token, stakeholderOption).then((res, err) => {
      if (res === undefined) return
      if (err) return
      // console.log(Object.keys(res.data)[0], 'getTotalResolvedByStakeholder');
      setTotalCaseResolveNation(Object.keys(res.data)[0][0]);
      setFetchingData(false);
    })
  }

  useEffect(() => {
    // My Assignment
    const getAgentCase = () => {
      DashboardService.getTotalResolvedByAgent(token, userData.hID).then((res) => {
        if (res === undefined) return
        // console.log(res, 'getTotalResolvedByAgent')
        setTotalCaseResolveAgent(Object.keys(res.data)[0]);
        setFetchingData(false);
      })

      DashboardService.getTotalCaseByAgent(token, userData.hID).then(res => {
        if (res === undefined) return
        // console.log(res, 'getTotalCaseByAgent')
        setAgentCase([res?.data[0]]);
        setFetchingData(false);
      })
    }

    // Group Assignment
    const getGroupCase = () => {
      let shID = '0' //change back to 'userData.shID'
      DashboardService.getTotalCaseByGroup(token, userData.shID, userData.hID).then(res => {
        if (res === undefined) return
        // console.log(res, 'getTotalCaseByGroup')
        setGroupCase([res?.data[0]]);
        setFetchingData(false);
      })

      DashboardService.getTotalResolvedByGroup(token, userData.shID).then(res => {
        if (res === undefined) return
        // console.log(Object.keys(res.data)[0], 'getTotalResolvedByGroup')
        setTotalCaseResolveGroup(Object.keys(res.data)[0]);
        setFetchingData(false);
      })
    }

    const getRegisterUserData = () => {
      DashboardService.getTotalRegisteredUserByState(token).then(res => {
        if (res === undefined) return
        // console.log(res, 'getTotalRegisteredUserByState');
        setRegisterUser(res.data[0]);
        setFetchingData(false);
      })
    }

    const getTotalCaseByStateData = () => {
      DashboardService.getTotalCaseByState(token).then(res => {
        if (res === undefined) return
        // console.log(res, 'getTotalCaseByState')
        setStateCase(res.data[0]);
        setFetchingData(false);
      });
    }

    const getAllAnnouncements = () => {
      AnnouncementService.getAllAnnouncement(token).then(res => {
        setAnnouncementList(res.data);
      })
  }

    getAllAnnouncements();
    getAgentCase();
    getGroupCase();
    getRegisterUserData();
    getTotalCaseByStateData();
    getNationWideGroupData();
    return () => { /* During unmount, the DOM wil be empty without any data */
    };
  }, [stakeholderOption])

  return (
    <Layout
      pageTitle='Dashboard'
      pageContent={
        <>
          <div className="row">
            {announcementList === [] ? null :
              <DashboardSlider slides={announcementList}/>
            }
            <form>
              <div className="pull-right col-sm-4">
                <select className="chosen-select form-control" name="shID" value={stakeholderOption}
                  onChange={(e) => setStakeholderOption(e.currentTarget.value)}>
                  <option value='0'>Choose a group...</option>
                  {
                    lovData.filter(lov => lov.L_GROUP === 'STAKEHOLDER' && lov.L_NAME !== 'ADMIN').map((data) =>
                      <option value={data.L_ID} key={data.L_ID}>{data.L_NAME}</option>
                    )
                  }
                </select>
              </div>
            </form>
            <br /><br /><br />

            {/* My assignment Table */}
            <AssignmentDashboard
              typesOfAssignment='My Assignment'
              isFetching={fetchingData}
              assignmentData={agentCase}
              resolvedInFiveDays={totalCaseResolveAgent}
              widgetOnClick={() => setShowAgentCaseDashboard(!showAgentCaseDashboard)}
              chevronClassName={showAgentCaseDashboard === true ? "ace-icon fa fa-chevron-up" : "ace-icon fa fa-chevron-down"}
              display={showAgentCaseDashboard}
            />
            {/*  */}

            {/*/!* Group assignment Table *!/*/}
            <AssignmentDashboard
              typesOfAssignment='My Group Assignment'
              isFetching={fetchingData}
              assignmentData={groupCase}
              resolvedInFiveDays={totalCaseResolveGroup}
              widgetOnClick={() => setShowGroupCaseDashboard(!showGroupCaseDashboard)}
              chevronClassName={showGroupCaseDashboard === true ? "ace-icon fa fa-chevron-up" : "ace-icon fa fa-chevron-down"}
              display={showGroupCaseDashboard}
            />
            {/*  */}

            {/*/!* Other group assignment table *!/*/}
            {/*/!* Average API Call time is 2.6 minutes. Fastest API call time is 1.3 minutes *!/*/}
            <AssignmentDashboard
              typesOfAssignment='Others Group Assignment'
              isFetching={fetchingData}
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
                  {
                    registerUser?.map((data, index) => {
                      return <div className="profile-info-row">
                        <div className="profile-info-name" style={{ width: '70%' }}>
                          <b>{fetchingData === true ? 'Getting data....' : data?.STATE}</b>
                        </div>
                        <div className="profile-info-value">
                          <span className="editable" id="username">
                            {fetchingData === true ? 'Getting data...' : data?.TOTAL}
                          </span>
                        </div>
                      </div>
                    }
                    )
                  }
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: "70%" }}>
                      <b>Total User</b>
                    </div>

                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <b>{registerUser?.reduce((total, currentValue) => total = total + currentValue.TOTAL, 0)?.toLocaleString()}</b>
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
                  {
                    stateCase?.map((data, index) => {
                      return fetchingData ? <CircularProgress /> :
                        <div className="profile-info-row" key={index}>
                          <div className="profile-info-name" style={{ width: '70%' }}>
                            <b>{fetchingData ? "Fetching data" : data?.STATE}</b>
                          </div>
                          <div className="profile-info-value">
                            <span className="editable" id="username">
                              {fetchingData ? "Fetching data" : data?.TOTAL}
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
                        <b>{fetchingData ? "Calling data" : stateCase?.reduce((total, currentValue) => total = total + currentValue.TOTAL, 0)?.toLocaleString()}</b>
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
