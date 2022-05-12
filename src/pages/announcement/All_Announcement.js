import React, { useState } from "react";
import AnnouncementCard from "../../components/announcement/Announcement_Card";
import Layout from "../Layout";

export default function All_Announcement() {
    const [moreText, setMoreText] = useState(false);
    return (
        <Layout
            pageTitle="All Announcements"
            pageContent={
                <div style={{ margin: "10px 0 0 100px"}}>
                    <AnnouncementCard showMoreButton={() => setMoreText(!moreText)} showMore={moreText}/>
                </div>
            }
        />
    )
}