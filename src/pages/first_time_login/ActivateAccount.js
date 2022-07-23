import React, { useState } from 'react';
import LoginTheme from '../../utils/login-page-placeholder/LoginTheme';
import LoginService from '../../web_service/login_service/LoginService';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

function ActivateAccount(props) {
    const [isValidating, setIsValidating] = useState(false);
    let [emailInput, setEmailInput] = useState('');
    const [userPassword, setUserPassword] = useState("");
    let [activationCodeInput, setActivationCodeInput] = useState('');
    let [activationCode, setActivationCode] = useState('');
    let ldapEmail = props.history.location?.state?.email

    // Alert
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const setAlert = (status, success, message) => {
        setAlertStatus(status);
        setAlertSuccess(success);
        setAlertMessage(message);
    };

    //generate 4 digit code
    function generateCode() {
        var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        return setAlert(true, true, `${setActivationCode(seq)} - Your activation code!!`);
    }

    function mergeAccount() {
        LoginService.validateAccount('merge-account', emailInput, ldapEmail).then(res => {
            if (res.data[0].message === 'OK') {
                alert('Successfully merge account, you can login to GOTH now!!');
                return props.history.replace('/login');
            }
            return setAlert(true, false, 'Error during merge account. Email does not exist!!');
        })
    }

    function checkCode() {
        if (activationCodeInput === activationCode) return mergeAccount()
        return setAlert(true, true, 'Wrong activation code!!');
    }

    // GOTH Login
    function auth(email, password) {
        LoginService.requestToken(email).then((res, err) => {
            // console.log(Object.values(res.data[0])[0]);
            console.log(res.data, 'Auth Token')
            if (err) {
                console.log(err);
                setIsValidating(false);
                setAlertStatus(true);
                setAlertMessage(err);
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
            // if(window.confirm('Testing')) return signIn(authToken, email, password)
            return signIn(authToken, email, password)
        })
            .catch(e => {
                setIsValidating(false);
                console.log(e);
            })
    };

    function signIn(authToken, email, password) {
        LoginService.signIn(authToken, email, password).then((res, err) => {
            console.log(res.data, 'Sign In');
            // console.log(Object.values(res.data[0])[0])
            // setIsValidating(false);
            if (err) {
                setAlertStatus(true);
                setAlertMessage("An error has occured");
                setIsValidating(false);
                return;
            }
            if (res.data === undefined || Object.values(res.data[0])[0] === 0) {
                setAlertStatus(true);
                setAlertMessage("Email or Password does not match.");
                setIsValidating(false);
                return;
            }
            return getLoggerProfile(authToken);
        });
    };

    function getLoggerProfile(authToken) {
        const userToken = JSON.parse(sessionStorage.getItem('userToken'))
        LoginService.getUserProfile(authToken).then((res) => {
            console.log(res.data, 'Get Logger profile');
            // setIsValidating(false);
            const data = res.data[0]
            if (data.category !== "STAKEHOLDER") {
                setAlertStatus(true);
                setAlertMessage("Your account is not yet registered as Stakeholder");
                setIsValidating(false);
                return;
            } else {
                sessionStorage.setItem("UserData", JSON.stringify(data));
                return getLov(authToken);
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
        <LoginTheme>
            <div id="login-box" className="login-box visible widget-box no-border ">
                <div className="widget-body">
                    <div className="widget-main">
                        <h4 className="header blue bigger">
                            <i className="ace-icon fa fa-coffee green" />
                            Activate Account
                        </h4>
                        <div className="space-6" />
                        <div>
                            <h4>Has LDAP profile but not using TM email, Please insert Non-TM email and click 'Check Email' button</h4>
                        </div>
                        <form onSubmit={() => auth(emailInput, userPassword)}>
                            <fieldset>
                                {alertStatus && (
                                    <div className={`alert alert-${alertSuccess === true ? 'success' : 'danger'}`}>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                        >
                                            <i className="ace-icon fa fa-times" onClick={() => setAlertStatus(false)} />
                                        </button>
                                        {alertMessage}
                                    </div>
                                )}
                                <label className="block clearfix">
                                    <span className="block input-icon input-icon-right">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="text"
                                            placeholder="Username"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
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
                                            placeholder="Please enter your Pasword here"
                                            value={userPassword}
                                            onChange={(e) => setUserPassword(e.target.value)}
                                            required
                                        />
                                        <i className="ace-icon fa fa-lock" />
                                    </span>
                                </label>
                                <div className="space" />
                                <div className='clearfix'>
                                    <button onClick={mergeAccount} className='btn btn-sm bt-primary' type='button'>Check email</button>
                                    <button className="width-35 pull-right btn btn-sm btn-primary" type='submit'>
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

                    <div className="toolbar center">
                        <div style={{ color: 'white' }}>
                            <Link to="/login" data-target="#login-box" className="btn btn-sm btn-warning">
                                <i class="ace-icon fa fa-arrow-left" />
                                {' '}
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </LoginTheme>
    )
}

export default ActivateAccount;