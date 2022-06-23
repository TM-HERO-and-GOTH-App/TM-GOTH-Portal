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
	const handleSubmit = (e, email, password) => {
		setIsValidating(true);
		e.preventDefault();
		email = userEmail;
		password = userPassword;
		auth(email, password);
	};

	const auth = (email, password) => {
		LoginService.requestToken(email).then((res, err) => {
			console.log(Object.values(res.data[0])[0]);
			
			// setIsValidating(false);
			if (err) {
				console.log(err);
				setIsValidating(false);
				setAlertStatus(true);
			} else {
				const authToken = Object.values(res.data[0])[0];
				sessionStorage.setItem("userToken", JSON.stringify(authToken));
				signIn(authToken, email, password);
			}
		})
		// .catch(e => {
		// 	setIsValidating(false);
		// 	console.log(e);
		// })
	};

	const signIn = (authToken, email, password) => {
		LoginService.signIn(authToken, email, password).then((res) => {
			// console.log(res.data);
			// setIsValidating(false);
			if (res.statusText === "FAILED") {
				setAlertStatus(true);
				setAlertMessage("Email or Password does not match.");
				setIsValidating(false);
			} else {
				getLoggerProfile(authToken);
			}
		});
	};

	const getLoggerProfile = (authToken) => {
		const userToken = JSON.parse(sessionStorage.getItem('userToken'))
		LoginService.getUserProfile(userToken).then((res) => {
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
						<form onSubmit={handleSubmit}>
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
											type="email"
											className="form-control"
											name="email"
											placeholder="Username"
											value={userEmail}
											onChange={handleEmail}
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

					<div className="toolbar clearfix">
						<div>
							<a
								href="/forgotpassword"
								data-target="#forgot-box"
								className="forgot-password-link"
							>
								<i className="ace-icon fa fa-arrow-left" />
								<span> I forgot my Password</span>
							</a>
						</div>
						<div>
							<a
								href="/activate"
								data-target="#activate-box"
								className="user-activate-link"
							>
								<i className="ace-icon fa fa-unlock" />
								<span> Activate Account</span>
							</a>
							<a
								href="/signup"
								data-target="#signup-box"
								className="user-signup-link"
							>
								<span>Sign Up </span>
								<i className="ace-icon fa fa-arrow-right" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</LoginTheme>
	);
}

export default Loginbox;
