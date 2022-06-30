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
		}).then(res => { return res }).catch(err => { return err });
	},

	autoCreateCTT(serviceNumber, faultCode, mobileNumber) {
		return Axios.post(url + '/icp/auto-create-ctt-DEL', {
			"serviceNumber": serviceNumber,
			"faultCode": faultCode,
			"customerMobileNumber": mobileNumber
		}).then(res => { return res }).catch(err => { return err });
	},

	createNovaSR(customerRowID, type, area, subArea, caseCategory,
		dateCreated, source, serviceRowID, contactDetailRowID, contactDetailReportedID, bilingAccountRowID,
		bilingAccountNumber, detailDataDescription, group, owner, closureCategory,
		closureReason, closureRemark, callBack, callBackTime, srNumber, cttNumber, noteID,
		noteCreatedBy, noteDescription, createdByPosition) {
		return Axios.post(url + '/nova/create-sr', {
			customerRowID,
			type,
			"status": "In Progress",
			area,
			subArea,
			caseCategory,
			dateCreated,
			source,
			serviceRowID,
			contactDetailRowID,
			contactDetailReportedID,
			bilingAccountRowID,
			bilingAccountNumber,
			detailDataDescription,
			group,
			owner,
			closureCategory,
			closureReason,
			closureRemark,
			callBack,
			callBackTime,
			srNumber,
			cttNumber,
			noteID,
			noteCreatedBy,
			"noteType": 'Note',
			noteDescription,
			createdByPosition
		}).then(res => { return res }).catch(err => { return err })
	},

	createNovaTT(customerRowID, bilingAccountNumber, bilingAccountRowID,
		severity, product, symptomCode, category, owner, serviceRowID, preferredAcknowledgement,
		relatedSRRowID, status, ccpChargingMethod, contactDetailRowID, contactDetailReportedID,
		description, ownerCctActivity, activityID, activityType, activityStatus, activityCreated,
		activityPlannedStart, activityPlannedEnd, activityDescription, notedID, createdBy, noteDescription, createdByPosition) {
		return Axios.post(url + '/nova/create-TT', {
			customerRowID,
			bilingAccountNumber,
			bilingAccountRowID,
			severity,
			product,
			symptomCode,
			category,
			owner,
			serviceRowID,
			preferredAcknowledgement,
			relatedSRRowID,
			status,
			ccpChargingMethod,
			contactDetailRowID,
			contactDetailReportedID,
			description,
			ownerCctActivity,
			activityID,
			activityType,
			activityStatus,
			activityCreated,
			activityPlannedStart,
			activityPlannedEnd,
			activityDescription,
			notedID,
			createdBy,
			noteDescription,
			createdByPosition
		}).then(res => { return res }).catch(err => { return err });
	},

	createICPSR(customerRowID, status, createdBy, area, subArea,
		caseCategory, dateCreated, priority, severity, group, contactDetailRowID, contactDetailReportedID,
		bilingAccountRowID, bilingAccountNumber, detailDataDescription, productCategory,
		productStreamyxProduct, productType, serviceRowID, serviceType,
		callBack) {
		return Axios.post(url + '/icp/create-SR', {
			customerRowID,
			status,
			createdBy,
			area,
			subArea,
			caseCategory,
			dateCreated,
			priority,
			severity,
			group,
			contactDetailRowID,
			contactDetailReportedID,
			bilingAccountRowID,
			bilingAccountNumber,
			detailDataDescription,
			productCategory,
			productStreamyxProduct,
			productType,
			serviceRowID,
			serviceType,
			callBack
		}).then(res => { return res }).catch(err => { return err });
	},

	createICPTT(customerRowID, severity, product, productCategory,
		description, symptomCode, serviceRowID,
		relatedSRRowID, createdBy, endDate, dueDate, migrationFlag, migrationNotes,
		serviceNumber, srNumber, bilingAccountNumber, ccpChargingMethod, category,
		contactDetailRowID, contactDetailReportedID, bilingAccountRowID) {
		return Axios.post(url + '/icp/create-TT', {
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
			'status': 'Pending Assign', 
			bilingAccountNumber, 
			ccpChargingMethod, 
			category,
			contactDetailRowID, 
			contactDetailReportedID, 
			bilingAccountRowID
		}).then(res => {return res}).catch(err => {return err});
	}
}

export default CreateCaseService;
