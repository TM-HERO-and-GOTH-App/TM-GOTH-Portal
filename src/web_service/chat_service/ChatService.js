const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ChatService = {

    getProfilesByGroupChat(authToken, cToken){
        return fetch( url + '/chat/view-users-by-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    pullChatMessage(authToken, cToken, flag){
        return fetch( url + '/chat/pull-message/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                flag: flag
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    pushChatMessage(authToken, cToken, message, flag, fileName){
        return fetch( url + '/chat/push-message/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                message: message,
                flag: flag,
                fileName: fileName
            })
        }).then(res => res.json()).catch(err => console.log(err));
    }
}

export default ChatService;