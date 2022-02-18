import React, { useState } from "react";
import LoginTheme from "./LoginTheme";
import SignupService from "../web_service/register_service/SignupService";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [incomplete, setIncomplete] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onReset = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setRepeatPassword("");
    setMobileNumber("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    SignupService.signup(
      email,
      fullName,
      password,
      repeatPassword,
      mobileNumber
    ).then((res) => {
      if (
        email === "" ||
        fullName === "" ||
        password === "" ||
        repeatPassword === "" ||
        mobileNumber === ""
      ) {
        // console.log(res)
        setIncomplete(true);
      } else if (res[0].response === "FAILED") {
        // console.log(res)
        // alertStatus: true,
        setAlertMessage(res[0].message);
      } else {
        console.log(res);
        console.log("Registered Successful");
        history.replace("/activate");
      }
    });
  };

  // firebaseSignup(e){
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password).then((newUser) => {
  //     if(newUser){
  //       alert('New user have been created');
  //       console.log(newUser)
  //       this.props.history.push('/')
  //     } else {
  //       alert('Failed')
  //     }
  //   })
  // }

  return (
    <LoginTheme
      children={
        <div id="signup-box" className="signup-box widget-box">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header green lighter bigger">
                <i className="ace-icon fa fa-users blue" />
                New User Registration
              </h4>
              <div className="space-6" />
              <p>All inputs below are compulsory. Thank you</p>
              <form onSubmit={onSubmit} onReset={onReset}>
                <fieldset>
                  {alertMessage !== "" && (
                    <div className="alert alert-danger">
                      {alertMessage}
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        <i className="ace-icon fa fa-times" />
                      </button>
                    </div>
                  )}

                  {/* <div className="alert alert-danger">
                      {alertMessage}
                      <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                    </div> */}

                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input
                        type="email"
                        className="form-control"
                        required
                        placeholder="Email (as your Login ID)"
                        name="email"
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
                        required
                        placeholder="Fullname"
                        name="fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <i className="ace-icon fa fa-user" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i className="ace-icon fa fa-lock" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input
                        type="password"
                        className="form-control"
                        required
                        placeholder="Repeat password"
                        name="repeat-password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      <i className="ace-icon fa fa-retweet" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="Mobile Number"
                        name="Mobilenumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <i className="ace-icon fa fa-phone" />
                    </span>
                  </label>
                  <div className="space-24" />
                  <div className="clearfix">
                    <button
                      type="reset"
                      className="width-30 pull-left btn btn-sm"
                    >
                      <i className="ace-icon fa fa-refresh" />
                      <span className="bigger-110">Reset</span>
                    </button>
                    <button
                      type="submit"
                      className="width-65 pull-right btn btn-sm btn-success"
                    >
                      <span className="bigger-110">Register</span>
                      <i className="ace-icon fa fa-arrow-right icon-on-right" />
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
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

export default Register;
