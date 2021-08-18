import React from 'react';

class Register extends React.Component{
    

  render() {
    return (

          <div id="signup-box" className="signup-box widget-box">
              <div className="widget-body">
                <div className="widget-main">
                  <h4 className="header green lighter bigger">
                    <i className="ace-icon fa fa-users blue" />
                    New User Registration
                  </h4>
                  <div className="space-6" />
                  <p>All inputs below are compulsory. Thank you</p> 
                  <form method="POST" action="/login/signupme/">
                    <fieldset>
                      <div className="alert alert-">
                        <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                      </div>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="email" className="form-control" placeholder="Email (as your Login ID)" name="inputs[email]"  />
                          <i className="ace-icon fa fa-envelope" />
                        </span>
                      </label>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="text" className="form-control" placeholder="Fullname" name="inputs[fullname]"  />
                          <i className="ace-icon fa fa-user" />
                        </span>
                      </label>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="password" className="form-control" placeholder="Password" name="password" />
                          <i className="ace-icon fa fa-lock" />
                        </span>
                      </label>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="password" className="form-control" placeholder="Repeat password" name="password2" />
                          <i className="ace-icon fa fa-retweet" />
                        </span>
                      </label>
                      <label className="block clearfix">
                        <span className="block input-icon input-icon-right">
                          <input type="text" className="form-control" placeholder="Mobile Number" name="Mobilenumber"  />
                          <i className="ace-icon fa fa-phone" />
                        </span>
                      </label>
                      <div className="space-24" />
                      <div className="clearfix">
                        <button type="reset" className="width-30 pull-left btn btn-sm">
                          <i className="ace-icon fa fa-refresh" />
                          <span className="bigger-110">Reset</span>
                        </button>
                        <button type="submit" className="width-65 pull-right btn btn-sm btn-success">
                          <span className="bigger-110">Register</span>
                          <i className="ace-icon fa fa-arrow-right icon-on-right" />
                        </button>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="toolbar center">
                  <a href="/login/auth/" data-target="#login-box" className="back-to-login-link">
                    <i className="ace-icon fa fa-arrow-left" />
                    Back to Sign In
                  </a>
                </div>
                </div>
              {/* /.widget-body */}
                  </div>
    );
}


}



export default Register;