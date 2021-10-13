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
            alertStatus: false,
            alertMessage: '',
            statusBadge: '',
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

    componentWillUnmount() {
        this.getCaseDetail();
        this.getGroupResult();
        this.getMessage();
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            console.log(res);
            this.setState({ 
                groupMember: res,
                isCoordinator: res.filter(filter => filter.positionName === "Coordinator"),
                isAdmin: res.filter(filter => filter.positionName === "Admin")
            })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res, isCaseOwner: res.ownerName })
        })
    }

    getMessage() {
        ChatService.pullChatMessage(this.state.token, this.state.caseToken, 'FE').then(res => {
            console.log(res)
            this.setState({ messageData: res });
        })
    }

    sendMessage(e) {
        e.preventDefault();
        ChatService.pushChatMessage(this.state.token, this.state.caseToken, this.state.userMessage, 'BE', '')
            .then(res => {
                // console.log(res);
                if (res[0].response === 'FAILED') {
                    this.setState({
                        alertStatus: true,
                        alertMessage: 'Opss, chat message failed to send',
                        statusBadge: 'danger'
                    })
                } else {
                    this.setState({
                        alertStatus: true,
                        alertMessage: 'Chat message has been posted',
                        statusBadge: 'success'
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col-sm-12">
                        <Link className="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                            <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </Link>
                        <Link className="btn btn-yellow" to={`/hero-chat/${this.state.caseToken}`}>
                            <i className="ace-icon fa fa-exchange"></i>
                            Switch to HERO Chat
                        </Link>
                    </div>
                </div>
                <div className="space-6" />
                {(this.state.caseDetailData.caseStatus === 'NEW' || this.state.caseDetailData.caseStatus === 'ASSIGNED' || this.state.caseDetailData.caseStatus === 'IN-PROGRESS') ?
                    <form name="form" onSubmit={this.sendMessage}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <h4 className="black smaller">Chat Message (Internal)</h4>
                                    {/* <!--<input type="text" name="message_be" placeholder="Text Field" className="form-control" />--> */}
                                    <div className="form-group">
                                        <textarea className="form-control limited" id="message_be" name="message_be" maxLength="2000" value={this.state.userMessage} onChange={(e) => this.setState({ userMessage: e.target.value })}></textarea>
                                    </div>
                                    <div className="space-2"></div>
                                    <button className="btn btn-sm btn-success">
                                        <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                        Post New Message</button>
                                    {(this.state.isCaseOwner || this.state.isCoordinator || this.state.isAdmin) &&
                                        <Link className="btn btn-sm btn-danger" to={`/invite-to-group-chat/${this.state.caseToken}`}>Invite User to G-Chat (Collaboration)</Link>
                                    }
                                </div>
                            </div>{/* <!-- /.col --> */}
                        </div>
                    </form>
                    :
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="alert alert-block alert-danger">
                                <p>Case has been CLOSED & LOCKED</p>
                            </div>
                        </div>
                        <br />
                        <div className="space-10" />
                    </div>
                }

                <a href="#" name="chat-ls" />
                {this.state.alertStatus &&
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
                        <div className="space-10" />
                    </div>
                }

                <div className="row">
                    <div className="col-sm-12">
                        <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '10%' }}><b>Posted Date</b></div>
                                <div className="profile-info-value" style={{ width: '40%' }}><b>Message</b></div>
                                <div className="profile-info-value" style={{ width: '20%' }}><b>Posted By</b></div>
                                <div className="profile-info-value" align="center" style={{ width: '10%' }}><b>Attachment</b></div>
                            </div>
                            {this.state.messageData.map(data => {
                                return <div className="profile-info-row">
                                    <div className="profile-info-name">
                                        {data.postedDate}
                                    </div>

                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                            {data.message}
                                        </span>
                                    </div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                            {data.fullName}
                                        </span>
                                    </div>
                                    <div className="profile-info-value" align="center">
                                        {data.bID ? <a target="_blank" rel='noreferrer' href={`${data.filename}`}><i className="ace-icon fa fa-download"></i></a> : '-'}
                                    </div>
                                </div>
                            })}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <div className="space-8" />
                <Footer />
                {/* <span className="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> */}
            </div>
        )
    }
}

export default InternalChat;