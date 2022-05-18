const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const AdvancedSearchService = {
    advancedSearch(authToken, email, fullName, nricNum, srNum, ttNum, caseNum, vipName, customerName, 
        caseTypeID, startDateInput, endDateInput, heroGroupID) {
        return fetch(url + '/case/advanced-search/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'fullname': fullName,
                'email': email,
                'nricNum': nricNum,
                'srNum': srNum,
                'ttNum': ttNum,
                'caseNum': caseNum,
                'vipName': vipName,
                'customerName': customerName,
                'caseTypeID': caseTypeID,
                'startDate': startDateInput,
                'endDate': endDateInput,
                'heroGroup': heroGroupID
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default AdvancedSearchService;