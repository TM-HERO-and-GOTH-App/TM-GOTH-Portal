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
    const [ctID, setCTID] = useState('');
    const [caseRemarks, setCaseRemarks] = useState([]);
    // const [groupMembers, setGroupMembers] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertBadge, setAlertBadge] = useState('');
    const [caseOwner, setCaseOwner] = useState('');
    const [isCoordinator, setCoordinator] = useState('');
    const [isAdmin, setAdmin] = useState('');
    const [remark, setRemark] = useState('');
    const [caseStatus, setCaseStatus] = useState('0');
    const [remarkType, setRemarkType] = useState('0');

    useEffect(() => {
        const getActionRemark = () => {
            ActionTakenService.getActionRemarkLists(token, userData.hID, caseToken).then(res => {
                // console.log(res, 'getActionRemark')
                setCaseRemarks(res.data[0])
            })
        }

        const getGroupResult = () => {
            ManageUserService.getProfileByGroup(token, userData.shID).then((res) => {
                // console.log(res, 'getGroupResult');
                // setGroupMembers(res.data);
                setCoordinator(res.data.map(data => data.POSITION_NAME === "Coordinator"));
                setAdmin(res.data.map(data => data.POSITION_NAME === "Admin"))
            })
        }

        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                console.log(res.data[0][0], 'getCaseDetail')
                setCaseData(res.data[0][0])
                setCTID(res.data.CT_ID)
                setCaseOwner(res.data.OWNER_NAME)
            })
        }

        getActionRemark();
        getCaseDetail();
        getGroupResult();
    }, [])




    const setRemarks = (e) => {
        e.preventDefault();
        console.log(token, caseToken, userData.hID, caseStatus, ctID, remark)
        ActionTakenService.setRemark(token, caseToken, userData.hID, caseStatus, ctID, remark)
            .then(res => {
                console.log(res)
                if (res.statusText === 'Not Found') {
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
            CASE DETAIL : <span style={{color: 'green'}}>{caseData?.CASE_NUM}</span>
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
                            (caseData.CASE_STATUS !== 'CLOSED' && caseData.CASE_STATUS !== 'CANCELLED') && (caseData.OWNER_NAME || isCoordinator) &&
                            <Link className="btn btn-warning" to={`/edit-case/${caseToken}`}>
                                <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                Edit Case Detail
                            </Link>
                        }
                    </div>
                    <div className="pull-right col-sm-6" align="right">
                        <Link className="btn btn-primary" to={`/hero-chat/${caseToken}`}>HERO Chat</Link>
                    </div>
                </div>
                <div className="space-6" />
                <div className="row">
                    <div className="col-sm-12">
                        {
                            caseRemarks === [] ? <div style={{ color: "red" }}>Case Updates is empty</div> :
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
                                                {data.LOGGED_DATE}
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.REMARK}
                                                </span>
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.REMARK_TYPE === 'NEW' ? 'UN-ASSIGNED' : data.REMARK_TYPE}
                                                </span>
                                            </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.UPDATED_BY}
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
                    (caseData.CASE_STATUS === 'NEW' ||
                        caseData.CASE_STATUS === 'ASSIGNED' ||
                        caseData.CASE_STATUS === 'IN-PROGRESS' || isAdmin) &&
                    <form name="form" onSubmit={setRemarks}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well" style={{ height: 300 }}>
                                    <h4 className="green smaller lighter">Add New Updates/Remarks</h4>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <select className="chosen-select form-control" id="remarkText" value={remarkType} onChange={(e) => setRemarkType(e.target.value)}>
                                                <option value="0">Please select Remark Text Helper (if any)...</option>
                                                {
                                                    (caseRemarks.filter(filter => filter.lovID > 421 && filter.lovID < 236)) &&
                                                    lovData.filter(filter => filter.L_GROUP === 'REMARK-HELPER').map((data, i) => {
                                                        return <option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12" style={{ padding: 0 }}>
                                        <div className="form-group">
                                            <textarea className="form-control limited" id="remark" name="remark" maxLength="2000" value={remark} onChange={(e) => setRemark(e.target.value)}>
                                            </textarea>
                                        </div>
                                    </div>
                                    {
                                        (caseOwner || isCoordinator || isAdmin) &&
                                        <div>
                                            <div className="col-sm-3" style={{ padding: 0 }}>
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="caseStatusID" id="caseStatusID" value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}>
                                                        <option value="0">Choose a Case Status...</option>
                                                        {
                                                            caseRemarks.filter(filter => filter.REMARK_TYPE !== 'NEW'
                                                                && filter.REMARK_TYPE !== 'ASSIGNED' && filter.REMARK_TYPE !== 'IN-PROGRESSED') &&
                                                                caseRemarks.filter(filter => filter.REMARK_TYPE === 'CLOSED') &&
                                                                (caseOwner || isAdmin) ?
                                                                lovData.filter(filter => filter.L_GROUP === 'CASE-STATUS').map(data => {
                                                                    return <option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
                                                                }) :

                                                                (caseRemarks.filter(filter => filter.REMARK_TYPE === 'TO-BE-DELETED') && isAdmin) ?
                                                                    lovData.filter(filter => filter.L_GROUP === 'CASE-STATUS').map(data => {
                                                                        return <option key={data.L_ID} value={data.L_ID} >{data.L_NAME}</option>
                                                                    }) : lovData.filter(filter => filter.L_GROUP === 'CASE-STATUS').map(data => {
                                                                        return <option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
                                                                    })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-4" style={{ paddingLeft: 5 }} id="closureType">
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="ctID" value={ctID} onChange={(e) => setCTID(e.target.value)}>
                                                        <option value="0">Choose a Closure Type...</option>
                                                        {
                                                            lovData.filter(filter => filter.L_ID > 427 && filter.L_ID < 489) &&
                                                            lovData.filter(filter => filter.L_GROUP === 'CLOSURE-TYPE').map(data => {
                                                                return <option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
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
