import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTable';

function MA_Closed() {
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [closedCase, setClosedCase] = useState([]);
    const [statusLabel, setStatusLabel] = useState();
    const [statusBadge, setStatusBadge] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loggerCase = async () => {
            setIsLoading(true)
            const res = await AssignmentService.viewCaseByOwner(token, 70)
            setClosedCase(res)
            setIsLoading(false)
        }
        loggerCase();
    }, [])


    return (
        <Layout
            pageTitle={
                <span>
        My Assignments : <span style={{color: 'green'}}>CLOSED</span>
      </span>
            }
            pageContent={
                <div className="row">
                    <div className="col-xs-12">
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
                        <div className="clearfix">
                            <div className="pull-right tableTools-container"/>
                        </div>
                        <div>
                            <AssignmentTable
                                tableData={closedCase}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    {/* /.span */}
                </div>
            }
        />
    );
}

export default MA_Closed;
