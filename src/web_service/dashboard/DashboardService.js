import axios from 'axios';

const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const DashboardService = {
    getTotalResolvedByAgent(authToken){
        return fetch( url + '/case/total-resolved-within-days-by-agent/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                days: 5
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    getTotalResolvedByGroup(authToken, shID){
        return fetch( url + '/case/total-resolved-within-days-by-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                shID: shID,
                days: 5
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    getTotalCaseByAgent(authToken){
        return fetch( url + '/case/get-total-case-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    getTotalCaseByGroup(authToken, shID){
        // return axios({
        //     method: 'POST',
        //     url: url + '/case/get-total-case-by-stakeholder/',
        //     headers: headers,
        //     data: {
        //         authToken: authToken,
        //         shID: shID
        //     },
        //     responseType: 'json'
        // }).then(res => {return res.data}).catch(err => console.log(err));

        return fetch( url + '/case/get-total-case-by-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                shID: shID,
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    async getTotalRegisteredUserByState(authToken){
        return await fetch( url + '/dashboard/total-hero-by-state/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                startDate: '2018-01-01',
                endDate: '2018-01-01'
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    async getTotalCaseByState(authToken){
        return await fetch( url + '/dashboard/total-case-by-state/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                startDate: '2018-01-01',
                endDate: '2018-01-01'
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default DashboardService;