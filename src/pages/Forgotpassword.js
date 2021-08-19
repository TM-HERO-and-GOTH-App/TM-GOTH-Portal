import React from 'react';
import Loginpage from './Login';

class Forgotpassword extends React.Component {


  render() {
    return (
      <Loginpage
        children={<div id="forgot-box" className="forgot-box widget-box">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header red lighter bigger">
                <i className="ace-icon fa fa-key" />
                Forgot Password
              </h4>
              <div className="space-6" />
              <p>Enter your email and to receive further instructions</p>
              <form method="POST" action="/login/forgotpassword">
                <fieldset>
                  <div className="alert alert-">
                    <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                  </div>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="email" className="form-control" name="email" placeholder="Email" />
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