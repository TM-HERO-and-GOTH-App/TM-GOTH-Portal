// import getApiPort from "../PortAPIDetector";

const url = process.env.REACT_APP_API_URL;
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const AssignmentService = {
    async viewCaseByOwner(authToken, caseStatusID){
        return await fetch( url + '/case/view-cases-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'caseStatusID': caseStatusID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err));
    },

    async viewCaseByGroup(authToken, shID, caseStatusID, caseTypeID = 0){
        const groupCaseAPI =  url + '/case/view-cases-by-group/'
        return await fetch(groupCaseAPI, {
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

    async viewUnassignedCase(authToken, shID){
        return await fetch( url + '/case/view-unassigned-cases/', {
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
