import React, { useState, useEffect } from "react";
import LoginTheme from "../utils/login-page-placeholder/LoginTheme";
import LoginService from "../web_service/login_service/LoginService";
import CircularProgress from '@mui/material/CircularProgress';

function Loginbox(props) {
	const [alertStatus, setAlertStatus] = useState(false);
	const [isValidating, setIsValidating] = useState(false);
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
			if (res.data[0].message === 'OK') {
				return auth(email)
			}
			setIsValidating(false);
			setAlertStatus(true)
			setAlertMessage('Email is not registered in DB');
			return;
		})
	}

	function firstTimeLoginAlert(emailData){
		if (window.confirm('Is this your first time login to GOTH? If not, merge your ldap account by pressing "Cancel" button!!')){
			return createLdapProfile(emailData)
		} else {
			return props.history.push("/activate-ldap-profile", {email: emailData});
		}
	}

	// LDAP Auth
	function ldapAuth(id, password) {
		LoginService.ldapLogin(id, password).then(res => {
			console.log(res)
			if (res[0].message === 'User successfully login to GOTH!!') {
				localStorage.setItem('userData', JSON.stringify(res.data.userAttribute));
				return verifyEmail(res.data.userAttribute.mail);
			}
			firstTimeLoginAlert(res.data[0].userAttribute.mail);
			setIsValidating(false);
			setAlertStatus(true);
			setAlertMessage(res.data.message);
			return;
		})
	}

	function verifyEmail(email) {
		LoginService.validateAccount('check-email', email, '').then(res => {
			if (res.data[0].message === 'OK') {
				auth(email)
			}
			firstTimeLoginAlert(res.data[0].userAttribute.mail);
			setIsValidating(false);
			setAlertStatus(true)
			setAlertMessage('Email is not registered in DB');
			return;
		})
	}

	const auth = (email, password) => {
		LoginService.requestToken(email).then((res, err) => {
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

	const getLoggerProfile = (authToken) => {
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

	const getLov = (authToken) => {
		LoginService.getSystemLOV(authToken).then((res) => {
			sessionStorage.setItem("LovData", JSON.stringify(res.data[0]));
			props.history.replace("/");
			setIsValidating(false);
		});
	};

	// GOTH Login
	// const auth = (email, password) => {
	// 	LoginService.requestToken(email).then((res, err) => {
	// 		// console.log(Object.values(res.data[0])[0]);
	// 		// console.log(res.data)
	// 		if (err) {
	// 			console.log(err);
	// 			setIsValidating(false);
	// 			setAlertStatus(true);
	// 			return;
	// 		}
	// 		if (Object.values(res.data[0])[0] === '') {
	// 			console.log(err);
	// 			setIsValidating(false);
	// 			setAlertStatus(true);
	// 			setAlertMessage('Authentication token creation failed!!')
	// 			return;
	// 		}
	// 		const authToken = Object.values(res.data[0])[0];
	// 		sessionStorage.setItem("userToken", JSON.stringify(authToken));
	// 		return signIn(authToken, email, password)
	// 	})
	// 		.catch(e => {
	// 			setIsValidating(false);
	// 			console.log(e);
	// 		})
	// };

	// const signIn = (authToken, email, password) => {
	// 	LoginService.signIn(authToken, email, password).then((res, err) => {
	// 		// console.log(res.data);
	// 		// console.log(Object.values(res.data[0])[0])
	// 		// setIsValidating(false);
	// 		if (err) {
	// 			setAlertStatus(true);
	// 			setAlertMessage("An error has occured");
	// 			setIsValidating(false);
	// 			return;
	// 		}
	// 		if (res.data === undefined || Object.values(res.data[0])[0] === 0) {
	// 			setAlertStatus(true);
	// 			setAlertMessage("Email or Password does not match.");
	// 			setIsValidating(false);
	// 			return;
	// 		}
	// 		return getLoggerProfile(authToken);
	// 	});
	// };

	// const getLoggerProfile = (authToken) => {
	// 	const userToken = JSON.parse(sessionStorage.getItem('userToken'))
	// 	LoginService.getUserProfile(authToken).then((res) => {
	// 		// console.log(res.data[0]);
	// 		// setIsValidating(false);
	// 		const data = res.data[0]
	// 		if (data.category !== "STAKEHOLDER") {
	// 			setAlertStatus(true);
	// 			setAlertMessage("Your account is not yet registered as Stakeholder");
	// 			setIsValidating(false);
	// 			return;
	// 		} else {
	// 			sessionStorage.setItem("UserData", JSON.stringify(data));
	// 			return getLov(authToken);
	// 		}
	// 	});
	// };

	// const getLov = (authToken) => {
	// 	LoginService.getSystemLOV(authToken).then((res) => {
	// 		sessionStorage.setItem("LovData", JSON.stringify(res.data[0]));
	// 		props.history.replace("/");
	// 		setIsValidating(false);
	// 	});
	// };

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

					<div className="toolbar clearfix" />
				</div>
			</div>
		</LoginTheme>
	);
}

export default Loginbox;
