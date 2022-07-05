import React, { useState } from "react";
import LoginTheme from '../utils/login-page-placeholder/LoginTheme';
import ActivateAccountService from "../web_service/activate_account/ActivateAccountService";

function ActivateAcc(props) {
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [activationCodeInput, setActivationCodeInput] = useState("");

  const sendUserActivation = (e) => {
    e.preventDefault();
    ActivateAccountService.activateAccount(emailInput, activationCodeInput).then(
      (res) => {
        console.log(res);
        if (res[0].response === "FAILED") {
          setAlertMessage(res[0].message);
        } else {
          setAlertStatus(true);
          setAlertMessage(
            "Your account have been successfully activated. You will be redirected to Login page."
          );
          props.history.replace("/login");
        }
      }
    );
  };

  return (
    <LoginTheme>
      <div id="activate-box" className="signup-box visible widget-box no-border">
        <div className="widget-body">
          <div className="widget-main">
            <h4 className="header blue lighter bigger">
              <i className="ace-icon fa fa-coffee green" />
              New Account Activation
            </h4>
            <div className="space-6" />
            <form method="POST" onSubmit={sendUserActivation}>
              <fieldset>
                {alertStatus && (
                  <div className="alert alert-danger">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                    >
                      <i className="ace-icon fa fa-times" />
                    </button>
                    {alertMessage}
                  </div>
                )}
                <label className="block clearfix">
                  <span className="block input-icon input-icon-right">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <i className="ace-icon fa fa-envelope" />
                  </span>
                </label>
                <label className="block clearfix">
                  <span className="block input-icon input-icon-right">
                    <input
                      type="text"
                      className="form-control"
                      name="iactivationKey"
                      placeholder="Activation Code"
                      value={activationCodeInput}
                      onChange={(e) => setActivationCodeInput(e.target.value)}
                    />
                    <i className="ace-icon fa fa-lock" />
                  </span>
                </label>
                <div className="space" />
                <div className="clearfix">
                  <button
                    type="submit"
                    className="width-35 pull-right btn btn-sm btn-primary"
                  >
                    <i className="ace-icon fa fa-key" />
                    <span className="bigger-110">Activate Now</span>
                  </button>
                </div>
                <div className="space-4" />
              </fieldset>
            </form>
          </div>
          {/* /.widget-main */}
          <div className="toolbar center">
            <a
              href="/login"
              data-target="#login-box"
              className="back-to-login-link"
            >
              <i className="ace-icon fa fa-arrow-left" />
              Back to Sign In
            </a>
          </div>
        </div>
        {/* /.widget-body */}
      </div>
    </LoginTheme>
  );
}

export default ActivateAcc;
