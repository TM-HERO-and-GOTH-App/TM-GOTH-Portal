import React, { useState } from 'react';
import Layout from '../Layout';
import CreateCaseService from '../../web_service/create_case_service/CreateCaseService';

function Createcase(props) {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [caseDescriptionInput, setCaseDescriptionInput] = useState('');
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [nricInput, setNRICInput] = useState('');
  const [mobileNumberInput, setMobileNumberInput] = useState('');
  const [caseType, setCaseType] = useState('0');
  const [stateType, setStateType] = useState('0');
  const [sourceType, setSourceType] = useState('0');
  const [subSourceType, setSubSourceType] = useState('0');

  const userInput = () => {
    const userInput = {
      location: stateType,
      caseTypeID: caseType,
      sourceID: sourceType,
      subSourceID: subSourceType
    }

    const sessionData = sessionStorage.setItem('caseInput', JSON.stringify(userInput))
    return sessionData;
  }

  const createCase = (e) => {
    e.preventDefault();
    CreateCaseService.createCase(token, customerNameInput, nricInput, mobileNumberInput,
      caseDescriptionInput, stateType, sourceType, subSourceType, caseType)
      .then(res => {
        console.log(res);
        if (customerNameInput !== '' && sourceType !== 0 && caseDescriptionInput !== '') {
          if (res.response === 'FAILED') {
            setAlertStatus(true)
            setAlertMessage('Please insert all the required field')
          } else {
            props.history.replace('/');
          }
        } else {
          setAlertStatus(true);
          setAlertMessage('Please insert all the required field');
        }
      })
  }

  const resetForm = () => {
    setCaseDescriptionInput('')
    setCustomerNameInput('')
    setNRICInput('')
    setMobileNumberInput('')
    setCaseType('0')
    setStateType('0')
    setSourceType('0')
    setSubSourceType('0')
  }

  return (
    <Layout 
    pageTitle='Create New Case'
    pageContent={
      <>

        <form name="form" onSubmit={createCase} onReset={resetForm}>
          {
            alertStatus &&
            <div className="row">
              <div className="col-xs-12">
                <div className="alert alert-block alert-danger">
                  <button type="button" className="close" data-dismiss="alert">
                    <i className="ace-icon fa fa-times" />
                  </button>
                  <p>{alertMessage}</p>
                </div>
              </div>
            </div>
          }

          <div className="left">
            <button className="btn btn-sm btn-inverse" type="reset">
              <i className="ace-icon fa fa-repeat align-top bigger-125" />
              Reset
            </button>
            <button className="btn btn-sm btn-success" type="submit">
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
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="customerName" placeholder="Customer Name" defaultValue={customerNameInput ? customerNameInput : ''} onChange={(e) => setCustomerNameInput(e.target.value)} />
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> NRIC No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="nricNum" placeholder="NRIC Number" defaultValue={nricInput ? nricInput : ''} onChange={(e) => setNRICInput(e.target.value)} />
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> Mobile No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username">
                        <input className="input-sm" style={{ width: '100%' }} type="text" name="mobileNum" placeholder="Mobile Number" defaultValue={mobileNumberInput ? mobileNumberInput : ''} onChange={(e) => setMobileNumberInput(e.target.value)} />
                      </span>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> State </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='areaLocationID' value={stateType} onChange={(e) => setStateType(e.target.value)}>
                        <option value='0' hidden>Choose a State...</option>
                        {
                          lovData.filter(filter => filter.lovGroup === 'AREA-LOCATION').map((data, key) => {
                            return <option key={key} value={data.lovID}>{data.lovName}</option>
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name"> Case Type </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='caseTypeID' value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                        <option value='0' hidden>Choose a Case Type</option>
                        {
                          lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                            return <option key={key} value={data.lovID}>{data.lovName}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="form-group">
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Source </div>
                    <div className="profile-info-value">
                      <select className='chosen-select form-control' name='sourceID' value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
                        <option hidden value='0'>Choose a Source...</option>
                        {
                          lovData.filter(filter => filter.lovGroup === 'SOURCE').map((data, key) => {
                            return <option key={key} value={data.lovID}>{data.lovName}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={caseDescriptionInput ? caseDescriptionInput : ''} onChange={(e) => setCaseDescriptionInput(e.target.value)} />
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={caseDescriptionInput ? caseDescriptionInput : ''} onChange={(e) => setCaseDescriptionInput(e.target.value)} />
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={caseDescriptionInput ? caseDescriptionInput : ''} onChange={(e) => setCaseDescriptionInput(e.target.value)} />
                    </div>
                  </div>

                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={caseDescriptionInput ? caseDescriptionInput : ''} onChange={(e) => setCaseDescriptionInput(e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="caseContent" maxLength={9999} defaultValue={caseDescriptionInput ? caseDescriptionInput : ''} onChange={(e) => setCaseDescriptionInput(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    }
    />
  );
}

export default Createcase;