import React, { useState } from "react";
import ForgotPasswordService from "../web_service/forgot_password_service/ForgotPassword";
import LoginTheme from "./LoginTheme";

function Forgotpassword() {
  const [emailInput, setEmailInput] = useState("");
  const [resetPasswordInput, setResetPasswordInput] = useState('')
  const [alertStatus, setAlertStatus] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const submitForgotPassword = (e) => {
    e.preventDefault();
    ForgotPasswordService.forgotPassword(emailInput).then((res) => {
      console.log(res);
      if (emailInput === "" || emailInput === null) {
        setAlertStatus(true);
      } else {
        alert("Success");
      }
    });
  };

  return (
    <LoginTheme
      children={
        <div id="forgot-box" className="forgot-box visible widget-box no-border">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header red lighter bigger">
                <i className="ace-icon fa fa-key" />
                Forgot Password
              </h4>
              <div className="space-6" />
              <p>Enter your email and to receive further instructions</p>
              <form onSubmit={submitForgotPassword}>
                <fieldset>
                  {alertStatus && (
                    <div className="alert alert-">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <i className="ace-icon fa fa-times" />
                        The email address does not exist. Your request to reset
                        password was rejected.
                      </button>
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

                  {showPasswordField && (
                    <label class="block clearfix">
                      <span class="block input-icon input-icon-right">
                        <input type="text" class="form-control" name="resetKey" placeholder="code" readonly="yes" value={resetPasswordInput} 
                        onChange={(e) => setResetPasswordInput(e.target.value)}/>
                        <i class="ace-icon fa fa-key"></i>
                      </span>
                    </label>
                  )}

                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input
                        name="checkbox"
                        id="showPasswordBox"
                        type="checkbox"
                        className="ace"
                        value={showPasswordField}
                        defaultValue={showPasswordField}
                        checked={showPasswordField}
                        onChange={() => setShowPasswordField(!showPasswordField)}
                      />
                      <span className="lbl"> Show Password</span>
                    </span>
                  </label>
                  <div className="clearfix">
                    <button
                      type="submit"
                      className="width-35 pull-right btn btn-sm btn-danger"
                    >
                      <i className="ace-icon fa fa-lightbulb-o" />
                      <span className="bigger-110" />
                      Submit
                    </button>
                  </div>
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
                Back to Sign In
                <i className="ace-icon fa fa-arrow-right" />
              </a>
            </div>
          </div>
          {/* /.widget-body */}
        </div>
      }
    />
  );
}

export default Forgotpassword;
