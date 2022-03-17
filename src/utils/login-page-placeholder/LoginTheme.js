import React from 'react';
import logo from '../../images/guardian-login.png';

class LoginTheme extends React.Component {
  constructor(props) {
    super(props);
  }

  showPassword(obj) {
    if (obj.checked === true) {
      document.getElementById('pwd').type = "text";
    } else {
      document.getElementById('pwd').type = "password";
    }
  }

  render() {
    return (
      <div class="login-layout">
        <div className="main-container">
          <div className="main-content">
            <div className="row">
            <div class="col-sm-10 col-sm-offset-1">
              <div className="login-container">
                <div className="center" style={{ paddingTop: 20 }}>
                  <img src={logo} width="350px" /><br /><br />
                  <h4 className="red" id="id-company-text">HERO PORTAL For Case Resolution by Internal Team</h4>
                </div>

                <div class="space-6"/>

                <div class="position-relative">
                  {this.props.children}
                </div>

                {/* This div tag is use to make space */}
                <div className="space-6" />
                <div className="position-relative">
                  <div align="center" style={{ padding: '10px 0 50px 0', color: 'silver' }}>
                    Copyright © 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED<br />
                    For the best viewing experience, please use either Mozilla Firefox or IE browser with resolution at 1280 x 800 pixels and above
                  </div>
                </div>
              </div>{/* /.col */}

            </div>{/* /.row */}
            </div>
          </div>{/* /.main-content */}
        </div>
      </div>
    );
  }
}

export default LoginTheme;