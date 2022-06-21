// ATTENTION: If you want to use Axios, you can look at Dashboard Service and look for 
// 'getTotalCaseByGroup'. That will be an example if you want to use Axios to call the API.
import axios from 'axios';

const prodUrl = process.env.REACT_APP_API_URL;
const localUrl = process.env.REACT_APP_LOCAL_API_URL;
const devUrl = process.env.REACT_APP_DEV_API_URL;

const ActionTakenService = {
    getActionRemarkLists(authToken, gID, cToken) {
        return axios.post(devUrl + '/case/get-action-remark-list', {
            'authToken': authToken,
            'gID': gID,
            'cToken': cToken
        }).then(res => { return res }).catch(err => console.log(err));
    },

    setRemark(authToken, cToken, gID, caseStatusID, closureTypeID, remark) {
        return axios.post(devUrl + '/case/update-action-remark', {
            'authToken': authToken,
            'cToken': cToken,
            'gID': gID,
            'closureTypeID': closureTypeID,
            'caseStatusID': caseStatusID,
            'actionRemark': remark
        }).then(res => { return res }).catch(err => console.log(err));
    }
}

export default ActionTakenService