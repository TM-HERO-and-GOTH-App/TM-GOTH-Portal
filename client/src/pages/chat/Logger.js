import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function Logger(props) {
    const [caseToken, setCaseToken] = useState(props.match.params.id);
    const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [caseData, setCaseData] = useState({});
    const [messageData, setMessageData] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertBadge, setAlertBadge] = useState('');
    const [caseOwner, setCaseOwner] = useState('');
    const [isCoordinator, setCoordinator] = useState('');
    const [isAdmin, setAdmin] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [remarkTextOption, setRemarkTextOption] = useState('0');

    useEffect(() => {
        // const getGroupResult = () => {
        //     ManageUserService.getProfileByGroup(token, userData.shID).then(res => {
        //         // console.log(res);
        //         setCoordinator(res.map(map => map.positionName === "Coordinator"))
        //         setAdmin(res.map(map => map.positionName === "Admin"))
        //     })
        // }

        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                // console.log(res)
                setCaseData(res)
                setCaseOwner(res.ownerName)
            })
        }

        const getMessage = () => {
            ChatService.pullChatMessage(token, caseToken, 'FE').then(res => {
                // console.log(res)
                setMessageData(res)
            })
        }

        getCaseDetail();
        // getGroupResult();
        getMessage();
    }, [])




    const sendMessage = (e) => {
        e.preventDefault();
        ChatService.pushChatMessage(token, caseToken, messageInput, 'FE').then(res => {
            // console.log(res);
            if (res[0].response === 'FAILED') {
                setAlertStatus(true)
                setAlertMessage('Opss, chat message failed to send')
                setAlertBadge('danger')
            } else {
                setAlertStatus(true)
                setAlertMessage('Chat message has been posted')
                setAlertBadge('success')
            }
        })
    }

    return (
        <Layout
        pageTitle={
            <span>
                HERO CHATS : <span style={{color: 'green'}}>{caseData.caseNum}</span>
            </span>
        }
        pageContent={
            <>

                <div className="row">
                    <div className="col-sm-12">
                        <Link className="btn btn-primary" to={`/case-detail/${caseToken}`}>
                            <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </Link>
                        <Link className="btn btn-yellow" to={`/internal-chat/${caseToken}`}>
                            <i className="ace-icon fa fa-exchange"></i>
                            Switch to Internal Chat
                        </Link>
                    </div>
                </div>
                <div className="space-6"></div>
                {(caseData.caseStatus === 'NEW' || caseData.caseStatus === 'ASSIGNED' || caseData.caseStatus === 'IN-PROGRESS') ?
                    <form name="form" onSubmit={sendMessage}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="well">
                                    <h4 className="black smaller">Chat Message (with Logger)</h4>
                                    {/* <!--<input type="text" name="message_fe" placeholder="Text Field" className="form-control" />--> */}
                                    <div className="form-group">
                                        <select className="chosen-select form-control" id="remarkText" value={remarkTextOption} onChange={(e) => setRemarkTextOption(e.target.value)}>
                                            <option value="0">Please select Remark Text Helper (if any)...</option>
                                            {
                                                lovData.filter(filter => filter.lovID > 421 && filter.lovID < 426) &&
                                                lovData.filter(filter => filter.lovGroup === 'REMARK-HELPER').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                })
                                            }
                                        </select>
                                        <div className="space-2" />
                                        <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="form-control limited" id="message_fe" name="message_fe" maxlength="2000"></textarea>
                                    </div>

                                    <div className="space-2" />
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
                <a name="chat-ls" />
                {
                    alertStatus &&
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={`alert alert-block alert-${alertBadge}`}>
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
                    <div className="col-sm-12">
                        {
                            messageData?.map(data => {
                                return data.response === "FAILED" ?
                                    <i style={{ color: "red" }}>HERO Chat is empty</i>
                                    :
                                    <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
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
                {/* <!--<span className="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> --> */}
            </>
        }
        />
    )
}
export default Logger;