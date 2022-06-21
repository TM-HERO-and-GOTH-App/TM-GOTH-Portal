import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const devUrl = process.env.REACT_APP_DEV_API_KEY;

const ChatService = {
    getProfilesByGroupChat(authToken, cToken){
        return fetch( devUrl + '/chat/view-users-by-group/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    pullChatMessage(authToken, cToken, flag){
        return fetch( devUrl + '/chat/pull-message/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'authToken': authToken,
                'cToken': cToken,
                'flag': flag
            })
        }).then(res => res.json()).catch(err => console.log(err));
    },

    pushChatMessage(authToken, cToken, message, flag, fileName){
        return fetch( devUrl + '/chat/push-message/', {
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
    },

    async tempPullChatMessage(cToken) {
        return await axios.post(`http://localhost:80/icp_eai/evSTTRetrieveServiceAcct`).then(
            (res, err) => {
                if (err) return err
                console.log(res.data)
                return res.data
            })
    },
    async tempPushChatMessage(authToken, cToken, message, flag, fileName) {
        return Promise.resolve(undefined);
    },
    async tempGetProfilesByGroupChat(authToken, cToken) {
        return Promise.resolve(undefined);
    }
}

export default ChatService;
