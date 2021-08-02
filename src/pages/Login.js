import React, { Component } from 'react';
import logo from '../images/guardian-login.png';
import Forgot from './Forgotpassword';
import Activate from './ActivateAcc';
import SignUp from './Register';
import Loginbox from './Loginbox';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loginBox: true, 
      activateBox: false, 
      forgotBox: false, 
      signupBox: false 
    };
    this.showForgetPassword = this.showForgetPassword.bind(this);
    this.showActivateAcc = this.showActivateAcc.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }

  showPassword(obj) {
    if (obj.checked === true) {
      document.getElementById('pwd').type = "text";
    } else {
      document.getElementById('pwd').type = "password";
    }
  }

  showLogin(e) {
    this.setState({
      loginBox: true, forgotBox: false, activateBox: false, signupBox: false
    });
  }

  showForgetPassword(e) {
    this.setState({
      loginBox: false, forgotBox: true, activateBox: false, signupBox: false 
    });
  }

  showActivateAcc(e) {
    this.setState({
      loginBox: false, forgotBox: false, activateBox: true, signupBox: false 
    });
  }

  showRegister(e) {
    this.setState({
      loginBox: false, forgotBox: false, activateBox: false, signupBox: true
    });
  }

  render() {
    return (
      <div className="main-container" style={{ backgroundColor: '#1D2024' }}>
        <div className="main-content" style={{ backgroundColor: '#1D2024' }}>
          <div className="row" style={{ backgroundColor: '#1D2024' }}>
              <div className="login-container" style={{ backgroundColor: '#1D2024' }}>
                <div className="center" style={{ paddingTop: 20 }}>
                  <img src={logo} width="350px" /><br /><br />
                  <h4 className="red" id="id-company-text">HERO PORTAL For Case Resolution by Internal Team</h4>
                </div>

                {/* This div tag is use to make space */}
              <div className="space-6" />
                <div className="position-relative">

                {/* This is how Login box change to Forgot box */}
                {this.state.forgotBox === true ? <Forgot onClick={this.showLogin}/> :
                this.state.activateBox === true ? <Activate onClick={this.showLogin}/> :
                this.state.signupBox === true ? <SignUp onClick={this.showLogin}/> :
                <Loginbox showForgetPassword={this.showForgetPassword} showActivateAcc={this.showActivateAcc} showRegister={this.showRegister}/>
                  }
                  <div align="center" style={{ padding: '10px 0 50px 0', color: 'silver' }}>
                    Copyright © 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED<br />
                    For the best viewing experience, please use either Mozilla Firefox or IE browser with resolution at 1280 x 800 pixels and above
                  </div>
                </div> {/* /.position-relative */}
              
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.main-content */}
      </div>
    );
  }
}

export default Login;