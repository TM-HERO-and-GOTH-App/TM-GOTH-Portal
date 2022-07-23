import axios from 'axios';
import config from '../config';
import moment from 'moment';

const url = config;
let date = moment().format('YYYYMMDD')

const NextService = {
    checkNetworkOutage(serviceNumber){
        return axios.post(url + '/next/get-service-id', {
            RequestID: `HERO-${date}-0002`,
            ServiceNo: serviceNumber
        }).then(data => {return data}).catch(err => {return err});
    }
}

export default NextService;