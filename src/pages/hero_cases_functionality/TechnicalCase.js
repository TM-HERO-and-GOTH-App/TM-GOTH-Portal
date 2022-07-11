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

	let areaLocation = [
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
	let type = [{id: '28', caseType: 'Assurance'}, {id: '37', caseType: 'Billing'}]
	let area = [{id: '79', area: 'Service Failure'}, {id: '82', area: 'Complaint/Enquiries'}]
	let subArea = [
		{id: '85', subArea: 'Services Down'},
		{id: '88', subArea: 'Report Progress'},
		{id: '91', subArea: 'Payment'},
		{id: '94', subArea: 'Charges'},
		{id: '97', subArea: 'Bill Details'},
		{id: '100', subArea: 'TOS/RTN'},
		{id: '103', subArea: 'Dispute-Invalid Charges'},
		{id: '106', subArea: 'Complaint Handling & Resolution'},
		{id: '109', subArea: 'Payment Not Updated'}
	]
	let product = [
		{id: '590', product: 'UniFi Mobile'},
		{id: '587', product: 'UniFi TV'},
		{id: '584', product: 'Broadband'},
		{id: '581', product: 'Telephony'}
	]

	const findCityID = (name) => {
		for (let i = 0; i < areaLocation.length; i++) {
			if (areaLocation[i].city.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() || (areaLocation[i].hasOwnProperty('state') ? areaLocation[i].state.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() : false)) return areaLocation[i].id;
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
	let [typeSelect, setTypeSelect] = useState('28');
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
				setCustomerMobileNumberInput(res.data.result.CustInfo.MobileNo)
				setLocation(findCityID(res.data.result.ServiceInfo[0].ServiceAddress.State))
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
							<div className="hb-input-box" id="type">
								<select id='type' name='type' value={typeSelect} disabled>
									{type.map((value) => <option value={value.id} key={value.id}>{value.caseType}</option>)}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="area">Area*</label>
							<div className="hb-input-box">
								<select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
									<option style={{color: 'var(--color-gray-300)'}} disabled value='0'>Select One</option>
									{
										typeSelect === '28' ?
												area.filter(filter => filter.id === '79').map((value, i) => <option value={value.id}
												                                                                    key={i}>{value.area}</option>) :
												area.filter(filter => filter.id === '82').map((value, i) => <option value={value.id}
												                                                                    key={i}>{value.area}</option>)
									}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="subarea">Sub-Area*</label>
							<div className="hb-input-box">
								<select id="area" name="area" value={subAreaSelect} onChange={e => setSubArea(e.target.value)}>
									<option style={{color: 'var(--color-gray-300)'}} disabled value='0'>Select One</option>
									{
										areaSelect === '0' ?
												<option style={{color: 'var(--color-danger)'}} disabled>Please select an Area Type</option>
												: areaSelect === '79' ?
														subArea.filter(filter => filter.id === '85').map((value, i) => <option value={value.id}
														                                                                       key={value.id}>{value.subArea}</option>) :
														subArea.filter(filter => filter.id !== '85').map((value, i) => <option value={value.id}
														                                                                       key={value.id}>{value.subArea}</option>)
									}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="product">Product*</label>
							<div className="hb-input-box">
								<select id="product" name="product" value={productSelect}
								        onChange={(e) => setProduct(e.target.value)}>
									<option style={{color: 'var(--color-gray-300)'}} disabled value='0'>Select One</option>
									{product.map((value) => <option value={value.id} key={value.id}>{value.product}</option>)}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="symptom">Symptom*</label>
							<div className="hb-input-box">
								<select id="symptom" name="symptom" value={symptomSelect}
								        onChange={(e) => setSymptom(e.target.value)}>
									<option style={{color: 'var(--color-gray-300)'}} disabled value='0'>Select One</option>
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
									<option style={{color: 'var(--color-gray-800)'}} disabled value='0'>Select One</option>
									{areaLocation.map((c, i) => <option value={c.id}>{c.city}</option>)}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="description">Description*</label>
							<div className="hb-input-box">
										<textarea
												id="description"
												className="hb-border"
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
	)
			;
}

export default TechnicalCase;
