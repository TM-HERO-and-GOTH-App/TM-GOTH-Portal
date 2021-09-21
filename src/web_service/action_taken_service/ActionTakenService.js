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
    }
}

export default ActionTakenService