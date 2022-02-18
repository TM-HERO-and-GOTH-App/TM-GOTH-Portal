import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class InviteChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            caseDetailData: {},
            groupMembers: [],
            stakeholderType: 0,
            alertStatus: false,
            alertMessage: '',
        }
        this.getGroupMembers = this.getGroupMembers.bind(this);
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.inviteToGroup = this.inviteToGroup.bind(this);
    }

    componentDidMount() {
        this.getGroupMembers();
        this.getCaseDetail();
    }

    componentWillUnmount() {
        this.getGroupMembers();
        this.getCaseDetail();
    }

    getGroupMembers() {
        ChatService.getProfilesByGroupChat(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ groupMembers: res })
        });
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            // console.log(res)
            this.setState({ caseDetailData: res })
        })
    }

    inviteToGroup() {
        const shID = this.state.shID.shID
        ManageUserService.inviteToGroup(this.state.token, '', shID).then(res => {
            if (res === null) {
                this.setState({
                    alertStatus: true,
                    alertMessage: 'Only case owner or group coordinator can do the invitation.'
                })
            } else {
                this.setState({
                    alertStatus: true,
                    alertMessage: 'The user has been successfully invited.'
                })
            }
        })
    }

    render() {
        return (
            <Layout pageContent={
                <div>

                    <div className="row">
                        <div className="col-sm-4">
                            <Link className="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                                <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                                Back to Case Detail
                            </Link>
                        </div>
                    </div>
                    <div className="space-10"></div>
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                {(this.state.caseDetailData.ownerName !== null) ?
                                    <div className="profile-info-row">
                                        <div className="profile-info-name">CASE OWNER</div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="username"><b>
                                                {this.state.caseDetailData.ownerName + ' - ' + this.state.caseDetailData.stakeholderName}
                                            </b></span>
                                        </div>
                                    </div> :

                                    this.state.caseDetailData.stakeholderName !== null &&
                                    <div>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">GROUP POOL</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username"><b>
                                                    {this.state.caseDetailData.stakeholderName}
                                                </b></span>
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
                                    <div className="profile-info-name"> HERO Name </div>

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
                                            {this.state.caseDetailData.caseStatus}
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
                            </div>
                        </div>

                    </div>{/* // <!-- /.row --> */}
                    <div className="space-20"></div>
                    <a name="group-chat-members" href='#' />
                    <div className="page-header">
                        <h1>G-Chat (Collaboration) Members</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            {this.state.alertStatus &&
                                <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                                    <button type="button" className="close" data-dismiss="alert">
                                        <i className="ace-icon fa fa-times"></i>
                                    </button>
                                    <p>
                                        {this.state.alertMessage}
                                    </p>
                                </div>
                            }
                        </div>
                        <div className="col-xs-12">
                            <p>Users in the list below are able to view the Case in "My Collaboration" Tab</p>
                            <table id="simple-table" className="table  table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="5%"><div align="center">#</div></th>
                                        <th width="35%">Fullname</th>
                                        <th width="30%">Nickname</th>
                                        <th width="20%"><div align="center">Group</div></th>
                                        <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark"></i></div></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.groupMembers.length === 1 ?
                                        <tr><td colSpan="4"><span style={{ color: "red" }}>Group Chat User for this case is Empty</span></td></tr>
                                        :
                                        this.state.groupMembers.map((data, i) => {
                                            i += 1;
                                            return <tr>
                                                <td><div align="center">
                                                    {i}
                                                </div></td>
                                                <td>
                                                    {data.fullName}
                                                </td>
                                                <td>
                                                    {data.nickName}
                                                </td>
                                                <td><div align="center">
                                                    {data.stakeholderName}
                                                </div></td>
                                                <td><div align="center">
                                                    <button className="btn btn-minier btn-danger" onclick="redirect('<?php echo APPNAME; ?>/chat/removefromgroup/<?php echo $cToken; ?>/<?php echo $invitedMembers[$i]['hToken']; ?>/')">
                                                        Remove
                                                    </button>
                                                </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>{/* // <!-- /.span --> */}
                    </div>
                    <div className="space-20"></div>
                    <a href='#' name="group-members" />
                    <div className="page-header">
                        <h1>Group Members</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <form name="form" onClick={this.getGroupMembers}>
                                <select className="chosen-select form-control" name="shID" dataplaceholder="Choose a Group..." value={this.state.stakeholderType} onChange={(e) => this.setState({ stakeholderType: e.target.value })}>
                                    <option value="0">All Group/Stakeholder ...</option>
                                    {this.state.lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map(data => {
                                        return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                    })}
                                </select>
                            </form>
                        </div>
                        <div className="col-sm-9" align="right" />

                        <div className="space-20" />

                        <div className="col-xs-12">

                            <table id="simple-table" className="table  table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width="5%"><div align="center">#</div></th>
                                        <th width="35%">Fullname</th>
                                        <th width="20%">Email</th>
                                        <th width="15%">Position</th>
                                        <th width="15%"><div align="center">Group</div></th>
                                        <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark"></i></div></th>
                                    </tr>
                                </thead>
                                {this.state.stakeholderType &&
                                    <tbody>
                                        {(this.state.groupMembers[0].response === 'FAILED' || this.state.stakeholderType === '0') ?
                                            <tr><td colSpan="6"><span style={{ color: "red" }}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
                                            :
                                            this.state.groupMembers.map((data, i) => {
                                                i += 1;
                                                return <tr>
                                                    <td><div align="center">
                                                        {i}
                                                    </div></td>
                                                    <td>
                                                        {data.fullName}
                                                    </td>
                                                    <td>
                                                        {data.email}
                                                    </td>
                                                    <td>
                                                        {data.positionName === 'Admin' ? <span className="label label-warning arrowed-right">{data.positionName}</span> : data.positionName}
                                                        {this.state.caseDetailData.oID === data.hID ? '(Owner)' : ''}
                                                        {/* <?php echo ( $ci['oID'] == $teamMembers[$i]['hID'] ) ? ' (Owner)' : ''; ?> */}
                                                    </td>
                                                    <td><div align="center">
                                                        {data.stakeholderName}
                                                    </div></td>
                                                    <td>
                                                        <div align="center">
                                                            {data.hToken && this.state.caseDetailData.oID !== data.hID &&
                                                                <button className="btn btn-minier btn-yellow" onClick={this.inviteToGroup}>
                                                                    Invite
                                                                </button>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            }
            />
        )
    }
}

export default InviteChat;