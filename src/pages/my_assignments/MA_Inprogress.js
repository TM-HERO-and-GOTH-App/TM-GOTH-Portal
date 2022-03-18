import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTableData';

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
    <Layout 
    pageTitle={
      <span>
        My Assignments : <span style={{color:'green'}}>IN-PROGRESS</span>
      </span>
    }
    pageContent={
        <div className="row">
          <div className="col-xs-12">
           <AssignmentTable
            tableData={inProgressCase}
           />
          </div> {/* <!-- /.span --> */}
        </div>
    }
    />
  );
}

export default MA_Inprogress;