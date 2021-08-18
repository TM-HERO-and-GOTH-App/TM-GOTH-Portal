import React from 'react';

class ActivateAcc extends React.Component{
    


  render() {
    return (
          <div id="activate-box" className="signup-box widget-box">
              <div className="widget-body">
                <div className="widget-main">
                  <h4 className="header blue lighter bigger">
                    <i className="ace-icon fa fa-coffee green" />
                    New Account Activation
                  </h4>
                  <div className="space-6" />
                  <form method="POST" action="</login/activate/">
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
                          <input type="text" className="form-control" name="iactivationKey" placeholder="Activation Code" />
                          <i className="ace-icon fa fa-lock" />
                        </span>
                      </label>
                      <div className="space" />
                      <div className="clearfix">
                        <button type="submit" className="width-35 pull-right btn btn-sm btn-primary">
                          <i className="ace-icon fa fa-key" />
                          <span className="bigger-110">Activate Now</span>
                        </button>
                      </div>
                      <div className="space-4" />
                    </fieldset>
                  </form>
                </div>{/* /.widget-main */}
                <div className="toolbar center">
                  <a href="/login/auth/" data-target="#login-box" className="back-to-login-link">
                    <i className="ace-icon fa fa-arrow-left" />
                    Back to Sign In
                  </a>
                </div>
              </div>{/* /.widget-body */}
            </div>
            
            
            
    );
}


}



export default ActivateAcc;