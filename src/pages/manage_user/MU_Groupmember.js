import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function MU_Groupmember() {
  const userData = JSON.parse(sessionStorage.getItem('UserData'));
  const token = JSON.parse(sessionStorage.getItem('userToken'));
  const [userResult, setUserResult] = useState([]);
  const [groupResult, setGroupResult] = useState([]);
  const [alertStatus, setAlertStatus] = useState(false);
  const [agent, setAgent] = useState(false);
  const [vip, setVip] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertBadge, setAlertBadge] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const getGroupResult = () => {
      ManageUserService.getAllUser(token, userData.hID, 'STAKEHOLDER', userData.shID, 'Y').then(res => {
        console.log(res.data);
        setGroupResult(res.data)
      })
    }

    getGroupResult();
  }, [])

  const getSearchUser = (e) => {
    e.preventDefault();
    ManageUserService.getProfileByKeyword(token, userData.hID, userInput).then(res => {
      console.log(res.data);
      setUserResult(res.data)
    })
  }

  const resetUserSearch = () => {
    setUserInput('')
  }

  const inviteToGroup = (hToken) => {
    ManageUserService.inviteToGroup(token, userData.hID, hToken, userData.shID).then(res => {
      // console.log(res);
      if (res === null) {
        setAlertStatus(true)
        setAlertMessage('Only group admin can do the invitation')
        setAlertBadge('danger')
      } else {
        setAlertStatus(true)
        setAlertMessage('The user has been successfully added.')
        setAlertBadge('success')
      }
    })
  }

  const removeFromGroup = (hToken) => {
    ManageUserService.removeFromGroup(token, userData.hID, hToken, userData.shID).then(res => {
      console.log(res);
      if (res.data === []) {
        setAlertStatus(true)
        alertMessage('Only admin can remove the members')
        setAlertBadge('danger')
      } else {
        console.log(hToken)
        setAlertStatus(true)
        setAlertMessage('The user has been remove from the group.')
        setAlertBadge('success')
      }
    })
  }

  const setAsAgent = (hToken) => {
    ManageUserService.setAsAgent(token, userData.hID, hToken, userData.shID).then(res => {
      console.log(res.data);
      if (res === null) {
        setAlertStatus(true)
        alertMessage('Only admin can remove the members')
        setAlertBadge('danger')
      } else {
        setAlertStatus(true)
        setAlertMessage('The user has been successfully updated as Agent.')
        setAlertBadge('success')
      }
    })
  }

  const setAsAdmin = (hToken) => {
    ManageUserService.setAsAdmin(token, userData.hID, hToken, userData.shID).then(res => {
      console.log(res.data);
      if (res === null) {
        setAlertStatus(true)
        alertMessage('Only group admin can set the role.')
        setAlertBadge('danger')
      } else {
        setAlertStatus(true)
        setAlertMessage('The user has been successfully updated as Admin.')
        setAlertBadge('success')
      }
    })
  }

  const setAsVip = (hToken) => {
    ManageUserService.setAsVip(token, userData.hID, hToken, userData.shID).then(res => {
      console.log(res.data);
      if (res === null) {
        setAlertStatus(true)
        setAlertMessage('Only group admin can set the role.')
        setAlertBadge('danger')
      } else {
        setAlertStatus(true)
        setAlertMessage('The user has been successfully updated as Coordinator.')
        setAlertBadge('success')
      }
    })
  }

  return (
    <Layout pageContent={
        <div>
          <a name="group-members" />

          {alertStatus &&
            <div className="row">
              <div className="col-sm-12">
                <div className={`alert alert-block alert-${alertBadge}`}>
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>{alertMessage}</p>
                </div>
              </div>
              <br /><br />
              <div className="space-10" />
            </div>
          }

          <div className="row">
            <div className="col-xs-6">
              <form name="form" onSubmit={getSearchUser}>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="ace-icon fa fa-check" />
                  </span>
                  <input type="text" className="form-control search-query" name="keyword" placeholder="Search Profile by Name" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-inverse btn-white">
                      <span className="ace-icon fa fa-search icon-on-right bigger-110" />
                      Search
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-xs-6 pull-right">
            </div>
          </div>
          <div className="space-2" />
          {
          userInput !== '' ?
            <div>
              <div>
                <span className="input-group-btn">
                  <button className="pull-left btn btn-sm btn-inverse" onClick={resetUserSearch}>
                    <i className="ace-icon fa fa-refresh" />
                    <span className="bigger-110">Reset Search Keyword</span>
                  </button>
                </span>
              </div>
              <br />
              <h4 className="header blue">Search Result</h4>
              <p>* Showing for Activated Users ONLY</p>
              <div className="row">
                <div className="col-xs-12">
                  <table id="simple-table" className="table  table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="5%"><div align="center">#</div></th>
                        <th width="30%">Fullname</th>
                        <th width="25%">Email</th>
                        <th width="15%">Category</th>
                        <th width="15%"><div align="center">Stakeholder</div></th>
                        <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                      userResult.map((data, i) => {
                        i += 1;
                        return <tr key={i}>
                          <td><div align="center">{i}</div></td>
                          <td>{data.FULLNAME}</td>
                          <td>{data.EMAIL}</td>
                          <td>{data.CATEGORY}</td>
                          <td><div align="center">{data.STAKEHOLDER_NAME ? data.STAKEHOLDER_NAME : 'n/a'}</div></td>
                          <td>
                            <div align="center">
                              {(data.CATEGORY === 'PUBLIC' || data.CATEGORY === 'TM') &&
                                <button className="btn btn-minier btn-success" onClick={() => inviteToGroup(data.H_TOKEN)}>Add to Group</button>
                              }
                            </div>
                          </td>
                        </tr>
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            :

            <div className="row">
              <div className="col-xs-12">
                <table id="simple-table" className="table  table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="5%"><div align="center">#</div></th>
                      <th width="30%">Fullname</th>
                      <th width="15%">Email</th>
                      <th width="10%">Position</th>
                      <th width="10%"><div align="center">Agent</div></th>
                      <th width="10%"><div align="center">Coordinator</div></th>
                      <th width="10%"><div align="center">Admin</div></th>
                      <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      groupResult.map((data, i) => {
                        i += 1;
                        return data.response === 'FAILED' ? 
                        <tr>
                          <td colSpan={4}><span style={{ color: 'red' }}>List is Empty. Please select other Group/Stakeholder</span></td>
                        </tr>
                          :
                          <tr key={i}>
                            <td><div align="center">{i}</div></td>
                            <td>{data.FULLNAME}</td>
                            <td>{data.EMAIL}</td>
                            <td>
                              {data.POSITION_NAME === 'Admin' ? <span className="label label-warning arrowed-right">{data.POSITION_NAME}</span> : data.POSITION_NAME}
                            </td>
                            <td>
                              <div align="center">
                                <input name="set_agent" type="checkbox" className="lbl" value={agent} onClick={() => setAsAgent(data.H_TOKEN)} checked={data.POSITION_NAME === 'Agent' ? !agent : false} onChange={(e) => setAgent(e.currentTarget.value)} />
                              </div>
                            </td>
                            <td>
                              <div align="center">
                                <input name="set_co" type="checkbox" className="lbl" value={vip} onClick={() => setAsVip(data.H_TOKEN)} checked={data.POSITION_NAME === 'Coordinator' ? !vip : false} />
                              </div>
                            </td>
                            <td>
                              <div align="center">
                                <input name="set_admin" type="checkbox" className="lbl" value={admin} onClick={() => setAsAdmin(data.H_TOKEN)} checked={data.POSITION_NAME === 'Admin' ? !admin : false} />
                              </div>
                            </td>
                            <td><div align="center">
                              {(userData.shID !== data.hId && data.POSITION_NAME !== 'Admin') &&
                                <button className="btn btn-minier btn-danger" onClick={() => removeFromGroup(data.H_TOKEN)}>Remove</button>
                              }
                            </div>
                            </td>
                          </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>{/* /.span */}
            </div>
          }
          <br />
        </div>
    }
    />
  );
}
export default MU_Groupmember;