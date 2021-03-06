import axios from 'axios';
import config from '../config'

const url = config

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