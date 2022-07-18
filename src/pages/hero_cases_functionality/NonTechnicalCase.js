import React, { useEffect, useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";
import unifiFormPageData from "./dataForUnifiBuddy";
import CircularProgress from "@mui/material/CircularProgress";

function NonTechnicalCase() {
	let areaLocation = unifiFormPageData.areaLocation
	let area = unifiFormPageData.area
	let subArea = unifiFormPageData.subArea
	let product = unifiFormPageData.product

	const findCityID = (name) => {
		for (const element of areaLocation) {
			if (element.city.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() || (element.hasOwnProperty('state') ? element.state.replace(/^\s+/, '').toLowerCase() === name.replace(/^\s+/, '').toLowerCase() : false)) return element.id;
		}
	}

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
	let [searchBarType, setSearchBarType] = useState('service');
	let [isLoading, setIsLoading] = useState(false);
	let [serviceID, setServiceID] = useState('');
	let [customerID, setCustomerID] = useState('');
	let [targetSystem, setTargetSystem] = useState('');

	// Alert
	let [alertIsSuccess, setAlertIsSuccess] = useState(false);
	let [showAlert, setShowAlert] = useState(false);
	let [alertMessage, setAlertMessage] = useState('');
	let alertPopUp = (success, showAlert, alertMessage) => {
		setAlertIsSuccess(success);
		setShowAlert(showAlert);
		setAlertMessage(alertMessage);
	}
	const [caseToken, setCaseToken] = useState({});
	const [isCreateCase, setIsCreateCase] = useState(false);

	// let [serviceIDInput, setServiceIDInput] = useState('');
	// let [loginIDInput, setLoginIDInput] = useState('');


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
			setIsLoading(false);
			alertPopUp(true, true, 'Query user info success from NOVA.');
			console.log(res.data.result.ServiceInfo[0].ServiceAddress.State)
			setCustomerProfileFromNova(res.data.result)
			setCustomerNameInput(res.data.result.CustInfo.AccountName)
			setCustomerMobileNumberInput(res.data.result.CustInfo.MobileNo)
			setLocation(Array.isArray(res.data.result.ServiceInfo) === true ?
				findCityID(res.data.result.ServiceInfo[0].ServiceAddress.State):
				findCityID(res.data.result.ServiceInfo.ServiceAddress.State)

			)
			return setTargetSystem('NOVA')
		})
	}

	function getCustomerProfile(e) {
		e.preventDefault();
		setIsLoading(true);
		if (searchBarType === 'service' ? (serviceID === '' || customerID === '') : (serviceID === '')) {
			setIsLoading(false);
			alertPopUp('warning', true, 'Please fill in your Service ID/ Customer ID...')
			return;
		}
		if (searchBarType === 'service') {
			CreateCaseService.getCustomerProfileFromICP(serviceID, customerID).then((res, err) => {
				// console.log(res.data, 'getCustomerProfileFromICP');
				if (err || typeof res.data === 'undefined') {
					setIsLoading(false);
					alertPopUp(false, true, res.message)
					return;
				}
				if (res.data.message !== 'Success') {
					alertPopUp(false, true, `Error during searching customer in ICP.. (${res?.data.message})`)
					return getCustomerProfileFromNova();
				}
				setIsLoading(false)
				setTargetSystem('ICP')
				alertPopUp(true, true, `Query user info success in ${targetSystem}.`)
				setCustomerNameInput(res.data.result.CustInfo.AccountName)
				setLocation(
					Array.isArray(res.data.result.ServiceInfo) ?
						findCityID(res.data.result.ServiceInfo[0].ServiceAddress.State) :
						findCityID(res.data.result.ServiceInfo.ServiceAddress.State)
				)
				return setCustomerProfileFromICP(res.data.result)
			})
		} else {
			// Reuse serviceID as loginID as it has shared similar value
			CreateCaseService.getCustomerProfileFromHeroBuddy(serviceID).then(function (res, err) {
				setIsLoading(true);
				// console.log(res.data, 'getCustomerProfileFromHeroBuddy');
				if (err || typeof res.data === 'undefined') {
					setIsLoading(false);
					alertPopUp(false, true, res.message)
					return
				}
				if (res.data === '') {
					setIsLoading(false);
					alertPopUp(false, true, `Error during searching customer..`)
					return;
				}
				setIsLoading(false);
				alertPopUp(true, true, 'Query user info success.')
				return setCustomerNameInput(res.data.Customer_Data.customer_name)
			})
		}
	}

	const createNovaSR = () => {
		CreateCaseService.createNovaSR(
			customerProfileFromNova.CustInfo.CustomerRowID, 'Fault',
			area.filter(filter => filter.id === areaSelect).map(data => data.area)[0],
			subArea.filter(filter => filter.id === subAreaSelect).map(data => data.subArea)[0],
			'wifi@unifi', // to be removed
			'SPICE', // temp source naming
			customerProfileFromNova.ServiceInfo[0].ServiceRowID,
			customerProfileFromNova.CustInfo.PrimaryContactRowID,
			customerProfileFromNova.CustInfo.PrimaryContactRowID,
			customerProfileFromNova.BillInfo[0].BillingAccountRowID,
			customerProfileFromNova.BillInfo[0].BillingAccountNo,
			descriptionInput, 'AIMAN', descriptionInput, 'EAI'
		).then(res => {
			setIsCreateCase(true);
			console.log(res.data, 'createSR');
			if (res.message) {
				setIsCreateCase(false);
				return alertPopUp(true, false, res.message);
			}
			if (res.data.message !== 'Success') {
				setIsCreateCase(false);
				return alertPopUp(false, true, `SR Creation for NOVA Failed (${res.data.message})`);
			}
			setIsCreateCase(false);
			alertPopUp(true, true, `${res.data.message} Create SR for NOVA!!`);
			CreateCaseService.updateSRNumber(res.data.response.SRNumber, caseToken).then(
				(res, err) => {
					if (err) { console.log(err, 'Insert SR Number Failed'); }
					return console.log('Successfully save SR in DB!!')
				}
			)
			return
		})
	}

	const createICPSR = () => {
		CreateCaseService.createICPSR(
			customerProfileFromICP.CustInfo.CustomerRowID,
			'AIMAN',
			area.filter(filter => filter.id === areaSelect).map(data => data.area)[0],
			subArea.filter(filter => filter.id === subAreaSelect).map(data => data.subArea)[0],
			'TM CCR Technical CPC Follow Up',
			customerProfileFromICP.CustInfo.PrimaryContactRowID,
			customerProfileFromICP.CustInfo.PrimaryContactRowID,
			customerProfileFromICP.BillInfo.BillingAccountRowID,
			customerProfileFromICP.BillInfo.BillingAccountNo,
			descriptionInput,
			customerProfileFromICP.ServiceInfo[0].ServiceRowID
		).then(res => {
			setIsCreateCase(true);
			console.log(res.data, 'createICPSR')
			console.log(area.filter(filter => filter.id === areaSelect).map(data => data.area), 'createICPSR')
			if (res.data === undefined || res.data?.Header?.Header?.ErrorCode === '1') {
				setIsCreateCase(false);
				return alertPopUp(false, true, 'SR Creation Failed!!');
			}
			setIsCreateCase(false);
			alertPopUp(true, false, 'Successfully create SR for ICP!!');
			CreateCaseService.updateSRNumber(res.data.SRNumber, res.data.SRRowID, caseToken).then(
				(res, err) => {
					if (err) { console.log(err, 'Insert SR Number Failed'); }
					return console.log('Successfully save SR in DB!!')
				}
			)
			return;
		})
	}

	function createNonTechnicalCase(e) {
		e.preventDefault();
		CreateCaseService.createCaseHeroBuddy(
			'0', customerNameInput, customerID, customerMobileNumberInput, serviceID, locationSelect,
			null, null, null, descriptionInput,
			typeSelect, areaSelect, subAreaSelect, null, targetSystem)
			.then((res, err) => {
				setIsCreateCase(true);
				if (err) {
					console.log(err);
					setIsCreateCase(false);
					return alertPopUp(false, true, 'Case creation Failed!!');
				}
				setIsCreateCase(false);
				alertPopUp(true, true, 'Case has been created successfully');
				if (customerProfileFromICP !== null || customerProfileFromICP !== undefined) return createICPSR();
				if (customerProfileFromNova !== null || customerProfileFromNova !== undefined) return createNovaSR();
				return;
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
								<option value="service">Service ID</option>
								<option value="login">Login ID</option>
							</select>
						</div>
						<div className="hb-input-box hb-input-group-area">
							<input
								type="text"
								id="search-detail"
								name="search-detail"
								placeholder={searchBarType === "service" ? "Insert Service ID" : "Insert Login ID"}
								value={serviceID}
								onChange={(e) => setServiceID(e.target.value)}
							/>
							{searchBarType === 'service' &&
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
						<label className="hb-detail" for="customerName">Customer Name<span style={{color:'red'}}>*</span></label>
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
						<label className="hb-detail" for="customerNumber">Customer Mobile Number<span style={{color:'red'}}>*</span></label>
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
						<label className="hb-detail" for="loggerNumber">Logger Mobile Number<span style={{color:'red'}}>*</span></label>
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
						<label className="hb-detail" for='type'>Type</label>
						<div className="hb-input-box">
							<select id='type' name='type' value={typeSelect} disabled>
								<option value={37}>Biling</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="area">Area<span style={{color:'red'}}>*</span></label>
						<div className="hb-input-box">
							<select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								<option value='82'>Complaint</option>
								<option value='83'>Enquiries</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="subarea">Sub-Area<span style={{color:'red'}}>*</span></label>
						<div className="hb-input-box">
							<select id="area" name="area" value={subAreaSelect} onChange={e => setSubArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{subArea.filter(filter => filter.id !== '85').map((data, key) => <option key={key} value={data.id}>{data.subArea}</option>)}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="product">Product</label>
						<div className="hb-input-box">
							<select id="product" name="product" value={productSelect}
								onChange={(e) => setProduct(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{product.map((data, key) => <option key={key} value={data.id}>{data.product}</option>)}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="location">Location<span style={{color:'red'}}>*</span></label>
						<div className="hb-input-box">
							<select id="location" name="location" value={locationSelect}
								onChange={e => setLocation(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{areaLocation.map((data, i) => <option value={data.id}>{data.city}</option>)}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for='description'>Description<span style={{color:'red'}}>*</span></label>
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
