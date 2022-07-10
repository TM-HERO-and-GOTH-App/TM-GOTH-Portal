import React, {useState} from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import {Box, Modal, Typography} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";
import NextService from "../../web_service/next_service/NextService";

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

	let area = [
		{id: '124', city: 'Johor'},
		{id: '127', city: 'Kedah'},
		{id: '127', city: 'Perlis'},
		{id: '133', city: 'Kelantan'},
		{id: '136', city: 'Terengganu'},
		{id: '139', city: 'Kuala Lumpur', state: 'WILAYAH PERSEKUTUAN'},
		{id: '142', city: 'Melaka'},
		{id: '145', city: 'MSC'},
		{id: '148', city: 'Negeri Sembilan'},
		{id: '151', city: 'Pahang'},
		{id: '154', city: 'Pulau Pinang'},
		{id: '157', city: 'Perak'},
		{id: '160', city: 'Selangor'},
		{id: '163', city: 'Petaling Jaya'},
		{id: '166', city: 'Sabah'},
		{id: '169', city: 'Sarawak'},
		{id: '641', city: 'RRT'}
	]
	let type = [{id: '28', caseType: 'Assurance'}]

	const findCityID = (name) => {
		for (let i = 0; i < area.length; i++) {
			if (area[i].city.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() || (area[i].hasOwnProperty('state') ? area[i].state.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() : false)) return area[i].id;
		}
	}

	const userData = JSON.parse(sessionStorage.getItem('UserData'));
	const token = JSON.parse(sessionStorage.getItem('userToken'))

	let [customerInfo, setCustomerInfo] = useState({});

	// Alert
	const [alertIsSuccess, setAlertIsSuccess] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const alertPopUp = (success, showAlert, alertMessage) => {
		setAlertIsSuccess(success);
		setAlertMessage(alertMessage);
		setShowAlert(showAlert);
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
	let [pictureInput, setPicture] = useState('');
	// Next
	let [openModal, setOpenModal] = useState(false);
	const [nextResponses, setNextResponses] = useState('');

	// Search bar
	const [searchBarType, setSearchBarType] = useState('icp');
	const [serviceID, setServiceID] = useState('');
	const [customerID, setCustomerID] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false)

	const nextCheckNetwork = () => {
		NextService.checkNetworkOutage('HERO-20220425-0002', serviceID).then((res, err) => {
			if (err) return console.log(err);
			console.log(res.data);
			setNextResponses(res.data)
			return setOpenModal(true);
		})
	}

	const getCustomerProfile = (e) => {
		e.preventDefault();
		setIsLoading(true);
		console.log(isLoading)
		if (searchBarType === 'icp' ? (serviceID === '' || customerID === '') : (serviceID === '')) {
			alertPopUp('warning', true, 'Please fill in your Service ID/ Customer ID...')
			setIsLoading(false);
			return;
		}
		if (searchBarType === 'icp') {
			CreateCaseService.getCustomerProfileFromICP(serviceID, customerID).then((res, err) => {
				console.log(res, 'getCustomerProfileFromICP');
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
	}

	const createCTT = (serviceID, symptomCode, mobileNumber) => {
		CreateCaseService.autoCreateCTT(serviceID, symptomCode, mobileNumber).then((err, res) => {
			if (err) return alertPopUp('Something went wrong during SR and TT Creation');
			console.log(res)
			return alertPopUp('SR and TT number has been successfully created!!');
		});
	}

	const createTechnicalCase = (e) => {
		e.preventDefault();
		createCTT(serviceID, symptomSelect, customerMobileNumberInput);
		CreateCaseService.createCase(
				token, userData.hID, customerNameInput, null, customerMobileNumberInput,
				locationSelect, null, null, null, null, descriptionInput, typeSelect, areaSelect, subAreaSelect,
				symptomSelect, serviceID, null).then((res, err) => {
			// console.log(res)
			if (err) {
				return alertPopUp(false, true, 'Case creation Failed!!');
			}
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
						<ul style={{fontSize: '1.5em'}}>
							<li>NTT ID: {nextResponses.NTTID}</li>
							<li>ETTR: {nextResponses.ETTR}</li>
							<li>Fault Category: {nextResponses.FaultCategory}</li>
							<li>Service Impact: {nextResponses.ServiceImpact}</li>
						</ul>
						<button className="btn btn-primary" style={{marginLeft: '23vw'}} onClick={() => setOpenModal(false)}>Ok
						</button>
					</Box>
				</Modal>

				<div className="hb-container">
					<div className="hb-title">Technical Case</div>

					{/* Temporary workaround*/}
					{/* <button className="btn btn-primary" onClick={createCTT(searchBarInput, symptomSelect, customerMobileNumberInput)}>CreateCTT</button> */}
					{
							showAlert &&
							<div className="row">
								<div className="col-xs-12">
									<div
											className={`alert alert-block ${alertIsSuccess === true ? 'alert-success' : 'alert-danger'}`}
											style={{marginBottom: '0', marginTop: '10px'}}
									>
										<button type="button" onClick={() => setShowAlert(false)} className="close"
										        data-dismiss="alert">
											<i className="ace-icon fa fa-times"/>
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
							<div className="hb-input-group-append" onClick={nextCheckNetwork}
							     style={{display: `${searchBarType === "icp" ? "" : "none"}`}}>
								<button className="btn btn-secondary" type="button" aria-label="Next"><LocationSearchingIcon
										fontSize="large"/>
								</button>
							</div>
							<div className="hb-input-group-append">
								<button className="btn" type="button" disabled={isLoading} onClick={getCustomerProfile}>
									<SearchIcon fontSize="large"/>
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
							<label className="hb-detail" htmlFor="customerName">Customer Name*</label>
							<div className="hb-input-box">
								<input
										type="text"
										id="customerName"
										name="customerName"
										placeholder="example: Mr Ahmad/Ms Chiu/Mr Rama"
										value={customerNameInput}
										onChange={(e) => setCustomerNameInput(e.target.value)}
								/>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="customerNumber">Customer Mobile Number*</label>
							<div className="hb-input-box">
								<input
										type="tel"
										id="customerNumber"
										name="customerName"
										min={0}
										placeholder="example: 0123456789"
										value={customerMobileNumberInput}
										onChange={(e) => setCustomerMobileNumberInput(e.target.value)}
								/>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="loggerNumber">Logger Mobile Number*</label>
							<div className="hb-input-box">
								<input
										type="tel"
										id="loggerNumber"
										name="loggerName"
										min={0}
										placeholder="example: 0123456789"
										value={loggerMobileNumberInput}
										onChange={(e) => setLoggerMobileNumber(e.target.value)}
								/>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="type">Type*</label>
							<div className="hb-input-box" id="type" name="assurance">
								<select id='type' name='type' value={typeSelect} readOnly disabled>
									<option key={28} value={28} disabled>Assurance</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="area">Area*</label>
							<div className="hb-input-box">
								<select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
									<option disabled value='0'>Select One</option>
									<option value='79'>Service Failure</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="subarea">Sub-Area*</label>
							<div className="hb-input-box">
								<select id="area" name="area" value={subAreaSelect} onChange={e => setSubArea(e.target.value)}>
									<option disabled value='0'>Select One</option>
									<option value='85'>All Services Down</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="product">Product*</label>
							<div className="hb-input-box">
								<select id="product" name="product" value={productSelect}
								        onChange={(e) => setProduct(e.target.value)}>
									<option disabled value='0'>Select One</option>
									<option value='640'>YEP 2019 (Sales Leads Only)</option>
									<option value='590'>UniFi Mobile</option>
									<option value='587'>UniFi TV</option>
									<option value='584'>Broadband</option>
									<option value='581'>Telephony</option>
									<option value='563'>ZERO</option>
									<option value='530'>TMGo</option>
									<option value='527'>Public Wifi</option>
									<option value='230'>Pre-UniFi</option>
									<option value='58'>Others</option>
									<option value='55'>Mobile</option>
									<option value='52'>Fixed</option>
									<option value='49'>UniFi</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="symptom">Symptom*</label>
							<div className="hb-input-box">
								<select id="symptom" name="symptom" value={symptomSelect}
								        onChange={(e) => setSymptom(e.target.value)}>
									<option disabled value='0'>Select One</option>
									{
										serviceID.endsWith('@streamyx') === true ?
												<option value='658'>Voice Down</option>
												:
												<>
													<option value='642'>All Services Down</option>
													<option value='676'>DSL_CantLoginDTDSLBlinkPortReset</option>
													<option value='674'>DSL_CantLoginDTDSLBlinkCantReset</option>
													<option value='672'>DSL_NoDialTone</option>
													<option value='670'>DT_NoDialTone</option>
													<option value='658'>Voice Down</option>
													<option value='656'>IPTV Quality Issue</option>
													<option value='654'>IPTV Down</option>
													<option value='652'>IPTV & Voice Down</option>
													<option value='650'>HSI wireless Down</option>
													<option value='648'>HSI & Voice Down</option>
													<option value='646'>HSI & IPTV Down</option>
													<option value='644'>HSI Down</option>
													<option value='678'>DSL_LineDisconnect</option>
												</>
									}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="location">Location*</label>
							<div className="hb-input-box">
								<select id="location" name="location" value={locationSelect}
								        onChange={e => setLocation(e.target.value)}>
									<option disabled value='0'>Select One</option>
									<option value='124'>Johor</option>
									<option value='169'>Sarawak</option>
									<option value='166'>Sabah</option>
									<option value='163'>Petaling Jaya</option>
									<option value='160'>Selangor</option>
									<option value='157'>Perak</option>
									<option value='154'>Pulau Pinang</option>
									<option value='151'>Pahang</option>
									<option value='148'>Negeri Sembilan</option>
									<option value='145'>MSC</option>
									<option value='142'>Melaka</option>
									<option value='139'>Kuala Lumpur</option>
									<option value='136'>Terengganu</option>
									<option value='133'>Kelantan</option>
									<option value='127'>Kedah/Perlis</option>
									<option value='641'>RRT</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="description">Description*</label>
							<div className="hb-input-box">
							<textarea
									id="description"
									name="userDescription"
									cols={40}
									placeholder="example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps"
									value={descriptionInput}
									onChange={(e) => setDescription(e.target.value)}
							/>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail">Attachment</label>
							<div className="hb-attachment">
								<input type="file" name="imageAttach" value={pictureInput}
								       onChange={(e) => setPicture(e.target.value)}/>
							</div>
						</div>

						<div className="hb-button">
							<input className="hb-submit" type="submit" title="Submit"/>
						</div>
					</form>
				</div>
			</div>
	);
}

export default TechnicalCase;
