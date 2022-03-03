import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Thanks to the creator who continue to maintain Google API for react.
// --> https://www.npmjs.com/package/@react-google-maps/api
// For documentation: https://react-google-maps-api-docs.netlify.app/#marker
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function CaseDetail(props) {
    const [caseToken, setCaseToken] = useState(props.match.params.id);
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [caseData, setCaseData] = useState({});
    const [alertStatus, setAlertStatus] = useState(false);
    const [left, setLeft] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [statusBadge, setStatusBadge] = useState('');
    const [isCoordinator, setCoordinator] = useState('');

    useEffect(() => {
        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                // console.log(res)
                setCaseData(res)
            })
        }

        getCaseDetail();
    }, [])


    const assignCaseToMe = () => {
        CaseDetailService.assignToMe(token, caseToken).then(res => {
            // console.log(res);
            if (res.response === 'FAILED') {
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

    const getGroupResult = () => {
        ManageUserService.getProfileByGroup(token, userData.shID).then(res => {
            // console.log(res);
            setCoordinator(res.filter(filter => filter.positionName === "Coordinator"))
        })
    }

    return (
        <Layout pageContent={
            <div>
                <div className="page-header">
                    <h1>CASE DETAIL : {caseData.caseNum}</h1>
                </div> {/* <!-- /.page-header --> */}

                <div>
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
                            <br />
                            <div className="space-10" />
                        </div>
                    }

                    <div className="row">
                        {
                            (caseData.caseStatus !== 'CLOSED' || caseData.caseStatus !== 'CANCELLED') &&
                            <div className="col-sm-5">
                                {
                                    !caseData.ownerName &&
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

                                {(!caseData.ownerName || isCoordinator) &&
                                    <Link className="btn btn-warning" to={`/edit-case/${caseToken}`}>
                                        <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                        Edit Case Detail
                                    </Link>
                                }
                            </div>
                        }

                        <div className="col-sm-7">
                            <Link className="btn btn-primary" to={`/action-taken/${caseToken}`}>
                                Action Taken
                                {/* <!--<i className="ace-icon fa fa-arrow-right icon-on-right"></i>--> */}
                            </Link>
                            <Link className="btn btn-primary" to={`/hero-chat/${caseToken}`}>
                                HERO Chat
                            </Link>
                            <Link className="btn btn-primary" to={`/internal-chat/${caseToken}`}>
                                Internal Chat
                            </Link>
                        </div>
                        <br />
                        <div className="space-20" />
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                {
                                    caseData.ownerName ?
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">CASE OWNER</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    <b>
                                                        {caseData.ownerName + ' - ' + caseData.stakeholderName}
                                                    </b>
                                                </span>
                                            </div>
                                        </div> :

                                        <div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">GROUP POOL</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
                                                        <b>
                                                            {caseData.stakeholderName ? caseData.stakeholderName : ''}
                                                        </b>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">CASE OWNER</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username"><i style={{ color: 'red' }}>Un-Assigned</i></span>
                                                </div>
                                            </div>
                                        </div>
                                }
                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{ width: "20%" }}> HERO </div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                            {caseData.fullname}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Customer </div>

                                    <div className="profile-info-value">
                                        {caseData.customerName}
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Actual Customer Name </div>

                                    <div className="profile-info-value">
                                        {caseData.actualCustomerName ? caseData.actualCustomerName : 'n/a'}
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> State </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="age">
                                            {caseData.areaLocation ? caseData.areaLocation : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Contact No. </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="age">
                                            {caseData.mobileNum}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> NRIC/BRN </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.nricNum}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Geotag </div>

                                    <div className="profile-info-value">

                                        <i className="fa fa-map-marker light-orange bigger-110"></i>
                                        <span className="editable" id="country">
                                            {caseData.longtitude ? caseData.latitude + ' / ' + caseData.longtitude : <i>Not provided</i>}
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" id="lon" value={caseData?.longtitude ?? 0} />
                                <input type="hidden" id="lat" value={caseData?.latitude ?? 0} />

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Descriptions </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="login"><i style={{ color: "blue" }}>
                                            {caseData.caseContent}
                                        </i></span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Case Status </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="login">
                                            {
                                                caseData.caseStatus === 'NEW' ? < span className='label label-danger'>{caseData.caseStatus}</span> :
                                                    caseData.caseStatus === 'IN-PROGRESS' ? < span className='label label-info'>{caseData.caseStatus}</span> :
                                                        caseData.caseStatus === 'ASSIGNED' ? < span className='label label-info'>{caseData.caseStatus}</span> :
                                                            caseData.caseStatus === 'CLOSED' ? < span className='label label-success'>{caseData.caseStatus}</span> :
                                                                < span className='label label-pink'>
                                                                    {caseData.caseStatus}
                                                                </span>

                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Created Date </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="about">
                                            {caseData.createdDate}
                                        </span>
                                    </div>
                                </div>

                                {caseData.closedDate ?
                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Closed Date </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="about">
                                                {caseData.closedDate}
                                            </span>
                                        </div>
                                    </div> :

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Closed Date </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="about">
                                                -
                                            </span>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{ width: "25%" }}> Case Type </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.caseType ? caseData.caseType : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Product Name</div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.productName ? caseData.productName : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Segment</div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.segmentName ? caseData.segmentName : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Package Name </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.packageName ? caseData.packageName : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Service ID </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.serviceID ? caseData.serviceID : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Service Address </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.serviceAddress ? caseData.serviceAddress : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> SR Number </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.srNum ? caseData.srNum : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> TT Number </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.ttNum ? caseData.ttNum : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Source Name </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.productName ? caseData.productName : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Sub-Source Name </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseData.subSourceName ? caseData.subSourceName : <span style={{ color: "gray" }}>n/a</span>}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>{/* <!-- /.row --> */}
                    <div className="space-20" />
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="header green">Attachment</h4>
                            {caseData.picture ? <img src={caseData.picture} alt='Case' /> : <i style={{ color: "red" }}>Not provided</i>}
                        </div>
                    </div>
                    {
                        caseData.longtitude &&
                        <div>
                            <div className="space-20" />
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4 className="header green">Geotag Map
                                        <div className="pull-right">
                                            <button className="btn btn-warning btn-xs" onclick="initMap(lat,lon);" title="Reload Map">
                                                <i className="ace-icon fa fa-refresh bigger-110 icon-only"></i>
                                            </button>
                                        </div>
                                    </h4>
                                    <LoadScript
                                        googleMapsApiKey="AIzaSyC3j_ZmhRgR8eT9zYp1swE7VxsXhYP6ZoI"
                                    >
                                        <GoogleMap
                                            mapContainerStyle={{ width: "100%", height: 400 }}
                                            // Uncomment below to testing
                                            // center={{lat: 37.772, lng: -122.214}}
                                            center={{ lat: caseData.latitude, lng: caseData.longtitude }}
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
                </div>
            </div>
        }
        />
    )
}

export default CaseDetail;