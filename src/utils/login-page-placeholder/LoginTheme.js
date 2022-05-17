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
                            <div className="login-container">
                                <div className="login-header" style={{paddingTop: 20}}>
                                    <img className="login-logo" src={logo}/>
                                    <h5 className="red" id="id-company-text">
                                        HERO PORTAL For Case Resolution by Internal Team
                                    </h5>
                                </div>
                                <div className="login-box">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-footer">
                        <div className="copyright">
                            Copyright © 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED
                            <br/>
                            For the best viewing experience, please use either Mozilla Firefox or IE browser
                            with resolution at 1280 x 800 pixels and above
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginTheme;
