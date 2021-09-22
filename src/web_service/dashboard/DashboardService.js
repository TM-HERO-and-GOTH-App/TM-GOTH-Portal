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
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    getTotalResolvedByGroup(authToken, shID){
        return fetch( url + '/case/total-resolved-within-days-by-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                shID: shID,
                day: 5
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    getTotalCaseByAgent(authToken){
        return fetch( url + '/case/get-total-case-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    getTotalCaseByGroup(authToken, shID){
        return fetch( url + '/case/get-total-case-by-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                shID: shID,
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    getTotalRegisteredUserByState(authToken){
        return fetch( url + '/dashboard/total-hero-by-state/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                startDate: '2018-01-01',
                endDate: '2018-01-01'
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    getTotalCaseByState(authToken){
        return fetch( url + '/dashboard/total-case-by-state/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                startDate: '2018-01-01',
                endDate: '2018-01-01'
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    }
}

export default DashboardService;