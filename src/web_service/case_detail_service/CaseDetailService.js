const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const CaseDetailService = {
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