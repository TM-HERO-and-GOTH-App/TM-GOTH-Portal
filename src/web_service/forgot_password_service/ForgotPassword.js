import config from '../config'

const url = config
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ForgotPasswordService = {
    forgotPassword(email){
        return fetch(url + '/login/reset-password-code-request/', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json()).then(err => console.log(err))
    }
}

export default ForgotPasswordService;