const baseCaseUrl = 'https://hero.tm.com.my/case';

const CaseService = {
    createSubmit(authToken, customer_name, Mobile_NO, Case_Content, areaLocation, caseTypeID, productID, additionalRemark, herobuddyResponse) {
		let headers = { 'Content-Type': 'application/json; charset=utf-8' };

		return fetch(baseCaseUrl + '/submit', {
			method: 'POST',
            headers,
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
			.catch((err) => console.log(err));
	},

    attachPicture(authToken, cToken, filename, geotag_longitude, geotag_latitude) {
		let headers = { 'Content-Type': 'application/json; charset=utf-8' };

		return fetch(this.baseCaseUrl + '/attach-picture', {
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