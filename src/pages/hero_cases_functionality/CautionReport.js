import React, {useState} from "react";
import './styleHeroBuddy.css'
import CreateCaseService from "../../web_service/create_case_service/CreateCaseService";
import unifiFormPageData from "./dataForUnifiBuddy";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";


function CautionReport() {
	const [customerNameInput, setCustomerNameInput] = useState('');
	const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
	const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
	const [customerID, setCustomerID] = useState(null);
	const [descriptionInput, setDescription] = useState('');
	const [typeSelect, setTypeSelect] = useState(503);
	const [locationSelect, setLocation] = useState('default');
	const [pictureInput, setPicture] = useState(null);

	// Submit
	const [showSubmitLoading, setShowSubmitLoading] = useState(false)
	const [submitIsLoading, setSubmitIsLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [progressMessage, setProgressMessage] = useState('. . .')
	const [submitStatus, setSubmitStatus] = useState(true)
	const submitProgress = (progress, message, status, loading) => {
		setProgress(progress);
		setProgressMessage(message);
		setSubmitStatus(status)
		setSubmitIsLoading(loading)
	}

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
		setShowSubmitLoading(true)
		submitProgress(20, 'Creating New Case at GOTH . . .', true, true)
		CreateCaseService.createCaseHeroBuddy(
				'0', customerNameInput, null, customerMobileNumberInput, null, locationSelect,
				null, null, descriptionInput, typeSelect,
				null, null, null, null, null)
				.then((res, err) => {
					if (res.status === 202) {
						submitProgress(100, `Case creation Failed (${res.data}) . . .`, false, false)
						return alertPopUp(false, true, `Query Error: ${res.data}`);
					}
					if (err) {
						submitProgress(100, `Case creation Failed (${res.data}) . . .`, false, false)
						return alertPopUp(false, true, 'Case creation Failed!!');
					}

					// if case is created successfully and not null
					if (pictureInput !== null) {
						submitProgress(45, 'Uploading Image to DB . . .', true, true)
						const formData = new FormData();
						formData.append('cToken', res.data.caseToken)
						formData.append('imgCollection', pictureInput)
						formData.append('longitude', '')
						formData.append('latitude', '')
						CreateCaseService.attachImage(formData).then((res, err) => {
							if (err || res.request.status !== 200) {
								return submitProgress(100, `Image Upload Failed (${res?.name}) . . .`, false, false)
							}
						})
					}

					submitProgress(100, 'Case has been created successfully', true, false)
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
					<form onSubmit={createCautionCase}>
						<div className="hb-input-group">
							<label className="hb-detail" for="customerName">Customer Name<span
									style={{color: 'red'}}>*</span></label>
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
							<label className="hb-detail" htmlFor="customerName">Customer NRIC<span
									style={{color: 'red'}}>*</span></label>
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
							<label className="hb-detail" for="customerNumber">Customer Mobile Number<span
									style={{color: 'red'}}>*</span></label>
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
							<label className="hb-detail" for="loggerNumber">Logger Mobile Number<span
									style={{color: 'red'}}>*</span></label>
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
							<label className="hb-detail" for='type'>Type<span
									style={{color: 'red'}}>*</span></label>
							<div className="hb-input-box">
								<select id='type' name='type' value={typeSelect} disabled>
									<option value={503}>Caution Report</option>
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" for="location">Location<span
									style={{color: 'red'}}>*</span></label>
							<div className="hb-input-box">
								<select id="location" name="location" value={locationSelect}
								        onChange={e => setLocation(e.target.value)}>
									<option disabled value='default'>Select One</option>
									{areaLocation.map((c, i) => <option value={c.id}>{c.city}</option>)}
								</select>
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail" htmlFor="description">Description<span
									style={{color: 'red'}}>*</span></label>
							<div className="hb-input-box">
                            <textarea
		                            id="description"
		                            className="hb-border"
		                            name="userDescription"
		                            cols={40}
		                            placeholder="example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps"
		                            value={descriptionInput}
		                            onChange={(e) => setDescription(e.target.value)}
		                            required
                            />
							</div>
						</div>

						<div className="hb-input-group">
							<label className="hb-detail">Attachment</label>
							<div className="hb-attachment">
								<input type="file" name="imageAttach" onChange={(e) => setPicture(e.target.files[0])}
								       accept="image/*"/>
							</div>
						</div>

						<div className="hb-button">
							{showSubmitLoading === true &&
									<>
										<CircularProgress
												size={16}
												sx={{
													color: submitStatus === true ? 'var(--color-primary)' : 'var(--color-warning)',
													position: 'absolute',
													marginTop: '9px',
													marginLeft: '12px',
												}}
										/>
										<h6 style={{marginLeft: '35px', maxWidth: '60%'}}>{progressMessage}</h6>
									</>
							}
							<input className="hb-submit" type="submit" title="Submit" disabled={submitIsLoading}
							       style={submitIsLoading ? {opacity: .5} : {opacity: 1}}/>
							{showSubmitLoading === true &&
									<LinearProgress sx={{width: 'calc(100% - 10px)', marginLeft: '5px', marginTop: '10px'}}
									                color={submitStatus === true ? 'primary' : 'error'}
									                variant="determinate" value={progress}
									/>
							}
						</div>
					</form>
				</div>
			</div>
	);
}

export default CautionReport;
