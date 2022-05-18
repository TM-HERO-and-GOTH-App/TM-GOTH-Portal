const AuthService = {
        baseAuthUrl: 'https://hero.tm.com.my',
        apiIDMUrl: 'http://qrex.tm.com.my/api',
        apiKey: '32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt',

        constructor(baseAuthUrl, apiIDMUrl) {
                this.baseAuthUrl = baseAuthUrl;
                this.apiIDMUrl = apiIDMUrl;
        },

        getAuthToken(email) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                console.log(email + ' token');

                return fetch(this.baseAuthUrl + '/api-authentication/request-token/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                apiKey: '32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt',
                                email: email,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return responseData[0]['authToken']  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        getSystemLoV(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/system/get-lov/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                        })
                })
                        .then(res => res.json())
                        .catch(err => console.log(err))
        },

        forgotpassword(email) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/login/reset-password-code-request/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                email: email,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        resetPassword(email, resetKey, password, password2) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/login/reset-password/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                email: email,
                                resetKey: resetKey,
                                password: password,
                                passwprd2: password2,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        signUp(email, fullname, password, password2, mobilenum) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/sign-up/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                apiKey: '32c70cb3-7381-e2ef-ad1f-b5a61964d408-cxt',
                                email: email,
                                fullName: fullname,
                                password: password,
                                passwprd2: password2,
                                mobileNum: mobilenum,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        activateAccount(email, activationKey) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/activate-account/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                email: email,
                                activationKey: activationKey,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        signIn(authToken, email, password) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/activate-account/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                email: email,
                                password: password
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },



        signOut(authToken, email) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/login/sign-out/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                email: email,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json['response'] == 'OK'  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        getUserProfile(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/view-profile/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                        })
                })
                        .then(res => res.json())
                        .catch(err => console.log(err))
        },

        getTotalResolvedByAgent(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/total-resolved-within-days-by-agent/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                days: '5',
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['total']  //follow the php to return
                        })
                        .catch(err => console.log(err))
        },


        getTotalResolvedByGroup(authToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/total-resolved-within-days-by-group/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                shID: shID,
                                days: '5',
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['total']   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        getTotalCaseByAgent(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/get-total-case-by-owner/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        getTotalCaseByGroup(authToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/get-total-case-by-stakeholder/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        viewCasesByOwner(authToken, caseStatusID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/view-cases-by-owner/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                caseStatusID: caseStatusID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        viewCasesByGroup(authToken, shID, caseStatusID, caseTypeID = 0) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/view-cases-by-group/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                shID: shID,
                                caseStatusID: caseStatusID,
                                caseTypeID: caseTypeID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        viewUnassignedCases(authToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/view-unassigned-cases/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        viewCasesByCollaborator(authToken, caseStatusID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/view-cases-by-collaborator/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                caseStatusID: caseStatusID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        getDetailCase(authToken, cToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/view-case-detail/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                        })
                })
                        .then(res => res.json())
                        .catch(err => console.log(err))
        },

        getActionRemarkList(authToken, cToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/get-action-remark-list/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        pullChatMessage(authToken, cToken, flag) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/chat/pull-message/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                flag: flag,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return
                        })
                        .catch(err => console.log(err))
        },

        assignToMe(authToken, cToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/assign-to-me/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                        })
                })
                        .then(res => res.json())
                        .catch(err => console.log(err))
        },

        setRemark(authToken, cToken, remark, caseStatusID, ctID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/update-case-status/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                remark: remark,
                                caseStatusID: caseStatusID,
                                ctID: ctID,
                        })
                })
                        .then(res => res.json())
                        .catch(err => console.log(err))
        },

        pushMessage(authToken, cToken, message, flag, filename) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/chat/push-message/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                message: message,
                                flag: flag.toUpperCase(),
                                fileName: filename,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        getProfilesByGroup(authToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/view-all-profile/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                category: 'STAKEHOLDER',
                                shID: shID,
                                activationStatus: 'Y',
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))

        },

        getAllUser(authToken, keywords) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/view-all-profile/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                category: 'ALL',
                                shID: '0',
                                activationStatus: keywords,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        transferOwnership(authToken, cToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/transfer-ownership/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        assignToAgent(authToken, cToken, hID, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/assign-to-support/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                ownerIDsupport: hID,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        advancedSearch(authToken, keyFullname, keyEmail, keyNricNum, keySrNum, keyTtNum, keyCaseNum, keyVipName, keyCustomerName) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/advanced-search/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                fullname: keyFullname,
                                email: keyEmail,
                                nricNum: keyNricNum,
                                srNum: keySrNum,
                                ttNum: keyTtNum,
                                caseNum: keyCaseNum,
                                vipName: keyVipName,
                                customerName: keyCustomerName,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        quickSearch(authToken, keywords) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/get-cases-by-keywords/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                keywords: keywords,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        getProfilesByGroupChat(authToken, cToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/chat/view-users-by-group/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))

        },

        inviteToGroup(authToken, cToken, hToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/chat/invite-user-to-group/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                hToken: hToken,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))

        },

        removeFromGroup(authToken, cToken, hToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/chat/remove-user-from-group/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                cToken: cToken,
                                hToken: hToken,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        updateCaseInfo(authToken, cToken, caseTypeID, productNameID, packageName, serviceID, serviceAddress, srNum, ttNum, areaLocationID, actualCustomerName, segmentID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/update-case-detail/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
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
                                segmentID: segmentID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        setAsStakeholder(authToken, hToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/invite-to-stakeholder/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                hToken: hToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        unsetFromStakeholder(authToken, hToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/remove-from-stakeholder/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                hToken: hToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        setAsAdmin(authToken, hToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/set-stakeholder-admin/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                hToken: hToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        setAsAgent(authToken, hToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/invite-to-stakeholder/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                hToken: hToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        setascoordinator(authToken, hToken, shID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/set-stakeholder-coordinator/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                hToken: hToken,
                                shID: shID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        getProfilesByKeywords(authToken, keyword) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/get-profiles-by-keywords/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                keyword: keyword,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        uploadavatar(authToken, blob) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/update-avatar-picture/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                avatarPicture: blob,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        updateAgentProfile(authToken, fullName, nricNum, mobileNum, nickName, myStatus, stateID, divisionID, zoneID, teamID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/user/update-agent-profile/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                email: email,
                                fullName: fullName,
                                nricNum: nricNum,
                                mobileNum: mobileNum,
                                nickName: nickName,
                                myStatus: 'Available',//$inputs['myStatus'],
                                stateID: stateID,
                                divisionID: divisionID,
                                zoneID: '0',//$inputs['zoneID'],
                                teamID: '0',//$inputs['teamID']
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        getTotalRegisteredUserByState(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/dashboard/total-hero-by-state/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                startDate: '2018-01-01',
                                endDate: '2018-01-01',
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        getTotalCaseByState(authToken) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/dashboard/total-case-by-state/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                startDate: '2018-01-01',
                                endDate: '2018-01-01',
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        },

        insertNewCase(authToken, customerName, nricNum, mobileNum, caseContent, areaLocationID, flag, sourceID, subSourceID, caseTypeID) {
                let headers = { 'Content-Type': 'application/json; charset=utf-8' };
                return fetch(this.baseAuthUrl + '/case/create-from-portal/', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({
                                authToken: authToken,
                                customerName: customerName,
                                nricNum: nricNum,
                                mobileNum: mobileNum,
                                caseContent: caseContent,
                                areaLocationID: areaLocationID,
                                flag: 'COMPLAINT',
                                sourceID: sourceID,
                                subSourceID: subSourceID,
                                caseTypeID: caseTypeID,
                        })
                })
                        .then(res => res.json())
                        .then(responseData => {
                                console.log(responseData)
                                return json[0]['response'] == 'FAILED'   //follow the php to return//
                        })
                        .catch(err => console.log(err))
        }
}


export default AuthService;