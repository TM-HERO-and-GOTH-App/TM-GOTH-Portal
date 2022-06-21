import axios from 'axios';

const url = process.env.REACT_APP_LOCAL_API_URL;
const headers = {'Content-Type': 'application/json; charset=utf-8'};

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