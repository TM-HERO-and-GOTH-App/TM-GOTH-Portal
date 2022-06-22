import axios from 'axios';
import config from '../config'

const url = config

const UpdateProfileService = {
	updateAgentProfile(authToken, altMobileNum, nickName) {
		return axios.post(url + '/user/update-agent-profile/', {
			authToken: authToken,
			altMobileNum: altMobileNum,
			nickName: nickName,
		}).then(res => {
			return res
		}).catch(err => console.log(err))
	},

	uploadAvatar(authToken, blob) {
		return axios.post(url + '/user/update-avatar-picture/', {
			authToken: authToken,
			avatarPicture: blob
		}).then(res => {return res}).catch(err => console.log(err))
	}
}

export default UpdateProfileService;