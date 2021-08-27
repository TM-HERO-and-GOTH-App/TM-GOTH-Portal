import React from 'react';
import LoginTheme from './LoginTheme';
import LoginWebservice from '../web_service/login_web_service/LoginService';
// import firebase from 'firebase';
// import { collection, getDocs } from 'firebase/firestore'

class Loginbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      fullName: {},
      formSubmit: false,
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getLoggerProfile = this.getLoggerProfile.bind(this);
    this.getLov = this.getLov.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(e) {
    this.setState({ userEmail: e.target.value })
  }

  handlePassword(e) {
    this.setState({ userPassword: e.target.value })
  }

  handleSubmit(e, email, password) {
    e.preventDefault();
    email = this.state.userEmail;
    password = this.state.userPassword;

    // const db = firebase.firestore();
    // const querySnapshot = getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });

    this.auth(email, password)
  }

  auth(email, password) {
    LoginWebservice.requestToken(email).then(response => {
      console.log(response);
      if (response[0].status === 'FAILED') {
        console.log('Email does not exist')
      } else {
        const authToken = response[0].authToken;
        this.signIn(authToken, email, password);
      }
    })
  }

  signIn(authToken, email, password) {
    LoginWebservice.signIn(authToken, email, password).then(response => {
      console.log(response);
      if (response.response === 'FAILED') {
        console.log('Email does not detect');
      } else {
        this.getLoggerProfile(authToken);
      }
    })
  }

  getLoggerProfile(authToken) {
    LoginWebservice.getUserProfile(authToken).then(response => {
      console.log(response);
      if (response.category !== 'STAKEHOLDER') {
        console.log('Your account is not yet registered')
      } else {
        this.setState({fullName: response.fullName})
        localStorage.setItem('UserData', JSON.stringify(response))
        this.getLov(authToken)
      }
    })
  }

  getLov(authToken) {
    LoginWebservice.getSystemLOV(authToken).then(response => {
      console.log(response);
      this.props.history.push('/', this.state);
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
                  <div className="alert alert-">
                    <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                  </div>
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