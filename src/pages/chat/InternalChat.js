import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ChatService from '../../web_service/chat_service/ChatService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

function InternalChat(props) {
	const [caseToken, setCaseToken] = useState(props.match.params.id);
	const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
	const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
	const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
	const [caseData, setCaseData] = useState([]);
	const [messageData, setMessageData] = useState([]);
	const [groupMembers, setGroupMembers] = useState([]);
	const [alertStatus, setAlertStatus] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertBadge, setAlertBadge] = useState('');
	const [caseOwner, setCaseOwner] = useState('');
	const [isCoordinator, setCoordinator] = useState('');
	const [isAdmin, setAdmin] = useState('');
	const [messageInput, setMessageInput] = useState('');

	const sendMessage = (e) => {
		e.preventDefault();
		ChatService.pushChatMessage(token, caseToken, messageInput, 'BE', '')
			.then(res => {
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

	useEffect(() => {
		const getGroupResult = () => {
			ManageUserService.getProfileByGroup(token, userData.shID).then(res => {
				// console.log(res);
				// setGroupMembers(res);
				setCoordinator(res.map(map => map.positionName === "Coordinator"))
				setAdmin(res.map(map => map.positionName === "Admin"))
			})
		}

		const getCaseDetail = () => {
			CaseDetailService.getCaseDetail(token, caseToken).then(res => {
				console.log(res)
				setCaseData(res.data)
				setCaseOwner(res.data.ownerName)
			})
		}

		const getMessage = () => {
			ChatService.pullChatMessage(token, caseToken, 'BE').then(res => {
				// console.log(res)
				setMessageData(res)
			})
		}

		getCaseDetail();
		getGroupResult();
		getMessage();
	}, [])

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
							<Link className="btn btn-yellow" to={`/hero-chat/${caseToken}`}>
								<i className="ace-icon fa fa-exchange"></i>
								Switch to HERO Chat
							</Link>
						</div>
					</div>
					<div className="space-6" />
					{caseData != null &&
						(caseData.caseStatus === 'CLOSED' || caseData.caseStatus === 'CANCELLED') ?
						<div className="row">
							<div className="col-sm-12">
								<div className="alert alert-block alert-danger">
									<p>Case has been CLOSED & LOCKED</p>
								</div>
							</div>
							<br />
							<div className="space-10" />
						</div>
						:
						<form name="form" onSubmit={sendMessage}>
							<div className="row">
								<div className="col-sm-12">
									<div className="well">
										<h4 className="black smaller">Chat Message (Internal)</h4>
										{/* <!--<input type="text" name="message_be" placeholder="Text Field" className="form-control" />--> */}
										<div className="form-group">
											<textarea className="form-control limited" id="message_be" name="message_be"
												maxLength="2000" value={messageInput}
												onChange={(e) => setMessageInput(e.target.value)}></textarea>
										</div>
										<div className="space-2"></div>
										<button className="btn btn-sm btn-success">
											<i className="ace-icon fa fa-save align-top bigger-125"></i>
											Post New Message
										</button>
										{
											(caseOwner || isCoordinator || isAdmin) &&
											<Link className="btn btn-sm btn-danger" to={`/invite-to-group-chat/${caseToken}`}>Invite
												User to G-Chat (Collaboration)</Link>
										}
									</div>
								</div>
								{/* <!-- /.col --> */}
							</div>
						</form>
					}

					<a href="#" name="chat-ls" />
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
							{messageData != null &&
								messageData.map(data => {
									return data.response === 'FAILED' ?
										<i style={{ color: "red" }} align='center'>Internal Chat is empty</i>
										:
										<div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
											<div className="profile-info-row">
												<div className="profile-info-name" style={{ width: '10%' }}><b>Posted Date</b></div>
												<div className="profile-info-value" style={{ width: '40%' }}><b>Message</b></div>
												<div className="profile-info-value" style={{ width: '20%' }}><b>Posted By</b></div>
												<div className="profile-info-value" align="center" style={{ width: '10%' }}>
													<b>Attachment</b></div>
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
													{data.bID ? <a target="_blank" rel='noreferrer' href={`${data.filename}`}><i
														className="ace-icon fa fa-download"></i></a> : '-'}
												</div>
											</div>
										</div>
								})}
							{/* </div> */}
						</div>
					</div>
					<div className="space-8" />
					{/* <span className="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> */}
				</>
			}
		/>
	)
}

export default InternalChat;
