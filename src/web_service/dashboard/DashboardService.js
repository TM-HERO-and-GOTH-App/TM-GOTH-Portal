import axios from 'axios';
import config from '../config'

const url = config

const DashboardService = {
    async getTotalResolvedByAgent(authToken, gID) {
        return axios.post(url + '/dashboard/get-total-case-resolved-by-owner', {
            'authToken': authToken,
            'gID': gID,
            'days': 5
        }).then(resData => {
            return resData
        }).catch(err => console.log(err, 'getTotalResolvedByAgent'))
    },

    async getTotalResolvedByGroup(authToken, shID) {
        return axios.post(url + '/dashboard/get-total-case-resolved-by-group', {
            'authToken': authToken,
            'shID': shID,
            'days': 5
        }).then(resData => {
            return resData
        }).catch(err => console.log(err, 'getTotalResolvedByGroup'))
    },

    async getTotalCaseByAgent(authToken, gID) {
        return axios.post(url + '/dashboard/get-total-case-by-owner', {
            'authToken': authToken,
            "gID": gID
        }).then(resData => {
            return resData
        }).catch(err => console.log(err, 'getTotalCaseByAgent'))
    },

    async getTotalCaseByGroup(authToken, shID, gID) {
        return axios.post(url + '/dashboard/get-total-case-by-stakeholder', {
            'authToken': authToken,
            'gID': gID,
            'shID': shID
        }).then(data => {
            return data
        }).catch(err => console.log(err, 'getTotalCaseByGroup'))
    },

    async getTotalRegisteredUserByState(authToken) {
        return axios.post(url + '/dashboard/total-user-by-state', {
            'authToken': authToken,
            'startDate': '2018-01-01',
            'endDate': '2018-12-31'
        }).then(res => {
            return res
        }).catch(err => console.log(err, 'getTotalRegisteredUserByState'))
    },

    async getTotalCaseByState(authToken) {
        return axios.post(url + '/dashboard/total-case-by-state', {
            'authToken': authToken,
            'startDate': '2018-01-01',
            'endDate': '2018-12-31',
            "category": "COMPLAINT"
        }).then(res => {
            if (res.statusText === 'OK') return res;
        })
            .catch(err => console.log(err, 'getTotalCaseByState'))
    }
}

export default DashboardService;
