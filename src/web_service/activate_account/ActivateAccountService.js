const url = process.env.REACT_APP_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ActivateAccountService = {
    activateAccount(email, activationCode){
        return fetch( url + '/user/activate-account/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'email': email,
                'activationKey': activationCode
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default ActivateAccountService;