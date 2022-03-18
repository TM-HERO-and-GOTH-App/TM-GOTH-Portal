import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AssignmentTable from '../../components/assignments/AssignmentTableData';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';

function GA_Unassigned() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')))
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')))
  const [unassignedCase, setUnassignedCase] = useState([])

  useEffect(() => {
    const loggerCase = () => {
      AssignmentService.viewUnassignedCase(token, userData.shID).then(res => {
        console.log(res);
        setUnassignedCase(res)
      })
    }

    loggerCase();
  }, [])


  return (
    <Layout 
    pageTitle={
      <span>
        Nationwide Assignments : <span style={{color: 'green'}}>UN-ASSIGNED</span>
      </span>
    }
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
                tableData={unassignedCase}
              />
            </div>
          </div>{/* /.span */}
        </div>// {/* /.row */}
    }
    />
  );
}

export default GA_Unassigned;