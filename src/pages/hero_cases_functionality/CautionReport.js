import React, { useState } from "react";
import './styleHeroBuddy.css'
import axios from 'axios';
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";

function CautionReport() {
	const userData = JSON.parse(sessionStorage.getItem('UserData'));
	const token = JSON.parse(sessionStorage.getItem('userToken'))
	const lovData = JSON.parse(sessionStorage.getItem('LovData'));
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [descriptionInput, setDescription] = useState('');
	const [typeSelect, setTypeSelect] = useState(37);
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState('');

	let styles = {
		body: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: "10px",
			background: "darkgrey",
		},
	};

	const createCautionCase = (e) => {
		e.preventDefault();
		CreateCaseService.createCase(token, userData.hID, customerNameInput, null, customerMobileNumberInput,
			locationSelect, null, null, null, null, descriptionInput, typeSelect, null, null,
			null, null, null).then(res => {
				console.log(res)
			})
	}

	return (
		<div style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Caution Report</div>
				<form onSubmit={createCautionCase}>
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
								<option value={503} disabled>Caution Report</option>
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
							<input type="file" name="imageAttach" />
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

export default CautionReport;
