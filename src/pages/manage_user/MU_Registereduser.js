import React, { useEffect, useState } from 'react';
// Thanks to Moment.js for the date formatter
// -> https://momentjs.com/
import * as moment from 'moment';
import Layout from '../Layout';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService'

function MU_Registereduser() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [registerUser, setRegisterUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertStatus, setAlertStatus] = useState(false);
  const [totalStakeHolderUser, setTotalStakeholderUser] = useState(0);
  const [TMUser, setTMUser] = useState(0);

  useEffect(() => {
    const getUserData = () => {
      ManageUserService.getAllUser(token, '').then(res => {
        console.log(res)
        setRegisterUser(res);
        setTMUser(res.filter(filter => filter.category === 'TM').length)
        setTotalStakeholderUser(res.filter(filter => filter.category === 'STAKEHOLDER').length)
      });
    }

    getUserData();
  }, [])


  return (
    <Layout pageContent={

      <div>
        <a name="group-members" />
        {/* {
            alertStatus &&
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-block alert-success">
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>Alert</p>
                </div>
              </div>
              <br /><br />
              <div className="space-10" />
            </div>
          } */}

        <div className="row">
          <div className="col-xs-6" />
        </div>
        <div className="space-2" />
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
                  {
                    registerUser.map((data, index) => {
                      index += 1;
                      return data.response ? <tr><td colSpan={6}><span style={{ color: 'red' }}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
                        :
                        <tr key={index}>
                          <td><div align="center">{index}</div></td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>{data.category}</td>
                          <td><div align="center">{data.stakeholderName ? data.stakeholderName : 'n/a'}</div></td>

                          {/* If you want to show date only, uncomment below */}
                          {/* <td><div align="right">{moment(data.registeredDate).format('DD-MM-YYYY')}</div></td> */}
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
                      {TMUser}
                    </b>
                  </span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name">STAKEHOLDER</div>
                <div className="profile-info-value">
                  <span className="editable" id="username"><b>{totalStakeHolderUser}</b></span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name">TOTAL</div>
                <div className="profile-info-value">
                  <span className="editable" id="username"><b style={{ color: 'red' }}>
                    {totalStakeHolderUser + TMUser}
                  </b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    />
  );
}

export default MU_Registereduser;