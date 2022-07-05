import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import AnnouncementService from '../../web_service/announcement_service/AnnouncementService';

export default function EditAnnouncementForm(props) {
    const lovData = sessionStorage.getItem('LovData');
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const userData = JSON.parse(sessionStorage.getItem('UserData'));
    const announcementID = useState(props.match.params.id);
    let [title, setTitle] = useState("");
    let [bodyContent, setBodyContent] = useState("");
    let [picture, setPicture] = useState("");
    let [announcementTag, setAnnouncementTag] = useState("1");
    let [announcement, setAnnouncement] = useState([]);

    useEffect(() => {
        const getAnnouncementInfo = () => {
            AnnouncementService.getAnnouncementInfo(token, announcementID[0]).then(res => {
                // console.log(announcementID)
                console.log(res.data[0])
                setTitle(res.data[0].TITLE);
                setBodyContent(res.data[0].BODY)
                setAnnouncement(res.data[0].TAG)
            })
        }

        getAnnouncementInfo();
    },[])
    
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

    const editAnnouncement = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you have finished edit?')) {
            AnnouncementService.editAnnouncement(token, announcementID[0], userData.hID, title, bodyContent, announcementTag, null)
                .then(res => {
                    console.log(res.data)
                    if(res.status === 200) return window.location = '/all_announcements'
                    if (res.status === 400) return alert('Error during edit announcement process!!');
                })
        }
    }

    return (
        <Layout
            pageTitle='Edit Announcement'
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
                        <form name="form" onSubmit={editAnnouncement}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name" style={{ width: '25%' }}>Title</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
                                                        <input className="input-sm" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} type="text" name="announcement_title" placeholder="Insert Title here" />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name">Announcement content</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
                                                        <textarea className="input-sm" value={bodyContent} onChange={(e) => setBodyContent(e.target.value)} style={{ width: '100%' }} name="announcement_body" placeholder="Insert announcement body here" />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="profile-info-row">
                                                <div className="profile-info-name">Picture</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
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
                            <button type='submit' className='btn btn-success'>Edit Case</button>
                        </form>
                    </div>
                </>
            }
        />
    )
}
