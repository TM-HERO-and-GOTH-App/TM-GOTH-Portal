import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import ActionTakenService from '../../web_service/action_taken_service/ActionTakenService';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function ActionTaken(props) {
    // Find and Match the current case token
    const [caseToken, setCaseToken] = useState(props.match.params.id);
    const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [caseData, setCaseData] = useState({});
    const [ctID, setCTID] = useState({});
    const [caseRemarks, setCaseRemarks] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertBadge, setAlertBadge] = useState('');
    const [caseOwner, setCaseOwner] = useState('');
    const [isCoordinator, setCoordinator] = useState('');
    const [isAdmin, setAdmin] = useState('');
    const [remark, setRemark] = useState('');
    const [caseStatus, setCaseStatus] = useState('0');
    const [closureStatus, setClosure] = useState('0');
    const [remarkType, setRemarkType] = useState('0');

    useEffect(() => {
        const getActionRemark = () => {
            ActionTakenService.getActionRemarkLists(token, caseToken).then(res => {
                // console.log(res)
                setCaseRemarks(res)
            })
        }

        const getGroupResult = () => {
            ManageUserService.getProfileByGroup(token, userData.shID).then((res) => {
                // console.log(res);
                setGroupMembers(res);
                setCoordinator(res.map(data => data.positionName === "Coordinator"));
                setAdmin(res.map(data => data.positionName === "Admin"))
            })
        }

        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                // console.log(res)
                setCaseData(res.data)
                setCTID(res.data.ctID)
                setCaseOwner(res.data.ownerName)
            })
        }

        getActionRemark();
        getCaseDetail();
        getGroupResult();
    }, [])




    const setRemarks = (e) => {
        e.preventDefault();
        ActionTakenService.setRemark(token, caseToken, remark, caseStatus, ctID)
            .then(res => {
                // console.log(res);
                if (res.response === 'FAILED') {
                    setAlertStatus(true)
                    setAlertMessage('Action cannot be implemented')
                    setAlertBadge('danger')
                } else {
                    setAlertStatus(true)
                    setAlertMessage('Action has been implemented')
                    setAlertBadge('success')
                }
            })
    }


    return (
        <Layout
        pageTitle={<span>
            CASE DETAIL : <span style={{color: 'green'}}>{caseData.caseNum}</span>
        </span>}
        pageContent={
            <>
                {
                    alertStatus &&
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={`alert alert-block alert-${alertBadge}`}>
                                <button type="button" className="close" data-dismiss="alert">
                                    <i className="ace-icon fa fa-times"></i>
                                </button>
                                <p>
                                    {alertMessage}
                                </p>
                            </div>
                        </div>
                        <br />
                        <div className="space-10"></div>
                    </div>
                }

                <div className="row">
                    <div className="col-sm-6">
                        <Link className="btn btn-primary" to={`/case-detail/${caseToken}`}>
                            <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </Link>
                        {
                            (caseData.caseStatus !== 'CLOSED' && caseData.caseStatus !== 'CANCELLED') && (caseData.ownerName || isCoordinator) &&
                            <Link className="btn btn-warning" to={`/edit-case/${caseToken}`}>
                                <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                Edit Case Detail
                            </Link>
                        }
                    </div>
                    <div className="pull-right col-sm-6" align="right">
                        <Link className="btn btn-primary" to={`/hero-chat/${caseToken}`}>HERO Chat</Link>
                        <Link className="btn btn-primary" to={`/internal-chat/${caseToken}`}>Internal Chat</Link>
                    </div>
                </div>
                <div className="space-6" />
                <div className="row">
                    <div className="col-sm-12">
                        {
                            caseRemarks.length === 1 ? <div style={{ color: "red" }}>Case Updates is empty</div> :
                                caseRemarks.map(data => {
                                    return <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"><b>Logged Date</b></div>
                                            <div className="profile-info-value" style={{ width: "50%" }}><b>Remarks</b></div>
                                            <div className="profile-info-value"><b>Status</b></div>
                                            <div className="profile-info-value"><b>Updated By</b></div>
                                            <div className="profile-info-value" align="center" style={{ width: "10%" }}><i className="ace-icon fa fa-download"></i></div>
                                        </div>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">
                                                {data.loggedDate}
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.remark}
                                                </span>
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.remarkType === 'NEW' ? 'UN-ASSIGNED' : data.remarkType}
                                                </span>
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.updateBy}
                                                </span>
                                            </div>
                                            <div className="profile-info-value" align="center">
                                                <span className="editable" id="username">-</span>
                                            </div>

                                        </div>
                                    </div>
                                })
                        }
                    </div>
                </div>
                <div className="space-8"></div>
                {
                    (caseData.caseStatus === 'NEW' ||
                        caseData.caseStatus === 'ASSIGNED' ||
                        caseData.caseStatus === 'IN-PROGRESS' || isAdmin) &&
                    <form name="form" onSubmit={setRemarks}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well" style={{ height: 300 }}>
                                    <h4 className="green smaller lighter">Add New Updates/Remarks</h4>
                                    <div className="col-sm-4" style={{ padding: '5 0 0 0' }}>
                                        <div className="form-group">
                                            <select className="chosen-select form-control" id="remarkText" value={remarkType} onChange={(e) => setRemarkType(e.target.value)}>
                                                <option value="0">Please select Remark Text Helper (if any)...</option>
                                                {
                                                    (caseRemarks.filter(filter => filter.lovID > 421 && filter.lovID < 236)) &&
                                                    lovData.filter(filter => filter.lovGroup === 'REMARK-HELPER').map((data, i) => {
                                                        return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                    })
                                                }
                                            </select>
                                            {/* <!--<option value="Customer Acknowledge">Customer Acknowledge</option>
                                                <option value="Escalation to Stakeholder">Escalation to Stakeholder</option>
                                                <option value="Restoration In-Progress (Technical)">Restoration In-Progress (Technical)</option>
                                                <option value="Rebate In-Progress">Rebate In-Progress</option>
                                                <option value="Verified & Closed">Verified & Closed</option>
                                                <option value="Investigation In-Progress">Investigation In-Progress</option>--> */}
                                        </div>
                                    </div>
                                    <div className="col-sm-12" style={{ padding: 0 }}>
                                        <div className="form-group">
                                            <textarea className="form-control limited" id="remark" name="remark" maxLength="2000" value={remark} onChange={(e) => setRemark(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                    {/* <!--<input type="text" name="remark" placeholder="Text Field" className="form-control" />--> */}
                                    {
                                        (caseOwner || isCoordinator || isAdmin) &&
                                        <div>
                                            <div className="col-sm-3" style={{ padding: 0 }}>
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="caseStatusID" id="caseStatusID" value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}>
                                                        <option value="0">Choose a Case Status...</option>
                                                        {
                                                            caseRemarks.filter(filter => filter.remarkType !== 'NEW'
                                                                && filter.remarkType !== 'ASSIGNED' && filter.remarkType !== 'IN-PROGRESSED') &&
                                                                caseRemarks.filter(filter => filter.remarkType === 'CLOSED') &&
                                                                (caseOwner || isAdmin) ?
                                                                lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                                }) :

                                                                (caseRemarks.filter(filter => filter.remarkType === 'TO-BE-DELETED') && isAdmin) ?
                                                                    lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                        return <option key={data.lovID} value={data.lovID} >{data.lovName}</option>
                                                                    }) : lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                        return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                                    })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4" style={{ paddingLeft: 5 }} id="closureType">
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="ctID" value={closureStatus} onChange={(e) => setClosure(e.target.value)}>
                                                        <option value="0">Choose a Closure Type...</option>
                                                        {
                                                            lovData.filter(filter => filter.lovID > 427 && filter.lovID < 489) &&
                                                            lovData.filter(filter => filter.lovGroup === 'CLOSURE-TYPE').map(data => {
                                                                return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="col-sm-11" style={{ padding: 0 }}>
                                        <div className="form-group">
                                            <button className="btn btn-sm btn-success" type='submit'>
                                                <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                                Update Status & Remark
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* <!-- /.col --> */}
                        </div>
                    </form>
                }
            </>
        }
        />
    )
}

export default ActionTaken;
