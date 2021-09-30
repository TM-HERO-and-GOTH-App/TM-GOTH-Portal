const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const CaseDetailService = {
    assignToMe(authToken, cToken){
        return fetch( url + '/case/assign-to-me/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    assignToAgent(authToken, cToken, hID, shID){
        return fetch( url + '/case/assign-to-support/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                ownerIDsupport: hID,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    getCaseDetail(authToken, cToken){
        return fetch( url + '/case/view-case-detail/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default CaseDetailService;