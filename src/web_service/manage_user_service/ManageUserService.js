const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ManageUserService = {

    inviteToGroup(authToken, cToken, hToken){
        return fetch( url + '/chat/invite-user-to-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                hToken: hToken,
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    getAllUser(authToken, keyword){
        return fetch( url + '/user/view-all-profile/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                category: 'ALL',
                shID: 0,
                activationStatus: keyword
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    async getProfileByKeyword(authToken, keyword){
        return await fetch( url + '/user/get-profiles-by-keywords/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'keywords': keyword
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    async getProfileByGroup(authToken, shID){
        return await fetch( url + '/user/view-all-profile/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                category: 'STAKEHOLDER',
                shID: shID,
                activationStatus: 'Y'
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    setAsStakeholder(authToken, hToken, shID){
        return fetch( url + '/user/invite-to-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                hToken: hToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    unsetAsStakeholder(authToken, hToken, shID){
        return fetch( url + '/user/remove-from-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                hToken: hToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    setAsAdmin(authToken, hToken, shID){
        return fetch( url + '/user/set-stakeholder-admin/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                hToken: hToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    setAsAgent(authToken, hToken, shID){
        return fetch( url + '/user/invite-to-stakeholder/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                hToken: hToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    setAsCoordinator(authToken, hToken, shID){
        return fetch( url + '/user/set-stakeholder-coordinator/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                hToken: hToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    removeFromGroup(authToken, cToken, hToken){
        return fetch( url + '/chat/remove-user-from-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                hToken: hToken,
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },
}

export default ManageUserService;