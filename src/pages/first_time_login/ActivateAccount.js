import React, { useState } from 'react';
import LoginTheme from '../../utils/login-page-placeholder/LoginTheme';
import LoginService from '../../web_service/login_service/LoginService';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

function ActivateAccount(props) {
    let [emailInput, setEmailInput] = useState('');
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
                        <form>
                            <fieldset>
                                {alertStatus && (
                                    <div className={`alert alert-${alertSuccess === true ? 'success' : 'danger'}`}>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                        >
                                            <i className="ace-icon fa fa-times" onClick={() => setAlertStatus(!alertStatus)} />
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
                                            type="text"
                                            className="form-control"
                                            name="activation_code"
                                            placeholder="Please enter your activation code here"
                                            value={activationCodeInput}
                                            onChange={(e) => setActivationCodeInput(e.target.value)}
                                            required
                                        />
                                        <i className="ace-icon fa fa-lock" />
                                    </span>
                                </label>
                                <div className="space" />
                                <div className='clearfix'>
                                    <button className="width-35 pull-right btn btn-sm btn-primary" onClick={checkCode}>
                                        {/* {isValidating === true ? <CircularProgress color="inherit" size={20} thickness={5} /> : */}
                                        <>
                                            <i className="ace-icon fa fa-key" />
                                            <span className="bigger-110">Sign In</span>
                                        </>
                                        {/* } */}
                                    </button>
                                </div>
                                <div className="space-4" />
                            </fieldset>
                        </form>
                    </div>
                    {/* /.widget-main */}

                    <div className="toolbar clearfix">
                        <div style={{ color: 'white' }}>
                            <Link to="/login" data-target="#login-box" className="btn btn-sm btn-warning">
                                <i class="ace-icon fa fa-arrow-left"/>
                                {' '}
                                Back to Sign In
                            </Link>
                        </div>
                        <div>
                            <button type='button' className="width-50 pull-right btn btn-sm btn-danger" onClick={generateCode}>Send Activation Code</button>
                        </div>
                    </div>
                </div>
            </div>
        </LoginTheme>
    )
}

export default ActivateAccount;