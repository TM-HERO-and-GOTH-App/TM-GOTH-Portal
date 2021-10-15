const url = 'https://hero.tm.com.my';
const headers = { 'Content-Type': 'application/json; charset=utf-8' };

const QuickSearchService = {
    quickSearch(authToken, keywords){
        return fetch( url + '/case/get-cases-by-keywords/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                authToken: authToken,
                keywords: keywords
            })
        }).then(res => res.json()).catch(err => console.log(err))
    }
}

export default QuickSearchService;