const baseUrl = 'https://hero.tm.com.my';

const ForgotPasswordService = {
    forgotPassword(email){
        let headers = { 'Content-Type': 'application/json; charset=utf-8' };

        return fetch(baseUrl + '/login/reset-password-code-request/', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json()).then(err => console.log(err))
    }
}

export default ForgotPasswordService;