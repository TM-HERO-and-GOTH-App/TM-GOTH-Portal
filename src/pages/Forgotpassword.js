import React from 'react';
import ForgotPasswordService from '../web_service/forgot_password_service/ForgotPassword';
import LoginTheme from './LoginTheme';

class Forgotpassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      alert: false
    }
    this.submitForgotPassword = this.submitForgotPassword.bind(this);
  }

  submitForgotPassword(e){
    e.preventDefault();
    ForgotPasswordService.forgotPassword(this.state.email).then(res => {
      console.log(res);
      if(this.state.email === '' || this.state.email === null){
        this.setState({ alert: true });
      } else {
        alert('Sucess')
      }
    })
  }

  render() {
    return (
      <LoginTheme
        children={<div id="forgot-box" className="forgot-box widget-box">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header red lighter bigger">
                <i className="ace-icon fa fa-key" />
                Forgot Password
              </h4>
              <div className="space-6" />
              <p>Enter your email and to receive further instructions</p>
              <form onSubmit={this.submitForgotPassword}>
                <fieldset>
                  {
                    alert === true ? <div className="alert alert-">
                      The email address does not exist. Your request to reset password was rejected.
                      <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                    </div> : null
                  }
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                      <i className="ace-icon fa fa-envelope" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input name="checkbox" id="showPasswordBox" type="checkbox" className="ace" defaultValue={1} onclick="showPassword(this)" />
                      <span className="lbl"> Show Password</span>
                    </span>
                  </label>
                  <div className="clearfix">
                    <button type="submit" className="width-35 pull-right btn btn-sm btn-danger">
                      <i className="ace-icon fa fa-lightbulb-o" />
                      <span className="bigger-110"></span>
                      Submit
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>{/* /.widget-main */}
            <div className="toolbar center">
              <a href="/login" data-target="#login-box" className="back-to-login-link">
                Back to Sign In
                <i className="ace-icon fa fa-arrow-right" />
              </a>
            </div>
          </div>{/* /.widget-body */}
        </div>}
      />
    );
  }
}



export default Forgotpassword;