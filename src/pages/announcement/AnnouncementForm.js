import React, { useState } from 'react';
import Layout from '../Layout';
import AnnouncementService from '../../web_service/announcement_service/AnnouncementService';

function AnnouncementForm() {
    const lovData = JSON.parse(sessionStorage.getItem('LovData'));
    const userData = JSON.parse(sessionStorage.getItem('UserData'));
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const [title, setTitle] = useState("");
    const [bodyContent, setBodyContent] = useState("");
    const [picture, setPicture] = useState("");
    const [announcementTag, setAnnouncementTag] = useState("first_value");

    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
    };

    const createAnnouncement = (e) => {
        e.preventDefault();
        AnnouncementService.createNewAnnouncement(token, userData.hID, title, bodyContent, announcementTag)
        .then(res => console.log(res));
    }

    return (
        <Layout
            pageTitle='Add New Announcement'
            pageContent={
                <>
                    <form name="form" onSubmit={createAnnouncement}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name" style={{ width: '25%' }}>Title</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="announcementTitle">
                                                    <input className="input-sm" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} type="text" name="announcement_title" placeholder="Insert Title here" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">Announcement body</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="announcementBodyContent">
                                                    <textarea className="input-sm" value={bodyContent} onChange={(e) => setBodyContent(e.target.value)} style={{ width: '100%' }} type="text" name="announcement_body" placeholder="Insert announcement body here" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">Picture</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="picture">
                                                    <input className="input-sm" value={picture} onChange={(e) => setPicture(e.target.files[0])} style={{ width: '100%' }} type="file" name="announcement_picture" placeholder="Insert picture here" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="profile-info-row">
                                            <div className="profile-info-name">Tag</div>
                                            <div className="profile-info-value">
                                                <select className="chosen-select form-control" value={announcementTag} onChange={(e) => setAnnouncementTag(e.target.value)}>
                                                    <option value="1">First option</option>
                                                    <option value="2">Second option</option>
                                                    <option value="3">Third option</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-sm btn-success" type="submit">
                            <i className="ace-icon fa fa-save align-top bigger-125" />
                            Create New Announcement
                        </button>
                    </form>
                </>
            }
        />
    )
}

export default AnnouncementForm;
