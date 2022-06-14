const baseUrl = process.env.REACT_APP_TESTING_API_URL;
const headers = { 'Content-Type': 'application/json' };

const CaseAPI = {
    createCase(authToken, gID, caseContent, customerName, nricNumber, customerMobileNumber, areaLocationID,
                externalSystem, stakeholderReference, sourceID, 
                caseTypeID, areaCode, subAreaID, symptomID, customerServiceID, siebelTargetSystem) {
        return fetch('http://localhost:3001/case/create-new-case', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                gID: gID,
                customerName: customerName,
                nricNumber: nricNumber,
                customerMobileNumber: customerMobileNumber,
                areaLocationID: areaLocationID,
                flag: 'COMPLAINT',
                externalSystem: externalSystem,
                stakeholderReference: stakeholderReference,
                sourceID: sourceID,
                caseContent: caseContent,
                caseTypeID: caseTypeID,
                areaCode: areaCode,
                subAreaID: subAreaID,
                symptomID: symptomID,
                customerServiceID: customerServiceID,
                siebelTargetSystem: siebelTargetSystem
            })
        })
        .then(res=> {if(res.statusText === 'OK') return res.text()})
        .then(responseData => { return responseData }).catch(err => console.log(err));
    }
}

export default CaseAPI; 