import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class AssignToOther extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            userData: JSON.parse(sessionStorage.getItem('UserData')),
            caseDetailData: {},
            groupMember: [],
            alertStatus: false,
            alertMessage: '',
            badge: '',
            caseOwner: {},
            isCoordinator: [],
            isAdmin: [],
            stakeholderGroup: '0',
        }
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
        this.assignCaseToAgent = this.assignCaseToAgent.bind(this);
        this.assignToPool = this.assignToPool.bind(this);
    }

    componentDidMount() {
        this.getCaseDetail();
        this.getGroupResult();
    }

    getGroupResult() {
        const shID = this.state.userData.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            // console.log(res);
            this.setState({
                groupMember: res,
                isCoordinator: res.filter(filter => filter.positionName === "Coordinator"),
                isAdmin: res.filter(filter => filter.positionName === "Admin")
            })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            // console.log(res)
            this.setState({ caseDetailData: res, caseOwner: res.ownerName })
        })
    }

    assignCaseToAgent(e) {
        e.preventDefault();
        const hID = this.state.groupMember.map(data => data.hID);
        const shID = this.state.groupMember.map(data => data.shID);

        CaseDetailService.assignToAgent(this.state.token, this.state.caseToken, hID, shID).then(res => {
            console.log(res)
            if (res.response === 'FAILED') {
                return this.setState({
                    alertStatus: true,
                    alertMessage: 'Only case owner or group coordinator can do the case assignment',
                    badge: 'danger'
                })
            } else {
                return this.setState({
                    alertStatus: true,
                    alertMessage: 'The case has been successfully assigned to the person',
                    badge: 'success'
                })
            }
        })
    }

    assignToPool(e) {
        e.preventDefault();
        CaseDetailService.transferOwnership(this.state.token, this.state.caseToken, this.state.userData.shID).then(res => {
            console.log(res);
            if (res.response === 'FAILED') {
                this.setState({
                    alertStatus: true,
                    alertMessage: 'Only case owner or group coordinator can do the case assignment',
                    badge: 'danger'
                })
            } else {
                this.setState({
                    alertStatus: true,
                    alertMessage: 'The case has been successfully assigned to this group pool',
                    badge: 'success'
                })
            }
        })
    }

    render() {
        return (
            <Layout pageContent={
                <div>

                    <div class="row">
                        <div class="col-sm-4">
                            <Link class="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                                <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                                Back to Case Detail
                            </Link>
                        </div>
                    </div>

                    <div class="space-10" />

                    <div class="row">
                        <div class="col-sm-12">
                            {this.state.alertStatus === true &&
                                <div class={`alert alert-block alert-${this.state.badge}`}>
                                    <button type="button" class="close" data-dismiss="alert">
                                        <i class="ace-icon fa fa-times"></i>
                                    </button>
                                    <p>
                                        {this.state.alertMessage}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>{/* <!-- /.row --> */}

                    <a href='#' name="group-members" />

                    <div class="page-header">
                        <h1>Group Members</h1>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <form name="form" method="POST">
                                <select class="chosen-select form-control" name="shID" dataPlaceholder="Choose a Group..." value={this.state.stakeholderGroup} onChange={(e) => this.setState({ stakeholderGroup: e.target.value })}>
                                    <option value="0">All Group/Stakeholder ...</option>
                                    {this.state.lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map(data => {
                                        return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                    })}
                                </select>
                            </form>
                        </div>
                        <div class="col-sm-9" align="right">
                            {(this.state.caseOwner || this.state.isAdmin || this.state.isCoordinator) &&
                                <button class="btn btn-sm btn-danger" onClick={this.assignToPool}>
                                    <i class="ace-icon fa fa-exchange" />
                                    Assign To Group Pool
                                </button>
                            }
                        </div>

                        <div class="space-20" />

                        <div class="col-xs-12">
                            <table id="simple-table" class="table  table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="5%"><div align="center">#</div></th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Position</th>
                                        <th><div align="center">Group</div></th>
                                        <th width="10%"><div align="center"><i class="ace-icon fa fa-cog"></i></div></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.groupMember.length === 1 ?
                                        <tr><td colSpan="4"><span style={{ color: "red" }}>Selection NOT Allowed. Please select Group/Stakeholder</span></td></tr>
                                        :
                                        this.state.stakeholderGroup && this.state.groupMember.map((data, i) => {
                                            i += 1;
                                            return <tr>
                                                <td>
                                                    <div align="center">
                                                        {i}
                                                    </div>
                                                </td>
                                                <td>
                                                    {data.fullName}
                                                </td>
                                                <td>
                                                    {data.email}
                                                </td>
                                                <td>
                                                    {data.positionName === 'Admin' ? <span class="label label-warning arrowed-right">{data.positionName}</span> : data.positionName}
                                                </td>
                                                <td>
                                                    <div align="center">
                                                        {data.stakeholderName}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div align="center">
                                                        {(data.positionName === "Admin" || data.positionName === "Coordinator") &&
                                                            this.state.caseOwner !== data.fullName && <button class="btn btn-minier btn-yellow" onClick={this.assignCaseToAgent}>Assign</button>
                                                        }
                                                        {this.state.caseOwner === data.fullName && <span class="badge badge-info">Owner</span>}
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>{/* <!-- /.span --> */}
                    </div>
                </div>
            }
            />
        )
    }
}

export default AssignToOther;