import axios from 'axios';

const url = process.env.REACT_APP_LOCAL_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const AdvancedSearchService = {
    advancedSearch(authToken, email, fullName, nricNum, srNum, ttNum, caseNum, vipName, customerName, 
        caseTypeID, startDateInput, endDateInput, heroGroupID) {
        return axios.post(url + '/case/advanced-search', {
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
        }).then(res => {return res}).catch(err => console.log(err))
    }
}

export default AdvancedSearchService;