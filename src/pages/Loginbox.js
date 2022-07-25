import React, { useState, useEffect } from "react";
import LoginTheme from "../utils/login-page-placeholder/LoginTheme";
import LoginService from "../web_service/login_service/LoginService";
import CircularProgress from '@mui/material/CircularProgress';

function Loginbox(props) {
	const [alertStatus, setAlertStatus] = useState(false);
	const [isValidating, setIsValidating] = useState(false);
	const [successLogin, setSuccessLogin] = useState(true);
	const [alertMessage, setAlertMessage] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	useEffect(() => {
		document.title = "Login - HERO Portal";
		return () => document.title = "HER0 Portal";
	}, []);

	const handleEmail = (e) => {
		setUserEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setUserPassword(e.target.value);
	};

	// Make a base logic and then pass the data down through parameters
	// The logic is identical to HERO login logic
	const handleSubmit = (email, password) => e => {
		setIsValidating(true);
		e.preventDefault();
		return ldapAuth(email, password);
		// return auth(email, password);
	};

	function createLdapProfile(email) {
		LoginService.validateAccount('first-time-login', '', email).then(res => {
			if (res.data[0].response === 'OK') {
				return auth(email)
			}
			setSuccessLogin(false)
			setIsValidating(false);
			setAlertStatus(true)
			setAlertMessage('Email is not registered in DB');
			return;
		})
	}

	// LDAP Auth
	function ldapAuth(id, password) {
		LoginService.ldapLogin(id, password).then((res, err) => {
			console.log(res)
			if(res.response.status === '502' || res.response.statusText === "Bad Gateway") {
				setSuccessLogin(false)
				setIsValidating(false);
				setAlertStatus(true);
				setAlertMessage('Your Password has expired!!');
				return;
			}
			if (err && res === {} && res === undefined && res === null) {
				setSuccessLogin(false)
				setIsValidating(false);
				setAlertStatus(true);
				setAlertMessage('An error has happened!!');
				return;
			}
			if(res.data[0].message !== 'User successfully login to GOTH!!'){
				setSuccessLogin(false)
				setIsValidating(false);
				setAlertStatus(true);
				setAlertMessage('If you are a first time logger then click "First Time Logger". If not, the please click "Login Using email and password".');
				return;
			}
			localStorage.setItem('userData', JSON.stringify(res.data.userAttribute));
			return verifyEmail(res.data[0].userAttribute.mail);
		})
	}

	function verifyEmail(email) {
		LoginService.validateAccount('check-email', email, '').then(res => {
			if (res.data[0].message === 'OK') {
				return auth(email)
			}
			setIsValidating(false);
			setAlertStatus(true)
			setAlertMessage('Your email are not register to GOTH application. Please click "First Time Logger".');
			return;
		})
	}

	function auth(email, password) {
		LoginService.requestToken(email).then((err, res) => {
			// console.log(Object.values(res.data[0])[0]);
			// console.log(res.data)
			if (err) {
				console.log(err);
				setIsValidating(false);
				setAlertStatus(true);
				return;
			}
			if (Object.values(res.data[0])[0] === '') {
				console.log(err);
				setIsValidating(false);
				setAlertStatus(true);
				setAlertMessage('Authentication token creation failed!!')
				return;
			}
			const authToken = Object.values(res.data[0])[0];
			sessionStorage.setItem("userToken", JSON.stringify(authToken));
			return getLoggerProfile(authToken)
		})
			.catch(e => {
				setIsValidating(false);
				console.log(e);
			})
	};

	function getLoggerProfile(authToken) {
		const userToken = JSON.parse(sessionStorage.getItem('userToken'))
		LoginService.getUserProfile(authToken).then((res) => {
			// console.log(res.data[0]);
			// setIsValidating(false);
			const data = res.data[0]
			if (data.category !== "STAKEHOLDER") {
				setAlertStatus(true);
				setAlertMessage("Your account is not yet registered as Stakeholder");
				setIsValidating(false);
			} else {
				sessionStorage.setItem("UserData", JSON.stringify(data));
				getLov(authToken);
			}
		});
	};

	function getLov(authToken) {
		LoginService.getSystemLOV(authToken).then((res) => {
			sessionStorage.setItem("LovData", JSON.stringify(res.data[0]));
			props.history.replace("/");
			setIsValidating(false);
		});
	};

	return (
		// We make props so that the styling is apply
		<LoginTheme>
			<div id="login-box" className="login-box visible widget-box no-border ">
				<div className="widget-body">
					<div className="widget-main">
						<h4 className="header blue bigger">
							<i className="ace-icon fa fa-coffee green" /> Sign In
						</h4>
						<div className="space-6" />
						<form onSubmit={handleSubmit(userEmail, userPassword)}>
							<fieldset>
								{alertStatus && (
									<div className="alert alert-danger">
										<button
											type="button"
											className="close"
											data-dismiss="alert"
										>
											<i className="ace-icon fa fa-times" onClick={() => setAlertStatus(!alertStatus)} />
										</button>
										{alertMessage ??
											"Invalid Username/Password OR Profile not exist. Please try the Forgot Password for assistant"}
									</div>
								)}
								<label className="block clearfix">
									<span className="block input-icon input-icon-right">
										<input
											type="text"
											className="form-control"
											name="text"
											placeholder="Username"
											value={userEmail}
											onChange={handleEmail}
											required
										/>
										<i className="ace-icon fa fa-envelope" />
									</span>
								</label>

								<label className="block clearfix">
									<span className="block input-icon input-icon-right">
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Password"
											value={userPassword}
											onChange={handlePassword}
											required
										/>
										<i className="ace-icon fa fa-lock" />
									</span>
								</label>
								<div className="space" />
								<div className="clearfix">
									<button disabled={isValidating} className="min-width-100 width-35 pull-right btn btn-sm btn-primary">
										{isValidating === true ? <CircularProgress color="inherit" size={20} thickness={5} /> :
											<>
												<i className="ace-icon fa fa-key" />
												<span className="bigger-110">Sign In</span>
											</>
										}
									</button>
								</div>
								<div className="space-4" />
							</fieldset>
						</form>
					</div>
					{/* /.widget-main */}

					{
						successLogin === false && <div className="toolbar clearfix">
							<div />
							<div>
								<a href="/email-login" data-target="#activate-box" className="user-signup-link">
									<i class="ace-icon fa fa-unlock" /> {' '}
									Login Using email and password
								</a>
								<a href='#' onCick={createLdapProfile} className="user-signup-link">
									First time logger {' '}
									<i class="ace-icon fa fa-arrow-right" />
								</a>
							</div>
						</div>
					}
				</div>
			</div>
		</LoginTheme>
	);
}

export default Loginbox;
