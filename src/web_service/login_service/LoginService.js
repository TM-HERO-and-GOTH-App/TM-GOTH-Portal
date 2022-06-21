import axios from 'axios';
import Axios from "axios";

const url = process.env.REACT_APP_LOCAL_API_URL;
const devUrl = process.env.REACT_APP_DEV_API_KEY;
const prodUrl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY;

const LoginService = {
    requestToken(email) {
        return axios.post(devUrl + '/user/get-auth-token', {
            apiKey: apiKey,
            email: email
        })
            .then(res => { return res })
            .catch((err) => console.log(err));
    },

    signIn(authToken, email, password) {
        return axios.post(devUrl + '/login/sign-in', {
            'authToken': authToken,
            'email': email,
            'password': password
        })
            .then(res => {return res})
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

    getUserProfile(authToken) {
        return axios.post(devUrl + '/user/view-profile', {
            'authToken': authToken
        })
            .then(res => { return res })
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

    getSystemLOV(authToken) {
        return axios.post(devUrl + '/user/get-lov', {
            'authToken': authToken
        })
            .then(res => { return res })
            .catch((err) => console.log(err))
    }
}

export default LoginService;
