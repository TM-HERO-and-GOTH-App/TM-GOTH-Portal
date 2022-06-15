import Axios from "axios";

const url = process.env.REACT_APP_LOCAL_API_URL;

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
    }
}

export default CreateCaseService;
