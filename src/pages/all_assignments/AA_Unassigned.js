import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import Footer from '../Footer';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import { Link } from 'react-router-dom';

function AA_Unassigned() {
  const [lovData, setLovData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [unAssignedCase, setunAssignedCase] = useState([]);
  const [caseType, setCaseType] = useState('0');
  const [groupType, setGroupType] = useState('0');

  useEffect(() => {
    const unAssignedData = () => {
      AssignmentService.viewCaseByGroup(token, userData.shID, 61).then(res => {
        // console.log(res);
        setunAssignedCase(res)
      })
    }

    unAssignedData();
  }, [])


  return (
    <Layout pageContent={
      <div>

        <div className="page-header">
          <h1>Nationwide Assignments : UN-ASSIGNED</h1>
        </div> {/* <!-- /.page-header --> */}


        <div className="row">
          <form name="form">
            <div className="col-sm-3">
              <select className="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." value={groupType} onChange={(e) => setGroupType(e.target.value)}>
                <option value="0"> All Group/Stakeholder ...</option>
                {
                  lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map((data, key) => {
                    return <option key={key} value={data.lovName}> {data.lovName} </option>
                  })
                }
              </select>
            </div>

            <div className="col-sm-3">
              <select className="chosen-select form-control" name="caseTypeID" data-placeholder="Choose a Case Type..." value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                <option value="0" >All Case Type ...</option>
                {
                  lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                    return <option key={key} value={data.lovName}>{data.lovName}</option>
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
                  {
                    unAssignedCase.map((data) => {
                      return data.response === 'FAILED' ?
                        <tr>
                          <td colSpan="11">
                            <span style={{ color: 'red' }}>List is empty</span>
                          </td>
                        </tr>
                        :
                        (caseType === '0' || caseType === data.caseType) &&
                        <tr>
                          <td>
                            <Link to={`/case-detail/${data.cToken}`}>
                              {data.caseNum}
                            </Link>
                          </td>
                          <td><div align="center">
                            <span className='badge badge-pink'>{data.caseStatus ? 'D' : '-'}</span>
                          </div></td>
                          <td>
                            <div align="center">
                              {data.caseStatus === 'CLOSED' ? 'closedAging' : <span className={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>unclosedAging</span>}
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
                          <td>{data.ownerName ? data.ownerName + '-' + data.stakeholderName : data.stakeholderName}</td>
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
    }
    />
  );
}

export default AA_Unassigned;