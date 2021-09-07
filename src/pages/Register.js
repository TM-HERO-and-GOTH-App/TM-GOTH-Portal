import React from 'react';
import LoginTheme from './LoginTheme';
import SignupService from '../web_service/login_web_service/SignupService';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      fullname: '',
      password: '',
      repeatPassword: '',
      mobileNumber: '',
      incomplete: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signup = this.signup.bind(this);
    this.firebaseSignup = this.firebaseSignup.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    this.signup();
  }

  signup(e){
    SignupService.signup(this.state.email, this.state.fullname, this.state.password, this.state.repeatPassword, this.state.mobileNumber).then(response => {
      console.log(response)
      if(this.state.email === '' || this.state.fullname === '' || this.state.password === '' || this.state.repeatPassword === '' || this.state.mobileNumber === ''){
        this.setState({incomplete: true})
      } else{
        console.log('Registered Successful')
        this.props.history.push('/')
      }
    })
  }

  firebaseSignup(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((newUser) => {
      if(newUser){
        alert('New user have been created');
        console.log(newUser)
        this.props.history.push('/')
      } else {
        alert('Failedd')
      }
    })
  }

  render() {
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
                <form onSubmit={this.onSubmit}>
                  <fieldset>
                    { 
                      this.state.incomplete ? <div className="alert alert-">
                        Please insert all required value
                        <button type="button" className="close" data-dismiss="alert"><i className="ace-icon fa fa-times" /></button>
                      </div> : null 
                    }
                    <label className="block clearfix">
                      <span className="block input-icon input-icon-right">
                        <input type="email" className="form-control" placeholder="Email (as your Login ID)" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <i className="ace-icon fa fa-envelope" />
                      </span>
                    </label>
                    <label className="block clearfix">
                      <span className="block input-icon input-icon-right">
                        <input type="text" className="form-control" placeholder="Fullname" name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
                        <i className="ace-icon fa fa-user" />
                      </span>
                    </label>
                    <label className="block clearfix">
                      <span className="block input-icon input-icon-right">
                        <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <i className="ace-icon fa fa-lock" />
                      </span>
                    </label>
                    <label className="block clearfix">
                      <span className="block input-icon input-icon-right">
                        <input type="password" className="form-control" placeholder="Repeat password" name="repeat-password" value={this.state.repeatPassword} onChange={(e) => this.setState({ repeatPassword: e.target.value })}/>
                        <i className="ace-icon fa fa-retweet" />
                      </span>
                    </label>
                    <label className="block clearfix">
                      <span className="block input-icon input-icon-right">
                        <input type="text" className="form-control" placeholder="Mobile Number" name="Mobilenumber" value={this.state.mobileNumber} onChange={(e) => this.setState({ mobileNumber: e.target.value})}/>
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
                <a href="/login" data-target="#login-box" className="back-to-login-link">
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


}



export default Register;