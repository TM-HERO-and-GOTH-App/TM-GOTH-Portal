import Axios from 'axios'

const url = process.env.REACT_APP_LOCAL_API_URL;
const devUrl = process.env.REACT_APP_DEV_API_KEY;

const CaseDetailService = {
    assignToMe(authToken, gID, shID, cToken) {
        return Axios.post(devUrl + '/case/assign-to-me/', {
            authToken: authToken,
            gID: gID,
            shID: shID,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    assignToAgent(authToken, cToken, hID, shID) {
        return Axios.post(devUrl + '/case/assign-to-support/', {
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
        return Axios.post(devUrl + '/case/get-herobuddy-info', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    transferOwnership(authToken, cToken, shID) {
        return Axios.post(devUrl + '/case/transfer-ownership/', {
            authToken: authToken,
            cToken: cToken,
            shID: shID
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    reopenCase(authToken, gID, cToken) {
        return Axios.post(devUrl + '/case/reopen-case/', {
            authToken: authToken,
            gID: gID,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    getCaseDetail(authToken, cToken) {
        return Axios.post(devUrl + '/case/get-case-detail', {
            authToken: authToken,
            cToken: cToken
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    },

    updateCaseInfo(authToken, gID, cToken, caseTypeID, productNameID, packageName, serviceID, serviceAddress, srNum, ttNum, areaLocationID, actualCustomerName, segmentID, ckc, ckcNumber, loginID, stakeholderRef, extSysRef, areaCode, subAreaID, symptomID) {
        return Axios.post(devUrl + '/case/update-case-info', {
            authToken: authToken,
            gID: gID,
            cToken: cToken,
            caseTypeID: caseTypeID,
            productNameID: productNameID,
            packageName: packageName,
            serviceID: serviceID,
            serviceAddress: serviceAddress,
            srNum: srNum,
            ttNum: ttNum,
            areaLocationID: areaLocationID,
            customerName: actualCustomerName,
            segmentID: segmentID,
            ckc:ckc,
            ckcNumber: ckcNumber,
            loginID: loginID,
            stakeholderRef: stakeholderRef,
            extSysRef: extSysRef,
            areaCode: areaCode,
            subAreaID: subAreaID,
            symptomID: symptomID
        }).then(res => {
            return res
        }).catch(err => {
            return err
        })
    }
}

export default CaseDetailService;
