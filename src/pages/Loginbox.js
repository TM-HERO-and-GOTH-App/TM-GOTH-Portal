import React from 'react';
import LoginTheme from './LoginTheme';

class Loginbox extends React.Component {

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
            <form method="POST" action="/login/auth/">
              <fieldset>
                <div className="alert alert-">
                  <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                </div>
                <label className="block clearfix">
                  <span className="block input-icon input-icon-right">
                    <input type="email" className="form-control" name="email" placeholder="Username" />
                    <i className="ace-icon fa fa-envelope" />
                  </span>
                </label>
                <label className="block clearfix">
                  <span className="block input-icon input-icon-right">
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                    <i className="ace-icon fa fa-lock" />
                  </span>
                </label>
                <div className="space" />
                <div className="clearfix">
                  <button type="submit" className="width-35 pull-right btn btn-sm btn-primary">
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
              <a href="forgotpassword" data-target="#forgot-box" className="forgot-password-link">
                <i className="ace-icon fa fa-arrow-left" />
                I forgot my Password
              </a>
            </div>
            <div>
              <a href="activate" data-target="#activate-box" className="user-signup-link">
                <i className="ace-icon fa fa-arrow-right" />
                Activate Account
              </a>
              <a href="signup" data-target="#signup-box" className="user-signup-link">
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