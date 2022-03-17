import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTableData';

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
              <AssignmentTable
                tableData={closedCase}
              />
            </div>
          </div>{/* /.span */}
        </div>{/* /.row */}
      </div>
    }
    />
  );
}

export default MA_Closed;