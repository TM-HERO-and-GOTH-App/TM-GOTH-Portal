import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class MU_Groupmember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shID: JSON.parse(sessionStorage.getItem('UserData')),
      token: JSON.parse(sessionStorage.getItem('userToken')),
      searchUserInput: '',
      userResults: [],
      groupResults: [],
      alertStatus: false,
      setAgent: false,
      setCoordinator: false,
      setAdmin: false,
      alertMessage: '',
    }
    this.getSearchUser = this.getSearchUser.bind(this);
    this.resetUserSearch = this.resetUserSearch.bind(this);
    this.getGroupResult = this.getGroupResult.bind(this);
    this.inviteToGroup = this.inviteToGroup.bind(this);
    this.removeFromGroup = this.removeFromGroup.bind(this);
    this.setAsAgent = this.setAsAgent.bind(this);
    this.setAsAdmin = this.setAsAdmin.bind(this);
    this.setAsCoordinator = this.setAsCoordinator.bind(this);
  }
  
  componentDidMount(){
    this.getGroupResult();
  }

  getSearchUser(e) {
    e.preventDefault();
    ManageUserService.getProfileByKeyword(this.state.token, this.state.searchUserInput).then(res => {
      // console.log(res);
      this.setState({ userResults: res })
    })
  }

  resetUserSearch() {
    this.setState({
      searchUserInput: ''
    })
  }

  getGroupResult() {
    const shID = this.state.shID.shID
    ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
      console.log(res);
      this.setState({ groupResults: res })
    })
  }

  inviteToGroup(){
    const shID = this.state.shID.shID
    ManageUserService.inviteToGroup(this.state.token, '', shID).then(res => {
      if(res === null){
        this.setState({
          alertStatus: true,
          alertMessage: 'Only group admin can do the invitation'
        })
      } else{
        this.setState({
          alertStatus: true,
          alertMessage: 'The user has been successfully added.'
        })
      }
    })
  }

  removeFromGroup(){
    ManageUserService.removeFromGroup(this.state.token, '', this.state.shID.shID).then(res => {
      if(res === null){
        this.setState({
          alertStatus: true,
          alertMessage: 'Only admin can remove the members'
        }) 
      } else{
        this.setState({
          alertStatus: true,
          alertMessage: 'The user has been remove from the group.'
        })
      }
    })
  }

  setAsAgent(){
    ManageUserService.setAsAgent(this.state.token, '', this.state.shID.shID).then(res => {
      if(res === null){
        this.setState({
          alertStatus: true,
          alertMessage: 'Only group admin can set the role.'
        }) 
      } else{
        this.setState({
          alertStatus: true,
          alertMessage: 'The user has been successfully updated as Agent.'
        })
      }
    })
  }

  setAsAdmin(){
    ManageUserService.setAsAdmin(this.state.token, '', this.state.shID.shID).then(res => {
      if(res === null){
        this.setState({
          alertStatus: true,
          alertMessage: 'Only group admin can set the role.'
        }) 
      } else{
        this.setState({
          alertStatus: true,
          alertMessage: 'The user has been successfully updated as Admin.'
        })
      }
    })
  }

  setAsCoordinator(){
    ManageUserService.setAsCoordinator(this.state.token, '', this.state.shID.shID).then(res => {
      if(res === null){
        this.setState({
          alertStatus: true,
          alertMessage: 'Only group admin can set the role.'
        }) 
      } else{
        this.setState({
          alertStatus: true,
          alertMessage: 'The user has been successfully updated as Coordinator.'
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {/* <a name="group-members" /> */}

          {this.state.alertStatus ?
            <div className="row">
              <div className="col-sm-12">
                <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>{this.state.alertMessage}</p>
                </div>
              </div>
              <br /><br />
              <div className="space-10" />
            </div> : null
          }

          <div className="row">
            <div className="col-xs-6">
              <form name="form" onSubmit={this.getSearchUser} onReset={this.resetUserSearch}>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="ace-icon fa fa-check" />
                  </span>
                  <input type="text" className="form-control search-query" name="keyword" placeholder="Search Profile by Name" value={this.state.searchUserInput} onChange={(e) => this.setState({ searchUserInput: e.target.value })} />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-inverse btn-white">
                      <span className="ace-icon fa fa-search icon-on-right bigger-110" />
                      Search
                    </button>
                  </span>
                </div>
              </form>
            </div>
            <div className="col-xs-6 pull-right">
            </div>
          </div>
          <div className="space-2" />
          {this.state.searchUserInput !== '' ?
            <div>
              <div>
                <span className="input-group-btn">
                  <button className="pull-left btn btn-sm btn-inverse" type='reset'>
                    <i className="ace-icon fa fa-refresh" />
                    <span className="bigger-110">Reset Search Keyword</span>
                  </button>
                </span>
              </div>
              <br />
              <h4 className="header blue">Search Result</h4>
              <p>* Showing for Activated Users ONLY</p>
              <div className="row">
                <div className="col-xs-12">
                  <table id="simple-table" className="table  table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="5%"><div align="center">#</div></th>
                        <th width="30%">Fullname</th>
                        <th width="25%">Email</th>
                        <th width="15%">Category</th>
                        <th width="15%"><div align="center">Stakeholder</div></th>
                        <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.userResults.map((data, i) => {
                        i += 1;
                        return <tr>
                          <td><div align="center">{i}</div></td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>{data.category}</td>
                          <td><div align="center">{data.stakeholderName ? data.stakeholderName : 'n/a'}</div></td>
                          <td>
                            <div align="center">
                              {(data.category === 'PUBLIC' || data.category === 'TM') &&
                                <button className="btn btn-minier btn-success" onClick={this.inviteToGroup}>Add to Group</button>
                              }
                            </div>
                          </td>
                        </tr>
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div> :

            <div className="row">
              <div className="col-xs-12">
                <table id="simple-table" className="table  table-bordered table-hover">
                  <thead>
                    <tr>
                      <th width="5%"><div align="center">#</div></th>
                      <th width="30%">Fullname</th>
                      <th width="15%">Email</th>
                      <th width="10%">Position</th>
                      <th width="10%"><div align="center">Agent</div></th>
                      <th width="10%"><div align="center">Coordinator</div></th>
                      <th width="10%"><div align="center">Admin</div></th>
                      <th width="10%"><div align="center"><i className="ace-icon fa fa-bookmark" /></div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.groupResults === null ?
                      <tr><td colSpan={4}><span style={{ color: 'red' }}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
                      :
                      this.state.groupResults.map(( data, i ) => {
                        i += 1;
                        return <tr>
                          <td><div align="center">{i}</div></td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>
                            {data.positionName === 'Admin' ? <span className="label label-warning arrowed-right">{ data.positionName }</span> : data.positionName }
                          </td>
                          <td>
                            <div align="center">
                              <input name="set_agent" type="checkbox" className="lbl" onClick={this.setAsAgent} checked={data.positionName === 'Agent' ? !this.state.setAgent : false} onChange={(e) => this.setState({ setAgent: !this.state.setAgent })} />
                            </div>
                          </td>
                          <td>
                            <div align="center">
                              <input name="set_co" type="checkbox" className="lbl" onClick={this.setAsCoordinator} checked={data.positionName === 'Coordinator' ? !this.state.setCoordinator: false} onChange={(e) => this.setState({ setCoordinator: !this.state.setCoordinator})}/>
                            </div>
                          </td>
                          <td>
                            <div align="center">
                              <input name="set_admin" type="checkbox" className="lbl" onClick={this.setAsAdmin} checked={data.positionName === 'Admin' ? !this.state.setAdmin : false} onChange={(e) => this.setState({ setAdmin: e.target.value})}/>
                            </div>
                          </td>
                          <td><div align="center">
                            {(this.state.shID.shID !== data.hId && data.positionName !== 'Admin') && 
                              <button className="btn btn-minier btn-danger" onClick={this.removeFromGroup}>Remove</button>
                            }
                          </div>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>{/* /.span */}
            </div>
          }
          <br />
        </div>

        <Footer />
      </div>
    );
  }
}

export default MU_Groupmember;