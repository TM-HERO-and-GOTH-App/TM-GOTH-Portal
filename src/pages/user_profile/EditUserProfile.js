import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import UpdateProfileService from '../../web_service/update_profile_service/UpdateProfile';
import {Link} from 'react-router-dom'
import moment from 'moment'
import LoginService from "../../web_service/login_service/LoginService";

function EditUser(props) {
	const [userData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
	const [lovData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
	const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')));
	const [emailInput, setEmailInput] = useState('');
	const [mobileNumberInput, setMobileNumberInput] = useState('');
	const [mobileNumberInput2, setMobileNumberInput2] = useState('')
	const [nameInput, setNameInput] = useState('');
	const [nickNameInput, setNicknameInput] = useState('');
	const [divisionOption, setDivisionOption] = useState('0');
	const [stateOption, setStateOption] = useState('0');
	const [alertStatus, setAlertStatus] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertBadge, setAlertBadge] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		UpdateProfileService.updateAgentProfile(token, mobileNumberInput2, nickNameInput)
				.then(() => {
					updateSessionStorage()
				})
	}

	const updateSessionStorage = () => {
		LoginService.getUserProfile(token).then((res) => {
			const data = res.data[0]
			if (data.category !== "STAKEHOLDER") {
				console.log("Your account is not yet registered as Stakeholder");
				setAlertStatus(true)
				alertMessage('Failed to Updated')
				setAlertBadge('danger')
			} else {
				setAlertStatus(true)
				setAlertMessage("User's profile has been successfully updated.")
				setAlertBadge('success')
				sessionStorage.setItem("UserData", JSON.stringify(data));
			}
		});
	};

	const initialLoad = () => {
		setNameInput(userData.fullName)
		setNicknameInput(userData.nickname)
		setMobileNumberInput(userData.mobileNum)
		setMobileNumberInput2(userData.altMobileNum)
		setDivisionOption(userData.divisionID)
		setStateOption(userData.stateID)
	}

	useEffect(() => {
		initialLoad()
	}, [])

	moment.locale('en')

	return (
			<Layout pageContent={
				<>
					{alertStatus &&
							<div className="row">
								<div className="col-sm-12">
									<div className={`alert alert-block alert-${alertBadge}`}>
										<button type="button" className="close" data-dismiss="alert">
											<i className="ace-icon fa fa-times"/>
										</button>
										<p>{alertMessage}</p>
									</div>
								</div>
								<br/><br/>
								<div className="space-10"/>
							</div>
					}

					<form onSubmit={handleSubmit}>
						<div className="col-xs-12 col-sm-6">
							<div className="left">
								<Link className="btn btn-sm btn-primary" to='/user-profile'>
									<i className="ace-icon fa fa-user align-top bigger-125"></i>
									View Profile
								</Link>

								<button className="btn btn-sm btn-success" type="submit" name="btn_post">
									<i className="ace-icon fa fa-save align-top bigger-125"></i>
									Update Profile
								</button>
							</div>

							<div className="space-6"/>

							<div className="profile-user-info profile-user-info-striped" style={{margin: '0px'}}>

								<div className="profile-info-row">
									<div className="profile-info-name" style={{width: '20%'}}> Email</div>

									<div className="profile-info-value">
										<span className="editable" id="username">{userData.email}</span>
										<input type="hidden" name="email" value={emailInput}
										       onChange={(e) => setEmailInput(e.target.value)}/>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Level</div>

									<div className="profile-info-value">
										<span className="editable" id="username">{userData.level}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Rank</div>

									<div className="profile-info-value">
										<span className="editable" id="username">{userData.RANK}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Score</div>

									<div className="profile-info-value">
										<span className="editable" id="username">{userData.score}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Group</div>

									<div className="profile-info-value">
										<span className="editable" id="username">{userData.stakeholderName}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Joined Date</div>

									<div className="profile-info-value">
										<span className="editable"
										      id="signup">{moment(userData.registeredDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Last Logged In</div>

									<div className="profile-info-value">
										<span className="editable" id="login">{userData.lastLoggedIn}</span>
									</div>
								</div>
							</div>

							<div className="space-20"/>

						</div>
						<div className="col-xs-12 col-sm-6">
							<div className="left" style={{height: "35px"}}>
							</div>
							<div className="space-6"></div>

							<div className="profile-user-info profile-user-info-striped" style={{margin: "0px"}}>
								<div className="profile-info-row">
									<div className="profile-info-name" style={{width: "20%"}}> Fullname</div>
									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="fullName"
                                               placeholder="Fullname" value={nameInput}
                                               onChange={(e) => setNameInput(e.target.value)}
                                               disabled
                                        />
                                    </span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name">Nickname</div>

									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="nickName"
                                               placeholder="Nickname" value={nickNameInput}
                                               onChange={(e) => setNicknameInput(e.target.value)}/>
                                    </span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Mobile No</div>
									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="mobileNum"
                                               placeholder="Mobile Number" value={mobileNumberInput}
                                               onChange={(e) => setMobileNumberInput(e.target.value)}
                                               disabled
                                        />
                                    </span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name">Alternate Mobile No</div>
									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text"
                                               name="mobileNum2"
                                               placeholder="Alternate Mobile Number" value={mobileNumberInput2}
                                               onChange={(e) => setMobileNumberInput2(e.target.value)}/>
                                    </span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> Division</div>
									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="divisionID"
                                                value={divisionOption}
                                                onChange={(e) => setDivisionOption(e.target.value)}
                                                disabled
                                        >
                                            <option value="0">Choose a Division...</option>
	                                        {
		                                        lovData.filter(filter => filter.L_GROUP === 'DIVISION').map((data, index) => {
			                                        return <option value={data.L_ID} key={index}>{data.L_NAME}</option>
		                                        })
	                                        }
                                        </select>
                                    </span>
									</div>
								</div>

								<div className="profile-info-row">
									<div className="profile-info-name"> State</div>
									<div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="inputs[stateID]"
                                                value={stateOption} onChange={(e) => setStateOption(e.target.value)}
                                                disabled
                                        >
                                            <option value="0">Choose a State...</option>
	                                        {
		                                        lovData.filter(filter => filter.L_GROUP === 'AREA-LOCATION').map((data, index) => {
			                                        return <option value={data.L_ID} key={index}>{data.L_NAME}</option>

		                                        })
	                                        }
                                        </select>

                                    </span>
									</div>
								</div>
							</div>
							<div className="space-20"/>
						</div>
					</form>
				</>
			}
			/>
	)
}

export default EditUser;