import axios from 'axios';
import config from '../config'

const url = config;

const AnnouncementService = {
    getAllAnnouncement(authToken) {
        return axios.post(url + '/announcement/get-all-announcements',{
            authToken
        }).then(res => {return res}).catch(err => {return err});
    },

    getAnnouncementInfo(authToken, caseID) {
        return axios.post(url + '/announcement/get-announcement',{
            authToken: authToken,
            caseID: caseID
        }).then(data => {return data}).catch(err => {return err});
    },

    createNewAnnouncement(authToken, gID, title, bodyContent, tag){
        return axios.post(url + '/announcement/create-announcement', {
            authToken: authToken,
            gID: gID,
            title: title,
            bodyContent: bodyContent,
            tag: tag
        }).then(data => {return data}).catch(err => {return err});
    },

    editAnnouncement(authToken, announcementID, gID, title, content, tag, picture){
        return axios.post(url + '/announcement/update-announcement/',{
            'authToken': authToken, 
            'announcementID': announcementID, 
            'gID': gID, 
            'title': title, 
            'bodyContent': content, 
            'tag': tag, 
            'picture': picture
        }).then(data => {return data}).catch(err => {return err});
    }
}

export default AnnouncementService;