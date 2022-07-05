import Axios from 'axios';
import config from '../config'

const url = config

const ChatService = {
	getProfilesByGroupChat(authToken, cToken) {
		return Axios.post(url + '/chat/view-users-by-group/', {
			authToken: authToken,
			cToken: cToken
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	},

	pullChatMessage(authToken, cID) {
		return Axios.post(url + '/chat/pull-message', {
			'authToken': authToken,
			'cID': cID
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	},

	pushChatMessage(authToken, cID, message, gID) {
		return Axios.post(url + '/chat/push-message', {
				authToken: authToken,
				cID: cID,
				message: message,
				source: 'GOTH',
				userID: gID,
				fileName: null
		}).then(res => {return res}).catch(err => console.log(err));
	}
}

export default ChatService;
