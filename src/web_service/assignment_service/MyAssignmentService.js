// import getApiPort from "../PortAPIDetector";
import Axios from 'axios';
import config from '../config'

const url = config

const AssignmentService = {
	viewCaseByOwner(authToken, hID, caseStatusID) {
		return Axios.post(url + '/case/view-cases-by-owner', {
			'authToken': authToken,
			'hID': hID,
			'caseStatus': caseStatusID
		}).then(data => {
			return data
		}).catch(err => console.log(err));
	},


	viewCaseByGroup(authToken, hID, shID, caseStatusID) {
		return Axios.post(url + '/case/view-cases-by-group', {
			'authToken': authToken,
			'hID': hID,
			'shID': shID,
			'caseStatusID': caseStatusID,
			'caseTypeID': 0
		}).then(data => {
			return data
		}).catch(err => console.log(err));
	},

	viewCaseByCollaborator(authToken, caseStatusID) {
		return Axios.post(url + '/case/view-cases-by-collaborator', {
			'authToken': authToken,
			'caseStatusID': caseStatusID
		}).then(data => {
			return data
		}).catch(err => console.log(err))
	},


	viewUnassignedCase(authToken, hID, shID) {
		return Axios.post(url + '/case/view-unassigned-case', {
			'authToken': authToken,
			"hID": hID,
			'shID': shID
		}).then(data => {
			return data
		}).catch(err => console.log(err))
	}
}

export default AssignmentService;
