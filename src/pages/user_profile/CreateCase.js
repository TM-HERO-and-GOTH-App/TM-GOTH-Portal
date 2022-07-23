import React, {useState, useRef, useEffect} from 'react';
import Layout from '../Layout';
import CreateCaseService from '../../web_service/create_case_service/CreateCaseService';
import CircularProgress from '@mui/material/CircularProgress'

function CreateCase() {
    // Session Data
    const userData = JSON.parse(sessionStorage.getItem('UserData'));
    const lovData = JSON.parse(sessionStorage.getItem('LovData'));
    const token = JSON.parse(sessionStorage.getItem('userToken'));

    // Alert
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const setAlert = (status, success, message) => {
        setAlertStatus(status);
        setAlertSuccess(success);
        setAlertMessage(message);
    };

    // Variables
    let srRowID = useRef('');
    const [caseDescriptionInput, setCaseDescriptionInput] = useState('');
    const [customerNameInput, setCustomerNameInput] = useState('');
    const [serviceID, setServiceID] = useState('');
    const [nricInput, setNRICInput] = useState('');
    const [mobileNumberInput, setMobileNumberInput] = useState('');
    const [caseType, setCaseType] = useState('0');
    const [stateType, setStateType] = useState('0');
    const [sourceType, setSourceType] = useState('0');
    const [productType, setProductType] = useState('0');
    const [siebelCaseType, setSiebelCaseType] = useState('0');
    const [areaType, setAreaType] = useState('0');
    const [subAreaSelect, setSubAreaSelect] = useState('0');
    const [symptomSelect, setSymptomSelect] = useState('0');
    const [symptomType, setSymptomType] = useState(null)
    const [siebelTargetSystemSelect, setSiebelTargetSystemSelect] = useState('0');
    const [externalSystemInput, setExternalSystemInput] = useState('');
    const [stakeholderReferenceSelect, setStakeholderReferenceSelect] = useState('');
    const [customerID, setCustomerID] = useState('');
    const [customerProfileFromNova, setCustomerProfileFromNova] = useState({});
    const [caseToken, setCaseToken] = useState([]);
    const [srData, setSRData] = useState({})

    // Spinner
    const [searchingCustomer, setSearchingCustomer] = useState(false);
    const [isCreateCase, setIsCreateCase] = useState(false);

    const getCustomerProfile = (e) => {
        e.preventDefault();
        setSearchingCustomer(true);
        if (siebelTargetSystemSelect === '0') {
            setAlert(true, false, 'Please select a target system...')
            setSearchingCustomer(false);
            return;
        }
        if (siebelTargetSystemSelect === '662') {
            if (serviceID === '') {
                setAlert(true, false, 'Please fill in your Service ID...')
                setSearchingCustomer(false);
                return;
            }
            CreateCaseService.getCustomerProfileFromNova(serviceID, nricInput).then((res, err) => {
                console.log(res, 'getCustomerProfileFromNova');
                if (err || typeof res.data === 'undefined') {
                    setAlert(true, false, res.message);
                    setSearchingCustomer(false);
                    return;
                }
                if (res.data.message !== 'Success') {
                    setAlert(true, false, `Error during searching customer.. (${res.data.message})`);
                    setSearchingCustomer(false);
                    return;
                }
                setAlert(true, true, 'Query user info success.');
                setCustomerProfileFromNova(res.data.result)
                setCustomerNameInput(res.data.result.CustInfo.AccountName)
                setMobileNumberInput(res.data.result.CustInfo.MobileNo)
                setStateType(lovData.filter(data => data.L_NAME.toUpperCase() === res.data.result.ServiceInfo[0].ServiceAddress.State).map(data => data.L_ID))
                return setSearchingCustomer(false);
            })
        } else {
            if (serviceID === '' || nricInput === '') {
                setAlert(true, false, 'Please fill in your Service ID/ NRIC...')
                setSearchingCustomer(false);
                return;
            }
            CreateCaseService.getCustomerProfileFromICP(serviceID, nricInput).then((res, err) => {
                console.log(res, 'getCustomerProfileFromICP');
                if (err || typeof res.data === 'undefined') {
                    setAlert(true, false, res.message);
                    setSearchingCustomer(false);
                    return;
                }
                if (res.data.message !== 'Success') {
                    setAlert(true, false, `Error during searching customer.. (${res.data.message})`);
                    setSearchingCustomer(false);
                    return;
                }
                setAlert(true, true, 'Query user info success.');
                setCustomerProfileFromNova(res.data.result)
                setCustomerNameInput(res.data.result.CustInfo.AccountName)
                setMobileNumberInput(res.data.result.CustInfo.MobileNo)
                setStateType(lovData.filter(data => data.L_NAME.toUpperCase() === (
                    Array.isArray(res.data.result.ServiceInfo) ?
                        res.data.result.ServiceInfo[0].ServiceAddress.State :
                        res.data.result.ServiceInfo.ServiceAddress.State
                )).map(data => data.L_ID))
                setSearchingCustomer(false);
            })
        }
    }

    const createCase = (e) => {
        e.preventDefault();
        CreateCaseService.createCase(
            token, customerNameInput, nricInput, mobileNumberInput, serviceID, stateType,
            externalSystemInput, stakeholderReferenceSelect, sourceType, caseDescriptionInput,
            caseType, areaType, subAreaSelect, symptomSelect, siebelTargetSystemSelect, 'No'
        )
            .then(res => {
                setIsCreateCase(true)
                console.log(res.data)
                if (res.status === 202) {
                    setIsCreateCase(false);
                    return setAlert(true, false, `Case Creation Failed. (${res.data})`);
                }
                setCaseToken(res.data.caseToken)
                if (res.message !== null) {
                    setAlert(true, true, res.data.message);
                    if (siebelTargetSystemSelect === '660') return createICPSR();
                    if (siebelTargetSystemSelect === '662') return createNovaSR();
                }
                setIsCreateCase(false)
                resetForm();
                return setAlert(true, true, 'Successfully Create Case');
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
            customerProfileFromNova.CustInfo.CustomerRowID,
            lovData.filter(filter => filter.L_ID === siebelCaseType).map(data => data.L_NAME)[0],
            'AIMAN',
            lovData.filter(filter => filter.L_ID === areaType).map(data => data.L_NAME)[0],
            lovData.filter(filter => filter.L_ID === subAreaSelect).map(data => data.L_NAME)[0],
            'TM CCR Technical CPC Follow Up',
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.BillInfo.BillingAccountRowID,
            customerProfileFromNova.BillInfo.BillingAccountNo,
            caseDescriptionInput,
            Array.isArray(customerProfileFromNova.ServiceInfo) ? customerProfileFromNova.ServiceInfo[1].ServiceRowID : customerProfileFromNova.ServiceInfo.ServiceRowID
        ).then(res => {
            console.log(res.data, 'createICPSR')
            // console.log(customerProfileFromNova.ServiceInfo[1].ServiceRowID, 'createICPSR')
            if (res.data === undefined || res.data?.Header?.Header?.ErrorCode === '1') {
                setIsCreateCase(false);
                setAlert(true, false, 'SR creation failed!!')
                return;
            }
            CreateCaseService.updateSRNumber(res.data.SRNumber, res.data.SRRowID, caseToken).then(
                (dbRes, err) => {
                    if (err) {
                        console.log(err, 'Insert SR Number Failed');
                    }
                    if (caseToken === undefined || res.data.SRNumber === null || res.data.SRNumber === undefined || res.data.SRRowID === undefined || res.data.SRRowID === null) return console.log('Case Token or TicketID is empty! Failed to save Ticket ID!!');
                    return console.log('Successfully save SR in DB!!')
                }
            )
            setAlert(true, true, 'Successfully create SR for ICP!!');
            srRowID.current = res.data.SRRowID;
            // console.log(srRowID.current);
            return createICPTT();
            // return;
        })
    }

    // Need to Pass relatedSrRowID data - Fix by passing useRef variable
    const createICPTT = () => {
        CreateCaseService.createICPTT(
            customerProfileFromNova.CustInfo.CustomerRowID,
            caseDescriptionInput,
            lovData.filter(filter => filter.L_ID === symptomSelect).map(data => data.L_NAME)[0],
            Array.isArray(customerProfileFromNova.ServiceInfo) ? customerProfileFromNova.ServiceInfo[0].ServiceRowID : customerProfileFromNova.ServiceInfo.ServiceRowID,
            `${srRowID.current}`,
            'AIMAN',
            serviceID,
            customerProfileFromNova.BillInfo.BillingAccountNo,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.BillInfo.BillingAccountRowID
        ).then((res) => {
            console.log(res, 'createICPTT');
            if (res.data === 'relatedSrRowID is required' || res.data === undefined || res.data?.Header?.ErrorCode === '1') {
                setIsCreateCase(false);
                return setAlert(true, false, `TT Creation for NOVA failed!! [${res.data.Header.ErrorMessage}]`);
            }
            CreateCaseService.updateTTNumber(res.data.TicketID, caseToken).then(
                (dbRes, err) => {
                    if (err) {
                        console.log(err, 'Insert TT Number Failed');
                    }
                    if (caseToken === undefined || res.data.TicketID === null || res.data.TicketID === undefined) return console.log('Case Token or TicketID is empty! Failed to save Ticket ID!!');
                    return console.log('Successfully save TT in DB!!')
                }
            )
            setIsCreateCase(false);
            return setAlert(true, true, 'TT creation has been successful!!');
        })
    }

    const createNovaSR = () => {
        CreateCaseService.createNovaSR(
            customerProfileFromNova.CustInfo.CustomerRowID,
            lovData.filter(filter => filter.L_ID === siebelCaseType).map(data => data.L_NAME)[0],
            lovData.filter(filter => filter.L_ID === areaType).map(data => data.L_NAME)[0],
            lovData.filter(filter => filter.L_ID === subAreaSelect).map(data => data.L_NAME)[0],
            'wifi@unifi', // to be removed
            'SPICE', // temp source naming
            customerProfileFromNova.ServiceInfo[0].ServiceRowID,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.BillInfo[0].BillingAccountRowID,
            customerProfileFromNova.BillInfo[0].BillingAccountNo,
            caseDescriptionInput, userData.stakeholderName, caseDescriptionInput, 'EAI'
        ).then(res => {
            console.log(res.data, 'createSR');
            if (res.message) {
                setIsCreateCase(false);
                return setAlert(true, false, res.message);
            }
            if (res.data.message !== 'Success') {
                return setAlert(true, false, `SR Creation for NOVA Failed (${res.data.message})`);
            }
            CreateCaseService.updateSRNumber(res.data.response.SRNumber, res.data.response.SRRowID, caseToken).then(
                (dbRes, err) => {
                    if (err) {
                        console.log(err, 'Insert SR Number Failed');
                    }
                    if (caseToken === undefined && res.data.response?.SRNumber === undefined && res.data.response?.SRNumber === null && res.data.response?.SRRowID === undefined && res.data.response?.SRRowID === null) return console.log('Case Token or TicketID is empty! Failed to save Ticket ID!!');
                    return console.log('Successfully save SR in DB!!')
                }
            )
            // console.log(res.data.response.SRNumber)
            setAlert(true, true, `${res.data.message} Create SR for NOVA!!`);
            // return createNovaTT();
            return;
        })
    }

    // Error cause from Symptom Code tag - FIX by the performance filteration
    const createNovaTT = () => {
        CreateCaseService.createNovaTT(
            customerProfileFromNova.CustInfo.CustomerRowID,
            Array.isArray(customerProfileFromNova.BillInfo) ? customerProfileFromNova.BillInfo[0].BillingAccountNo : customerProfileFromNova.BillInfo.BillingAccountNo,
            Array.isArray(customerProfileFromNova.BillInfo) ? customerProfileFromNova.BillInfo[0].BillingAccountRowID : customerProfileFromNova.BillInfo.BillingAccountRowID,
            lovData.filter(filter => filter.L_ID === symptomSelect).map(data => data.L_NAME)[0], symptomType,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            customerProfileFromNova.CustInfo.PrimaryContactRowID,
            caseDescriptionInput, 'EAI'
        ).then((res, err) => {
            console.log(res, 'createTT');
            if (res.data === undefined || err || res.data.message !== 'Success') {
                setIsCreateCase(false);
                return setAlert(true, false, 'TT Creation for NOVA failed!!');
            }
            CreateCaseService.updateTTNumber(res.data.response.TicketID, caseToken).then(
                (dbRes, err) => {
                    if (err) {
                        console.log(err, 'Insert TT Number Failed');
                    }
                    if (caseToken === undefined || res.data.response.TicketID === null || res.data.response.TicketID === undefined) return console.log('Case Token or TicketID is empty! Failed to save Ticket ID!!');
                    return console.log('Successfully save TT in DB!!')
                }
            )
            setIsCreateCase(false);
            return setAlert(true, true, `${res.data.message} create TT for NOVA!!`);
        })
    }

    return (
        <Layout
            pageTitle='Create New Case'
            pageContent={
                <>
                    {
                        alertStatus &&
                        <div className="row">
                            <div className="col-xs-12">
                                <div
                                    className={`alert alert-block ${alertSuccess === true ? 'alert-success' : 'alert-danger'}`}>
                                    <button type="button" onClick={() => setAlertStatus(false)} className="close"
                                            data-dismiss="alert">
                                        <i className="ace-icon fa fa-times"/>
                                    </button>
                                    <p>{alertMessage}</p>
                                </div>
                            </div>
                        </div>
                    }

					{/*/!*Button Added for api testing*!/*/}
					{/* <div className="hb-input-group">
						<button className='btn btn-sm' onClick={createICPSR}>
							createICPSR
						</button>
						<button className='btn btn-sm' onClick={createICPTT}>
							createICPTT
						</button>
						<button className='btn btn-sm' onClick={createNovaSR}>
							createNovaSR
						</button>
						<button className='btn btn-sm' onClick={createNovaTT}>
							createNovaTT
						</button>
					</div> */}

                    <div align="right" className="row row-cols-auto">
                        <div align="center" className='cc-search-container'>
                            <div align="left" className="cc-search-container-title">Query Customer Information</div>
                            <select className="input-medium" id="search-system" name="search-system"
                                    value={siebelTargetSystemSelect}
                                    onChange={(e) => setSiebelTargetSystemSelect(e.target.value)}>
                                <option value='0'>Choose a Target System</option>
                                {lovData.filter(filter => filter.L_GROUP === 'SYSTEM-TARGET').map((data, key) => {
                                    return <option key={key} value={data.L_ID}>{data.L_NAME}</option>
                                })
                                }
                            </select>
                            <input className="input-medium" type='text' placeholder='ServiceID' value={serviceID}
                                   onChange={(e) => setServiceID(e.target.value)}/>
                            <input className="input-medium" type='text' placeholder='NRIC' value={nricInput}
                                   onChange={(e) => setNRICInput(e.target.value)}/>
                            <button className='btn btn-sm' onClick={getCustomerProfile}>
                                {
                                    searchingCustomer === true ? <CircularProgress disabled/> :
                                        <i className="ace-icon fa fa-search align-top bigger-110"/>
                                }
                            </button>
                        </div>
                    </div>
                    <form name="form" onSubmit={createCase} onReset={resetForm}>
                        <div className="left">
                            <button className="btn btn-sm btn-inverse" type="reset">
                                <i className="ace-icon fa fa-repeat align-top bigger-125"/>
                                Reset
                            </button>
                            <button className="btn btn-sm btn-success" type="submit" disabled={false}>
                                <i className="ace-icon fa fa-save align-top bigger-125"/>
                                Save New Case
                            </button>
                        </div>
                        <div className="space-6"/>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name" style={{width: '25%'}}>Customer Name<span
                                                style={{color: 'red'}}>*</span>
                                            </div>
                                            <div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{width: '100%'}} type="text"
                                                           name="customerName"
                                                           placeholder="Customer Name"
                                                           defaultValue={customerNameInput ? customerNameInput : ''}
                                                           onChange={(e) => setCustomerNameInput(e.target.value)}
                                                           required
                                                    />
												</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">NRIC No<span
                                                style={{color: 'red'}}>*</span></div>
                                            <div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{width: '100%'}} type="text"
                                                           name="nricNum"
                                                           placeholder="NRIC Number"
                                                           defaultValue={nricInput ? nricInput : ''}
                                                           onChange={(e) => setNRICInput(e.target.value)}
                                                           required
                                                    />
												</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">Mobile No<span
                                                style={{color: 'red'}}>*</span></div>
                                            <div className="profile-info-value">
												<span className="editable" id="username">
													<input className="input-sm" style={{width: '100%'}} type="text"
                                                           name="mobileNum"
                                                           placeholder="Mobile Number"
                                                           defaultValue={mobileNumberInput ? mobileNumberInput : ''}
                                                           onChange={(e) => setMobileNumberInput(e.target.value)}
                                                           required
                                                    />
												</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">Customer Service ID</div>
                                            <div className="profile-info-value">
												<span className="editable" id="serviceID">
													<input className="input-sm" style={{width: '100%'}} type="text"
                                                           name="customerServiceID"
                                                           placeholder="Customer Service ID"
                                                           value={serviceID}
                                                           onChange={(e) => setServiceID(e.target.value)}/>
												</span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">State<span
                                                style={{color: 'red'}}>*</span></div>
                                            <div className="profile-info-value">
                                                <select className='chosen-select form-control' name='areaLocationID'
                                                        value={stateType}
                                                        onChange={(e) => setStateType(parseFloat(e.target.value))}
                                                >
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
                                            <div className="profile-info-name">Case Type<span
                                                style={{color: 'red'}}>*</span></div>
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
                                                           style={{width: "100%"}} type="text" name="extSysRef"
                                                           placeholder="External System Reference"/>
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
                                                    {/* {
														lovData.filter(filter => filter.L_GROUP = '')
													} */}
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
                                            <div className="profile-info-name" style={{width: '25%'}}>Case
                                                Description<span style={{color: 'red'}}>*</span>
                                            </div>
                                            <div className="profile-info-value">
												<textarea className="form-control limited" rows={10} name="caseContent"
                                                          maxLength={9999}
                                                          value={caseDescriptionInput}
                                                          onChange={(e) => setCaseDescriptionInput(e.target.value)}
                                                          required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="profile-user-info profile-user-info-striped" style={{margin: 0}}>
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
                                            <div className="profile-info-name">Siebel Case Type</div>
                                            <div className="profile-info-value">
                                                <select className='chosen-select form-control' name='caseTypeID'
                                                        value={siebelCaseType}
                                                        onChange={(e) => setSiebelCaseType(parseFloat(e.target.value))}>
                                                    <option value='0'>Choose a Type</option>
                                                    {
                                                        lovData.filter(filter => filter.L_GROUP === 'TYPE').map((data, key) => {
                                                            return caseType == data.PARENT_ID ? <option key={key}
                                                                                                        value={data.L_ID}>{data.L_NAME}</option>
                                                                :
                                                                caseType === '0' &&
                                                                <option key={key}
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
                                                    <option value='0'>Choose a Area Type</option>
                                                    {
                                                        lovData.filter(filter => filter.L_GROUP === 'AREA').map((data, key) => {
                                                            return caseType == data.PARENT_ID ? <option key={key}
                                                                                                        value={data.L_ID}>{data.L_NAME}</option>
                                                                :
                                                                caseType === '0' &&
                                                                <option key={key}
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
                                                            return areaType === data.PARENT_ID ? <option key={key}
                                                                                                         value={data.L_ID}>{data.L_NAME}</option> :
                                                                areaType === '0' &&
                                                                <option key={key}
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
                                                        id='symptomType'
                                                        value={symptomSelect}
                                                        onChange={(e) => {
                                                            setSymptomSelect(parseFloat(e.target.value))
                                                            setSymptomType(document.querySelector('#symptomType option:checked').parentElement.label)
                                                        }}>
                                                    <option value='0' disabled>Choose a Symptom Type</option>
                                                    {
                                                        siebelTargetSystemSelect === '0' ?
                                                            lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
                                                                return (
                                                                    <option key={key}
                                                                            value={data.L_ID}>{data.L_NAME}</option>)
                                                            })
                                                            :
                                                            siebelTargetSystemSelect === '660' ?
                                                                lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
                                                                    return (data.PARENT_ID === 660 && <option key={key}
                                                                                                              value={data.L_ID}>{data.L_NAME}</option>)
                                                                }) :
                                                                <>
                                                                    {
                                                                        ["SAVE QOS SME", "SAVE QOS Consumer"].map((_data) => {
                                                                            return (
                                                                                <optgroup className="" label={_data}>
                                                                                    {
                                                                                        lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
                                                                                            return (data.PARENT_ID === 662 && [680, 682, 686, 688].includes(data.L_ID) &&
                                                                                                <option key={key}
                                                                                                        value={data.L_ID}>{data.L_NAME}</option>)
                                                                                        })
                                                                                    }
                                                                                </optgroup>
                                                                            )
                                                                        })
                                                                    },
                                                                    <optgroup className="" label="Failure">
                                                                        {
                                                                            lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
                                                                                return (data.PARENT_ID === 662 && [680, 682, 686, 684].includes(data.L_ID) &&
                                                                                    <option
                                                                                        value={data.L_ID}
                                                                                        key={key + 10}>{data.L_NAME}</option>)
                                                                            })
                                                                        }
                                                                    </optgroup>
                                                                    <optgroup className="" label="Performance">
                                                                        {
                                                                            lovData.filter(filter => filter.L_GROUP === 'SYMPTOM').map((data, key) => {
                                                                                return (data.PARENT_ID === 662 && [688].includes(data.L_ID) &&
                                                                                    <option key={key + 20}
                                                                                            value={data.L_ID}>{data.L_NAME}</option>)
                                                                            })
                                                                        }
                                                                    </optgroup>
                                                                </>

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
                                                        readOnly
                                                        disabled
                                                >
                                                    <option value='0'>Choose a Target System</option>
                                                    {lovData.filter(filter => filter.L_GROUP === 'SYSTEM-TARGET').map((data, key) => {
                                                        return <option key={key}
                                                                       value={data.L_ID}>{data.L_NAME}</option>
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
