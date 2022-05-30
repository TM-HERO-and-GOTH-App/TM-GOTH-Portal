const url = process.env.REACT_APP_API_URL;
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
        }).then(res => res.json()).catch(err => console.log(err))
    },

    uploadAvatar(authToken, blob){
        return fetch( url + '/user/update-avatar-picture/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                avatarPicture: blob
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default UpdateProfileService;