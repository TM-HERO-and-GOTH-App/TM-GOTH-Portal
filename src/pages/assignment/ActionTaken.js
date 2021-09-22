import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ActionTakenService from '../../web_service/action_taken_service/ActionTakenService';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class ActionTaken extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            shID: JSON.parse(sessionStorage.getItem('UserData')),
            caseDetailData: {},
            caseRemarks: [],
            groupMember: [],
            isCaseOwner: '',
            isCoordinator: '',
            isAdmin: '',
            caseStatusType: '0',
            closureType: '0',
            remarkType: '0',
        }
        this.getActionRemark = this.getActionRemark.bind(this);
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
    }

    componentDidMount() {
        this.getActionRemark();
        this.getCaseDetail();
        this.getGroupResult();
    }

    getActionRemark() {
        ActionTakenService.getActionRemarkLists(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseRemarks: res })
        })
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            console.log(res);
            this.setState({ groupMember: res })
            this.setState({ isCoordinator: this.state.groupMember.filter(filter => filter.positionName === 'Coordinator') })
            this.setState({ isAdmin: this.state.groupMember.filter(filter => filter.positionName === 'Admin') })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res })
            this.setState({ isCaseOwner: res.ownerName })
        })
    }

    render() {
        return (
            <div>
                <Header />
                {/* <script type="text/javascript">
function getRemarkText()
{
    var remarkText = document.getElementById("remarkText").value;
    if( 0 != remarkText ){
        document.getElementById("remark").value=remarkText;
    }
}

function isStatusClosed()
{
    var caseStatusID = document.getElementById("caseStatusID").value;
    if( 70 == caseStatusID || 73 == caseStatusID ){
        document.getElementById("closureType").style.display = "";
    } else {
    	document.getElementById("closureType").style.display = "none";
    }	
}
</script> */}
                {/* <?php if ( isset($alertStatus) && !empty($alertStatus) ): ?> */}
                <div class="row">
                    <div class="col-sm-12">
                        <div class="alert alert-block alert-<?php echo $alertStatus; ?>">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {/* <?php echo urldecode($alertMessage); ?> */}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div class="space-10"></div>
                </div>
                {/* <?php endif; ?> */}
                <div class="row">
                    <div class="col-sm-6">
                        <Link class="btn btn-primary" to={`/case_detail/${this.state.caseToken}`}>
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </Link>
                        {(this.state.caseDetailData.caseStatus !== 'CLOSED' && this.state.caseDetailData.caseStatus !== 'CANCELLED') && (this.state.caseDetailData.ownerName || this.state.isCoordinator) &&
                            <Link class="btn btn-warning" to={`/edit_case/${this.state.caseToken}`}>
                                <i class="ace-icon fa fa-pencil align-top bigger-125"></i>
                                Edit Case Detail
                            </Link>
                        }
                    </div>
                    <div class="pull-right col-sm-6" align="right">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $cToken; ?>/dc/')">HERO Chat</button>
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/internal/<?php echo $cToken; ?>/dc/')">Internal Chat</button>
                    </div>
                </div>
                <div class="space-6" />
                <div class="row">
                    <div class="col-sm-12">
                        {this.state.caseRemarks.length === 1 ? <div style={{ color: "red" }}>Case Updates is empty</div> :
                            this.state.caseRemarks.map(data => {
                                return <div class="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><b>Logged Date</b></div>
                                        <div class="profile-info-value" style={{ width: "50%" }}><b>Remarks</b></div>
                                        <div class="profile-info-value"><b>Status</b></div>
                                        <div class="profile-info-value"><b>Updated By</b></div>
                                        <div class="profile-info-value" align="center" style={{ width: "10%" }}><i class="ace-icon fa fa-download"></i></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">
                                            {data.loggedDate}
                                        </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username">
                                                {data.remark}
                                            </span>
                                        </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username">
                                                {data.remarkType === 'NEW' ? 'UN-ASSIGNED' : data.remarkType}
                                            </span>
                                        </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username">
                                                {data.updateBy}
                                            </span>
                                        </div>
                                        <div class="profile-info-value" align="center">
                                            <span class="editable" id="username">-</span>
                                        </div>

                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div class="space-8"></div>
                {(this.state.caseDetailData.caseStatus === 'NEW' ||
                    this.state.caseDetailData.caseStatus === 'ASSIGNED' ||
                    this.state.caseDetailData.caseStatus === 'IN-PROGRESS' || this.state.isAdmin) &&
                    <form name="form" method="POST">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="well" style={{ height: 300 }}>
                                    <h4 class="green smaller lighter">Add New Updates/Remarks</h4>
                                    <div class="col-sm-4" style={{ padding: '5 0 0 0' }}>
                                        <div class="form-group">
                                            <select class="chosen-select form-control" id="remarkText" value={this.state.remarkType} onChange={(e) => this.setState({ remarkType: e.target.value })}>
                                                <option value="0">Please select Remark Text Helper (if any)...</option>
                                                {(this.state.caseRemarks.filter(filter => filter.lovID > 421 && filter.lovID < 236)) ?
                                                    this.state.lovData.filter(filter => filter.lovGroup === 'REMARK-HELPER').map((data, i) => {
                                                        return <option key={data.lovID} value={data.lovName}>{data.lovName}</option>
                                                    }) :
                                                    this.state.caseRemarks.map(data => {
                                                        return <option key={data.lovID} value={data.lovName}>{data.lovName}</option>
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
                                    <div class="col-sm-12" style={{ padding: 0 }}>
                                        <div class="form-group">
                                            <textarea class="form-control limited" id="remark" name="remark" maxLength="2000"></textarea>
                                        </div>
                                    </div>
                                    {/* <!--<input type="text" name="remark" placeholder="Text Field" class="form-control" />--> */}
                                    {(this.state.isCaseOwner || this.state.isCoordinator || this.state.isAdmin) &&
                                        <div>
                                            <div class="col-sm-3" style={{ padding: 0 }}>
                                                <div class="form-group">
                                                    <select class="chosen-select form-control" name="caseStatusID" id="caseStatusID" value={this.state.caseStatusType} onChange={(e) => this.setState({ caseStatusType: e.target.value })}>
                                                        <option value="0">Choose a Case Status...</option>
                                                        {
                                                            this.state.caseRemarks.filter(filter => filter.remarkType !== 'NEW' 
                                                            && filter.remarkType !== 'ASSIGNED' && filter.remarkType !== 'IN-PROGRESSED') && 
                                                            this.state.caseRemarks.filter(filter => filter.remarkType === 'CLOSED') && 
                                                            (this.state.isCaseOwner || this.state.isAdmin) ?
                                                                        this.state.lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                            return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                                        }) :

                                                                        (this.state.caseRemarks.filter(filter => filter.remarkType === 'TO-BE-DELETED') && this.state.isAdmin) ?
                                                                            this.state.lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                                return <option key={data.lovID} value={data.lovID} >{data.lovName}</option>
                                                                            }) : this.state.lovData.filter(filter => filter.lovGroup === 'CASE-STATUS').map(data => {
                                                                                return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-4" style={{ paddingLeft: 5 }} id="closureType">
                                                <div class="form-group">
                                                    <select class="chosen-select form-control" name="ctID" value={this.state.closureType} onChange={(e) => this.setState({ closureType: e.target.value })}>
                                                        <option value="0">Choose a Closure Type...</option>	
                                                        {this.state.lovData.filter( filter => filter.lovID > 427 && filter.lovID < 489) ?
                                                         this.state.lovData.filter( filter => filter.lovGroup === 'CLOSURE-TYPE').map( data => {
                                                            return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                        }) : 
                                                        this.state.lovData.filter( filter => filter.lovGroup === 'CLOSURE-TYPE').map( data => {
                                                            return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                        })
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div class="col-sm-11" style={{ padding: 0 }}>
                                        <div class="form-group">
                                            <button class="btn btn-sm btn-success" onclick="submitForm('<?php echo APPNAME; ?>/assignment/setremark/<?php echo $cToken; ?>');this.style.visibility= 'hidden';">
                                                <i class="ace-icon fa fa-save align-top bigger-125"></i>
                                                Update Status & Remark</button>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* <!-- /.col --> */}
                        </div>
                    </form>
                }
                <Footer />
            </div>
        )
    }
}

export default ActionTaken;