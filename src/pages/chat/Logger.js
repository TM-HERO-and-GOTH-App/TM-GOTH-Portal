import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class Logger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            shID: JSON.parse(sessionStorage.getItem('UserData')),
            caseDetailData: {},
            messageData: [],
            alertStatus: false,
            alertMessage: '',
            statusBadge: '',
            isCaseOwner: '',
            isCoordinator: '',
            isAdmin: '',
            userMessage: '',
            remarkTextType: '0'
        }
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.pushMessage = this.pushMessage.bind(this);
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

    getMessage() {
        ChatService.pullChatMessage(this.state.token, this.state.caseToken, 'FE').then(res => {
            console.log(res)
            this.setState({ messageData: res });
        })
    }

    pushMessage(e){
        e.preventDefault();
        ChatService.pushChatMessage(this.state.token, this.state.caseToken, this.state.userMessage).then(res => {
            console.log(res);
            if(res[0].response === 'FAILED'){
                this.setState({
                    alertStatus: true,
                    alertMessage: 'Opss, chat message failed to send',
                    statusBadge: 'danger'
                })
            } else{
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
                        <Link className="btn btn-yellow" to={`/internal-chat/${this.state.caseToken}`}>
                            <i className="ace-icon fa fa-exchange"></i>
                            Switch to Internal Chat
                        </Link>
                    </div>
                </div>
                <div className="space-6"></div>
                {(this.state.caseDetailData.caseStatus === 'NEW' || this.state.caseDetailData.caseStatus === 'ASSIGNED' || this.state.caseDetailData.caseStatus === 'IN-PROGRESS') ?
                    <form name="form" onSubmit={this.pushMessage}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <h4 className="black smaller">Chat Message (with Logger)</h4>
                                    {/* <!--<input type="text" name="message_fe" placeholder="Text Field" className="form-control" />--> */}
                                    <div className="form-group">
                                        <select className="chosen-select form-control" id="remarkText" value={this.state.remarkTextType} onchange={(e) => this.setState({ remarkTextType: e.target.value })}>
                                            <option value="0">Please select Remark Text Helper (if any)...</option>
                                            {this.state.lovData.filter(filter => filter.lovID > 421 && filter.lovID < 426) &&
                                                this.state.lovData.filter(filter => filter.lovGroup === 'REMARK-HELPER').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                })
                                            }
                                        </select>
                                        <div className="space-2"/>
                                        <textarea value={this.state.userMessage} onChange={(e) => this.setState({ userMessage: e.target.value })} className="form-control limited" id="message_fe" name="message_fe" maxlength="2000"></textarea>
                                    </div>

                                    <div className="space-2"></div>
                                    <button type='submit' className="btn btn-sm btn-success">
                                        <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                        Post New Message
                                    </button>
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
                        <div className="space-10"></div>
                    </div>
                }
                <a name="chat-ls"/>
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
                    <div className="space-10"/>
                </div>
                }
                <div className="row">
                    <div className="col-sm-12">
                        {this.state.messageData === null ?
                            <i style={{color:"red"}}>HERO Chat is empty</i>
                            :
                            this.state.messageData.map(data => {
                                return <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ width: "10" }}><b>Posted Date</b></div>
                                        <div className="profile-info-value" style={{ width: "40%" }}><b>Message</b></div>
                                        <div className="profile-info-value" style={{ width: "20%" }}><b>Posted By</b></div>
                                        <div className="profile-info-value" align="center" style={{ width: "10%" }}><b>Attachment</b></div>
                                    </div>
                                    <div className="profile-info-row">
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
                                            {data.bID ? <a target="_blank" href={data.filename}><i className="ace-icon fa fa-download"></i></a> : '-'}
                                        </div>

                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="space-8" />
                <Footer />
                {/* <!--<span className="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> --> */}
            </div>
        )
    }
}

export default Logger;