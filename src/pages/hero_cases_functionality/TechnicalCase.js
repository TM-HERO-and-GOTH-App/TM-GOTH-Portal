import React, { useEffect, useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import axios from 'axios';
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
	};
	const userData = JSON.parse(sessionStorage.getItem('UserData'));
	const token = JSON.parse(sessionStorage.getItem('userToken'))
	const lovData = JSON.parse(sessionStorage.getItem('LovData'));
	let [customerSIEBELInfo, setCustomerSIEBELInfo] = useState({});
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
	let [searchBarType, setSearchBarType] = useState('service');
	let [searchBarInput, setSearchBarInput] = useState('');
	let [customerICInput, setCustomerICInput] = useState('');
	// let [serviceIDInput, setServiceIDInput] = useState('');
	// let [loginIDInput, setLoginIDInput] = useState('');

	const checkNetwork = () => {
		NextService.checkNetworkOutage('HERO-20220425-0001', searchBarInput).then((res, err) => {
			if (err) return console.log(err);
			return console.log(res);
		})
	}

	const getCustomerProfile = (e) => {
		e.preventDefault();
		CreateCaseService.getCustomerProfileFromNova(searchBarInput, customerICInput).then(res => {
			// console.log(res.data);
			setCustomerNameInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].AccountName)
			setCustomerMobileNumberInput(res.data.STTRetrieveServiceAcctResponse.Response[0].CustInfo[0].MobileNo)
			setLocation(lovData.filter(data => data.L_NAME.toUpperCase() == res.data.STTRetrieveServiceAcctResponse.Response[0].ServiceInfo[0].ServiceAddress[0].State).map(data => data.L_ID))
		})
	}

	const createTechnicalCase = (e) => {
		e.preventDefault();
		createCTT(searchBarInput, symptomSelect, customerMobileNumberInput);
		CreateCaseService.createCase(token, userData.hID, customerNameInput, null, customerMobileNumberInput,
			locationSelect, null, null, null, null, descriptionInput, typeSelect, areaSelect, subAreaSelect,
			symptomSelect, searchBarInput, null).then((res, err) => {
				// console.log(res)
				if (err) {
					console.log(err);
					return alert('Case creation Failed!!');
				}
				return alert('Case has been created successfully');
			})
	}

	const createCTT = (serviceID, symptomCode, mobileNumber) => {
		CreateCaseService.autoCreateCTT(serviceID, symptomCode, mobileNumber).then((err, res) => {
			if (err) return alert('Something went wrong during SR and TT Creation');
			console.log(res)
			return alert('SR and TT number has been successfully created!!');
		});
	}

	return (
		<div style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Technical Case</div>

				{/* Temporary workaround*/}
				{/* <button className="btn btn-primary" onClick={createCTT(searchBarInput, symptomSelect, customerMobileNumberInput)}>CreateCTT</button> */}

				<form onSubmit={createTechnicalCase}>
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
						<div className="hb-input-group-append" style={{ display: `${searchBarType === "service" ? "" : "none"}` }}>
							<button className="btn btn-secondary" type="button" onClick={checkNetwork}><LocationSearchingIcon fontSize="large" /></button>
						</div>
						<div className="hb-input-group-append" onClick={getCustomerProfile}>
							<button className="btn" type="button"><SearchIcon fontSize="large" /></button>
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
						<label className="hb-detail" htmlFor="description">Description*</label>
						<div className="hb-input-box">
							<textarea
								type="text"
								id="description"
								name="userDescription"
								cols={50}
								placeholder="example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps"
								value={descriptionInput}
								onChange={(e) => setDescription(e.target.value)}
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
								{
									lovData.filter(data => data.L_GROUP === 'AREA').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" htmlFor="subarea">Sub-Area*</label>
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
						<label className="hb-detail" htmlFor="product">Product*</label>
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
						<label className="hb-detail" htmlFor="symptom">Symptom*</label>
						<div className="hb-input-box">
							<select id="symptom" name="symptom" value={symptomSelect} onChange={(e) => setSymptom(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									searchBarInput.endsWith('@streamyx') === true ? lovData.filter(data => data.L_GROUP === 'SYMPTOM' && data.L_ID === 658).map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
									: 
									lovData.filter(data => data.L_GROUP === 'SYMPTOM').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" htmlFor="location">Location*</label>
						<div className="hb-input-box">
							<select id="location" name="location" value={locationSelect} onChange={e => setLocation(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'STATE').map((data, key) => (
										<option key={data.L_ID} value={data.L_ID}>{data.L_NAME}</option>
									))
								}
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail">Attachment</label>
						<div className="hb-attachment">
							<input type="file" name="imageAttach" value={pictureInput} onChange={(e) => setPicture(e.target.value)} />
						</div>
					</div>

					<div className="hb-button">
						<input className="hb-submit" type="submit" title="Submit" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default TechnicalCase;
