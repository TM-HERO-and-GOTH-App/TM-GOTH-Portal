import axios from 'axios';

const url = process.env.REACT_APP_LOCAL_API_URL;
const headers = {'Content-Type': 'application/json; charset=utf-8'};

const ManageUserService = {

    inviteToGroup(authToken, gID, hToken, shID) {
        return axios.post(url + '/user/invite-to-stakeholder-group', {
                authToken: authToken,
                gID: gID,
                gToken: hToken,
                shID: shID
        }).then(res => {return res}).catch(err => console.log(err));
    },

	getAllUser(authToken, gID, category, shID, keyword) {
		return axios.post(url + '/user/view-all-user', {
			authToken: authToken,
			gID: gID,
			category: category,
			shID: shID,
			activationStatus: keyword
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	},

	getProfileByGroup(authToken, shID) {
		return axios.post(url + '/user/view-all-user', {
			authToken: authToken,
			category: 'STAKEHOLDER',
			shID: shID,
			activationStatus: 'Y'
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	},

	getProfileByKeyword(authToken, gID, keyword) {
		return axios.post(url + '/user/get-user-profile-by-keyword', {
			'authToken': authToken,
			'gID': gID,
			'keyword': keyword
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	}
	,

	setAsStakeholder(authToken, hToken, shID) {
		return fetch(url + '/user/invite-to-stakeholder/', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				authToken: authToken,
				hToken: hToken,
				shID: shID
			})
		}).then(res => res.json()).catch(err => console.log(err));
	}
	,

	unsetAsStakeholder(authToken, hToken, shID) {
		return fetch(url + '/user/remove-from-stakeholder/', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				authToken: authToken,
				hToken: hToken,
				shID: shID
			})
		}).then(res => res.json()).catch(err => console.log(err));
	}
	,

	setAsAdmin(authToken, hToken, shID) {
		return fetch(url + '/user/set-stakeholder-admin/', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				authToken: authToken,
				hToken: hToken,
				shID: shID
			})
		}).then(res => res.json()).catch(err => console.log(err));
	}
	,

	setAsAgent(authToken, hToken, shID) {
		return fetch(url + '/user/invite-to-stakeholder/', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				authToken: authToken,
				hToken: hToken,
				shID: shID
			})
		}).then(res => res.json()).catch(err => console.log(err));
	}
	,

    removeFromGroup(authToken, gID, gToken, shID) {
        return axios.post(url + '/user/remove-from-stakeholder-group', {
                authToken: authToken,
                gID: gID,
                cToken: gToken,
                shID: shID,
                action: 'UNSET'
        }).then(res => {return res}).catch(err => console.log(err));
    },
}

export default ManageUserService;
