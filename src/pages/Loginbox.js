import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginTheme from "../utils/login-page-placeholder/LoginTheme";
import LoginService from "../web_service/login_service/LoginService";
// import db from '../firebase_login/LoginAuth';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// const auth = getAuth();

function Loginbox(props) {
  const [alertStatus, setAlertStatus] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    document.title = "Login - HERO Portal";
  });

  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setUserPassword(e.target.value);
  };

  // firebaseLogin(e){
  //   e.preventDefault();
  //   signInWithEmailAndPassword(auth, this.state.userEmail, this.state.userPassword)
  //     .then((userCredential) => {
  //       if(userCredential){
  //         console.log(userCredential);
  //         this.props.history.push('/');
  //       } else{
  //         alert('Email or password is wrong or does not exist')
  //       }
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage)
  //     });
  // }

  // Make a base logic and then pass the data down through parameters
  // The logic is identical to HERO login logic
  const handleSubmit = (e, email, password) => {
    setFormSubmit(true);
    e.preventDefault();
    email = userEmail;
    password = userPassword;
    auth(email, password);
  };

  const auth = (email, password) => {
    LoginService.requestToken(email).then((res) => {
      console.log(res);
      if (res[0].status === "FAILED") {
        setAlertStatus(true);
        setFormSubmit(false);
      } else {
        const authToken = res[0].authToken;
        sessionStorage.setItem("userToken", JSON.stringify(authToken));
        signIn(authToken, email, password);
      }
    });
  };

  const signIn = (authToken, email, password) => {
    LoginService.signIn(authToken, email, password).then((res) => {
      console.log(res);
      if (res.response === "FAILED") {
        setAlertStatus(true);
        setAlertMessage("Email or Password does not match.");
        setFormSubmit(false);
      } else {
        getLoggerProfile(authToken);
      }
    });
  };

  const getLoggerProfile = (authToken) => {
    LoginService.getUserProfile(authToken).then((res) => {
      console.log(res);
      if (res.category !== "STAKEHOLDER") {
        setAlertStatus(true);
        setAlertMessage("Your account is not yet registered as Stakeholder");
        setFormSubmit(false);
      } else {
        sessionStorage.setItem("UserData", JSON.stringify(res));
        getLov(authToken);
      }
    });
  };

  const getLov = (authToken) => {
    LoginService.getSystemLOV(authToken).then((res) => {
      console.log(res);
      sessionStorage.setItem("LovData", JSON.stringify(res));
      props.history.replace("/");
      // return <Redirect to='/'/>
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
                      <i className="ace-icon fa fa-times" />
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
                  {/*<label class="inline">*/}
                  {/*  <input type="checkbox" class="ace" />*/}
                  {/*  <span class="lbl"> Remember Me</span>*/}
                  {/*</label>*/}
                  <button className="min-width-100 width-35 pull-right btn btn-sm btn-primary">
                    <i className="ace-icon fa fa-key" />
                    <span className="bigger-110">Sign In</span>
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
                  {(' ' + 'I forgot my Password')}
              </a>
            </div>
            <div>
              <a
                href="/activate"
                data-target="#activate-box"
                className="user-activate-link"
              >
                <i className="ace-icon fa fa-unlock" />
                {(' ' + 'Activate Account')}
              </a>
              <a
                href="/signup"
                data-target="#signup-box"
                className="user-signup-link"
              >
                  {('Sign Up' + ' ')}
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
