import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';

export default function EditAnnouncementForm() {
    const lovData = sessionStorage.getItem('LovData')
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

    return (
        <Layout
            pageTitle='Add New Announcement'
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
                        <form name="form">
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
                                                    <select className="chosen-select form-control" value={announcementTag} onChange={(e) => announcementTag(e.target.value)}>
                                                        <option value="first_option">First option</option>
                                                        <option value="second_option">Second option</option>
                                                        <option value="third_option">Third option</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
        />
    )
}
