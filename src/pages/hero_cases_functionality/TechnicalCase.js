import React, { useEffect, useState } from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import axios from 'axios';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";

function TechnicalCase() {
	let styles = {
		body: {
			display: "flex",
			height: "100vh",
			justifyContent: "center",
			alignItems: "center",
			padding: "10px",
			background: "darkgrey",
		},
	};
	const userData = JSON.parse(sessionStorage.getItem('UserData'));
	const token = JSON.parse(sessionStorage.getItem('userToken'))
	const lovData = JSON.parse(sessionStorage.getItem('LovData'));
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

	const checkNetwork = () => {
		axios.post('http://10.54.1.21:8001/NEXT/OVAL_NEXT/Proxy_Services/PS_RetrieveLRInfo', {
			"RequestID": "HERO-20220425-0001",
			"ServiceNo": searchBarInput
		})
	}

	const createTechnicalCase = (e) => {
		e.preventDefault();
		CreateCaseService.createCase(token, userData.hID, customerNameInput, null, customerMobileNumberInput,
			locationSelect, null, null, null, null, descriptionInput, typeSelect, areaSelect, subAreaSelect,
			symptomSelect, searchBarInput, null).then(res => {
				console.log(res)
			})
	}

	return (
		<body style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Technical Case</div>
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
						</div>
						<div className="hb-input-group-append" style={{ display: `${searchBarType === "service" ? "" : "none"}` }}>
							<button className="btn btn-secondary" type="button"><LocationSearchingIcon fontSize="large" /></button>
						</div>
						<div className="hb-input-group-append">
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
						<label className="hb-detail" for="description">Description*</label>
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
						<label className="hb-detail" for="type">Type*</label>
						<div className="hb-input-box" id="type" name="assurance">
							<select id='type' name='type' value={typeSelect}>
								<option key={28} value={28} disabled>Assurance</option>
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
						<label className="hb-detail" for="symptom">Symptom*</label>
						<div className="hb-input-box">
							<select id="symptom" name="symptom" value={symptomSelect} onChange={(e) => setSymptom(e.target.value)}>
								<option disabled value='0'>Select One</option>
								{
									lovData.filter(data => data.L_GROUP === 'SYMPTOM').map((data, key) => (
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
		</body>
	);
}

export default TechnicalCase;
