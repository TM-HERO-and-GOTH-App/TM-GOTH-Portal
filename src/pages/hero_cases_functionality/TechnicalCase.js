import React, { useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Modal } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";
import NextService from "../../web_service/next_service/NextService";
import LinearProgress from '@mui/material/LinearProgress';
import unifiFormPageData from "./dataForUnifiBuddy";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import moment from 'moment';

function TechnicalCase() {
    let styles = {
        body: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            background: "darkgrey",
        },
        modalStyle: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            padding: 2,
        }
    };

    let areaLocation = unifiFormPageData.areaLocation
    let caseType = unifiFormPageData.type
    let area = unifiFormPageData.area
    let symptom = unifiFormPageData.symptom
    let subArea = unifiFormPageData.subArea
    let product = unifiFormPageData.product

    const findCityID = (name) => {
        for (const element of areaLocation) {
            if (element.city.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() || (element.hasOwnProperty('state') ? element.state.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() : false)) return element.id;
        }
    }

    // Alert
    const [alertIsSuccess, setAlertIsSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const alertPopUp = (success, alert, message) => {
        setAlertIsSuccess(success);
        setAlertMessage(message);
        setShowAlert(alert);
    }

    let [customerNameInput, setCustomerNameInput] = useState('');
    let [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
    let [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
    let [descriptionInput, setDescription] = useState('');
    let [typeSelect, setTypeSelect] = useState(28);
    let [productSelect, setProduct] = useState('0');
    let [areaSelect, setArea] = useState('0');
    let [subAreaSelect, setSubArea] = useState('0');
    let [symptomSelect, setSymptom] = useState('0');
    let [locationSelect, setLocation] = useState('0');
    let [pictureInput, setPicture] = useState(null);

    // if pure DEL, targetSystem set to 'ICP', otherwise targetSystem set to ''
    let [targetSystem, setTargetSystem] = useState('');
    let [isPureDEL, setIsPureDEL] = useState(false);

    // Next
    let [openModal, setOpenModal] = useState(false);
    const [nextResponses, setNextResponses] = useState('');

    // Search bar
    const [searchBarType, setSearchBarType] = useState('icp');
    const [serviceID, setServiceID] = useState('');
    const [customerID, setCustomerID] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    // Submit
    const [showSubmitLoading, setShowSubmitLoading] = useState(false)
    const [submitIsLoading, setSubmitIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [progressMessage, setProgressMessage] = useState('. . .')
    const [submitStatus, setSubmitStatus] = useState(true)
    const submitProgress = (progress, message, status, loading) => {
        setProgress(progress);
        setProgressMessage(message);
        setSubmitStatus(status)
        setSubmitIsLoading(loading)
    }

    const nextCheckNetwork = () => {
        NextService.checkNetworkOutage('HERO-20220425-0002', serviceID).then((res, err) => {
            if (err) return console.log(err);
            console.log(res)
            setNextResponses(res.data)
            return setOpenModal(true);
        })
    }

    const cyrb53 = function (str, seed) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    const handleAttach = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const randomFileName = cyrb53(moment.now().toString(), 0)
        formData.append('cToken', '965b91c8cddd457e7b70145e864af30f')
        formData.append(
            'fileData' , pictureInput, randomFileName
        )
        formData.append('longitude', '')
        formData.append('latitude', '')
        CreateCaseService.attachImage(formData).then((res, err) => {
            if (err) return console.log(`Failed ${err}`)
            else return console.log(res)
        })
    }

    const getCustomerProfile = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (searchBarType === 'icp' ? (serviceID === '' || customerID === '') : (serviceID === '')) {
            alertPopUp('warning', true, 'Please fill in your Service ID/ Customer ID...')
            setIsLoading(false);
            return;
        }
        if (searchBarType === 'icp') {
            CreateCaseService.getCustomerProfileFromICP(serviceID, customerID).then((res, err) => {
                console.log(res, 'getCustomerProfileFromICP');
                nextCheckNetwork() // TODO: check if this flow is correct
                if (err || typeof res.data === 'undefined') {
                    alertPopUp(false, true, res.message)
                    setIsLoading(false);
                    return
                }
                if (res.data.message !== 'Success') {
                    alertPopUp(false, true, `Error during searching customer.. (${res?.data.message})`)
                    setIsLoading(false);
                    return;
                }
                alertPopUp(true, true, 'Query user info success.')
                setCustomerNameInput(res.data.result.CustInfo.AccountName)
                setCustomerMobileNumberInput(res.data.result.CustInfo.MobileNo)
                setLocation(Array.isArray(res.data.result.ServiceInfo) ?
                    findCityID(res.data.result.ServiceInfo[0].ServiceAddress.State) :
                    findCityID(res.data.result.ServiceInfo.ServiceAddress.State)
                )
                setIsPureDEL(() => {
                    if (Array.isArray(res.data.result.ServiceInfo) === false) {
                        if (res.data.result.ServiceInfo.Product === 'Home Line') {
                            return true
                        }
                    }
                    return false
                })
                setProduct(isPureDEL === true ? '581' : '0')
                setSymptom(isPureDEL === true ? '658' : '0')
                setIsLoading(false);
            })
        } else {
            // Reuse serviceID as loginID as it has shared similar value
            CreateCaseService.getCustomerProfileFromHeroBuddy(serviceID).then(function (res, err) {
                console.log(res.data, 'getCustomerProfileFromHeroBuddy');
                if (err || typeof res.data === 'undefined') {
                    alertPopUp(false, true, res.message)
                    setIsLoading(false);
                    return
                }
                if (res.data === '') {
                    alertPopUp(false, true, `Error during searching customer..`)
                    setIsLoading(false);
                    return;
                }
                alertPopUp(true, true, 'Query user info success.')
                setCustomerNameInput(res.data.Customer_Data.customer_name)
                setIsLoading(false);
            })
        }
        // if pure DEL, targetSystem set to 'ICP', otherwise targetSystem set to ''
        isPureDEL === true ? setTargetSystem('icp') : setTargetSystem('')
    }

    const createTechnicalCase = (e) => {
        e.preventDefault();
        setShowSubmitLoading(true)
        submitProgress(20, 'Creating New Case at GOTH . . .', true, true)
        CreateCaseService.createCaseHeroBuddy(
            '0', customerNameInput, customerID, customerMobileNumberInput, serviceID, locationSelect,
            null, null, descriptionInput,
            typeSelect, areaSelect, subAreaSelect, symptomSelect, targetSystem, loggerMobileNumberInput
        ).then((res, err) => {
            submitProgress(30, 'Done processing . . .', true, true)
            if (err) {
                submitProgress(100, 'Case creation Failed.', false, false)
                return alertPopUp(false, true, 'Case creation Failed!!');
            }
            console.log(res)
            if (res.data.message !== 'Case successfully created.') {
                submitProgress(100, `Case creation Failed (${res.data}) . . .`, false, false)
                return alertPopUp(false, true, 'Case creation Failed!!');
            }
            submitProgress(40, 'Case creation Success . . .', true, true)

            // autoCreateCTT (run only if the case is detected as pure DEL)
            if (isPureDEL) {
                submitProgress(60, 'Requesting SIEBEL to create SR/TT for DEL . . . ', true, true)
                CreateCaseService.autoCreateCTT(serviceID, symptomSelect, customerMobileNumberInput).then((err, res) => {
                    if (err) {
                        return submitProgress(60, 'Something went wrong during SR and TT Creation', false)
                    }
                    console.log(res)
                    return submitProgress(70, 'SR and TT number has been successfully created.', true)
                });
            }
            submitProgress(100, 'Case has been created successfully', true)
            return alertPopUp(true, true, 'Case has been created successfully');
        })
    }

    return (
        <div style={styles.body}>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={styles.modalStyle}>
                    <h3>
                        NTT Info
                    </h3>
                    <ul style={{ fontSize: '1.5em' }}>
                        <li>NTT ID: {nextResponses.NTTID}</li>
                        <li>ETTR: {nextResponses.ETTR}</li>
                        <li>Fault Category: {nextResponses.FaultCategory}</li>
                        <li>Service Impact: {nextResponses.ServiceImpact}</li>
                    </ul>
                    <button className="btn btn-primary" style={{ marginLeft: '23vw' }}
                        onClick={() => setOpenModal(false)}>Ok
                    </button>
                </Box>
            </Modal>

            <div className="hb-container">
                <div className="hb-title">Technical Case</div>

                {
                    showAlert &&
                    <div className="row">
                        <div className="col-xs-12">
                            <div
                                className={`alert alert-block ${alertIsSuccess === true ? 'alert-success' : 'alert-danger'}`}
                                style={{ marginBottom: '0', marginTop: '10px' }}
                            >
                                <button type="button" onClick={() => setShowAlert(false)} className="close"
                                    data-dismiss="alert">
                                    <i className="ace-icon fa fa-times" />
                                </button>
                                <p>{alertMessage}</p>
                            </div>
                        </div>
                    </div>
                }

                <form onSubmit={createTechnicalCase}>
                    <div className="hb-input-group w-100" id="searchbar">
                        <div className="hb-input-group-prepend">
                            <select id="searchbar-type" name="searchbar-type" value={searchBarType}
                                onChange={(e) => setSearchBarType(e.target.value)}>
                                <option value="icp">ICP</option>
                                <option value="herobuddy">Hero Buddy</option>
                            </select>
                        </div>
                        <div className="hb-input-box hb-input-group-area">
                            <input
                                type="text"
                                id="search-detail"
                                name="search-detail"
                                placeholder={searchBarType === "icp" ? "Insert Service ID" : "Insert Login ID"}
                                value={serviceID}
                                onChange={(e) => setServiceID(e.target.value)}
                            />
                            {searchBarType === 'icp' &&
                                <input
                                    type='text'
                                    id='customerIC'
                                    name='customerIC'
                                    placeholder='Insert Customer ID'
                                    value={customerID}
                                    onChange={(e) => setCustomerID(e.target.value)}
                                />
                            }
                        </div>
                        <div className="hb-input-group-append">
                            <button className="btn" type="button" disabled={isLoading} onClick={getCustomerProfile}>
                                <SearchIcon fontSize="large" />
                            </button>
                            {isLoading &&
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'var(--color-success)',
                                        position: 'absolute',
                                        marginTop: '-32px',
                                        marginLeft: '15px',
                                    }}
                                />
                            }
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="customerName">Customer Name<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                placeholder="example: Mr Ahmad/Ms Chiu/Mr Rama"
                                value={customerNameInput}
                                onChange={(e) => setCustomerNameInput(e.target.value)}
                                // required
                            />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="customerName">Customer NRIC<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <input
                                type="text"
                                id="customerIC"
                                name="customerIC"
                                placeholder="9XXXXX-XX-XXXX"
                                value={customerID}
                                onChange={(e) => setCustomerID(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="customerNumber">Customer Mobile Number<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <input
                                type="tel"
                                id="customerNumber"
                                name="customerName"
                                min={0}
                                placeholder="example: 0123456789"
                                value={customerMobileNumberInput}
                                onChange={(e) => setCustomerMobileNumberInput(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="loggerNumber">Logger Mobile Number<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <input
                                type="tel"
                                id="loggerNumber"
                                name="loggerName"
                                min={0}
                                placeholder="example: 0123456789"
                                value={loggerMobileNumberInput}
                                onChange={(e) => setLoggerMobileNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor='type'>Type</label>
                        <div className="hb-input-box">
                            <select id='type' name='type' value={typeSelect} disabled>
                                {
                                    caseType.map((data, key) => <option key={key}
                                        value={data.id}>{data.caseType}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="area">Area</label>
                        <div className="hb-input-box">
                            <select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
                                <option style={{ color: 'var(--color-gray-300)' }} disabled value='0'>Select One</option>
                                {
                                    typeSelect === '28' ?
                                        area.filter(filter => filter.id === '79').map((value, i) => <option
                                            value={value.id}
                                            key={i}>{value.area}</option>) :
                                        area.filter(filter => filter.id === '82').map((value, i) => <option
                                            value={value.id}
                                            key={i}>{value.area}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="subarea">Sub-Area</label>
                        <div className="hb-input-box">
                            <select id="area" name="area" value={subAreaSelect}
                                    onChange={e => setSubArea(e.target.value)}
                                    disabled={areaSelect === '0'}
                                    style={areaSelect === '0' ? {color: 'var(--color-danger)'} : null}>
                                {areaSelect === '0' ?
                                    <option disabled value='0'>Please select an Area Type</option> :
                                    <option disabled value='0'>Select One</option>
                                }
                                {
                                    areaSelect === '79' ?
                                        subArea.filter(filter => filter.id === '85').map((value, i) => <option
                                            value={value.id}
                                            key={value.id}>{value.subArea}</option>)
                                        :
                                        subArea.filter(filter => filter.id !== '85').map((value, i) => <option
                                            value={value.id}
                                            key={value.id}>{value.subArea}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="product">Product</label>
                        <div className="hb-input-box">
                            <select id="product" name="product" value={productSelect}
                                onChange={(e) => setProduct(e.target.value)}>
                                <option style={{ color: 'var(--color-gray-300)' }} disabled value='0'>Select One</option>
                                {product.map((value) => <option value={value.id}
                                    key={value.id}>{value.product}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="symptom">Symptom</label>
                        <div className="hb-input-box">
                            <select id="symptom" name="symptom" value={symptomSelect}
                                onChange={(e) => setSymptom(e.target.value)}>
                                <option style={{ color: 'var(--color-gray-300)' }} disabled value='0'>Select One</option>
                                {
                                    symptom.filter(filter => filter.source === 660).map((value) => <option
                                        value={value.id}>{value.symptom}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="location">Location<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <select id="location" name="location" value={locationSelect}
                                onChange={e => setLocation(e.target.value)}>
                                <option style={{ color: 'var(--color-gray-800)' }} disabled value='0'>Select One</option>
                                {areaLocation.map((c, i) => <option value={c.id}>{c.city}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" htmlFor="description">Description<span style={{ color: 'red' }}>*</span></label>
                        <div className="hb-input-box">
                            <textarea
                                id="description"
                                className="hb-border"
                                name="userDescription"
                                cols={40}
                                placeholder="example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps"
                                value={descriptionInput}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail">Attachment</label>
                        <div className="hb-attachment">
                            <input type="file" name="imageAttach" onChange={(e) => setPicture(e.target.files[0])}
                                   accept="image/*"/>
                            <button onClick={handleAttach} placeholder="Upload">stt</button>
                        </div>
                    </div>

                    <div className="hb-button">
                        {showSubmitLoading === true &&
                            <>
                                <CircularProgress
                                    size={16}
                                    sx={{
                                        color: submitStatus === true ? 'var(--color-primary)' : 'var(--color-warning)',
                                        position: 'absolute',
                                        marginTop: '9px',
                                        marginLeft: '12px',
                                    }}
                                />
                                <h6 style={{ marginLeft: '35px', maxWidth: '60%' }}>{progressMessage}</h6>
                            </>
                        }
                        <FormControlLabel
                            sx={{ position: 'absolute', right: '0', marginTop: '-30px' }}
                            disabled
                            control={<Switch checked={isPureDEL} color="error" size="small" />}
                            label="Is Pure DEL?"
                        />
                        <input className="hb-submit" type="submit" title="Submit" disabled={submitIsLoading}
                            style={submitIsLoading ? { opacity: .5 } : { opacity: 1 }} />
                        {showSubmitLoading === true &&
                            <LinearProgress sx={{ width: 'calc(100% - 10px)', marginLeft: '5px', marginTop: '10px' }}
                                color={submitStatus === true ? 'primary' : 'error'}
                                variant="determinate" value={progress}
                            />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TechnicalCase;
