import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CreateCaseService from '../web_service/create_case_service/CreateCaseService';

class Createcase extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hToken: JSON.parse(sessionStorage.getItem('UserData')),
      lov: JSON.parse(sessionStorage.getItem('LovData')),
      shID: JSON.parse(sessionStorage.getItem('UserData')),
      token: JSON.parse(sessionStorage.getItem('userToken')),
      alertStatus: false,
      alertMessage: '',
      caseDescription: '',
      customerName: '',
      ic: '',
      mobileNumber: '',
      caseType: 'placeholder',
      stateType: 'placeholder',
      sourceType: 'placeholder',
      subSourceType: 'placeholder',

    }
    this.createCase = this.createCase.bind(this);
    this.userInput = this.userInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  userInput(){
    const userInput = {
      location: this.state.stateType,
      caseTypeID: this.state.caseType,
      sourceID: this.state.sourceType,
      subSourceID: this.state.subSourceType
    }

    const sessionData = sessionStorage.setItem('caseInput', JSON.stringify(userInput))
    return sessionData;
  }

  createCase(e){
    e.preventDefault();
    CreateCaseService.createCase(this.state.token, this.state.customerName, this.state.ic, this.state.mobileNumber, this.state.caseDescription, this.state.stateType, 'COMPLAINT', this.state.sourceType, this.state.subSourceType, this.state.caseType)
    .then(res => {
      console.log(res);
      if(this.state.customerName !== '' && this.state.sourceType !== 0 && this.state.caseDescription !== 'placeholder'){
        if(res.response === 'FAILED'){
          this.setState({ alertStatus: true })
          this.setState({ alertMessage: res.message })
        } else{
          this.props.history.push('/MyAssignments_Assigned')
          this.userInput()
        }
      }else {
        this.setState({ alertStatus: true });
        this.setState({ alertMessage: 'Please insert all the required field' });
      }
    })
  }

  resetForm(){
    this.setState({
      customerName: '',
      ic: '',
      mobileNumber: '',
      stateType: 'placeholder',
      caseType: 'placeholder',
      sourceType: 'placeholder',
      subSourceType: 'placeholder',
    })
  }

  render() {
    return (
      <div>
        <Header />
        <form name="form" onSubmit={this.createCase} onReset={this.resetForm}>
          {(this.state.alertStatus === true) && (this.state.alertMessage !== null) ?
            <div className="row">
              <div className="col-xs-12">
                <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>{this.state.alertMessage}</p>
                </div>
              </div>
            </div> : null
          }

          <div className="left">
            <button className="btn btn-sm btn-inverse" type="reset">
              <i className="ace-icon fa fa-repeat align-top bigger-125" />
              Reset
            </button>
            <button className="btn btn-sm btn-success" type="submit" name="btn_post">
              <i className="ace-icon fa fa-save align-top bigger-125" />
              Save New Case
            </button>
          </div>

          <div className="space-6" />
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Customer Name </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="customerName" placeholder="Customer Name" defaultValue={this.state.customerName ? this.state.customerName : ''} onChange={(e) => this.setState({ customerName: e.target.value })}/>
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> NRIC No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="nricNum" placeholder="NRIC Number" defaultValue={this.state.ic ? this.state.ic : ''} onChange={(e) => this.setState({ ic: e.target.value })}/>
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> Mobile No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="mobileNum" placeholder="Mobile Number" defaultValue={this.state.mobileNumber ? this.state.mobileNumber : ''} onChange={(e) => this.setState({ mobileNumber: e.target.value })}/>
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> State </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='areaLocationID' value={this.state.stateType} onChange={(e) => this.setState({ stateType: e.target.value })}>
                        <option value='placeholder' hidden>Choose a State...</option>
                        {this.state.lov.filter(filter => filter.lovGroup === 'AREA-LOCATION').map((data, key) => {
                          return <option key={key} value={data.lovID}>{data.lovName}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> Case Type </div>
                    <div className="profile-info-value">
                        <select className='chosen-select form-control' name='caseTypeID' value={this.state.caseType} onChange={(e) => this.setState({ caseType: e.target.value})}>
                          <option value='placeholder' hidden>Choose a Case Type</option>
                          { this.state.lov.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                              return <option key={key} value={data.lovID}>{data.lovName}</option>
                            }) 
                          }
                        </select>
                    </div>
                  </div>

                  {/* <div class="profile-info-row">
			<div class="profile-info-name"> About Me </div>

			<div class="profile-info-value">
				<span class="editable" id="about">Editable as WYSIWYG</span>
			</div>
		</div> */}
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Source </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='sourceID' value={this.state.sourceType} onChange={(e) => this.setState({ sourceType: e.target.value })}>
                        <option hidden value='placeholder'>Choose a Source...</option>
                        {
                          this.state.lov.filter(filter => filter.lovGroup === 'SOURCE').map((data, key) => {
                            return <option key={key} value={data.lovID}>{ data.lovName }</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> Sub Source </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='subSourceID' value={this.state.subSourceType} onChange={(e) => this.setState({ subSourceType: e.target.value })}>
                          <option hidden value='placeholder'>Choose a Sub Source...</option>
                          {
                            this.state.lov.filter(filter => filter.lovGroup === 'SUB-SOURCE').map((data, key) => {
                              return <option key={key} value={data.lovID}>{ data.lovName }</option>
                            })
                          }
                      </select>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={this.state.caseDescription ? this.state.caseDescription : ''} onChange={(e) => this.setState({ caseDescription: e.target.value })}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <Footer />
      </div>
    );
  }
}

export default Createcase;