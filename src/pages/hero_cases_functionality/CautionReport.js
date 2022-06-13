import React from "react";
import './styleHeroBuddy.css'

function CautionReport() {
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

	return (
			<body style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Caution Report</div>
				<form action="#">
					<div className="hb-input-group">
						<label className="hb-detail" for="customerName">Customer Name*</label>
						<div className="hb-input-box">
							<input
									type="text"
									id="customerName"
									name="customerName"
									placeholder="example: Mr Ahmad/Ms Chiu/Mr Rama"
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
							/>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="type">Type*</label>
						<div className="hb-input-box" id="type" name="caution_report">
							<p value="caution_report">Caution Report</p>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail" for="location">Location*</label>
						<div className="hb-input-box">
							<select id="location" name="location">
								<option value="empty">Select one</option>
							</select>
						</div>
					</div>

					<div className="hb-input-group">
						<label className="hb-detail">Attachment</label>
						<div className="hb-attachment">
							<input type="file" name="imageAttach"/>
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

export default CautionReport;
