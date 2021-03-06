import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import AssignmentTable from '../../components/assignments/AssignmentTable';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';

function GA_Unassigned() {
  const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')))
  const [userData] = useState(JSON.parse(sessionStorage.getItem('UserData')))
  const [unassignedCase, setUnassignedCase] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggerCase = async() => {
      setIsLoading(true)
      const res = await AssignmentService.viewUnassignedCase(token, userData.hID, userData.shID)
      console.log(res.data[0])
      setUnassignedCase(res.data[0])
      setIsLoading(false)
    }
    loggerCase();
    console.log(unassignedCase)
    return () => {};
  }, [token, userData.shID])


  return (
    <Layout
    pageTitle={
      <span>
        Nationwide Assignments : <span style={{color: 'var(--color-danger)'}}>UN-ASSIGNED</span>
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
                isLoading={isLoading}
              />
            </div>
          </div>{/* /.span */}
        </div>// {/* /.row */}
    }
    />
  );
}

export default GA_Unassigned;
