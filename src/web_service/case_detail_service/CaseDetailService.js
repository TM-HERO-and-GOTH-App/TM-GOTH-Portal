const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const CaseDetailService = {
    assignToMe(authToken, cToken) {
        return fetch(url + '/case/assign-to-me/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'cToken': cToken
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    assignToAgent(authToken, cToken, hID, shID) {
        return fetch(url + '/case/assign-to-support/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                ownerIDsupport: hID,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err))
    },

    async getHeroBuddyInfo( authToken, cToken ) {
        await fetch( url + '/case/get-herobuddy-info/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'cToken': cToken
            })
        })
            .then( res => res.json())
            .then( responseData => { return responseData})
            .catch( err => console.log(err))
    },

    transferOwnership(authToken, cToken, shID) {
        return fetch(url + '/case/transfer-ownership/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                shID: shID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    async reopenCase(authToken, cToken){
        return await fetch(url + 'case/reopen-case/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'cToken': cToken
            })
        }).then(res => res.json()).then(responseData => {return responseData}).catch(err => console.log(err))
    },

    async getCaseDetail(authToken, cToken) {
        try {
            const res = await fetch(url + '/case/view-case-detail/', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'authToken': authToken,
                    'cToken': cToken
                })
            });
            return await res.json();
        } catch (err) {
            return console.log(err);
        }
    },

    updateCaseInfo(authToken, cToken, caseTypeID, productNameID, packageName, serviceID, serviceAddress, srNum, ttNum, areaLocationID, actualCustomerName, segmentID) {
        return fetch(url + '/case/update-case-detail/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                caseTypeID: caseTypeID,
                productNameID: productNameID,
                packageName: packageName,
                serviceID: serviceID,
                serviceAddress: serviceAddress,
                srNum: srNum,
                ttNum: ttNum,
                areaLocationID: areaLocationID,
                actualCustomerName: actualCustomerName,
                segmentID: segmentID
            })
        }).then(res => res.json()).catch(err => console.log(err));
    }
}

export default CaseDetailService;