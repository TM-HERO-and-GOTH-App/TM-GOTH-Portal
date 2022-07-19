// ATTENTION: If you want to use Axios, you can look at Dashboard Service and look for
// 'getTotalCaseByGroup'. That will be an example if you want to use Axios to call the API.
import Axios from 'axios';
import config from '../config'

const url = config

const ActionTakenService = {
    getActionRemarkLists(authToken, gID, cToken) {
        return Axios.post(url + '/case/get-action-remark-list', {
            'authToken': authToken,
            'gID': gID,
            'cToken': cToken
        }).then(res => { return res }).catch(err => console.log(err));
    },

    setRemark(authToken, cToken, gID, caseStatusID, closureTypeID, remark) {
        return Axios.post(url + '/case/update-action-remark', {
            'authToken': authToken,
            'cToken': cToken,
            'gID': gID,
            'closureTypeID': closureTypeID,
            'caseStatusID': caseStatusID,
            'actionRemark': remark
        }).then(res => { return res }).catch(err => {
            console.log(err)
            return err
        });
    }
}

export default ActionTakenService
