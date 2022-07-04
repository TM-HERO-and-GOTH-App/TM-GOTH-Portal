import React, { useState } from 'react';
import Layout from '../Layout';
import CreateCaseService from '../../web_service/create_case_service/CreateCaseService';
import CircularProgress from '@mui/material/CircularProgress';
import moment from "moment";

function CreateCase() {
	const [userData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
	const [lovData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
	const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')));
	const [alertStatus, setAlertStatus] = useState(false);
	const [successCreateCase, setSuccessCreateCase] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [caseDescriptionInput, setCaseDescriptionInput] = useState('');
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [serviceID, setServiceID] = useState('');
	const [nricInput, setNRICInput] = useState('');
	const [mobileNumberInput, setMobileNumberInput] = useState('');
	const [caseType, setCaseType] = useState('0');
	const [stateType, setStateType] = useState('0');
	const [sourceType, setSourceType] = useState('0');
	const [productType, setProductType] = useState('0');
	const [areaType, setAreaType] = useState('0');
	const [subAreaSelect, setSubAreaSelect] = useState('0');
	const [symptomSelect, setSymptomSelect] = useState('0');
	const [siebelTargetSystemSelect, setSiebelTargetSystemSelect] = useState('0');
	const [externalSystemInput, setExternalSystemInput] = useState('');
	const [stakeholderReferenceSelect, setStakeholderReferenceSelect] = useState('');
	let [searchNRIC, setSearchNRIC] = useState('');
	let [searchServiceID, setSearchServiceID] = useState('')
	let [customerProfileFromNova, setCustomerProfileFromNova] = useState({});
	let [searchingCustomer, setSearchingCustomer] = useState(false);

	const getCustomerProfile = (e) => {
		e.preventDefault();
		CreateCaseService.getCustomerProfileFromNova(searchServiceID, searchNRIC).then((res, err) => {
			// console.log(res.data);
			if (err) {
				setSearchingCustomer(false);
				alertStatus(true);
				alertMessage('Error during searching customer!!');
				return;
			}
			setSearchingCustomer(true);
			setCustomerProfileFromNova(res.data.STTRetrieveServiceAcctResponse.Response[0])
			setCustomerNameInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].AccountName[0])
			setMobileNumberInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].MobileNo)
			setStateType(lovData.filter(data => data.L_NAME.toUpperCase() == res.data.STTRetrieveServiceAcctResponse.Response[0].ServiceInfo[0].ServiceAddress[0].State).map(data => data.L_ID))
			setSearchingCustomer(false);
		})
	}

	const createCase = (e) => {
		e.preventDefault();
		CreateCaseService.createCase(
			token, customerNameInput, nricInput, mobileNumberInput, serviceID, stateType,
			externalSystemInput, stakeholderReferenceSelect, sourceType, caseDescriptionInput,
			caseType, areaType, subAreaSelect, symptomSelect, siebelTargetSystemSelect
		)
			.then(res => {
				// console.log(res);
				if (res.data === 'Case successfully created.') {
					setAlertStatus(true);
					setSuccessCreateCase(true)
					setAlertMessage(res.data)
					resetForm();
				} else {
					setAlertMessage(res.message);
				}
			})
	}

	const resetForm = () => {
		setCustomerNameInput('')
		setNRICInput('')
		setMobileNumberInput('')
		setServiceID('')
		setCaseDescriptionInput('')
		setStateType('0')
		setCaseType('0')
		setExternalSystemInput('')
		setStakeholderReferenceSelect('0')
		setSourceType('0')
		setProductType('0')
		setAreaType('0');
		setSubAreaSelect('0');
		setSymptomSelect('0');
		setSiebelTargetSystemSelect('0');
	}

	const createICPSR = () => {
		CreateCaseService.createICPSR(
			customerProfileFromNova.CustInfo[0].CustomerRowID[0],
			'Open',
			userData.fullName,
			areaType,
			subAreaSelect,
			caseType,
			moment.now().toString(),
			null, null, userData.stakholderName,
			customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0],
			customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0],
			customerProfileFromNova.BillInfo[0].BillingAccountRowID[0],
			customerProfileFromNova.BillInfo[0].BillingAccountNo[0],
			caseDescriptionInput,
			null, null,
			productType,
			customerProfileFromNova.ServiceInfo[0].ServiceRowID[0],
			null, null
		).then(res => {
			console.log(res, 'createICPSR')
			setAlertStatus(true);
			setAlertMessage(res.data)
		})
	}

	const createICPTT = () => {
		CreateCaseService.createICPTT(
			customerProfileFromNova.CustInfo[0].CustomerRowID[0], null, 'Streamyx',
			productType, caseDescriptionInput, symptomSelect,
			customerProfileFromNova.ServiceInfo[0].ServiceRowID[0], null,
			userData.fullName, null, null, null, null,
			null, null, customerProfileFromNova.BillInfo[0].BillingAccountNo[0],
			null, null,
			customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0],
			customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0],
			customerProfileFromNova.BillInfo[0].BillingAccountRowID[0]
		).then(res => {
			console.log(res, 'createICPTT');
			setAlertStatus(true);
			setAlertMessage(res.data)
		})
	}

	const createSR = () => {
		CreateCaseService.createNovaSR(
			customerProfileFromNova.CustInfo[0].CustomerRowID[0], null,
			areaType, subAreaSelect, null, null, null,
			customerProfileFromNova.ServiceInfo[0].ServiceRowID[0],
			null, null, null, null,
			caseDescriptionInput, null, null, null, null,
			null, null, null, null,
			null, null, userData.fullName, null, null
		).then(res => {
			console.log(res, 'createSR');
		})
	}

	const createTT = () => {
		CreateCaseService.createNovaTT(
			customerProfileFromNova.CustInfo[0].CustomerRowID[0],
			customerProfileFromNova.BillInfo[0].BillingAccountNo[0],
			customerProfileFromNova.BillInfo[0].BillingAccountRowID[0],
			null, productType, null, null, userData.fullName,
			customerProfileFromNova.ServiceInfo[0].ServiceRowID[0], null,
			null, 'New', null, null, null,
			caseDescriptionInput, null, null, null,
			null, null, null, null,
			null, null, userData.fullName, null, null
		).then(res => {
			console.log(res, 'createTT');
		})
	}

	return (
		<Layout
			pageTitle='Create New Case'
			pageContent={
				<>
					{/*Button Added for api testing*/}
					<div className="hb-input-group">
						<button className='btn btn-sm' onClick={createICPSR}>
							createICPSR
						</button>
						<button className='btn btn-sm' onClick={createICPTT}>
							createICPTT
						</button>
						<button className='btn btn-sm' onClick={createSR}>
							createSR
						</button>
						<button className='btn btn-sm' onClick={createTT}>
							createTT
						</button>
					</div>
					<form name="form" onSubmit={createCase} onReset={resetForm}>
						{
							alertStatus &&
							<div className="row">
								<div className="col-xs-12">
									<div
										className={`alert alert-block ${successCreateCase === true ? 'alert-success' : 'alert-danger'}`}>
										<button type="button" onClick={() => setAlertStatus(false)} className="close"
											data-dismiss="alert">
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

						<div align="right" className='row-cols-auto'>
							<input className="input-medium"
								style={{ height: '100%', padding: '4px 8px 4px 8px', margin: '1vh 0' }}
								type='text'
								placeholder='ServiceID' value={searchServiceID}
								onChange={(e) => setSearchServiceID(e.target.value)} />
							<input className="input-medium" style={{ padding: '4px 8px 4px 8px', margin: '1vh 0' }}
								type='text'
								placeholder='NRIC' value={searchNRIC}
								onChange={(e) => setSearchNRIC(e.target.value)} />
							<button className='btn btn-sm' style={{ height: '30px', margin: '1vh 35px 1vh 0' }}
								onClick={getCustomerProfile}>
								{
									searchingCustomer === true ? <CircularProgress disabled /> :
										<i className="ace-icon fa fa-search align-top bigger-110" />
								}
							</button>
						</div>

						<div className="space-6" />
						<div className="row">
							<div className="col-sm-6">
								<div className="form-group">
									<div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

										<div className="profile-info-row">
											<div className="profile-info-name" style={{ width: '25%' }}>Customer Name
											</div>
											<div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{ width: '100%' }} type="text"
														name="customerName"
														placeholder="Customer Name"
														defaultValue={customerNameInput ? customerNameInput : ''}
														onChange={(e) => setCustomerNameInput(e.target.value)} />
												</span>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">NRIC No</div>
											<div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{ width: '100%' }} type="text"
														name="nricNum"
														placeholder="NRIC Number"
														defaultValue={nricInput ? nricInput : ''}
														onChange={(e) => setNRICInput(e.target.value)} />
												</span>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Mobile No</div>
											<div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{ width: '100%' }} type="text"
														name="mobileNum"
														placeholder="Mobile Number"
														defaultValue={mobileNumberInput ? mobileNumberInput : ''}
														onChange={(e) => setMobileNumberInput(e.target.value)} />
												</span>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Customer Service ID</div>
											<div className="profile-info-value">
												<span className="editable" id="serviceID">
													<input className="input-sm" style={{ width: '100%' }} type="text"
														name="customerServiceID"
														placeholder="Customer Service ID"
														value={serviceID}
														onChange={(e) => setServiceID(e.target.value)} />
												</span>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">State</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='areaLocationID'
													value={stateType}
													onChange={(e) => setStateType(parseFloat(e.target.value))}>
													<option value='0' hidden>Choose a State...</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'STATE').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Case Type</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='caseTypeID'
													value={caseType} onChange={(e) => setCaseType(e.target.value)}>
													<option value='0' hidden>Choose a Case Type</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'CASE-TYPE').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name"> External System Ref.</div>

											<div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" value={externalSystemInput}
														onChange={(e) => setExternalSystemInput(e.target.value)}
														style={{ width: "100%" }} type="text" name="extSysRef"
														placeholder="External System Reference" />
												</span>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Stakeholder Ref.</div>
											<div className="profile-info-value">
												<select className="chosen-select form-control"
													value={stakeholderReferenceSelect}
													onChange={(e) => setStakeholderReferenceSelect(e.target.value)}
													name="stakeholderRef"
													data-placeholder="Choose a Stakeholder Reference...">
													<option value="n/a" selected="yes">Choose a Stakeholder
														Reference...
													</option>
													<option value="NMO">NMO</option>
													<option value="BRD">BRD</option>
													<option value="PRODUCT">Product</option>
													<option value="RRT">RRT</option>
													<option value="RRM">RRM</option>
													<option value="GIT">GIT</option>
													<option value="RESELLER">Reseller</option>
													<option value="CMC">CMC</option>
													<option value="TMPOINT">TM Point</option>
													<option value="NOC">NOC</option>
													<option value="CSM">CSM State</option>
													<option value="SFM">SFM</option>
													<option value="LOB/PTT">LOB/PTT</option>
													<option value="Customer">Customer</option>
													<option value="Contact-Centre">Contact Centre</option>
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name" style={{ width: '25%' }}>Case Description
											</div>
											<div className="profile-info-value">
												<textarea className="form-control limited" rows={10} name="caseContent"
													maxLength={9999}
													value={caseDescriptionInput}
													onChange={(e) => setCaseDescriptionInput(e.target.value)} />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="form-group">
									<div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
										<div className="profile-info-row">
											<div className="profile-info-name">Source</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='sourceID'
													value={sourceType}
													onChange={(e) => setSourceType(e.target.value)}>
													<option hidden value='0'>Choose a Source...</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'SOURCE').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Product Type</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='productType'
													value={productType}
													onChange={(e) => setProductType(e.target.value)}>
													<option value='0' hidden>Choose a Product Type</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'PRODUCT').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Area Type</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='caseTypeID'
													value={areaType}
													onChange={(e) => setAreaType(parseFloat(e.target.value))}>
													<option value='0' disabled>Choose a Area Type</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'AREA').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Sub-Area Type</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='caseTypeID'
													value={subAreaSelect}
													onChange={(e) => setSubAreaSelect(parseFloat(e.target.value))}>
													<option value='0' disabled>Choose a Sub-area Type</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'SUB-AREA').map((data, key) => {
															return <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Symptom Type</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='symptomType'
													value={symptomSelect}
													onChange={(e) => setSymptomSelect(parseFloat(e.target.value))}>
													<option value='0' disabled>Choose a Symptom Type</option>
													{
														lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
															// console.log(data)
															return data.PARENT_ID == siebelTargetSystemSelect && <option key={key}
																value={data.L_ID}>{data.L_NAME}</option>
														})
													}
												</select>
											</div>
										</div>

										<div className="profile-info-row">
											<div className="profile-info-name">Siebel Target System</div>
											<div className="profile-info-value">
												<select className='chosen-select form-control' name='siebelSystem'
													value={siebelTargetSystemSelect}
													onChange={(e) => setSiebelTargetSystemSelect(e.target.value)}>
													<option value='0' disabled>Choose a Target System</option>
													{lovData.filter(filter => filter.L_GROUP === 'SYSTEM-TARGET').map((data, key) => {
														return <option key={key} value={data.L_ID}>{data.L_NAME}</option>
													})
													}
												</select>
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

export default CreateCase;
