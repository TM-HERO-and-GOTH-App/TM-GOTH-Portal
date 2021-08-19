import React from 'react';
import logo from '../images/guardian-login.png';

class Loginpage extends React.Component {
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
      <div className="main-container" style={{ backgroundColor: '#1D2024' }}>
        <div className="main-content" style={{ backgroundColor: '#1D2024' }}>
          <div className="row" style={{ backgroundColor: '#1D2024' }}>
              <div className="page-container" style={{ backgroundColor: '#1D2024' }}>
                <div className="center" style={{ paddingTop: 20 }}>
                  <img src={logo} width="350px" /><br /><br />
                  <h4 className="red" id="id-company-text">HERO PORTAL For Case Resolution by Internal Team</h4>
                </div>
              
              {this.props.children}
                {/* This div tag is use to make space */}
              <div className="space-6" />
                <div className="position-relative">
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

export default Loginpage;