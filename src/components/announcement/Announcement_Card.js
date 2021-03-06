import React, { useState } from 'react';
import { GrMoreVertical } from 'react-icons/gr';
import { Link } from "react-router-dom";

export default function AnnouncementCard(props) {
    const [showMoreOption, setShowMoreOption] = useState(false);
    return (
        <>
            <div className='card'>
                <div className="pull-right navbar-buttons navbar-header collapse navbar-collapse" role="navigation" onClick={() => setShowMoreOption(toggleMoreButton => !toggleMoreButton)}>
                    <ul className='nav ace-nav'>
                        <li className={`dropdown-modal ${showMoreOption === false ? '' : "open"}`}>
                            <GrMoreVertical />
                            <ul id="user-dropdown-menu" className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                <li>
                                    <Link to={props.to}>
                                        Edit Announcement
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <div style={{border: "1px solid black", height: '25vh', marginTop: '5vh'}}>
                        <img src={props.src} alt="announcement_picture_here" height={'100%'}/>
                    </div>
                    <div>
                        <div style={{margin: "2.5vh 0"}}>
                            <h3>{props.title}</h3>
                        </div>
                        <div className='announcementBody'>
                            <div>
                                <p>{props.body}</p>
                            </div>
                            <div style={{ marginTop: "2.5%", display: "flex", flexDirection: "row-reverse" }}>
                                <h6>Publish by Editor's Name here</h6>
                            </div>
                            <div>
                                {
                                    props.showMoreButton
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
