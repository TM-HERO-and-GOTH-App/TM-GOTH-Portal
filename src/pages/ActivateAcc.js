import React, { useState } from "react";
import LoginTheme from "./LoginTheme";
import ActivateAccountService from "../web_service/activate_account/ActivateAccountService";

function ActivateAcc() {
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");

  const sendUserActivation = (e) => {
    e.preventDefault();
    ActivateAccountService.activateAccount(email, activationCode).then(
      (res) => {
        console.log(res);
        if (res[0].response === "FAILED") {
          setAlertMessage(res[0].message);
        } else {
          setAlertStatus(true);
          setAlertMessage(
            "Your account have been successfully activated. You will be redirected to Login page."
          );
          history.replace("/login");
        }
      }
    );
  };

  return (
    <LoginTheme
      children={
        <div id="activate-box" className="signup-box widget-box">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={activationCode}
                        onChange={(e) => setActivationCode(e.target.value)}
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
      }
    />
  );
}

export default ActivateAcc;
