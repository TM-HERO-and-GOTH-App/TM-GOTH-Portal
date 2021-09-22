import React from 'react';
import LoginTheme from './LoginTheme';
import LoginWebservice from '../web_service/login_web_service/LoginService';
// import db from '../firebase_login/LoginAuth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// const auth = getAuth();


class Loginbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      fullName: {},
      formSubmit: false,
      alertStatus: false,
      alertMessage: {},
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getLoggerProfile = this.getLoggerProfile.bind(this);
    this.getLov = this.getLov.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.firebaseLogin = this.firebaseLogin.bind(this);
  }

  handleEmail(e) {
    this.setState({ userEmail: e.target.value })
  }

  handlePassword(e) {
    this.setState({ userPassword: e.target.value })
  }

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

  handleSubmit(e, email, password) {
    e.preventDefault();
    email = this.state.userEmail;
    password = this.state.userPassword;
    this.auth(email, password)
  }

  auth(email, password) {
    LoginWebservice.requestToken(email).then(res => {
      console.log(res);
      if (res[0].status === 'FAILED') {
        console.log('Email does not exist')
      } else {
        const authToken = res[0].authToken;
        sessionStorage.setItem('userToken', JSON.stringify(authToken));
        this.signIn(authToken, email, password);
      }
    })
  }

  signIn(authToken, email, password) {
    LoginWebservice.signIn(authToken, email, password).then(res => {
      console.log(res);
      if (res.response === 'FAILED') {
        this.setState({
          alertStatus: true,
          alertMessage: res,
        })
      } else {
        this.getLoggerProfile(authToken);
      }
    })
  }

  getLoggerProfile(authToken) {
    LoginWebservice.getUserProfile(authToken).then(res => {
      console.log(res);
      if (res.category !== 'STAKEHOLDER') {
        console.log('Your account is not yet registered')
      } else {
        this.setState({ fullName: res.fullName })
        sessionStorage.setItem('UserData', JSON.stringify(res))
        this.getLov(authToken)
      }
    })
  }

  getLov(authToken) {
    LoginWebservice.getSystemLOV(authToken).then(res => {
      console.log(res);
      sessionStorage.setItem('LovData', JSON.stringify(res));
      this.props.history.push('/');
    })
  }

  render() {
    return (
      // We make props so that the styling is apply
      <LoginTheme
        children={<div id="login-box" className="login-box widget-box no-border ">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header blue lighter bigger">
                <i className="ace-icon fa fa-coffee green" />
                Sign In
              </h4>
              <div className="space-6" />
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  { (this.state.alertStatus && this.state.alertMessage) &&
                    <div className="alert alert-danger">
                      <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times"></i></button>
                      {this.state.alertMessage.remark}
                    </div>
                  }
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="email" className="form-control" name="email" placeholder="Username" value={this.state.userEmail} onChange={this.handleEmail} />
                      <i className="ace-icon fa fa-envelope" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.userPassword} onChange={this.handlePassword} />
                      <i className="ace-icon fa fa-lock" />
                    </span>
                  </label>
                  <div className="space" />
                  <div className="clearfix">
                    <button className="width-35 pull-right btn btn-sm btn-primary"
                    // onClick={() => alert('Sign In button is being click and working')}
                    >
                      <i className="ace-icon fa fa-key" />
                      <span className="bigger-110">Sign In</span>
                    </button>
                  </div>
                  <div className="space-4" />
                </fieldset>
              </form>
            </div>{/* /.widget-main */}
            <div className="toolbar clearfix">
              <div>
                <a href="/forgotpassword" data-target="#forgot-box" className="forgot-password-link">
                  <i className="ace-icon fa fa-arrow-left" />
                  I forgot my Password
                </a>
              </div>
              <div>
                <a href="/activate" data-target="#activate-box" className="user-signup-link">
                  <i className="ace-icon fa fa-arrow-right" />
                  Activate Account
                </a>
                <a href="/signup" data-target="#signup-box" className="user-signup-link">
                  Sign Up
                  <i className="ace-icon fa fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>}
      />
    );
  }
}

export default Loginbox;