const baseCaseUrl = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const ChatService = {
    pullChatMessage(authToken, cToken, flag){
        return fetch( baseCaseUrl + '/chat/pull-message/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                cToken: cToken,
                flag: flag
            })
        }).then(res => res.json()).catch(err => console.log(err));
    }
}

export default ChatService;