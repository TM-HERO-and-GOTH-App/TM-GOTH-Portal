import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import { Link } from 'react-router-dom';

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
        }
        this.getGroupMembers = this.getGroupMembers.bind(this);
        this.getCaseDetail = this.getCaseDetail.bind(this);
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

    render() {
        return (
            <div>
                <Header/>
                <div class="row">
                    <div class="col-sm-4">
                        <Link class="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </Link>
                    </div>
                </div>
                <div class="space-10"></div>
                <div class="row">
                    <div class="col-sm-7">
                        <div class="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                            {(this.state.caseDetailData.ownerName !== null) ?
                                <div class="profile-info-row">
                                    <div class="profile-info-name">CASE OWNER</div>
                                    <div class="profile-info-value">
                                        <span class="editable" id="username"><b>
                                            {this.state.caseDetailData.ownerName + ' - ' + this.state.caseDetailData.stakeholderName}
                                        </b></span>
                                    </div>
                                </div> :

                                this.state.caseDetailData.stakeholderName !== null &&
                                <div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">GROUP POOL</div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username"><b>
                                                {this.state.caseDetailData.stakeholderName}
                                            </b></span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name">CASE OWNER</div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username"><i style={{ color: 'red' }}>Un-Assigned</i></span>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div class="profile-info-row">
                                <div class="profile-info-name"> HERO Name </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {this.state.caseDetailData.fullname}
                                    </span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Customer </div>

                                <div class="profile-info-value">
                                    {this.state.caseDetailData.customerName}
                                </div>
                            </div>


                            <div class="profile-info-row">
                                <div class="profile-info-name"> Descriptions </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="login"><i style={{ color: "blue" }}>
                                        {this.state.caseDetailData.caseContent}
                                    </i></span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Case Status </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="login">
                                        {this.state.caseDetailData.caseStatus}
                                    </span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Created Date </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="about">
                                        {this.state.caseDetailData.createdDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>{/* // <!-- /.row --> */}
                <div class="space-20"></div>
                <a name="group-chat-members" href='#' />
                <div class="page-header">
                    <h1>G-Chat (Collaboration) Members</h1>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        {/* <?php if ( isset($alertStatus) && !empty($alertStatus) ): ?> */}
                        <div class="alert alert-block alert-<?php echo $alertStatus; ?>">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {/* <?php echo urldecode($alertMessage); ?> */}
                            </p>
                        </div>
                        {/* <?php endif; ?> */}
                    </div>
                    <div class="col-xs-12">
                        <p>Users in the list below are able to view the Case in "My Collaboration" Tab</p>
                        <table id="simple-table" class="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="5%"><div align="center">#</div></th>
                                    <th width="35%">Fullname</th>
                                    <th width="30%">Nickname</th>
                                    <th width="20%"><div align="center">Group</div></th>
                                    <th width="10%"><div align="center"><i class="ace-icon fa fa-bookmark"></i></div></th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* <?php if( empty($invitedMembers) ){ ?> */}
                                {this.state.groupMembers.length === 1 ?
                                    <tr><td colspan="4"><span style={{ color: "red" }}>Group Chat User for this case is Empty</span></td></tr>
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
                                                <button class="btn btn-minier btn-danger" onclick="redirect('<?php echo APPNAME; ?>/chat/removefromgroup/<?php echo $cToken; ?>/<?php echo $invitedMembers[$i]['hToken']; ?>/')">
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
                <div class="space-20"></div>
                <a href='#' name="group-members"/>
                <div class="page-header">
                    <h1>Group Members</h1>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <form name="form" method="POST">
                            <select class="chosen-select form-control" name="shID" dataplaceholder="Choose a Group..." value={this.state.stakeholderType} onChange={(e) => this.setState({ stakeholderType: e.target.value })}>
                                <option value="0">All Group/Stakeholder ...</option>
                                {this.state.lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map(data => {
                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                })}
                            </select>
                        </form>
                    </div>
                    <div class="col-sm-9" align="right">
                    </div>

                    <div class="space-20"/>

                    <div class="col-xs-12">

                        <table id="simple-table" class="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="5%"><div align="center">#</div></th>
                                    <th width="35%">Fullname</th>
                                    <th width="20%">Email</th>
                                    <th width="15%">Position</th>
                                    <th width="15%"><div align="center">Group</div></th>
                                    <th width="10%"><div align="center"><i class="ace-icon fa fa-bookmark"></i></div></th>
                                </tr>
                            </thead>
                        {this.state.stakeholderType !== 0 && 
                            <tbody>
                                {/* <?php if( empty($teamMembers) ){ ?> */}
                                {this.state.groupMembers.length === 1 ?
                                    <tr><td colspan="6"><span style={{ color: "red" }}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
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
                                                {data.positionName === 'Admin' ? <span class="label label-warning arrowed-right">{data.positionName}</span> : data.positionName}
                                                {this.state.caseDetailData.oID === data.hID ? '(Owner)' : ''}
                                                {/* <?php echo ( $ci['oID'] == $teamMembers[$i]['hID'] ) ? ' (Owner)' : ''; ?> */}
                                            </td>
                                            <td><div align="center">
                                                {data.stakeholderName}
                                            </div></td>
                                            <td><div align="center">
                                                {data.hToken && this.state.caseDetailData.oID !== data.hID && 
                                                    <button class="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/invitetogroup/<?php echo $cToken; ?>/<?php echo $teamMembers[$i]['hToken']; ?>/')">
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
                <Footer/>
            </div>
        )
    }
}

export default InviteChat;