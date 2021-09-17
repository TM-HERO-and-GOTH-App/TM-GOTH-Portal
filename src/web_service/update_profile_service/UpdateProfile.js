const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const UpdateProfileService = {
    updateAgentProfile(authToken, email, fullname, nricNumber, mobileNum, nickName, myStatus, stateID, divisionID, zoneID, teamID){
        return fetch( url + '/user/update-agent-profile/', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                authToken: authToken,
                email: email,
                fullName: fullname,
                nricNum: nricNumber,
                mobileNum: mobileNum,
                nickName: nickName,
                myStatus: myStatus,
                stateID: stateID,
                divisionID: divisionID,
                zoneID: 0,
                teamID: 0
            })
        })
    }
}

export default UpdateProfileService;