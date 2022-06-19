import axios from 'axios';
import Axios from "axios";

const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const LoginService = {
     requestToken(email) {
        console.log(email + ' token');

        return fetch(url + '/api-authentication/request-token/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                apiKey: apiKey,
                email: email
            })
        })
            .then(res => res.json())
            .catch((err) => console.log(err));
    },

     signIn(authToken, email, password) {
        return fetch(url + '/login/sign-in/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'email': email,
                'password': password
            })
        })
            .then(res => res.json())
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

     getUserProfile(authToken) {
        return fetch(url + '/user/view-profile', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken
            })
        })
            .then(res => res.json())
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

    getSystemLOV(authToken) {
		return Axios.post('http://localhost' + '/user/get-lov/', {
                'authToken': authToken
            })
			.then(res => { return res })
			//.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
			.catch((err) => console.log(err))
	}
}

export default LoginService;
