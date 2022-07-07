import axios from 'axios';
import config from '../config';

const url = config;

const NextService = {
    checkNetworkOutage(requestID, serviceNumber){
        return axios.post(url + '/next/get-service-id', {
            RequestID: requestID,
            ServiceNo: serviceNumber
        }).then(data => {return data}).catch(err => {return err});
    }
}

export default NextService;