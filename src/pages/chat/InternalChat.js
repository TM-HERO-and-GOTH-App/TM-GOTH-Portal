import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class InternalChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(sessionStorage.getItem('userToken')),
            shID: JSON.parse(sessionStorage.getItem('UserData')),
            caseToken: this.props.match.params.id,
            caseDetailData: {},
            messageData: [],
            groupMember: [],
            isCaseOwner: '',
            isCoordinator: '',
            isAdmin: '',
            userMessage: '',
        }
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.getCaseDetail();
        this.getGroupResult();
        this.getMessage();
    }

    componentWillUnmount(){
        this.getCaseDetail();
        this.getGroupResult();
        this.getMessage();
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            console.log(res);
            this.setState({ groupMember: res })
            this.setState({ isCoordinator: res.filter(filter => filter.positionName === 'Coordinator') })
            this.setState({ isAdmin: res.filter(filter => filter.positionName === 'Admin') })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res })
            this.setState({ isCaseOwner: res.ownerName })
        })
    }

    getMessage(){
        ChatService.pullChatMessage(this.state.token, this.state.caseToken, 'FE').then(res => {
            console.log(res)
            this.setState({ messageData: res });
        })
    }

    sendMessage(){
        ChatService.pushChatMessage(this.state.token, this.state.caseToken, this.state.userMessage, '')
        .then(res => {
            console.log(res);
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div class="row">
                    <div class="col-sm-12">
                        <Link class="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </Link>
                        <Link class="btn btn-yellow" to={`/hero-chat/${this.state.caseToken}`}>
                            <i class="ace-icon fa fa-exchange"></i>
                            Switch to HERO Chat
                        </Link>
                    </div>
                </div>
                <div class="space-6" />
                {(this.state.caseDetailData.caseStatus === 'NEW' || this.state.caseDetailData.caseStatus === 'ASSIGNED' || this.state.caseDetailData.caseStatus === 'IN-PROGRESS') ? 
                    <form name="form" onSubmit={this.sendMessage}>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="well">
                                    <h4 class="black smaller">Chat Message (Internal)</h4>
                                    {/* <!--<input type="text" name="message_be" placeholder="Text Field" class="form-control" />--> */}
                                    <div class="form-group">
                                        <textarea class="form-control limited" id="message_be" name="message_be" maxLength="2000"></textarea>
                                    </div>
                                    <div class="space-2"></div>
                                    <button class="btn btn-sm btn-success">
                                        <i class="ace-icon fa fa-save align-top bigger-125"></i>
                                        Post New Message</button>
                                    {(this.state.isCaseOwner || this.state.isCoordinator || this.state.isAdmin) &&
                                        <Link class="btn btn-sm btn-danger" to={`/invite-to-group-chat/${this.state.caseToken}`}>Invite User to G-Chat (Collaboration)</Link>
                                    }                     
                                </div>
                            </div>{/* <!-- /.col --> */}
                        </div>
                    </form>
                    :
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="alert alert-block alert-danger">
                                <p>Case has been CLOSED & LOCKED</p>
                            </div>
                        </div>
                        <br />
                        <div class="space-10"/>
                    </div>
                    }

                <a href="#" name="chat-ls"/>
                {/* <?php if ( isset($alertStatus) && !empty($alertMessage) ): ?> */}
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
                    <div class="space-10"/>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>
                            <div class="profile-info-row">
                                <div class="profile-info-name" style={{width:'10%'}}><b>Posted Date</b></div>
                                <div class="profile-info-value" style={{width:'40%'}}><b>Message</b></div>
                                <div class="profile-info-value" style={{width:'20%'}}><b>Posted By</b></div>
                                <div class="profile-info-value" align="center" style={{width:'10%'}}><b>Attachment</b></div>
                            </div>
                            {this.state.messageData.map( data => {
                                return <div class="profile-info-row">
                                    <div class="profile-info-name">
                                        {data.postedDate}
                                    </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="username">
                                            {data.message}
                                        </span>
                                    </div>
                                    <div class="profile-info-value">
                                        <span class="editable" id="username">
                                            {data.fullName}
                                        </span>
                                    </div>
                                    <div class="profile-info-value" align="center">
                                        {data.bID ? <a target="_blank" rel='noreferrer' href={`${data.filename}`}><i class="ace-icon fa fa-download"></i></a> : '-'}
                                    </div>
                                </div>
                            })}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <div class="space-8"/>
                <Footer/>
                {/* <span class="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> */}
            </div>
        )
    }
}

export default InternalChat;