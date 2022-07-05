import React, {useEffect, useState} from 'react';
import AssignmentTable from '../../components/assignments/AssignmentTable';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService'

function MA_Assigned() {
    const userData = JSON.parse(sessionStorage.getItem('UserData'))
    const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [alertStatus] = useState(false);
    const [assignedCase, setAssignedCase] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggerCase = async () => {
            setIsLoading(true)
            const res = await AssignmentService.viewCaseByOwner(token, userData.hID, 64)
            // console.log(res.data[0])
            setAssignedCase(res.data[0])
            setIsLoading(false)
        }
        loggerCase();

        return () => {};
    }, [token])

    return (
        <Layout
            pageTitle={
                <span>
                    My Assignments : <span style={{color: 'green'}}>ASSIGNED</span>
                </span>
            }
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
