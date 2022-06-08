import React, {useEffect, useState} from "react";
import './styleHeroBuddy.css'
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';


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

	const [searchBarType, setSearchBarType] = useState('service');
	const [searchBarDetail, setSearchBarDetail] = useState('');

	return (
			<body style={styles.body}>
			<div className="hb-container">
				<div className="hb-title">Caution Report</div>
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
