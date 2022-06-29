import Axios from "axios";
import config from '../config'

const url = config

const CreateCaseService = {
	createCase(token, hID, customerNameInput, nricInput, mobileNumberInput, stateType, externalSystemInput, stakeholderReferenceSelect, sourceType, subSourceType, caseDescriptionInput, caseType, areaType, subAreaSelect, symptomSelect, customerServiceIDInput, siebelTargetSystemSelect) {
		return Axios.post(url + '/case/create-new-case', {
			authToken: token,
			gID: hID,
			caseContent: caseDescriptionInput,
			customerName: customerNameInput,
			nricNumber: nricInput,
			customerMobileNumber: mobileNumberInput,
			stateID: stateType,
			flag: 'COMPLAINT',
			externalSystem: externalSystemInput,
			stakeholderReference: stakeholderReferenceSelect,
			sourceID: sourceType,
			subSourceID: subSourceType,
			caseType: caseType,
			areaID: areaType,
			subAreaID: subAreaSelect,
			symptomID: symptomSelect,
			customerServiceID: customerServiceIDInput,
			siebelTargetSystem: siebelTargetSystemSelect
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
	},

	getCustomerProfileFromICP(serviceID, customerID) {
		return Axios.post(url + '/siebel_eai/nova/query-account',{
			"serviceID": serviceID,
			"customerID": customerID
		}).then(res => {return res}).catch(err => {return err});
	},

	autoCreateCTT(serviceNumber, faultCode, mobileNumber) {
		return Axios.post(url + '/icp/auto-create-ctt-DEL', {
			"serviceNumber": serviceNumber,
			"faultCode": faultCode,
			"customerMobileNumber": mobileNumber
		}).then(res => {return res}).catch(err => {return err});
	}
}

export default CreateCaseService;
