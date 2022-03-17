import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTableData';

function MC_Assigned() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [assignedCase, setAssignedCase] = useState([]);
  // const [alert, setAlert] = useState(false);

  useEffect(() => {
    const collaboratorCase = () => {
      AssignmentService.viewCaseByCollaborator(token, 64).then(res => {
        // console.log(res)
        setAssignedCase(res)
      })
    }

    collaboratorCase();
  }, [])



  return (
    <Layout
    pageTitle='My Collaboration : ASSIGNED'
    pageContent={
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
              <div className="pull-right tableTools-container" style={{ paddingTop: 5 }} />
            </div>
            <div>
              <AssignmentTable
                tableData={assignedCase}
              />
            </div>
          </div>{/* /.span */}
        </div> // {/* /.row */}
    }
    />
  );
}

export default MC_Assigned;