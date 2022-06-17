import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTable';

function MA_Inprogress() {
    const userData = JSON.parse(sessionStorage.getItem('UserData'))
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [inProgressCase, setInProgressCase] = useState([]);
    const [statusLabel, setStatusLabel] = useState();
    const [statusBadge, setStatusBadge] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggerCase = async () => {
            setIsLoading(true)
            const res = await AssignmentService.viewCaseByOwner(token, userData.hID, 67)
            setInProgressCase(res.data[0])
            setIsLoading(false)
        }
        loggerCase();

        return () => {};
    }, [token])

    return (
        <Layout
            pageTitle={
                <span>
        My Assignments : <span style={{color: 'var(--color-warning)'}}>IN-PROGRESS</span>
      </span>
            }
            pageContent={
                <div className="row">
                    <div className="col-xs-12">
                        <AssignmentTable
                            tableData={inProgressCase}
                            isLoading={isLoading}
                        />
                    </div>
                    {/* <!-- /.span --> */}
                </div>
            }
        />
    );
}

export default MA_Inprogress;
