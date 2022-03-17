import getApiPort from "../PortAPIDetector";

const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const AssignmentService = {
    viewCaseByOwner(authToken, caseStatusID){
        return fetch( url + '/case/view-cases-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'caseStatusID': caseStatusID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err));
    },

    viewCaseByGroup(authToken, shID, caseStatusID, caseTypeID = 0){
        const groupCaseAPI =  url + '/case/view-cases-by-group/'
        return fetch(groupCaseAPI, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'shID': shID,
                'caseStatusID': caseStatusID,
                'caseTypeID': caseTypeID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err));
    },

    viewCaseByCollaborator(authToken, caseStatusID){
        return fetch( url + '/case/view-cases-by-collaborator/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'caseStatusID': caseStatusID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err))
    },

    viewUnassignedCase(authToken, shID){
        return fetch( url + '/case/view-unassigned-cases/', {
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