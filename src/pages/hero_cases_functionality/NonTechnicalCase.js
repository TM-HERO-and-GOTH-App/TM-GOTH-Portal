import React, {useEffect, useState} from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

function NonTechnicalCase() {
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [descriptionInput, setDescription] = useState('');
	const [typeSelect, setTypeSelect] = useState('biling');
	const [productSelect, setProduct] = useState('default');
	const [areaSelect, setArea] = useState('default');
	const [subAreaSelect, setSubArea] = useState('default');
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState('');
	const [searchBarType, setSearchBarType] = useState('service');
	const [searchBarDetail, setSearchBarDetail] = useState('');

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
						<label className="hb-detail" for='description'>Description*</label>
						<div className="hb-input-box">
							<input type='text' id='description' name='userDescription'
							       placeholder='example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps'
							       value={descriptionInput} onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for='type'>Type*</label>
						<div className="hb-input-box">
							<select id='type' name='type' value={typeSelect}>
								<option value='biling' disabled>Biling</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="area">Area*</label>
						<div className="hb-input-box">
							<select id="area" name="area" value={areaSelect}>
								<option value="complaint">Complaint/Enquiries</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="subarea">Sub-Area*</label>
						<div className="hb-input-box">
							<select id="subarea" name="subarea" value={subAreaSelect}
							        onChange={(e) => setSubArea(e.currentTarget.value)}>
								<option value="default" disabled>Select One</option>
								<option value="report_progress">Report Progress</option>
								<option value="payment">Payment</option>
								<option value="Charges">Charges</option>
								<option value="bill_details">Bill Details</option>
								<option value="tos">TOS/RTN</option>
								<option value="dispute_invalid_charges">Dispute-Invalid Charges</option>
								<option value="resolution">Complaint Handling & Resolution</option>
								<option value="payment">Payment Not Updated</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for='product'>Product*</label>
						<div className="hb-input-box">
							<select id='product' name='product' value={productSelect} onChange={(e) => setProduct(e.target.value)}>
								<option value='default'>Select one</option>
								<option value='broadband'>Broadband</option>
								<option value='telephony'>Telephony</option>
								<option value='mobile'>unifi Mobile</option>
								<option value='tv'>unifi TV</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for='location'>Location*</label>
						<div className="hb-input-box">
							<select id='location' name='location' value={locationSelect}
							        onChange={(e) => setLocation(e.target.value)}>
								<option value='default' disabled>Select one</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail">Attachment</label>
						<div className="hb-attachment">
							<input type='file' name='imageAttach'/>
						</div>
					</div>
					<div className="hb-button">
						<input className="hb-submit" type='submit' title='Submit' value={pictureInput}
						       onChange={(e) => setPicture(e.target.value)}/>
					</div>
				</form>
			</div>
			</body>
	)
}

export default NonTechnicalCase;