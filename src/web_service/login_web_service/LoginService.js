const url = 'https://hero.tm.com.my';
const apiKEY = '32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const LoginWebservice = {
     requestToken(email) {
        console.log(email + ' token');

        return fetch(url + '/api-authentication/request-token', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                apiKey: apiKEY,
                email: email
            })
        })
            .then(res => res.json())
            .catch((res) => console.log(res));
    },

     signIn(authToken, email, password) {
        return fetch(url + '/login/sign-in/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch((res) => console.log(res))
    },

     getUserProfile(authToken) {
        return fetch(url + '/user/view-profile', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken
            })
        })
            .then(res => res.json())
            .then(responseData => {return responseData})
            //.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
            .catch((res) => console.log(res))
    },

    getSystemLOV(authToken) {
		return fetch(url + '/system/get-lov/', {
			method: 'POST',
            headers,
            body: JSON.stringify({
                authToken: authToken
            })
		})
			.then(res => res.json())
			//.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
			.catch((err) => console.log(err))
	}
}

export default LoginWebservice;