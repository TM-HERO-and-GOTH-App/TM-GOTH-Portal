import React, {useEffect} from 'react';

function Test(){
    const getAPI = () => {
        fetch('http://10.14.66.101:7001/iCareEAI_Sync_VTC_AVAYA_App_war/AVYGetHttpMessageReceiver.do?XMLMessage=<?xml version="1.0" encoding="UTF-8" standalone="no"?>',{
            method: 'POST',
            // mode:'no-cors',
            header: {'Content-Type': 'application/xml; charset=utf-8'},
            body: JSON.stringify({
                'ServiceNo': '00909600352',
                'FaultCode':'NOTONE',
                'MobileNum':'0103590829'
            })
        }).then(res => console.log(res)).catch(err => console.log(err))
    }
    // useEffect(() => {

    //     getAPI();
    // }, [])

    return(
        <div>
            <h1>This is a testing page.</h1>
            <button onClick={getAPI}>Call API</button>
        </div>
        
    )
}

export default Test;