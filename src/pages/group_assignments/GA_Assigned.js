import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTableData';

function GA_Assigned() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')))
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [assignedCase, setAssignedCase] = useState([]);

  useEffect(() => {
    const loggerCase = () => {
      AssignmentService.viewCaseByGroup(token, userData.shID, 64).then(res => {
        // console.log(res);
        setAssignedCase(res)
      })
    }

    loggerCase()
  }, [])


  return (
    <Layout
      pageTitle='Group Assignments : ASSIGNED'
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
              <div className="pull-right tableTools-container" />
            </div>
            <div>
              <AssignmentTable
                tableData={assignedCase}
              />
            </div>
          </div>{/* /.span */}
        </div>// {/* /.row */}
      }
    />
  );
}

export default GA_Assigned;