import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AnnouncementInfo(props) {
    const announcementID = useState(props.match.params.id);
    const token = JSON.parse(sessionStorage.getItem('userToken'))
    const [announcement, setAnnouncement] = useState([]);
    const [fetchingAPI, setFetchingAPI] = useState(true);

    useEffect(() => {
        axios.post('http://localhost:3001/announcement/get-announcement',{
            authToken: token,
            caseID: announcementID[0]
        }).then(res => {
            console.log(announcementID)
            console.log(res.data)
            setAnnouncement(res.data)
            setFetchingAPI(false);
        })
    }, [])
    return (
        <Layout
            pageTitle={announcement[0]?.TITLE}
            pageContent={
                <>
                    <div>
                        <Link className="btn btn-primary" to='/all_announcements'>
                            <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </Link>
                    </div>
                    <div className="space-6" />
                    <div>
                        <div>
                             <img src={announcement[0]?.PICTURE} alt="Announcement Picture"/>
                        </div>
                        <div>
                            <p>{announcement[0]?.BODY}</p>
                        </div>
                    </div>
                </>
            }
        />
    );
}

export default AnnouncementInfo;