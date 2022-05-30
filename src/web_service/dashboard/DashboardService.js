import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const DashboardService = {
    async getTotalResolvedByAgent(authToken){
        return await fetch( url + '/case/total-resolved-within-days-by-agent/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'days': 5
            })
        }).then(res => res.json()).then(resData => {return resData}).catch(err => console.log(err))
    },

    async getTotalResolvedByGroup(authToken, shID){
        return await fetch( url + '/case/total-resolved-within-days-by-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'shID': shID,
                'days': 5
            })
        }).then(res => res.json()).then(resData => {return resData}).catch(err => console.log(err))
    },

    async getTotalCaseByAgent(authToken){
        return await fetch( url + '/case/get-total-case-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
               'authToken': authToken
            })
        }).then(res => res.json()).then(resData => {return resData}).catch(err => console.log(err))
    },

    async getTotalCaseByGroup(authToken, shID){
        return await fetch( url + '/case/get-total-case-by-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'shID': shID,
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    async getTotalRegisteredUserByState(authToken){
        return await fetch( url + '/dashboard/total-hero-by-state/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'startDate': '2018-01-01',
                'endDate': '2018-01-01'
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    async getTotalCaseByState(authToken){
        return await fetch( url + '/dashboard/total-case-by-state/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'startDate': '2018-01-01',
                'endDate': '2018-01-01',
                "category": "COMPLAINT"
            })
        }).then(res => {
            if(res.ok) return res.json(); 
            else throw new Error("Status code error :" + res.status)})
            .then(data => { return data })
            .catch(err => console.log(err))
    }
}

export default DashboardService;