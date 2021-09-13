const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const CreateCaseService = {
    createCase(authToken, customerName, nricNum, mobileNum, caseContent, areaLocationID, flag, sourceID, subSourceID, caseTypeID){
        return fetch( url + '/case/create-from-portal/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                customerName: customerName,
                nricNum: nricNum,
                mobileNum: mobileNum,
                caseContent: caseContent,
                areaLocationID: areaLocationID,
                flag: flag,
                sourceID: sourceID,
                subSourceID: subSourceID,
                caseTypeID: caseTypeID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    }
}

export default CreateCaseService;