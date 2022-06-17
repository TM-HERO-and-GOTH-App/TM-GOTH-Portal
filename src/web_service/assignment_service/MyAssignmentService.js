// import getApiPort from "../PortAPIDetector";
import Axios from 'axios';

const url = process.env.REACT_APP_LOCAL_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const AssignmentService = {
    viewCaseByOwner(authToken, hID, caseStatusID) {
        return Axios.post(url + '/case/view-cases-by-owner/', {
                'authToken': authToken,
                'hID': hID,
                'caseStatusID': caseStatusID
        }).then(data => { return data }).catch(err => console.log(err));
    },


    viewCaseByGroup(authToken, hID, shID, caseStatusID, caseTypeID = 0) {
        return Axios.post(url + '/case/view-cases-by-group', {
                'authToken': authToken,
                'hID': hID,
                'shID': shID,
                'caseStatusID': caseStatusID,
                'caseTypeID': caseTypeID
        }).then(data => { return data }).catch(err => console.log(err));
    },

    viewCaseByCollaborator(authToken, caseStatusID) {
        return fetch(url + '/case/view-cases-by-collaborator/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'caseStatusID': caseStatusID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },


    async viewUnassignedCase(authToken, shID) {
        return fetch(url + '/case/view-unassigned-cases/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'shID': shID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    }
}

export default AssignmentService;
