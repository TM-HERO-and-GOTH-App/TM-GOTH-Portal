import React, { useEffect, useState, } from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTableData';

function MC_Inprogress() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [inProgressCase, setInProgressCase] = useState([]);

  useEffect(() => {
    const collaboratorCase = () => {
      AssignmentService.viewCaseByCollaborator(token, 67).then(res => {
        // console.log(res)
        setInProgressCase(res)
      })
    }

    collaboratorCase();
  }, [])


  return (
    <Layout 
    pageTitle='My Collaboration : IN-PROGRESSED'
    pageContent={
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

            <AssignmentTable
              tableData={inProgressCase}
            />
          </div> {/* <!-- /.span --> */}
        </div> // {/* <!-- /.row --> */}
    }
    />
  );
}

export default MC_Inprogress;