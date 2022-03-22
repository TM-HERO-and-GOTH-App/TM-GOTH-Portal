const url = 'https://hero.tm.com.my';
const apiKey = '32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt';

const SignupService = {
    signup(email, fullName, password, password2, mobileNum){
        let headers = { 'Content-Type': 'application/json; charset=utf-8' };

        return fetch(url + '/user/sign-up/', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                'apiKey': apiKey,
                'email': email,
                'fullName': fullName,
                'password': password,
                'password2': password2,
                'mobileNum': mobileNum
            })
        }).then((res) => res.json()).catch((err) => console.log(err));
    }
}   

export default SignupService;