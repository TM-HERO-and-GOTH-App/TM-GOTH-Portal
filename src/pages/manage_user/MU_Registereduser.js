import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService'

class MU_Registereduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: JSON.parse(sessionStorage.getItem('userToken')),
      userKeyword: '',
      user: [],
      alertStatus: false,
      // isLoading: false,
      alertMessage: '',
      totalStakeHolderUser: 0,
      totalTMUser: 0,
    }
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  componentWillUnmount(){
    this.getUserData();
  }

  getUserData() {
    ManageUserService.getAllUser(this.state.token, this.state.userKeyword).then(res => {
      console.log(res)
      this.setState({ user: res })
      this.setState({ totalTMUser: this.state.user.filter(filter => filter.category === 'TM').length})
      this.setState({ totalStakeHolderUser: this.state.user.filter(filter => filter.category === 'STAKEHOLDER').length})
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <a name="group-members" />
          {
          this.state.alertStatus ?
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>Alert</p>
                </div>
              </div>
              <br /><br />
              <div className="space-10" />
            </div> : null
          }

          <div className="row">
            <div className="col-xs-6">
            </div>
          </div>
          <div className="space-2" />
          {/*?php $totalSH = $totalTM = 0; ?*/}
          <div className="row">
            <div className="col-xs-12">
              <div className="clearfix">
                <div className="pull-right tableTools-container-1" style={{ paddingTop: 5 }} />
              </div>
              <div>
                <table id="dynamic-table-1" className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="5%"><div align="center">#</div></th>
                      <th width="30%">Fullname</th>
                      <th width="15%">Email</th>
                      <th width="10%">Category</th>
                      <th width="15%">Stakeholder</th>
                      <th width="15%">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.user === null ?
                      <tr><td colSpan={6}><span style={{ color: 'red' }}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
                      :
                      this.state.user.map((data, i) => {
                        i += 1;
                        return <tr>
                          <td><div align="center">{i}</div></td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>{data.category}</td>
                          <td><div align="center">{data.stakeholderName ? data.stakeholderName : 'n/a'}</div></td>
                          <td><div align="right">{data.registeredDate}</div></td>
                        </tr>

                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>{/* /.span */}
          </div>
          <h4 className="header green">Total Registered Users</h4>
          <div className="row">
            <div className="col-sm-4">
              <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                <div className="profile-info-row">
                  <div className="profile-info-name">TM/PUBLIC</div>
                  <div className="profile-info-value">
                    <span className="editable" id="username">
                      <b>
                        {this.state.totalTMUser}
                      </b>
                    </span>
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-name">STAKEHOLDER</div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"><b>{this.state.totalStakeHolderUser}</b></span>
                  </div>
                </div>
                <div className="profile-info-row">
                  <div className="profile-info-name">TOTAL</div>
                  <div className="profile-info-value">
                    <span className="editable" id="username"><b style={{ color: 'red' }}>
                      {this.state.totalStakeHolderUser + this.state.totalTMUser}
                    </b></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default MU_Registereduser;