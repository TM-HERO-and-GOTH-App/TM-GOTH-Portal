import Axios from "axios";
import config from '../config'

const url = config

const CreateCaseService = {
	createCase(
			token, customerNameInput, nricInput, mobileNumberInput, serviceID, stateType,
			externalSystemInput, stakeholderReferenceSelect, sourceType, caseDescriptionInput,
			caseType, areaType, subAreaSelect, symptomSelect, siebelTargetSystemSelect
	) {
		return Axios.post(url + '/case/create-new-case', {
			authToken: token,
			customerName: customerNameInput,
			nricNumber: nricInput,
			customerMobileNumber: mobileNumberInput,
			serviceID: serviceID,
			stateID: stateType,
			flag: 'COMPLAINT',
			externalSystem: externalSystemInput,
			stakeholderReference: stakeholderReferenceSelect,
			sourceID: sourceType,
			subSource: 0,
			caseContent: caseDescriptionInput,
			caseType: caseType,
			areaID: areaType,
			subAreaID: subAreaSelect,
			symptomID: symptomSelect,
			siebelTargetSystem: siebelTargetSystemSelect
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
	},

	getCustomerProfileFromNova(serviceID, customerID) {
		return Axios.post(url + '/siebel_eai/nova/query-account', {
			"serviceID": serviceID,
			"customerID": customerID
		}).then(res => {
			return res
		}).catch(err => {
			return err
		});
	},

	getCustomerProfileFromICP(serviceID, customerID) {
		return Axios.post(url + '/siebel_eai/icp/check-account-DEL', {
			"serviceID": serviceID,
			"customerID": customerID
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
	},

	getCustomerProfileFromHeroBuddy(loginID) {
		return Axios.post(url + '/herobuddy/queryCustomerHB', {
			"loginID": loginID
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
	},

	autoCreateCTT(serviceNumber, faultCode, mobileNumber) {
		return Axios.post(url + '/siebel_eai/icp/auto-create-ctt-DEL', {
			"serviceNumber": serviceNumber,
			"faultCode": faultCode,
			"customerMobileNumber": mobileNumber
		}).then(res => {
			return res
		}).catch(err => {
			return err
		});
	},

	createNovaSR(customerRowID, type, area, subArea, caseCategory,
	             source, serviceRowID, contactDetailRowID, contactDetailReportedID, billingAccountRowID,
	             billingAccountNumber, detailDataDescription, group, owner,
	             noteCreatedBy, noteDescription, createdByPosition) {
		return Axios.post(url + '/siebel_eai/nova/create-sr', {
			customerRowID,
			type,
			"status": "In Progress",
			area,
			subArea,
			caseCategory,
			source,
			serviceRowID,
			contactDetailRowID,
			contactDetailReportedID,
			billingAccountRowID,
			billingAccountNumber,
			detailDataDescription,
			"group": "WIDER_TMUC_TECH_SOC2", // TODO: this should be group
			"owner": "WIDER_TMUC_TECH_SOC2", // TODO: this should be owner
			"closureCategory": "",
			"closureReason": "",
			"closureRemark": "",
			"callBack": "Yes",
			"callbackDate": "",
			"callBackTime": "",
			"srNumber": "",
			"cttNumber": "",
			"noteID": "1",
			noteCreatedBy,
			"noteType": 'Note',
			noteDescription,
			createdByPosition
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
	},

	createNovaTT(customerRowID, billingAccountNumber, billingAccountRowID,
	             symptomCode, serviceRowID, contactDetailRowID, contactDetailReported,
	             noteDescription, createdByPosition) {
		return Axios.post(url + '/siebel_eai/nova/create-TT', {
			customerRowID,
			billingAccountNumber,
			billingAccountRowID,
			"severity": "4-Low",
			"source": "GOTH",
			"product": "",
			symptomCode,
			"category": "Performance",
			"owner": "",
			serviceRowID,
			"status": "In Progress",
			"ccpChargingMethod": "",
			contactDetailRowID,
			contactDetailReported,
			"description": "",
			"ownerCctActivity": "",
			"activityID": "",
			"activityType": "",
			"activityStatus": "",
			"activityCreated": "",
			"activityPlannedStart": "",
			"activityPlannedEnd": "",
			"activityDescription": "",
			"notedID": "",
			"createdBy": "",
			noteDescription,
			createdByPosition
		}).then(res => {
			return res
		}).catch(err => {
			return err
		});
	},

	checkSRAndTTForNova(serviceID, srNumber, srFaultFlag, srComplaintFlag){
		return Axios.post(url + '/siebel_eai/nova/check-sr-and-tt-status',{
			serviceID, 
			srNumber, 
			srFaultFlag, 
			srComplaintFlag
		}).then(responseData => {return responseData}).catch(err => {return err});
	},

	createICPSR(customerRowID, createdBy, area, subArea,
	            group, contactDetailRowID, contactDetailReportedID,
	            billingAccountRowID, billingAccountNumber, detailDataDescription, serviceRowID) {
		return Axios.post(url + '/siebel_eai/icp/create-SR', {
			customerRowID,
			createdBy,
			area,
			subArea,
			group,
			contactDetailRowID,
			contactDetailReportedID,
			billingAccountRowID,
			billingAccountNumber,
			detailDataDescription,
			serviceRowID
		}).then(res => {
			return res
		}).catch(err => {
			return err
		});
	},

	createICPTT(customerRowID, severity, product, productCategory,
	            description, symptomCode, serviceRowID,
	            relatedSRRowID, createdBy, endDate, dueDate, migrationFlag, migrationNotes,
	            serviceNumber, srNumber, bilingAccountNumber, ccpChargingMethod, category,
	            contactDetailRowID, contactDetailReportedID, bilingAccountRowID) {
		return Axios.post(url + '/siebel_eai/icp/create-TT', {
			customerRowID,
			severity,
			product,
			productCategory,
			description,
			symptomCode,
			serviceRowID,
			relatedSRRowID,
			createdBy,
			endDate,
			dueDate,
			migrationFlag,
			migrationNotes,
			serviceNumber,
			srNumber,
			bilingAccountNumber,
			ccpChargingMethod,
			category,
			contactDetailRowID,
			contactDetailReportedID,
			bilingAccountRowID
		}).then(res => {
			return res
		}).catch(err => {
			return err
		});
	},

	checkSRAndTTForICP(serviceID, srNumber, srFaultFlag, srComplaintFlag, ticketID){
		return Axios.post(url + '/siebel_eai/icp/check-SR-and-TT-status',{
			serviceID, 
			srNumber, 
			srFaultFlag, 
			srComplaintFlag, 
			ticketID
		}).then(responseData => {return responseData}).catch(err => {return err});
	}
}

export default CreateCaseService;
