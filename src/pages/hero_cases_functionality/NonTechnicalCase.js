import React, { useEffect, useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";

function NonTechnicalCase() {
	let area = [
		{ id: '124', city: 'Johor' },
		{ id: '127', city: 'Kedah' },
		{ id: '127', city: 'Perlis' },
		{ id: '133', city: 'Kelantan' },
		{ id: '136', city: 'Terengganu' },
		{ id: '139', city: 'Kuala Lumpur', state: 'WILAYAH PERSEKUTUAN' },
		{ id: '142', city: 'Melaka' },
		{ id: '145', city: 'MSC' },
		{ id: '148', city: 'Negeri Sembilan' },
		{ id: '151', city: 'Pahang' },
		{ id: '154', city: 'Pulau Pinang' },
		{ id: '157', city: 'Perak' },
		{ id: '160', city: 'Selangor' },
		{ id: '163', city: 'Petaling Jaya' },
		{ id: '166', city: 'Sabah' },
		{ id: '169', city: 'Sarawak' },
		{ id: '641', city: 'RRT' }
	]
	let type = [{ id: '28', caseType: 'Assurance' }, { id: '37', caseType: 'Billing' }]

	const findCityID = (name) => {
		for (let i = 0; i < area.length; i++) {
			if (area[i].city.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() || (area[i].hasOwnProperty('state') ? area[i].state.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() : false)) return area[i].id;
		}
	}

	let userData = JSON.parse(sessionStorage.getItem('UserData'));
	let token = JSON.parse(sessionStorage.getItem('userToken'))
	let lovData = JSON.parse(sessionStorage.getItem('LovData'));
	let [customerNameInput, setCustomerNameInput] = useState('');
	let [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	let [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	let [descriptionInput, setDescription] = useState('');
	let [customerProfileFromNova, setCustomerProfileFromNova] = useState({});
	let [customerProfileFromICP, setCustomerProfileFromICP] = useState({});
	let [typeSelect, setTypeSelect] = useState(37);
	let [productSelect, setProduct] = useState('0');
	let [areaSelect, setArea] = useState('0');
	let [subAreaSelect, setSubArea] = useState('0');
	let [locationSelect, setLocation] = useState('0');
	let [pictureInput, setPicture] = useState('');
	let [searchBarType, setSearchBarType] = useState('icp');
	let [searchBarInput, setSearchBarInput] = useState('');
	let [isLoading, setIsLoading] = useState(false);
	let [serviceID, setServiceID] = useState('');
	let [customerID, setCustomerID] = useState('');

	// Alert
	let [alertIsSuccess, setAlertIsSuccess] = useState(false);
	let [showAlert, setShowAlert] = useState(false);
	let [alertMessage, setAlertMessage] = useState('');
	let alertPopUp = (success, showAlert, alertMessage) => {
		setAlertIsSuccess(success);
		setShowAlert(showAlert);
		setAlertMessage(alertMessage);
	}
	let createdDate = new Date();
	// let [serviceIDInput, setServiceIDInput] = useState('');
	// let [loginIDInput, setLoginIDInput] = useState('');

	const createNonTechnicalCase = (e) => {
		e.preventDefault();
		CreateCaseService.createCase(
			token, userData.hID, customerNameInput, null, customerMobileNumberInput,
			locationSelect, null, null, null, null,
			descriptionInput, typeSelect, areaSelect, subAreaSelect,
			null, searchBarInput, null).then((res, err) => {
				if (err) {
					console.log(err);
					return alertPopUp(false, true, 'Case creation Failed!!');
				}

				alertPopUp(true, true, 'Case has been created successfully');
				if (customerProfileFromICP !== null || customerProfileFromICP !== undefined) return createICPSR();
				if (customerProfileFromNova !== null || customerProfileFromNova !== undefined) return createNovaSR();
				return;
			})
	}

	function getCustomerProfileFromNova() {
		CreateCaseService.getCustomerProfileFromNova(serviceID, customerID).then((res, err) => {
			console.log(res.data, 'getCustomerProfileFromNova');
			if (err || typeof res.data === 'undefined') {
				setIsLoading(false)
				alertPopUp(false, true, res.message);
				return;
			}
			if (res.data.message !== 'Success') {
				setIsLoading(false);
				alertPopUp(false, true, `Error during searching customer in NOVA.. (${res.data.message})`);
				return;
			}
			alertPopUp(true, true, 'Query user info success from NOVA.');
			setCustomerProfileFromNova(res.data.result)
			setCustomerNameInput(res.data.result.CustInfo.AccountName)
			setCustomerMobileNumberInput(res.data.result.CustInfo.MobileNo)
			setLocation(lovData.filter(data => data.L_NAME.toUpperCase() === res.data.result.ServiceInfo[0].ServiceAddress.State).map(data => data.L_ID))
			return setIsLoading(false);
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
				console.log(res.data, 'getCustomerProfileFromICP');
				if (err || typeof res.data === 'undefined') {
					alertPopUp(false, true, res.message)
					setIsLoading(false);
					return;
				}
				if (res.data.message !== 'Success') {
					alertPopUp(false, true, `Error during searching customer in ICP.. (${res?.data.message})`)
					// setIsLoading(false);
					return getCustomerProfileFromNova();
				}
				alertPopUp(true, true, 'Query user info success in ICP.')
				setCustomerNameInput(res.data.result.CustInfo.AccountName)
				setCustomerProfileFromICP(res.data.result)
				return setIsLoading(false);
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
				setIsLoading(false);
				return setCustomerNameInput(res.data.Customer_Data.customer_name)
			})
		}
	}

	const createNovaSR = (e) => {
		CreateCaseService.createNovaSR(customerProfileFromNova.CustInfo[0].CustomerRowID[0], null, areaSelect, subAreaSelect, null, createdDate, null,
			customerProfileFromNova.ServiceInfo[0].ServiceRowID[0],
			customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0], customerProfileFromNova.CustInfo[0].PrimaryContactRowID[0],
			customerProfileFromNova.BillInfo[0].BillingAccountRowID[0], customerProfileFromNova.BillInfo[0].BillingAccountNo[0],
			descriptionInput, userData.stakeholderName, userData.fullName, null, null, null, null,
			null, null, null, '1', userData.fullName, 'note', null).then((res, err) => {
				console.log(res, 'createSR');
				setIsLoading(true)
				if (err) {
					setIsLoading(false)
					alertPopUp('warning', true, 'An error occurred during SR Creation. Please request again.');
				}
				return alertPopUp('success', true, 'SR number has been created successfully!!');
			})
	}

	const createICPSR = () => {
		CreateCaseService.createICPSR(
			customerProfileFromICP.CustInfo.CustomerRowID,
			userData.fullName, areaSelect, subAreaSelect, 'Inquiry',
			null, null, userData.stakeholderName,
			customerProfileFromICP.CustInfo.PrimaryContactRowID,
			customerProfileFromICP.CustInfo.PrimaryContactRowID,
			customerProfileFromICP.BillInfo.BillingAccountRowID,
			customerProfileFromICP.BillInfo.BillingAccountNo,
			descriptionInput,
			customerProfileFromICP.ServiceInfo[0].ServiceID,
			customerProfileFromICP.BillInfo[0].ServiceStatus,
			'PSTN').then((res, err) => {
				console.log(res.data, 'createTT');
				if (err) {
					setIsLoading(false);
					return alertPopUp('warning', true, 'An error occurred during TT Creation. Please request again.');
				}
				setIsLoading(false);
				return alertPopUp('success', true, 'CTT number has been created successfully!!');
			})
	}

	let styles = {
		body: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '10px',
			background: 'darkgrey'
		},
	}

	return (
		<div style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Non-Technical Case</div>
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
				<form onSubmit={createNonTechnicalCase}>
					<div className="hb-input-group w-100" id="searchbar">
						<div className="hb-input-group-prepend">
							<select id="searchbar-type" name="searchbar-type" value={searchBarType}
								onChange={(e) => setSearchBarType(e.target.value)}>
								<option value="icp">Service ID</option>
								<option value="login">Login ID</option>
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
									placeholder='Please insert customer IC'
									value={customerID}
									onChange={(e) => setCustomerID(e.target.value)}
								/>
							}
						</div>
						<div className="hb-input-group-append" onClick={getCustomerProfile}>
							<button className="btn" type="button" disabled={isLoading}><SearchIcon fontSize="large" /></button>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="customerName">Customer Name*</label>
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
						<label className="hb-detail" for="customerNumber">Customer Mobile Number*</label>
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
						<label className="hb-detail" for="loggerNumber">Logger Mobile Number*</label>
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
						<label className="hb-detail" for='type'>Type*</label>
						<div className="hb-input-box">
							<select id='type' name='type' value={typeSelect} disabled>
								<option value={37}>Biling</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="area">Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								<option value='82'>Complaint/Enquiries</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="subarea">Sub-Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={subAreaSelect} onChange={e => setSubArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								<option value='88'>Report Progress</option>
								<option value='91'>Payment</option>
								<option value='94'>Charges</option>
								<option value='97'>Bill Details</option>
								<option value='100'>TOS/RTN</option>
								<option value='103'>Dispute-Invalid Charges</option>
								<option value='106'>Complaint Handling & Resolution</option>
								<option value='109'>Payment Not Updated</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="product">Product*</label>
						<div className="hb-input-box">
							<select id="product" name="product" value={productSelect}
								onChange={(e) => setProduct(e.target.value)}>
								<option disabled value='0'>Select One</option>
								<option value='590'>UniFi Mobile</option>
								<option value='587'>UniFi TV</option>
								<option value='584'>Broadband</option>
								<option value='581'>Telephony</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="location">Location*</label>
						<div className="hb-input-box">
							<select id="location" name="location" value={locationSelect}
								onChange={e => setLocation(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{area.map((c, i) => <option value={c.id}>{c.city}</option>)}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for='description'>Description*</label>
						<div className="hb-input-box">
							<textarea type='text' id='description' name='userDescription'
								cols={50}
								placeholder='example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps'
								value={descriptionInput} onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail">Attachment</label>
						<div className="hb-attachment">
							<input type='file' name='imageAttach' />
						</div>
					</div>

					<div className="hb-button">
						<input className="hb-submit" type="submit" title="Submit" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default NonTechnicalCase;
