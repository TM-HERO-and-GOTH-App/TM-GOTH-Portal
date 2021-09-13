const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const MyAssignmentService = {
    viewCaseByOwner(authToken, caseStatusID){
        return fetch( url + '/case/view-cases-by-owner/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                caseStatusID: caseStatusID
            })
        }).then(res => res.json()).then(data => { return data }).catch(err => console.log(err));
    }
}

export default MyAssignmentService;