import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
// Thanks to the creator who continue to maintain Google API for react.
// --> https://www.npmjs.com/package/@react-google-maps/api
// For documentation: https://react-google-maps-api-docs.netlify.app/#marker
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function CaseDetail(props) {
    const [caseToken, setCaseToken] = useState(props.match.params.id);
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [caseData, setCaseData] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [fetchData, setFetchData] = useState(false);
    const [left, setLeft] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [statusBadge, setStatusBadge] = useState('');
    const [isCoordinator, setCoordinator] = useState('');
    const [isAdmin, setAdmin] = useState('');
    const [heroBuddyData, setHeroBuddyData] = useState([]);

    useEffect(() => {
        const getCaseDetail = () => {
            setFetchData(true)
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                console.log(res.data)
                setCaseData(res.data)
                setFetchData(false)
            })
        }

        const getGroupResult = () => {
            setFetchData(true)
            ManageUserService.getProfileByGroup(token, userData.shID).then(res => {
                // console.log(res);
                if (res) {
                    setCoordinator(res.filter(filter => filter.positionName === "Coordinator"))
                    setAdmin(res.filter(filter => filter.positionName === "Admin"))
                    setFetchData(false)
                }
            })
        }

        const getHeroBuddyData = () => {
            setFetchData(true)
            CaseDetailService.getHeroBuddyInfo(token, caseToken).then(res => {
                console.log(res.data, 'HeroBuddy')
                if (typeof res == 'undefined') {
                    setFetchData(false)
                    setAlertStatus(true)
                    setAlertMessage('"Hero-Buddy: Data Unreachable."')
                    setStatusBadge('danger')
                } else if (res.data[0]?.response === 'FAILED') {
                    setFetchData(false)
                    setAlertStatus(true);
                    setAlertMessage('"Hero-Buddy: No Result Found"')
                    setStatusBadge('danger')
                } else {
                    setHeroBuddyData(res.data);
                    setFetchData(false);
                }
            })
        }

        getCaseDetail();
        getGroupResult();
        getHeroBuddyData();
    }, [caseToken, token, userData.shID])


    const assignCaseToMe = () => {
        CaseDetailService.assignToMe(token, caseToken).then(res => {
            // console.log(res);
            if (res?.data[0].response === 'FAILED') {
                setAlertStatus(true);
                setAlertMessage('The case cannot assign to your pool.')
                setStatusBadge('danger')
            } else {
                setAlertStatus(true);
                setAlertMessage('The case has been successfully assigned your pool.')
                setStatusBadge('success')
            }
        })
    }

    const reopenCase = () => {
        CaseDetailService.reopenCase(token, caseToken).then(res => {
            if (res.response === 'OK') return setAlertMessage('The case has been reverted to IN-PROGRESS')
        })
    }

    return (
        <Layout
            pageTitle={
                fetchData === false &&
                (<span>
                    Case Detail: <span style={{color: "green"}}>{caseData?.caseNum}</span>
                </span>)
            }
            pageContent={
                fetchData === true ? <CircularProgress size={20}/> :
                    (<>
                        {
                            alertStatus &&
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={`alert alert-block alert-${statusBadge}`}>
                                        <button type="button" className="close" data-dismiss="alert">
                                            <i className="ace-icon fa fa-times"></i>
                                        </button>
                                        <p>
                                            {alertMessage}
                                        </p>
                                    </div>
                                </div>
                                <br/>
                                <div className="space-10"/>
                            </div>
                        }

                        <div className="row">
                            {
                                (caseData?.caseStatus != null && caseData?.caseStatus !== "CLOSED") &&
                                (<div className="col-sm-7">
                                    {
                                        caseData?.ownerName == null &&
                                        <button className="btn btn-primary" onClick={assignCaseToMe}>
                                            Assign To Me
                                        </button>
                                    }

                                    {
                                        isCoordinator &&
                                        <Link className="btn btn-danger" to={`/assign-to-other/${caseToken}`}>
                                            Assign To Others
                                        </Link>
                                    }

                                    {(caseData?.ownerName == null || caseData?.owner === '' || isCoordinator) &&
                                        <Link className="btn btn-warning" to={`/edit-case/${caseToken}`}>
                                            <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                            Edit Case Detail
                                        </Link>
                                    }
                                </div>)
                            }

                            <div className="col-sm-5"
                                 align={caseData?.caseStatus === "CLOSED" || caseData?.caseStatus === "CANCELLED" ? "" : "right"}>
                                <Link className="btn btn-primary" to={`/action-taken/${caseToken}`}>
                                    Action Taken
                                    {/* <!--<i className="ace-icon fa fa-arrow-right icon-on-right"></i>--> */}
                                </Link>
                                <Link className="btn btn-primary" to={`/hero-chat/${caseToken}`}>
                                    HERO Chat
                                </Link>
                                {
                                    (userData?.positionName === 'Admin' && caseData?.caseStatus === 'CLOSED' && (userData?.stakeholderName === 'RRT' || userData.stakeholderName === 'CSM HQ')) &&
                                    <Link className="btn btn-primary" to={`/internal-chat/${caseToken}`}>
                                        Internal Chat
                                    </Link>
                                }
                                {isAdmin && caseData?.caseStatus === 'CLOSED' && (userData?.stakeholderName === 'RRT'
                                        || userData?.stakeholderName === 'CSM HQ') &&
                                    <button className="btn btn-danger"
                                            onClick={reopenCase}>
                                        Re-Open Case
                                    </button>
                                }
                            </div>
                            <br/>
                            <div className="space-20"/>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>
                                    {
                                        caseData?.ownerName ?
                                            <div className="profile-info-row">
                                                <div className="profile-info-name" style={{width: '20%'}}>CASE OWNER
                                                </div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
                                                        <b>
                                                            {caseData?.ownerName + ' - ' + caseData?.stakeholderName}
                                                        </b>
                                                    </span>
                                                </div>
                                            </div>
                                            :
                                            <>
                                                <div className="profile-info-row">
                                                    <div className="profile-info-name" style={{width: '20%'}}>
                                                        GROUP POOL
                                                    </div>
                                                    <div className="profile-info-value">
                                                        <span className="editable" id="username">
                                                            <b>
                                                                {caseData?.stakeholderName != null ? caseData?.stakeholderName : ''}
                                                            </b>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="profile-info-row">
                                                    <div className="profile-info-name" style={{width: '20%'}}>
                                                        CASE OWNER
                                                    </div>
                                                    <div className="profile-info-value">
                                                        <span className="editable" id="username">
                                                            <i style={{color: 'red'}}>Un-Assigned</i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{width: "20%"}}>HERO</div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="username">
                                                {caseData?.fullname}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Customer</div>

                                        <div className="profile-info-value">
                                            {caseData?.customerName}
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Actual Customer Name</div>

                                        <div className="profile-info-value">
                                            {caseData?.actualCustomerName != '' ? caseData?.actualCustomerName : 'n/a'}
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">State</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="areaLocation">
                                                {
                                                    caseData?.areaLocation != null ? caseData?.areaLocation :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Contact No.</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="mobileNumber">
                                                {caseData?.mobileNum}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">NRIC/BRN</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="nric">
                                                {caseData?.nricNum != null ? caseData?.nricNum : 'n/a'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Geotag</div>

                                        <div className="profile-info-value">

                                            <i className="fa fa-map-marker light-orange bigger-110"></i>
                                            <span className="editable" id="country">
                                                {
                                                    caseData?.longtitude != null ? caseData?.latitude + ' / ' + caseData?.longtitude :
                                                        <i>Not provided</i>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <input type="hidden" id="lon" value={caseData?.longtitude ?? 0}/>
                                    <input type="hidden" id="lat" value={caseData?.latitude ?? 0}/>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Descriptions</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="caseDescription">
                                                <i style={{color: "blue"}}>
                                                    {caseData?.caseContent}
                                                </i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Case Status</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="caseStatus">
                                                {
                                                    caseData?.caseStatus === 'NEW' ?
                                                        < span
                                                            className='label label-danger'>{caseData?.caseStatus}</span> :
                                                        caseData?.caseStatus === 'IN-PROGRESS' ? < span
                                                                className='label label-info'>{caseData?.caseStatus}</span> :
                                                            caseData?.caseStatus === 'ASSIGNED' ? < span
                                                                    className='label label-info'>{caseData?.caseStatus}</span> :
                                                                caseData?.caseStatus === 'CLOSED' ? < span
                                                                        className='label label-success'>{caseData?.caseStatus}</span> :
                                                                    < span className='label label-pink'>
                                                                        {caseData?.caseStatus}
                                                                    </span>

                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Created Date</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="createdDate">
                                                {caseData?.createdDate}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Closed Date</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="closedDate">
                                                {caseData?.closedDate != null ? caseData?.closedDate : '-'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">SIEBEL System</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="siebelTargetSystem">
                                                {caseData?.siebelTargetSystem}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{width: "25%"}}>Case Type</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="caseType">
                                                {
                                                    caseData?.caseType != null ? caseData?.caseType :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Product Name</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="productName">
                                                {
                                                    caseData?.productName != null ? caseData?.productName :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Segment</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="segment">
                                                {
                                                    caseData?.segmentName != null ? caseData?.segmentName :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Package Name</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="package">
                                                {
                                                    caseData?.packageName != '' ? caseData?.packageName :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Service ID</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="serviceID">
                                                {
                                                    caseData?.loginID != null ? caseData?.loginID :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Login ID</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="loginID">
                                                {
                                                    caseData?.serviceID != '' ? caseData?.serviceID :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Service Address</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="serviceAddress">
                                                {
                                                    caseData?.serviceAddress != '' ? caseData?.serviceAddress :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">SR Number</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="srNumber">
                                                {caseData?.srNum != null ? caseData?.srNum :
                                                    <span style={{color: "gray"}}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> TT Number</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="cttNumber">
                                                {caseData?.ttNum != '' ? caseData?.ttNum :
                                                    <span style={{color: "gray"}}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Source Name</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="sourceName">
                                                {
                                                    caseData?.sourceName != null ? caseData?.sourceName :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Sub-Source Name</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="subSource">
                                                {
                                                    caseData?.subSourceName != null ? caseData?.subSourceName :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Area</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="area">
                                                {
                                                    caseData?.area != null ? caseData?.area :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Sub-Area</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="subArea">
                                                {
                                                    caseData?.subArea != null ? caseData?.subArea :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Symptom</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="symptom">
                                                {
                                                    caseData?.symptom != null ? caseData?.symptom :
                                                        <span style={{color: "gray"}}>n/a</span>
                                                }
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- /.row --> */}
                        <div className="space-20"/>
                        {/* Hero Buddy Info */}
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="header green">HEROBUDDY INFO</h4>
                                {heroBuddyData === undefined ? (
                                        <i style={{color: "red"}}>Data not available</i>
                                    ) :
                                    heroBuddyData.map((data, index) => {
                                        return <div className="row">
                                            <div className="col-sm-12">
                                                <h4 className="header green">HEROBUDDY INFO</h4>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>status
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable" id="signup">{data.status}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{clear: "both"}}/>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>Login_Type
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable" id="signup">{data?.Login_Type}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{clear: "both"}}/>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>Login_Id
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable" id="signup">{data?.Login_Id}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{clear: "both"}}/>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>Login_Id_IPTV
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Login_Id_IPTV !== '' ? data.Login_Id_IPTV : 'n/a'}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{clear: "both"}}/>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>Service_Number
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Number}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{clear: "both"}}/>
                                            <div className="col-sm-12"><h5>Customer_Data</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>service_point
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.service_point}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>customer_id_type
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.customer_id_type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>customer_id_number
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.customer_id_number}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>segment_code
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.segment_code}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_status
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_status}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_update_date
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_update_date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>granite_update_date
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.granite_update_date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>customer_name
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.customer_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_package_name
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_package_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_house_unit_lot
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_hous_unit_lot}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_floor
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_floor}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_building_name
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_building_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_street_type
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_street_type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_street_name
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_street_name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_section
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_section}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_postcode
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_postcode}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_city
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_city}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_state
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_state}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>siebel_zone
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Customer_Data?.siebel_zone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Normalized_Volume_Usage</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Normalized_Volume_Usage?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Normalized_Volume_Usage?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Normalized_Volume_Usage?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>avgDownloadVolume
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Normalized_Volume_Usage?.avgDownloadVolume}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>avgUploadVolume
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Normalized_Volume_Usage?.avgUploadVolume}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Service_Information</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>serviceStatus
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.serviceStatus}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>uploadProfile
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.uploadProfile}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>downloadProfile
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.downloadProfile}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>Turbo_Status
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.Turbo_Status}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>Turbo_Remark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Service_Information?.Turbo_Remark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Speedometer_Results</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>total_tests
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Speedometer_Results?.total_tests}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>bad_results
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Speedometer_Results?.bad_results}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Speedometer_Results?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Speedometer_Results?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Speedometer_Results?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Session_Status</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>sessionStatus
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.sessionStatus}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>weeklySessionCount
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.weeklySessionCount}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>accessNode
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.accessNode}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>accessType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.accessType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>brasID
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.brasID}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>lastSessionStart
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.lastSessionStart}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>lastSessionStop
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.lastSessionStop}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>speedProfile
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.speedProfile}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Session_Status?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>RG_Status</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.RG_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.RG_Status?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.RG_Status?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>rgType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.RG_Status?.rgType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>rgTurboCompliance
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.RG_Status?.rgTurboCompliance}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>ONU_Status</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.ONU_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.ONU_Status?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.ONU_Status?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>onuType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.ONU_Status?.onuType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>onuTurboCompliance
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.ONU_Status?.onuTurboCompliance}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>CTT_Status</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.CTT_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.CTT_Status?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>totalCTT
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.CTT_Status?.totalCTT}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.CTT_Status?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Neighbourhood_Status</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>dp</div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.dp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>dpActiveUserCount
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.dpActiveUserCount}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>dpOnlineUserCount
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.dpOnlineUserCount}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>dpConcurrency
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.dpConcurrency}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>fdc</div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.fdc}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>fdcActiveUserCount
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.fdcActivateUserCount}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>fdcOnlineUserCount
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">1{data?.Neighbourhood_Status?.fdcOnlineUserCount}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>fdcConcurrency
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Neighbourhood_Status?.fdcConcurrency}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>Major_Outage</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Major_Outage?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Major_Outage?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Major_Outage?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>FTTH_Physical_Parameters</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_Physical_Parameters?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_Physical_Parameters?.pointScore}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_Physical_Parameters?.additionalRemark}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>lastSampleDate
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_Physical_Parameters?.lastSampleDate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12"><h5>FTTH_ONU_Temperature</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.pointScore}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.additionalRemark}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>maxTemperature
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.maxTemperature}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>avgTemperature
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.avgTemperature}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>lastTemp
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.lastTemp}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>warnThreshold
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.warnThreshold}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>criticalThreshold
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_ONU_Temperature?.criticalThreshold}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12"><h5>FTTH_BER_Counter</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.pointType}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointScore
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.pointScore}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>additionalRemark
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.additionalRemark}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>maxBER
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.maxBER}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>avgBER
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.avgBER}</span>
                                                        </div>
                                                    </div>

                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>lastBER
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.FTTH_BER_Counter?.lastBER}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-12"><h5>Response_Time</h5></div>
                                            <div className="col-sm-12">
                                                <div className="profile-user-info profile-user-info-striped"
                                                     style={{margin: 0}}>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name"
                                                             style={{width: "20%"}}>pointType
                                                        </div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Response_Time?.pointType}</span>
                                                        </div>
                                                    </div>
                                                    <div className="profile-info-row">
                                                        <div className="profile-info-name" style={{width: "20%"}}>time</div>

                                                        <div className="profile-info-value">
                                                            <span className="editable"
                                                                  id="signup">{data?.Response_Time?.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="space-20"/>
                        {/* Attachment */}
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="header green">Attachment</h4>
                                {caseData?.picture != null ? <img src={caseData?.picture} alt='Case'/> :
                                    <i style={{color: "red"}}>Not provided</i>}
                            </div>
                        </div>
                        {
                            caseData?.longtitude &&
                            // Map
                            <div>
                                <div className="space-20"/>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4 className="header green">
                                            Geotag Map
                                        </h4>
                                        <LoadScript
                                            googleMapsApiKey="AIzaSyC3j_ZmhRgR8eT9zYp1swE7VxsXhYP6ZoI"
                                        >
                                            <GoogleMap
                                                mapContainerStyle={{width: "100%", height: 400}}
                                                // Uncomment below to testing
                                                // center={{lat: 37.772, lng: -122.214}}
                                                center={{lat: caseData.latitude, lng: caseData.longtitude}}
                                                zoom={15}
                                            >
                                                { /* Child components, such as markers, info windows, etc. */}
                                                {/* <Marker
                                                    position={{
                                                        lat: 37.772,
                                                        lng: -122.214
                                                      }}
                                                /> */}
                                                <Marker
                                                    position={{
                                                        lat: caseData.latitude,
                                                        lng: caseData.longtitude
                                                    }}
                                                />

                                            </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                            </div>
                        }
                    </>)
            }
        />
    )
}

export default CaseDetail;
