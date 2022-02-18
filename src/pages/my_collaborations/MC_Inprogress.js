import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';

function MC_Inprogress() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [closedCase, setClosedCase] = useState([]);

  useEffect(() => {
    const collaboratorCase = () => {
      AssignmentService.viewCaseByCollaborator(token, 67).then(res => {
        // console.log(res)
        setClosedCase(res)
      })
    }

    collaboratorCase();
  }, [closedCase])


  return (
    <Layout pageContent={
      <div>

        <div class="page-header">
          <h1>My Collaboration : IN-PROGRESSED</h1>
        </div> {/* <!-- /.page-header --> */}

        <div class="row">
          <div class="col-xs-12">
            {/* If there is a message */}

            <div class="alert alert-block alert-success">
              <button type="button" class="close" data-dismiss="alert">
                <i class="ace-icon fa fa-times"></i>
              </button>

              <p>
                <strong>
                  <i class="ace-icon fa fa-check"></i>
                  Well done!
                </strong>
              </p>
            </div>
            {/* End of message here */}

            <table id="simple-table" class="table  table-bordered table-hover">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th><div align="center">Aging</div></th>
                  <th>Type</th>
                  <th><div align="center">VIP</div></th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Logger</th>
                  <th><div align="center">Alert</div></th>
                </tr>
              </thead>

              <tbody>
                {
                  closedCase.map((data, index) => {
                    return data.response === 'FAILED' ? <tr><td colSpan={11}><span style={{ color: 'red' }}>List is empty</span></td></tr>
                      :
                      <tr key={index}>
                        <td>
                          <a href={`/case-detail/${data.cToken}`}>
                            {data.caseNum}
                          </a>
                        </td>
                        <td>
                          <div align="center">
                            <span className={`badge badge-${data.caseStatus ? 'info' : '-'}`}>{data.caseStatus ? 'IP' : '-'}</span>
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            {data.caseStatus === 'CLOSED' ? 'closedAging' : <span class={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>unclosedAging</span>}
                          </div>
                        </td>
                        <td>{data.caseType}</td>
                        <td>
                          <div align="center">
                            {data.vip ? <i class="menu-icon glyphicon glyphicon-ok"></i> : '-'}
                          </div>
                        </td>
                        <td>{data.productName}</td>
                        <td>{data.customerName}</td>
                        <td>
                          {data.vip ? <span class="label label-success arrowed-right"> {data.fullname} </span> : data.fullname}
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

export default MC_Inprogress;