import config from '../config'

const url = config

const CaseService = {
    createSubmit(authToken, customer_name, Mobile_NO, Case_Content, areaLocation, caseTypeID, productID, additionalRemark, herobuddyResponse) {
		return fetch(url + '/submit', {
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
			.catch((err) => console.log(err));
	},

    createCase(authToken, customer_name, IC_NO, Mobile_NO, Case_Content,areaLocation,flag,sourceID) {
		return fetch(url + '/create-from-app', {
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
			//.catch((res: any) => Observable.throw(alert('Oops, there\'s a problem connecting'))
			.catch(err => console.log(err));
	},

    attachPicture(authToken, cToken, filename, geotag_longitude, geotag_latitude) {
		return fetch(url + '/attach-picture', {
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