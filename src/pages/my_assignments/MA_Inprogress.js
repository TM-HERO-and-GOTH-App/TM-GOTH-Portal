import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'

function MA_Inprogress() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [inProgressCase, setInProgressCase] = useState([]);
  const [statusLabel, setStatusLabel] = useState();
  const [statusBadge, setStatusBadge] = useState();

  useEffect(() => {
    const loggerCase = () => {
      AssignmentService.viewCaseByOwner(token, 67).then(res => {
        // console.log(res);
        setInProgressCase(res)
      })
    }

    loggerCase();
  }, [inProgressCase])


  return (
    <Layout pageContent={
      <div>

        <div className="page-header">
          <h1>My Assignments : IN PROGRESS</h1>
        </div> {/* <!-- /.page-header --> */}
        <div className="row">
          <div className="col-xs-12">
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
                {
                  inProgressCase.map(data => {
                    return data.response === 'FAILED' ? <tr><td colSpan={11}><span style={{ color: 'red' }}>List is empty</span></td></tr>
                      :
                      <tr>
                        <td>
                          <Link to={`/case-detail/${data.cToken}`}>
                            {data.caseNum}
                          </Link>
                        </td>
                        <td>
                          <div align="center">
                            <span className={`badge badge-${data.caseStatus ? 'info' : 'pink'}`}>{data.caseStatus ? 'IP' : '-'}</span>
                          </div>
                        </td>
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
                        <td>
                          {data.vip ? <span className="label label-success arrowed-right"> {data.fullname} </span> : data.fullname}
                        </td>
                        <td>{data.ownerName}</td>
                        <td>
                          <div align="center" style={{ fontSize: 10 }}>
                            {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning"> {data.totalNewAlert} </span> : 0}
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${data.cToken}`}>
                              Open
                              <i className="ace-icon fa fa-arrow-right icon-on-right" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                  })
                }
              </tbody>
            </table>
          </div> {/* <!-- /.span --> */}
        </div> {/* <!-- /.row --> */}
      </div>
    }
    />
  );
}

export default MA_Inprogress;