import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class CaseDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: JSON.parse(sessionStorage.getItem('userToken')),
            userData: JSON.parse(sessionStorage.getItem('UserData')),
            caseToken: this.props.match.params.id,
            caseDetailData: {},
            isCoordinator: '',
            statusLabel: '',
            statusBadge: '',
        }
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.assignCaseToMe = this.assignCaseToMe.bind(this);
        this.assignCaseToAgent = this.assignCaseToAgent.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
    }

    componentDidMount() {
        this.getCaseDetail();
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res })
        })
    }

    assignCaseToMe() {
        CaseDetailService.assignToMe(this.state.token, this.state.caseToken).then(res => {
            console.log(res);
            this.props.history.push('/MyAssignments-Assigned');
        })
    }

    assignCaseToAgent() {
        const hID = this.state.userData.hID;
        const shID = this.state.userData.shID;

        CaseDetailService.assignToAgent(this.state.token, this.state.caseToken, hID, shID).then(res => {
            console.log(res)
        })
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            console.log(res);
            this.setState({ groupMember: res })
            this.setState({ isCoordinator: this.state.groupMember.filter(filter => filter.positionName === 'Coordinator') })
        })
    }

    // initMap(lat,lon) {

    //     // Using the lat and lng
    //     var latitude = lat; 
    //     var longitude = lon;
    //     var latlng = new google.maps.LatLng(latitude,longitude);
    //     var feature = {
    //         zoom: 15,
    //         center: latlng,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     map = new google.maps.Map(document.getElementById("map_canvas"), feature);
    //     geocoder = new google.maps.Geocoder();
    //     var marker = new google.maps.Marker({
    //         position: latlng,
    //         map: map,
    //         title: "Geotag: " + latitude + "/" + longitude 
    //     });
    // }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                                <button type="button" className="close" data-dismiss="alert">
                                    <i className="ace-icon fa fa-times"></i>
                                </button>
                                <p>
                                    {/* <?php echo urldecode($alertMessage); ?> */}
                                    Alert Message here
                                </p>
                            </div>
                        </div>
                        <br />
                        <div className="space-10" />
                    </div>

                    <div className="row">
                        {(this.state.caseDetailData.caseStatus !== 'CLOSED' || this.state.caseDetailData.caseStatus !== 'CANCELLED') &&
                            <div className="col-sm-5">
                                {this.state.caseDetailData.ownerName &&
                                    <button className="btn btn-primary" onClick={this.assignCaseToMe}>
                                        Assign To Me
                                    </button>
                                }

                                {this.state.isCoordinator &&
                                    <button className="btn btn-danger" onClick={this.assignCaseToAgent}>
                                        Assign To Others
                                    </button>
                                }

                                {this.state.caseDetailData.oID ?
                                    <Link className="btn btn-warning" to={`/edit-case/${this.state.caseToken}`}>
                                        <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                        Edit Case Detail
                                    </Link> : null
                                }
                            </div>
                        }

                        <div className="col-sm-7">
                            <div className="col-sm-7">
                                <Link className="btn btn-primary" to={`/action-taken/${this.state.caseToken}`}>
                                    Action Taken
                                    {/* <!--<i className="ace-icon fa fa-arrow-right icon-on-right"></i>--> */}
                                </Link>
                                <Link className="btn btn-primary" to={`/hero-chat/${this.state.caseToken}`}>
                                    HERO Chat
                                </Link>
                                <Link className="btn btn-primary" to={`/internal-chat/${this.state.caseToken}`}>
                                    Internal Chat
                                </Link>
                            </div>
                            <br />
                            <div className="space-20"></div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                    {this.state.caseDetailData.ownerName ?
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">CASE OWNER</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    <b>
                                                        {this.state.caseDetailData.ownerName + ' - ' + this.state.caseDetailData.stakeholderName}
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
                                                            {this.state.caseDetailData.stakeholderName ? this.state.caseDetailData.stakeholderName : ''}
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
                                                {this.state.caseDetailData.fullname}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Customer </div>

                                        <div className="profile-info-value">
                                            {this.state.caseDetailData.customerName}
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Actual Customer Name </div>

                                        <div className="profile-info-value">
                                            {this.state.caseDetailData.actualCustomerName ? this.state.caseDetailData.actualCustomerName : 'n/a'}
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> State </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="age">
                                                {this.state.caseDetailData.areaLocation ? this.state.caseDetailData.areaLocation : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Contact No. </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="age">
                                                {this.state.caseDetailData.mobileNum}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> NRIC/BRN </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.nricNum}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Geotag </div>

                                        <div className="profile-info-value">

                                            <i className="fa fa-map-marker light-orange bigger-110"></i>
                                            <span className="editable" id="country">
                                                {this.state.caseDetailData.longtitude ? this.state.caseDetailData.latitude + ' / ' + this.state.caseDetailData.longtitude : <i>Not provided</i>}
                                            </span>
                                        </div>
                                    </div>
                                    <input type="hidden" id="lon" value={this.state.caseDetailData.longtitude ? this.state.caseDetailData.longtitude : 0} />
                                    <input type="hidden" id="lat" value={this.state.caseDetailData.latitude ? this.state.caseDetailData.latitude : 0} />

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Descriptions </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="login"><i style={{ color: "blue" }}>
                                                {this.state.caseDetailData.caseContent}
                                            </i></span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Case Status </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="login">
                                                {
                                                    this.state.caseDetailData.caseStatus === 'NEW' ? < span className='label label-danger'>{this.state.caseDetailData.caseStatus}</span> :
                                                        this.state.caseDetailData.caseStatus === 'IN-PROGRESS' ? < span className='label label-info'>{this.state.caseDetailData.caseStatus}</span> :
                                                            this.state.caseDetailData.caseStatus === 'ASSIGNED' ? < span className='label label-info'>{this.state.caseDetailData.caseStatus}</span> :
                                                                this.state.caseDetailData.caseStatus === 'CLOSED' ? < span className='label label-success'>{this.state.caseDetailData.caseStatus}</span> :
                                                                    < span className='label label-pink'>
                                                                        {this.state.caseDetailData.caseStatus}
                                                                    </span>

                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Created Date </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="about">
                                                {this.state.caseDetailData.createdDate}
                                            </span>
                                        </div>
                                    </div>

                                    {this.state.caseDetailData.closedDate ?
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Closed Date </div>

                                            <div className="profile-info-value">
                                                <span className="editable" id="about">
                                                    {this.state.caseDetailData.closedDate}
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
                                                {this.state.caseDetailData.caseType ? this.state.caseDetailData.caseType : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Product Name</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.productName ? this.state.caseDetailData.productName : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Segment</div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.segmentName ? this.state.caseDetailData.segmentName : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Package Name </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.packageName ? this.state.caseDetailData.packageName : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Service ID </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.serviceID ? this.state.caseDetailData.serviceID : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Service Address </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.serviceAddress ? this.state.caseDetailData.serviceAddress : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> SR Number </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.srNum ? this.state.caseDetailData.srNum : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> TT Number </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.ttNum ? this.state.caseDetailData.ttNum : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Source Name </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.productName ? this.state.caseDetailData.productName : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Sub-Source Name </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                {this.state.caseDetailData.subSourceName ? this.state.caseDetailData.subSourceName : <span style={{ color: "gray" }}>n/a</span>}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>{/* <!-- /.row --> */}
                        <div className="space-20"></div>
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="header green">Attachment</h4>
                                {this.state.caseDetailData.picture ? <img src={this.state.caseDetailData.picture} alt='Case' /> : <i style={{ color: "red" }}>Not provided</i>}
                            </div>
                        </div>
                        {this.state.caseDetailData.longtitude ?
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
                                        <div id="map_canvas" style={{ width: "100%", height: 400 }}></div>
                                    </div>
                                </div>
                            </div> : null
                        }
                    </div>
                    <Footer />
                </div>
            </div >
        )
    }
}

export default CaseDetail;