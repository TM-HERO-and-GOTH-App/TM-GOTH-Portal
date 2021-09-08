const baseCaseUrl = 'https://hero.tm.com.my/case';

const CaseService = {
    createSubmit(authToken, customer_name, Mobile_NO, Case_Content, areaLocation, caseTypeID, productID, additionalRemark, herobuddyResponse) {
		let headers = { 'Content-Type': 'application/json; charset=utf-8' };

		return fetch(baseCaseUrl + '/submit', {
			method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                customerName: customer_name,
                mobileNum: Mobile_NO,
                caseContent: Case_Content,
                areaLocationID: areaLocation,
                flag: 'COMPLAINT',
                sourceID: 284,
                caseTypeID: caseTypeID,
                productID: productID,
                additionalRemark: additionalRemark,
                herobuddyResponse: herobuddyResponse
            })
		})
			.then(res => res.json())
            .then(data => { return data })
			.catch((err) => console.log(err));
	},

    createCase(authToken, customer_name, IC_NO, Mobile_NO, Case_Content,areaLocation,flag,sourceID) {
		let headers = { 'Content-Type': 'application/json; charset=utf-8' };

		return fetch(baseCaseUrl + '/create-from-app', {
			method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                customerName: customer_name,
                nricNum: IC_NO,
                mobileNum: Mobile_NO,
                caseContent: Case_Content,
                areaLocationID: areaLocation,
                flag: flag,
                sourceID: sourceID
            })
		})
			.then(res => res.json())
            .then(data => { return data })
			//.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
			.catch(err => console.log(err));
	},

    attachPicture(authToken, cToken, filename, geotag_longitude, geotag_latitude) {
		let headers = { 'Content-Type': 'application/json; charset=utf-8' };

		return fetch(baseCaseUrl + '/attach-picture', {
			method: 'POST',
            headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                fileName: filename,
                longitude: geotag_longitude,
                latitude: geotag_latitude
            })
		})
			.then(res => res.json())
			.catch((err) => console.log(err));
			//.catch((res: any) => Observable.throw(this.presentToast())
	}
}

export default CaseService;