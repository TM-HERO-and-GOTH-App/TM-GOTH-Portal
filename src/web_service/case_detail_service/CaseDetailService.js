import Axios from 'axios'

const url = process.env.REACT_APP_LOCAL_API_URL;
const headers = {'Content-Type': 'application/json; charset=utf-8'};

const CaseDetailService = {
    assignToMe(authToken, cToken) {
        return Axios.post(url + '/case/assign-to-me/', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    assignToAgent(authToken, cToken, hID, shID) {
        return Axios.post(url + '/case/assign-to-support/', {
            authToken: authToken,
            cToken: cToken,
            ownerIDsupport: hID,
            shID: shID
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    getHeroBuddyInfo(authToken, cToken) {
        return Axios.post(url + '/case/get-herobuddy-info', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    transferOwnership(authToken, cToken, shID) {
        return Axios.post(url + '/case/transfer-ownership/', {
            authToken: authToken,
            cToken: cToken,
            shID: shID
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    reopenCase(authToken, cToken) {
        return Axios.post(url + '/case/reopen-case/', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    getCaseDetail(authToken, cToken) {
        return Axios.post(url + '/case/get-case-detail', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    updateCaseInfo(authToken, cToken, caseTypeID, productNameID, packageName, serviceID, serviceAddress, srNum, ttNum, areaLocationID, actualCustomerName, segmentID) {
        return Axios.post(url + '/case/update-case-detail/', {
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
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }
}

export default CaseDetailService;
