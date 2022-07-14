import Axios from 'axios';
import config from '../config'

const url = config
const apiKey = process.env.REACT_APP_API_KEY;

const LoginService = {
    requestToken(email) {
        return Axios.post(url + '/user/get-auth-token', {
            apiKey: apiKey,
            email: email
        })
            .then(res => { return res })
            .catch((err) => console.log(err));
    },

    ldapLogin(id, password){
        return Axios.post(url + '/login/test-promised-ldap-package',{
            username: id,
            password
        }).then(res => { return res.data }).catch(err => {return err})
    },

    signIn(authToken, email, password) {
        return Axios.post(url + '/login/sign-in', {
            'authToken': authToken,
            'email': email,
            'password': password
        })
            .then(res => {return res})
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

    getUserProfile(authToken) {
        return Axios.post(url + '/user/view-profile', {
            'authToken': authToken
        })
            .then(res => { return res })
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch(err => console.log(err))
    },

    getSystemLOV(authToken) {
        return Axios.post(url + '/user/get-lov', {
            'authToken': authToken
        })
            .then(res => { return res })
            .catch((err) => console.log(err))
    },

    validateAccount(eventName, userEmail, ldapEmail){
        return Axios.post(url + '/user/validate-account',{
            'apiKey': apiKey,
            'eventName': eventName,
            'userEmail': userEmail,
            'ldapEmail': ldapEmail
        }).then(res => { return res }).catch(err => { return err });
    }
}

export default LoginService;
