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

	pullChatMessage(authToken, cToken, flag) {
		return Axios.post(url + '/chat/pull-message/', {
			'authToken': authToken,
			'cToken': cToken,
			'flag': flag
		}).then(res => {
			return res
		}).catch(err => console.log(err));
	},

	pushChatMessage(authToken, cToken, message, flag, fileName) {
		return Axios.post(url + '/chat/push-message/', {
				authToken: authToken,
				cToken: cToken,
				message: message,
				flag: flag,
				fileName: fileName
		}).then(res => {return res}).catch(err => console.log(err));
	},

	async tempPullChatMessage(cToken) {
		return await Axios.post(`http://localhost:80/icp_eai/evSTTRetrieveServiceAcct`).then(
				(res, err) => {
					if (err) return err
					console.log(res.data)
					return res.data
				})
	},
	async tempPushChatMessage(authToken, cToken, message, flag, fileName) {
		return Promise.resolve(undefined);
	},
	async tempGetProfilesByGroupChat(authToken, cToken) {
		return Promise.resolve(undefined);
	}
}

export default ChatService;
