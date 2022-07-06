import React, { useState, useEffect } from "react";
import AnnouncementCard from "../../components/announcement/Announcement_Card";
import Layout from "../Layout";
import defaultUserLogo from '../../images/avatars/default.jpg';
import { Link } from "react-router-dom";
import AnnouncementService from "../../web_service/announcement_service/AnnouncementService";

export default function All_Announcement() {
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const [moreText, setMoreText] = useState(false);
    const [showEditMenu, setShowEditMenu] = useState(null);
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const getAllAnnouncements = () => {
            AnnouncementService.getAllAnnouncement(token).then(res => {
                if (res.statusText === 'OK') {
                    console.log(res)
                    setAllAnnouncements(res.data);
                }
            });
        }
        getAllAnnouncements()
    }, [token])
    return (
        <Layout
            pageTitle="All Announcements"
            pageContent={
                <div className="announcementView">
                    {allAnnouncements === [] ?
                        <h3 style={{ color: 'red' }}>Announcement is empty</h3>
                        :
                        allAnnouncements.map((data, index) => (
                            <AnnouncementCard
                                key={index}
                                to={`/edit_announcement_form/${data.ANNOUNCEMENT_ID}`}
                                src={data?.PICTURE == null ? { defaultUserLogo } : data?.PICTURE}
                                title={data?.TITLE}
                                body={data.BODY.length > 100 ? data?.BODY.substring(0, 100) + '...' : data?.BODY}
                                showMoreButton={
                                    data.BODY.length > 100 &&
                                    <Link to={`/more_announcement/${data.ANNOUNCEMENT_ID}`}>show more</Link>
                                }
                            />
                        ))
                    }
                </div>
            }
        />
    )
}