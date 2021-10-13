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
            // Find and Match the current case token
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            shID: JSON.parse(sessionStorage.getItem('UserData')),
            caseDetailData: {},
            ctID: {},
            caseRemarks: [],
            groupMember: [],
            alertStatus: false,
            alertMessage: '',
            statusBadge: '',
            isCaseOwner: '',
            isCoordinator: '',
            isAdmin: '',
            remark: '',
            caseStatusType: '0',
            closureType: '0',
            remarkType: '0',
        }
        this.getActionRemark = this.getActionRemark.bind(this);
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
        this.setRemark = this.setRemark.bind(this);
    }

    componentDidMount() {
        this.getActionRemark();
        this.getCaseDetail();
        this.getGroupResult();
    }

    getActionRemark() {
        ActionTakenService.getActionRemarkLists(this.state.token, this.state.caseToken).then(res => {
            // console.log(res)
            this.setState({ caseRemarks: res })
        })
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            // console.log(res);
            this.setState({ 
                groupMember: res, 
                isCoordinator: this.state.groupMember.filter(filter => filter.positionName === "Coordinator"),
                isAdmin: this.state.groupMember.filter(filter => filter.positionName === "Admin")
            })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            // console.log(res)
            this.setState({ caseDetailData: res, ctID: res.ctID, isCaseOwner: res.ownerName })
        })
    }

    setRemark(e){
        e.preventDefault();
        ActionTakenService.setRemark(this.state.token, this.state.caseToken, this.state.remark, this.state.caseStatusType, this.state.ctID)
        .then(res => {
            // console.log(res);
            if(res.response === 'FAILED'){
                this.setState({
                    alertStatus: true,
                    alertMessage: 'Action cannot be implemented',
                    statusBadge: 'danger'
                })
            } else {
                this.setState({
                    alertStatus: true,
                    alertMessage: 'Action has been implemented',
                    statusBadge: 'success'
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Header />

{/* function isStatusClosed()
{
    var caseStatusID = document.getElementById("caseStatusID").value;
    if( 70 == caseStatusID || 73 == caseStatusID ){
        document.getElementById("closureType").style.display = "";
    } else {
    	document.getElementById("closureType").style.display = "none";
    }	
}
</script> */}
                { this.state.alertStatus &&
                <div className="row">
                    <div className="col-sm-12">
                        <div className={`alert alert-block alert-${this.state.statusBadge}`}>
                            <button type="button" className="close" data-dismiss="alert">
                                <i className="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {this.state.alertMessage}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div className="space-10"></div>
                </div>
                }
                <div className="row">
                    <div className="col-sm-6">
                        <Link className="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                            <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </Link>
                        {(this.state.caseDetailData.caseStatus !== 'CLOSED' && this.state.caseDetailData.caseStatus !== 'CANCELLED') && (this.state.caseDetailData.ownerName || this.state.isCoordinator) &&
                            <Link className="btn btn-warning" to={`/edit-case/${this.state.caseToken}`}>
                                <i className="ace-icon fa fa-pencil align-top bigger-125"></i>
                                Edit Case Detail
                            </Link>
                        }
                    </div>
                    <div className="pull-right col-sm-6" align="right">
                        <Link className="btn btn-primary" to={`/hero-chat/${this.state.caseToken}`}>HERO Chat</Link>
                        <Link className="btn btn-primary" to={`/internal-chat/${this.state.caseToken}`}>Internal Chat</Link>
                    </div>
                </div>
                <div className="space-6" />
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.caseRemarks.length === 1 ? <div style={{ color: "red" }}>Case Updates is empty</div> :
                            this.state.caseRemarks.map(data => {
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
                {(this.state.caseDetailData.caseStatus === 'NEW' ||
                    this.state.caseDetailData.caseStatus === 'ASSIGNED' ||
                    this.state.caseDetailData.caseStatus === 'IN-PROGRESS' || this.state.isAdmin) &&
                    <form name="form" onSubmit={this.setRemark}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well" style={{ height: 300 }}>
                                    <h4 className="green smaller lighter">Add New Updates/Remarks</h4>
                                    <div className="col-sm-4" style={{ padding: '5 0 0 0' }}>
                                        <div className="form-group">
                                            <select className="chosen-select form-control" id="remarkText" value={this.state.remarkType} onChange={(e) => this.setState({ remarkType: e.target.value })}>
                                                <option value="0">Please select Remark Text Helper (if any)...</option>
                                                {(this.state.caseRemarks.filter(filter => filter.lovID > 421 && filter.lovID < 236)) &&
                                                    this.state.lovData.filter(filter => filter.lovGroup === 'REMARK-HELPER').map((data, i) => {
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
                                            <textarea className="form-control limited" id="remark" name="remark" maxLength="2000" value={this.state.remark} onChange={(e) => this.setState({ remark: e.target.value})}>
                                            </textarea>
                                        </div>
                                    </div>
                                    {/* <!--<input type="text" name="remark" placeholder="Text Field" className="form-control" />--> */}
                                    {(this.state.isCaseOwner || this.state.isCoordinator || this.state.isAdmin) &&
                                        <div>
                                            <div className="col-sm-3" style={{ padding: 0 }}>
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="caseStatusID" id="caseStatusID" value={this.state.caseStatusType} onChange={(e) => this.setState({ caseStatusType: e.target.value })}>
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
                                            <div className="col-sm-4" style={{ paddingLeft: 5 }} id="closureType">
                                                <div className="form-group">
                                                    <select className="chosen-select form-control" name="ctID" value={this.state.closureType} onChange={(e) => this.setState({ closureType: e.target.value })}>
                                                        <option value="0">Choose a Closure Type...</option>	
                                                        {this.state.lovData.filter( filter => filter.lovID > 427 && filter.lovID < 489) &&
                                                         this.state.lovData.filter( filter => filter.lovGroup === 'CLOSURE-TYPE').map( data => {
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
                <Footer />
            </div>
        )
    }
}

export default ActionTaken;