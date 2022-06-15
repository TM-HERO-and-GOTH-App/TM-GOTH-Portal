import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const DashboardService = {
    async getTotalResolvedByAgent(authToken) {
        return await axios.post(url + '/dashboard/get-total-case-resolved-by-owner', {
            'authToken': authToken,
            'days': 5
        }).then(resData => { return resData }).catch(err => console.log(err))
    },

    async getTotalResolvedByGroup(authToken, shID) {
        return await axios.post(url + '/dashboard/get-total-case-resolved-by-group', {
            'authToken': authToken,
            'shID': shID,
            'days': 5
        }).then(resData => { return resData }).catch(err => console.log(err))
    },

    async getTotalCaseByAgent(authToken) {
        return await axios.post(url + '/dashboard/get-total-case-by-owner', {
            'authToken': authToken
        }).then(resData => { return resData }).catch(err => console.log(err))
    },

    async getTotalCaseByGroup(authToken, shID) {
        return await axios.post(url + '/dashboard/get-total-case-by-stakeholder', {
            'authToken': authToken,
            'shID': shID
        }).then(data => { return data }).catch(err => console.log(err))
    },

    async getTotalRegisteredUserByState(authToken) {
        return await axios.post(url + '/dashboard/total-user-by-state', {
                'authToken': authToken,
                'startDate': '2018-01-01',
                'endDate': '2018-01-01'
        }).then(res => {return res}).catch(err => console.log(err))
    },

    async getTotalCaseByState(authToken) {
        return await axios.post(url + '/dashboard/total-case-by-state', {
                'authToken': authToken,
                'startDate': '2018-01-01',
                'endDate': '2018-01-01',
                "category": "COMPLAINT"
        }).then(res => {
            if (res.statusText === 'OK') return res;
        })
            .catch(err => console.log(err))
    }
}

export default DashboardService;