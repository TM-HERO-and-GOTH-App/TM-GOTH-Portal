import React, {useEffect, useState} from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

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
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [descriptionInput, setDescription] = useState('');
	const [typeSelect, setTypeSelect] = useState('assurance');
	const [productSelect, setProduct] = useState('default');
	const [areaSelect, setArea] = useState('service_failure');
	const [subAreaSelect, setSubArea] = useState('all_services_down');
	const [symptomSelect, setSymptom] = useState('default');
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState('');
	const [searchBarType, setSearchBarType] = useState('service');
	const [searchBarDetail, setSearchBarDetail] = useState('');


	return (
			<body style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Technical Case</div>
				<form action="#">
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
									value={searchBarDetail}
									onChange={(e) => setSearchBarDetail(e.target.value)}
							/>
						</div>
						<div className="hb-input-group-append" style={{ display: `${searchBarType === "service" ? "":"none"}`}}>
							<button className="btn btn-secondary" type="button"><LocationSearchingIcon fontSize="large"/></button>
						</div>
						<div className="hb-input-group-append">
							<button className="btn" type="button"><SearchIcon fontSize="large"/></button>
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
							<input
									type="text"
									id="description"
									name="userDescription"
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
								<option value='assurance' disabled>Assurance</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="area">Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={areaSelect}>
								<option value="service_failure">Service Failure</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="subarea">Sub-Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={subAreaSelect}>
								<option value="all_services_down">All Services Down</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="product">Product*</label>
						<div className="hb-input-box">
							<select id="product" name="product" value={productSelect} onChange={(e) => setProduct(e.target.value)}>
								<option value="default" disabled>Select one</option>
								<option value="broadband">Broadband</option>
								<option value="telephony">Telephony</option>
								<option value="mobile">unifi Mobile</option>
								<option value="tv">unifi TV</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="symptom">Symptom*</label>
						<div className="hb-input-box">
							<select id="symptom" name="symptom" value={symptomSelect} onChange={(e) => setSymptom(e.target.value)}>
								<option value="default" disabled>Select one</option>
								<option value="option1">option 1</option>
								<option value="option2">option 2</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="location">Location*</label>
						<div className="hb-input-box">
							<select id="location" name="location">
								<option value="default" disabled>Select one</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail">Attachment</label>
						<div className="hb-attachment">
							<input type="file" name="imageAttach" value={pictureInput} onChange={(e) => setPicture(e.target.value)}/>
						</div>
					</div>

					<div className="hb-button">
						<input className="hb-submit" type="submit" title="Submit"/>
					</div>
				</form>
			</div>
			</body>
	);
}

export default TechnicalCase;
