import React, {useEffect, useState} from 'react';
import AssignmentTable from '../../components/assignments/AssignmentTable';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'

function MA_Assigned() {
    const [alertStatus, setAlertStatus] = useState(false);
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [assignedCase, setAssignedCase] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggerCase = async () => {
            setIsLoading(true)
            const res = await AssignmentService.viewCaseByOwner(token, 64)
            setAssignedCase(res)
            setIsLoading(false)
        }
        loggerCase();

        return () => {};
    }, [token])

    return (
        <Layout
            pageTitle='My Assignments : ASSIGNED'
            pageContent={
                <React.Fragment>
                    <div className="row">
                        <div className="col-xs-12">
                            {alertStatus &&
                                <div className="alert alert-block alert-success">
                                    <button type="button" className="close" data-dismiss="alert">
                                        <i className="ace-icon fa fa-times"/>
                                    </button>
                                    <p>
                                        <strong>
                                            <i className="ace-icon fa fa-check"/>
                                            Well done!
                                        </strong>
                                    </p>
                                </div>
                            }
                            <div className="clearfix">
                                <div className="pull-right tableTools-container" style={{paddingTop: 5}}/>
                            </div>
                            <div>
                                <AssignmentTable
                                    tableData={assignedCase}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                        {/* /.span */}
                    </div>
                    {/* /.row */}
                </React.Fragment>
            }
        />
    );
}

export default MA_Assigned;
