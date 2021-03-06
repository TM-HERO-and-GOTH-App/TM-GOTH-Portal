import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
import AssignmentTable from '../../components/assignments/AssignmentTable';

function AA_Assigned() {
    const [lovData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
    const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [assignedData, setAssignedCase] = useState([]);
    const [caseType, setCaseType] = useState('0');
    const [groupType, setGroupType] = useState('0');
    const [isLoading, setIsLoading] = useState(false);
    console.log(assignedData, 'AA_Assigned')

    useEffect(() => {
        const allAssignmentData = async () => {
            setIsLoading(true);
            const res = await AssignmentService.viewCaseByGroup(token, userData.hID, userData.shID, 64)
            setAssignedCase(res.data[0])
            setIsLoading(false);
        }
        allAssignmentData();
        return () => setIsLoading(false);
    }, [token, userData.shID])

    return (
        <Layout
            pageTitle={
                <span>
                    Nationwide Assignments : <span style={{color: 'green'}}>ASSIGNED</span>
                </span>
            }
            pageContent={
                <div className="row">
                    <form name="form">
                        <div className="col-sm-3">
                            <select className="chosen-select form-control" name="shID" value={groupType}
                                    onChange={(e) => setGroupType(e.target.value)}>
                                <option value='0'>All Group/Stakeholder ...</option>
                                {
                                    lovData
                                        .filter(filter => filter.L_GROUP === 'STAKEHOLDER' && filter.L_NAME !== 'ADMIN')
                                        .map((data, key) => <option key={key}
                                                                    value={data.L_NAME}>{data.L_NAME} </option>)
                                }
                            </select>
                        </div>

                        <div className="col-sm-3">
                            <select className="chosen-select form-control" name="caseTypeID" value={caseType}
                                    onChange={(e) => setCaseType(e.target.value)}>
                                <option value='0'>All Case Type ...</option>
                                {
                                    lovData
                                        .filter(filter => filter.L_GROUP === 'CASE-TYPE')
                                        .map((data, key) => <option key={key}
                                                                    value={data.L_NAME}>{data.L_NAME}</option>)
                                }
                            </select>
                        </div>
                    </form>

                    <div className="col-xs-12">
                        <div className="clearfix">
                            <div className="pull-right tableTools-container"/>
                        </div>
                        <div>
                            <AssignmentTable
                                tableData={assignedData}
                                caseType={caseType}
                                groupType={groupType}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    {/* //<!-- /.span --> */}
                </div>
            }
        />
    );
}

export default AA_Assigned;
