import React, { useEffect, useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import axios from 'axios';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";

function NonTechnicalCase() {
	const userData = JSON.parse(sessionStorage.getItem('UserData'));
	const token = JSON.parse(sessionStorage.getItem('userToken'))
	const lovData = JSON.parse(sessionStorage.getItem('LovData'));
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [descriptionInput, setDescription] = useState('');
	let [customerProfileFromNova, setCustomerProfileFromNova] = useState({});
	const [typeSelect, setTypeSelect] = useState(37);
	const [productSelect, setProduct] = useState('default');
	const [areaSelect, setArea] = useState('default');
	const [subAreaSelect, setSubArea] = useState('default');
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState('');
	const [searchBarType, setSearchBarType] = useState('service');
	const [searchBarInput, setSearchBarInput] = useState('');
	let [customerICInput, setCustomerICInput] = useState('');
	// let [serviceIDInput, setServiceIDInput] = useState('');
	// let [loginIDInput, setLoginIDInput] = useState('');


	const checkNetwork = () => {
		axios.post('http://10.54.1.21:8001/NEXT/OVAL_NEXT/Proxy_Services/PS_RetrieveLRInfo', {
			"RequestID": "HERO-20220425-0001",
			"ServiceNo": searchBarInput
		}).then((res, err) => {
			if (err) return console.log(err);
			return console.log(res);
		})
	}

	const createNonTechnicalCase = (e) => {
		e.preventDefault();
		CreateCaseService.createCase(token, userData.hID, customerNameInput, null, customerMobileNumberInput,
			locationSelect, null, null, null, null, descriptionInput, typeSelect, areaSelect, subAreaSelect,
			null, searchBarInput, null).then((res, err) => {
				if (err) {
					console.log(err);
					return alert('Case creation Failed!!');
				}
				createSR();
				return alert('Case has been created successfully');
			})
	}

	const getCustomerProfile = (e) => {
		e.preventDefault();
		CreateCaseService.getCustomerProfileFromICP(searchBarInput, customerICInput).then(res => {
			// console.log(res.data);
			setCustomerProfileFromNova(res.data.STTRetrieveServiceAcctResponse.Response[0])
			setCustomerNameInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].AccountName)
			setCustomerMobileNumberInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].MobileNo)
			setLocation(lovData.filter(data => data.L_NAME.toUpperCase() == res.data.STTRetrieveServiceAcctResponse.Response[0].ServiceInfo[0].ServiceAddress[0].State).map(data => data.L_ID))
		})
	}

	const createSR = (e) => {
		CreateCaseService.createNovaSR(customerProfileFromNova.CustInfo[0].CustomerRowID, null, areaSelect, subAreaSelect, null, null, null, 
			customerProfileFromNova.ServiceInfo[0].ServiceRowID, null, null, null, null, descriptionInput, null, null, null, null, null, null, null,null,
			null, null, userData.fullName, null, null).then(res => {
				console.log(res);
				createTT();
			})
	}

	const createTT = () => {
		CreateCaseService.createNovaTT(customerProfileFromNova.CustInfo[0].CustomerRowID, customerProfileFromNova.BillInfo[0].BillingAccountNo, customerProfileFromNova.BillInfo[0].BillingAccountRowID,
			null, productSelect, null, null, userData.fullName, customerProfileFromNova.ServiceInfo[0].ServiceRowID, null, null, 'New', null, null, null,
			descriptionInput, null, null, null, null, null, null, null, null, null, userData.fullName, null, null).then(res => {
				console.log(res);
			})
	}

	let styles = {
		body: {
			display: 'flex',
			height: '100vh',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '10px',
			background: 'darkgrey'
		},
	}

	return (
		<body style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Non-Technical Case</div>
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
								value={searchBarInput}
								onChange={(e) => setSearchBarInput(e.target.value)}
							/>
							{searchBarType === 'service' &&
								<input
									type='text'
									id='customerIC'
									name='customerIC'
									placeholder='Please insert customer IC'
									value={customerICInput}
									onChange={(e) => setCustomerICInput(e.target.value)}
								/>
							}
						</div>
						<div className="hb-input-group-append" onClick={checkNetwork} style={{ display: `${searchBarType === "service" ? "" : "none"}` }}>
							<button className="btn btn-secondary" type="button"><LocationSearchingIcon fontSize="large" /></button>
						</div>
						<div className="hb-input-group-append" onClick={getCustomerProfile}>
							<button className="btn" type="button"><SearchIcon fontSize="large" /></button>
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
							<select id='type' name='type' value={typeSelect}>
								<option value={37} disabled>Biling</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="area">Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={areaSelect} onChange={e => setArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'AREA').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="subarea">Sub-Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={subAreaSelect} onChange={e => setSubArea(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'SUB-AREA').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="product">Product*</label>
						<div className="hb-input-box">
							<select id="product" name="product" value={productSelect} onChange={(e) => setProduct(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'PRODUCT').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="location">Location*</label>
						<div className="hb-input-box">
							<select id="location" name="location" value={locationSelect} onChange={e => setLocation(e.target.value)}>
								<option disabled value='default'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'STATE').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
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
		</body>
	)
}

export default NonTechnicalCase;