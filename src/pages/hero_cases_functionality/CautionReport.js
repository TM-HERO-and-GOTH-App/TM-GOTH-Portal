import React, { useState } from "react";
import './styleHeroBuddy.css'
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";
import unifiFormPageData from "./dataForUnifiBuddy";


function CautionReport() {
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [customerID, setCustomerID] = useState(null);
	const [descriptionInput, setDescription] = useState('');
	const [typeSelect, setTypeSelect] = useState(503);
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState('');

	// Alert
	const [alertIsSuccess, setAlertIsSuccess] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const alertPopUp = (success, alert, message) => {
		setAlertIsSuccess(success);
		setAlertMessage(message);
		setShowAlert(alert);
	}

	let areaLocation = unifiFormPageData.areaLocation
	let type = unifiFormPageData.type

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
		CreateCaseService.createCaseHeroBuddy(
			'0', customerNameInput, null, customerMobileNumberInput, null, locationSelect,
			null, null, null, descriptionInput,
			typeSelect, null, null, null, null)
			.then((res, err) => {
				if (res.status === 202) { return alertPopUp(false, true, `Query Error: ${res.data}`); }
				if (err) { return alertPopUp(false, true, 'Case creation Failed!!');}
				return alertPopUp(true, true, 'Case creation Success');
		})
	}

	return (
			<div style={styles.body}>
				<div className="hb-container">
					<div className="hb-title">Caution Report</div>
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
							<label className="hb-detail" htmlFor="customerName">Customer NRIC<span style={{ color: 'red' }}>*</span></label>
							<div className="hb-input-box">
								<input
									type="text"
									id="customerIC"
									name="customerIC"
									placeholder="9XXXXX-XX-XXXX"
									value={customerID}
									onChange={(e) => setCustomerID(e.target.value)}
									// required
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
									<option value={503}>Caution Report</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" for="location">Location*</label>
							<div className="hb-input-box">
								<select id="location" name="location" value={locationSelect} onChange={e => setLocation(e.target.value)}>
									<option disabled value='default'>Select One</option>
									{areaLocation.map((c, i) => <option value={c.id}>{c.city}</option>)}
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
