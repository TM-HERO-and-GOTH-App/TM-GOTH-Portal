import React, {useState, useEffect} from 'react';
import Layout from '../Layout';
import AllAssignmentTable from '../../components/assignments/AllAssignmentTableData';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';
//Test Table
import AssignmentTable from '../../components/assignments/AssignmentTable';


function AA_Assigned() {
    const [lovData, setLovData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [assignedData, setAssignedCase] = useState([]);
    const [caseType, setCaseType] = useState('0');
    const [groupType, setGroupType] = useState('0');

    useEffect(() => {
        const allAssignmentData = () => {
            AssignmentService.viewCaseByGroup(token, userData.shID, 64).then(res => {
                // console.log(res);
                setAssignedCase(res)
            })
        }
        allAssignmentData();
    }, [])


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
                                        .filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN')
                                        .map((data, key) => <option key={key} value={data.lovName}>{data.lovName} </option>)
                                }
                            </select>
                        </div>

                        <div className="col-sm-3">
                            <select className="chosen-select form-control" name="caseTypeID" value={caseType}
                                    onChange={(e) => setCaseType(e.target.value)}>
                                <option value='0'>All Case Type ...</option>
                                {
                                    lovData
                                        .filter(filter => filter.lovGroup === 'CASE-TYPE')
                                        .map((data, key) => <option key={key} value={data.lovName}>{data.lovName}</option>)
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
