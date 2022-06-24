import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';

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
        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                // console.log(res.data[0])
                setCaseData(res.data[0][0])
                setCaseOwner(res.data.ownerName)
            })
        }

        const getMessage = () => {
            console.log(caseData.C_ID)
            ChatService.pullChatMessage(token, caseData.C_ID).then(res => {
                // console.log(res)
                setMessageData(res.data)
            })
        }

        getCaseDetail();
        // getGroupResult();
        getMessage();
    }, [messageData])




    const sendMessage = (e) => {
        e.preventDefault();
        console.log(caseData.C_ID)
        ChatService.pushChatMessage(token, caseData.C_ID, messageInput, userData.hID).then(res => {
            // console.log(res);
            if (res.status === 404) {
                setAlertStatus(true)
                setAlertMessage('Opss, chat message failed to send')
                setAlertBadge('danger')
            } else {
                setAlertStatus(true)
                setAlertMessage(res.data)
                setAlertBadge('success')
            }
        })
    }

    return (
        <Layout
            pageTitle={
                <span>
                    HERO CHATS : <span style={{ color: 'green' }}>{caseData != null && caseData.caseNum}</span>
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
                        </div>
                    </div>
                    <div className="space-6"></div>
                    {caseData != null &&
                        (caseData.caseStatus === 'CLOSED' || caseData.caseStatus === 'CANCELLED') ?
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="alert alert-block alert-danger">
                                    <p>Case has been CLOSED & LOCKED</p>
                                </div>
                            </div>
                            <br />
                            <div className="space-10"></div>
                        </div>
                        :
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
                                                    lovData.filter(filter => filter.L_ID > 421 && filter.L_ID < 426) &&
                                                    lovData.filter(filter => filter.L_GROUP === 'REMARK-HELPER').map(data => {
                                                        return <option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
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
                            {   messageData === [] ? 
                                <i style={{ color: "red" }}>HERO Chat is empty</i> :
                                messageData?.map(data => {
                                    const date = new Date(data?.SENT_TIME)
                                    const formattedDate = date.toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    return <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name" style={{ width: "10" }}><b>Posted Date</b></div>
                                            <div className="profile-info-value" style={{ width: "40%" }}><b>Message</b></div>
                                            <div className="profile-info-value" style={{ width: "20%" }}><b>Posted By</b></div>
                                            <div className="profile-info-value" align="center" style={{ width: "10%" }}><b>Attachment</b></div>
                                        </div>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">
                                                {formattedDate}
                                            </div>

                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.MESSAGE}
                                                </span>
                                            </div>

                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    {data.SOURCE}
                                                </span>
                                            </div>

                                            {/* <div className="profile-info-value" align="center">
                                                    {data.bID ? <a target="_blank" href={data.filename}><i className="ace-icon fa fa-download"></i></a> : '-'}
                                                </div> */}

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
