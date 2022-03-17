import React, { useState, useEffect } from 'react';
import AssignmentTable from '../../components/assignments/AssignmentTableData';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'

function GA_Closed() {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')))
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userData')))
  const [closedCase, setClosedCase] = useState([])

  useEffect(() => {
    const loggerCase = () => {
      AssignmentService.viewCaseByGroup(token, userData.shID, 70).then(res => {
        // console.log(res);
        setClosedCase(res)
      })
    }

    loggerCase()
  }, [])

  return (
    <Layout 
    pageTitle='Group Assignments : CLOSED'
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
                tableData={closedCase}
              />
            </div>
          </div>{/* /.span */}
        </div>// {/* /.row */}
    }
    />
  );
}

export default GA_Closed;