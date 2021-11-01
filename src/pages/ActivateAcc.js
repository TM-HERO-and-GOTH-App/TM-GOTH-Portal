import React from 'react';
import LoginTheme from './LoginTheme';
import ActivateAccountService from '../web_service/activate_account/ActivateAccountService';

class ActivateAcc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertStatus: false,
      alertMessage: '',
      email: '',
      activationCode: '',
    }
    this.sendUserActivation = this.sendUserActivation.bind(this);
  }

  sendUserActivation(e) {
    e.preventDefault();
    ActivateAccountService.activateAccount(this.state.email, this.state.activationCode).then(res => {
      console.log(res);
      if (res[0].response === 'FAILED') {
        this.setState({
          alertMessage: res[0].message
        })
      } else {
        this.setState({
          alertStatus: true,
          alertMessage: 'Your account have been succesfully activated. You will be redirected to Login page.'
        })
        this.props.history.replace('/login')
      }
    })
  }

  render() {
    return (
      <LoginTheme
        children={<div id="activate-box" className="signup-box widget-box">
          <div className="widget-body">
            <div className="widget-main">
              <h4 className="header blue lighter bigger">
                <i className="ace-icon fa fa-coffee green" />
                New Account Activation
              </h4>
              <div className="space-6" />
              <form method="POST" onSubmit={this.sendUserActivation}>
                <fieldset>
                  {this.state.alertStatus &&
                    <div className="alert alert-danger">
                      <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                      {this.state.alertMessage}
                    </div>
                  }
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                      <i className="ace-icon fa fa-envelope" />
                    </span>
                  </label>
                  <label className="block clearfix">
                    <span className="block input-icon input-icon-right">
                      <input type="text" className="form-control" name="iactivationKey" placeholder="Activation Code" value={this.state.activationCode} onChange={(e) => this.setState({ activationCode: e.target.value })} />
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
              <a href="/login" data-target="#login-box" className="back-to-login-link">
                <i className="ace-icon fa fa-arrow-left" />
                Back to Sign In
              </a>
            </div>
          </div>{/* /.widget-body */}
        </div>
        }
      />

    );
  }


}



export default ActivateAcc;