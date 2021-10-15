// ATTENTION: If you want to use Axios, you can look at Dashboard Service and look for 
// 'getTotalCaseByGroup'. That will be an example if you want to use Axios to call the API.

const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ActionTakenService = {
    getActionRemarkLists(authToken, cToken){
        return fetch( url + '/case/get-action-remark-list/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    setRemark(authToken, cToken, remark, caseStatusID, ctID){
        return fetch( url + '/case/update-case-status/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                ctID: ctID,
                caseStatusID: caseStatusID,
                remark: remark
            })
        }).then(res => res.json()).catch(err => console.log(err));
    }
}

export default ActionTakenService