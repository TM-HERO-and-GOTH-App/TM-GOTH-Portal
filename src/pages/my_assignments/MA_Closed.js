import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';

function MA_Closed() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [closedCase, setClosedCase] = useState([]);
  const [statusLabel, setStatusLabel] = useState();
  const [statusBadge, setStatusBadge] = useState();

  useEffect(() => {
    const loggerCase = () => {
      AssignmentService.viewCaseByOwner(token, 70).then(res => {
        // console.log(res);
        setClosedCase(res)
      })
    }

    loggerCase()
  }, [closedCase])



  return (
    <Layout pageContent={
      <div>

        <div className="page-header">
          <h1>My Assignments : Closed</h1>
        </div> {/* <!-- /.page-header --> */}

        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-block alert-success">
              <button type="button" className="close" data-dismiss="alert">
                <i className="ace-icon fa fa-times" />
              </button>
              <p>
                <strong>
                  <i className="ace-icon fa fa-check" />
                  Well done!
                </strong>
              </p>
            </div>
            <div className="clearfix">
              <div className="pull-right tableTools-container" />
            </div>
            <div>
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
                    closedCase.map(data => {
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
                              <span className={`badge badge-${data.caseStatus ? 'success' : '-'}`}>{data.caseStatus ? 'C' : '-'}</span>
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
                              {data.vip ? <span className="label label-sm label-warning">Yes</span> : 'No'}
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
            </div>
          </div>{/* /.span */}
        </div>{/* /.row */}
      </div>
    }
    />
  );
}

export default MA_Closed;