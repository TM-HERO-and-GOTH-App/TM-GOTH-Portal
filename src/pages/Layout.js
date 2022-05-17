import React, { useState } from 'react';
import img1 from '../images/avatars/user.jpg';
import img2 from '../images/avatars/avatar2.png';
import img3 from '../images/guardian.png';
import HeroIcon from '../images/icon.png';
import QuickSearchService from '../web_service/quick_search_service/QuickSearchService';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Layout(props) {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [myAssignmentDropDownOpen, setMyAssignmentDropDownOpen] = useState(false);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [groupDropDownOpen, setGroupDropDownOpen] = useState(false);
    const [allAssignmentDropDownOpen, setAllAssignmentDropDownOpen] = useState(false);
    const [manageUserDropDownOpen, setManageUserDropDownOpen] = useState(false);
    const [advanceSearch, setAdvanceSearch] = useState(false);
    const [searchInput, setUserInput] = useState('');
    const [setting, setSetting] = useState(false);
    const [showColorOption, setShowColorOption] = useState(false);
    const [fixedNavBar, setFixedNavBar] = useState(false);
    const [fixedSideBar, setSideNavBar] = useState(false);
    const [showMyAssignmentNavbarDropDown, setShowMyAssignmentNavBarDropDown] = useState(false);
    const [showGroupAssignmentNavbarDropDown, setShowGroupAssignmentNavBarDropDown] = useState(false);
    const [showAllAssignmentNavbarDropDown, setShowAllAssignmentNavBarDropDown] = useState(false);
    const [showManageUserNavbarDropDown, setShowManageUserNavBarDropDown] = useState(false);
    const [showAnnouncementDropDown, setShowAnnouncementDropDown] = useState(false);
    const [changeNavBarColor, setChangeNavBarColor] = useState('#438EB9');

    const clearsessionStorage = () => {
        sessionStorage.clear();
    }

    const quickSearchResult = (e) => {
        QuickSearchService.quickSearch(token, searchInput).then((res, err) => {
            console.log(res);
            if (err) {
                console.log(err);
                window.location.replace('/advance-search', { searchData: searchInput });
            } else {
                window.location.replace('/advance-search', { searchData: searchInput });
            }
        })
        e.preventDefault();
    }

    return (
        <div class={changeNavBarColor === "#222A2D" ? "skin-1" : "no-skin"}>
            <div id="navbar"
                 className={`navbar navbar-default navbar-collapse ace-save-state ${(fixedNavBar === true || fixedSideBar === true) ?
                     "navbar-fixed-top" : ""}`}>
                <div className="navbar-container ace-save-state" id="navbar-container">
                    <div className="navbar-header">
                        <a href="/" className="navbar-brand">
                            {/*<img src={HeroIcon} alt="hero-logo"/>*/}
                            <small>
                                HERO Portal
                            </small>
                        </a>
                        <button className="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
                            <span className="sr-only">Toggle user menu</span>
                            <Avatar alt="User's Photo" src={img1} />
                        </button>
                        <button className="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
                            <span className="sr-only">Toggle sidebar</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                    </div>
                    <div className="pull-right navbar-buttons navbar-header collapse navbar-collapse" role="navigation">
                        <ul className="nav ace-nav">
                            <li className={`light-blue dropdown-modal ${openUserModal ? "open" : ""}`}>
                                <a data-toggle="dropdown" href="#" className="dropdown-toggle" aria-expanded={` ${openUserModal ? "true" : "false"}`}>
                                    <Avatar className="profile-icon" sx={{ width: 48, height: 48 }} alt="User's Photo" src={img1} />
                                    <span className="user-info">
                    <small>Welcome,</small>
                                        {userData.fullName ? userData.fullName : 'User Name'}
                                        {/*<i className="ace-icon fa fa-caret-down" />*/}
                  </span>
                                    <ArrowDropDownIcon sx={{ width: 24, height: 24 }} className="dropdown-icon" />
                                </a>

                                <ul id="user-dropdown-menu" className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                                    <li>
                                        <a href="/user-profile">
                                            <i className="ace-icon fa fa-user" />
                                            My Profile
                                        </a>
                                    </li>

                                    {(userData.stakeholderName === 'RRT'
                                            || userData.stakeholderName === 'CSM'
                                            || userData.stakeholderName === 'Dr UNIFI') &&
                                        (
                                            <li>
                                                <a href="/create-case">
                                                    <i className="ace-icon fa fa-pencil" />
                                                    Create New Case
                                                </a>
                                            </li>
                                        )
                                    }

                                    <li className="divider" />
                                    <li>
                                        <a href="/login" onClick={clearsessionStorage}>
                                            <i className="ace-icon fa fa-power-off" />
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/*AdvancedSearch*/}
                    <nav role="navigation" className="navbar-menu pull-right collapse navbar-collapse">
                        <form className="navbar-form navbar-left form-search" role="search" onSubmit={quickSearchResult}>
                            <div className="form-group">
                                <input type="text" name="keywords" placeholder="search" style={{ width: 250 }} value={searchInput} onChange={(e) => setAdvanceSearch(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-mini btn-info2">
                                <i className="ace-icon fa fa-search icon-only bigger-110" />
                            </button>
                        </form>
                    </nav>
                </div>{/* /.navbar-container */}
            </div>

            <div className="main-container ace-save-state" id="main-container">

                <div id="sidebar" className={`sidebar h-sidebar navbar-collapse collapse ace-save-state ${fixedSideBar && "sidebar-fixed lower-highlight"}`}>
                    <div className="sidebar-shortcuts" id="sidebar-shortcuts" style={{ width: 150 }}>
                        <img src={img3} width={125} />
                    </div>{/* /.sidebar-shortcuts */}

                    <ul className="nav nav-list">
                        <li className={window.location.pathname === '/' ? 'active open hover' : 'hover'}>
                            <a href="/">
                                <i className="menu-icon fa fa-tachometer" />
                                <span className="nav_menu-item"> Dashboard </span>
                            </a>

                            <b class="arrow" />
                        </li>

                        <li className={window.location.href.indexOf("MyAssignments") > -1 ? 'active open hover' : 'hover'} onMouseOver={() => setMyAssignmentDropDownOpen(true)} onMouseLeave={() => setMyAssignmentDropDownOpen(false)}>
                            <a href="#">
                                <i className="menu-icon fa fa-list" />
                                <span className="menu-text"> My Assignments </span>
                                <b className="arrow fa fa-angle-down" onClick={() => setShowMyAssignmentNavBarDropDown(!showMyAssignmentNavbarDropDown)} />
                            </a>

                            <b className="arrow" />

                            {myAssignmentDropDownOpen &&
                                (
                                    <ul className={`submenu ${showMyAssignmentNavbarDropDown === true ? "nav-show" : "nav-hide"}`} style={{ display: showMyAssignmentNavbarDropDown ? "block" : "none" }}>
                                        <li className="hover">
                                            <a href="/MyAssignments-Assigned">
                                                <i className="menu-icon fa fa-caret-right" />
                                                Assigned Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover">
                                            <a href="/MyAssignments-Inprogress">
                                                <i className="menu-icon fa fa-caret-right" />
                                                In-Progress Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover">
                                            <a href="/MyAssignments-Closed">
                                                <i className="menu-icon fa fa-caret-right" />
                                                Closed Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>
                                    </ul>
                                )
                            }
                            <div className="scroll-track scroll-detached no-track scroll-thin scroll-margin scroll-visible" style={{ display: "none", top: "69px;", left: "183px;" }}>
                                <div className="scroll-bar" style={{ top: 0 }}></div>
                            </div>
                        </li>

                        <li className={window.location.href.indexOf("GroupAssignments") > -1 ? 'active open hover' : 'hover'} onMouseEnter={() => setGroupDropDownOpen(true)} onMouseLeave={() => setGroupDropDownOpen(false)}>
                            <a href="#">
                                <i className="menu-icon fa fa-list" />
                                <span className="menu-text"> Group Assignments </span>
                                <b className="arrow fa fa-angle-down" onClick={() => setShowGroupAssignmentNavBarDropDown(!showGroupAssignmentNavbarDropDown)} />
                            </a>

                            <b className="arrow" />

                            {groupDropDownOpen &&
                                <ul className={`submenu ${showGroupAssignmentNavbarDropDown === true ? "nav-show" : "nav-hide"}`} style={{ display: showGroupAssignmentNavbarDropDown ? "block" : "none" }}>
                                    <li className="hover">
                                        <a href="/GroupAssignments-Assigned">
                                            <i className="menu-icon fa fa-caret-right" />
                                            Assigned Cases
                                        </a>
                                        <b className="arrow" />
                                    </li>

                                    <li className="hover">
                                        <a href="/GroupAssignments-Closed">
                                            <i className="menu-icon fa fa-caret-right" />
                                            Closed Cases
                                        </a>
                                        <b className="arrow" />
                                    </li>
                                    <li className="hover"> {/* active */}
                                        <a href="/GroupAssignments-Inprogress">
                                            <i className="menu-icon fa fa-caret-right" />
                                            In-Progress Cases
                                        </a>
                                        <b className="arrow" />
                                    </li>

                                    <li className="hover">
                                        <a href="/GroupAssignments-Unassigned">
                                            <i className="menu-icon fa fa-caret-right" />
                                            <span style={{ color: 'red' }}>Unassigned Cases</span>
                                        </a>
                                        <b className="arrow" />
                                    </li>
                                </ul>
                            }
                        </li>

                        {(userData.hGroup !== 'SALES-TMP') &&
                            <li className={window.location.href.indexOf("AllAssignments") > -1 ? 'active open hover' : 'hover'} onMouseOver={() => setAllAssignmentDropDownOpen(true)} onMouseLeave={() => setAllAssignmentDropDownOpen(false)}>
                                <a href="#">
                                    <i className="menu-icon glyphicon glyphicon-globe" />
                                    <span className="menu-text"> ALL Assignments </span>
                                    <b className="arrow fa fa-angle-down" onClick={() => setShowAllAssignmentNavBarDropDown(!showAllAssignmentNavbarDropDown)} />
                                </a>

                                <b className="arrow" />

                                {allAssignmentDropDownOpen &&
                                    <ul className={`submenu ${showAllAssignmentNavbarDropDown === true ? "nav-show" : "nav-hide"}`} style={{ display: showAllAssignmentNavbarDropDown ? "block" : "none" }}>
                                        <li className="hover">
                                            <a href="/AllAssignments-Assigned">
                                                <i className="menu-icon fa fa-caret-right" />
                                                Assigned Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover">
                                            <a href="/AllAssignments-Closed">
                                                <i className="menu-icon fa fa-caret-right" />
                                                Closed Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover"> {/* active */}
                                            <a href="/AllAssignments-Inprogress">
                                                <i className="menu-icon fa fa-caret-right" />
                                                In-Progress Cases
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover">
                                            <a href="/AllAssignments-Unassigned">
                                                <i className="menu-icon fa fa-caret-right" />
                                                <span style={{ color: 'red' }}>Unassigned Cases</span>
                                            </a>
                                            <b className="arrow" />
                                        </li>
                                    </ul>}
                            </li>
                        }

                        {(userData.positionName === 'Admin') &&
                            <li className={window.location.href.indexOf("ManageUsers") > -1 ? 'active open hover' : 'hover'} onMouseOver={() => setManageUserDropDownOpen(true)} onMouseLeave={() => setManageUserDropDownOpen(false)}>
                                <a href="#">
                                    <i className="menu-icon fa fa-users" />
                                    <span className="menu-text"> Manage Users </span>
                                    <b className="arrow fa fa-angle-down" onClick={() => setShowManageUserNavBarDropDown(!showManageUserNavbarDropDown)} />
                                </a>

                                <b className="arrow" />

                                {manageUserDropDownOpen &&
                                    <ul className={`submenu ${showManageUserNavbarDropDown === true ? "nav-show" : "nav-hide"}`} style={{ display: showManageUserNavbarDropDown ? "block" : "none" }}>
                                        <li className="hover">
                                            <a href="/ManageUsers-RegisteredUser">
                                                <i className="menu-icon fa fa-caret-right" />
                                                ALL Registered User
                                            </a>
                                            <b className="arrow" />
                                        </li>

                                        <li className="hover">
                                            <a href="/ManageUsers-Groupmembers">
                                                <i className="menu-icon fa fa-caret-right" />
                                                My Group Members
                                            </a>
                                            <b className="arrow" />


                                        </li>
                                    </ul>
                                }
                            </li>
                        }

                        <li className={window.location.pathname === '/advance-search' ? 'active open hover' : 'hover'}>
                            <a href="/advance-search">
                                <i className="menu-icon glyphicon glyphicon-search" />
                                {/* You have to click the text to navigate to new page */}
                                <span className="menu-text"> Advanced Search </span>
                                <b className="arrow fa fa-angle-down" />
                            </a>
                        </li>

                        <li className={window.location.pathname === '/all_announcements' ? 'active open hover' : 'hover'}  onMouseOver={() => setShowAnnouncementDropDown(true)} onMouseLeave={() => setShowAnnouncementDropDown(false)}>
                            <a href="#">
                                <i className="menu-icon fa fa-users" />
                                <span className="menu-text">Announcement</span>
                                {/* Add open function for mobile view */}
                                <b className="arrow fa fa-angle-down" onClick={() => setShowAnnouncementDropDown(!showAnnouncementDropDown)}/>
                            </a>

                            <b className="arrow" />

                            {showAnnouncementDropDown && <ul className={`submenu ${showAnnouncementDropDown === true ? "nav-show" : "nav-hide"}`} style={{ display: showAnnouncementDropDown ? "block" : "none" }}>
                                <li className='hover'>
                                    <a href="/all_announcements">
                                        <i className="menu-icon fa fa-caret-right" />
                                        All Announcements
                                    </a>
                                    <b className="arrow" />
                                </li>

                                {/* TODO: To show to admin user only */}
                                <li className="hover">
                                    <a href="/announcement_form">
                                        <i className="menu-icon fa fa-caret-right" />
                                        Create Announcement
                                    </a>
                                    <b className="arrow" />
                                </li>
                            </ul>}
                        </li>
                    </ul>{/* /.nav-list */}
                </div>

                <div className="main-content">
                    <div className="main-content-inner">
                        <div className="page-content" >
                            <div className="ace-settings-container" id="ace-settings-container">
                                <div className="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn" onClick={() => setSetting(!setting)}>
                                    <i className="ace-icon fa fa-cog bigger-130" />
                                </div>

                                {/* Setting code begin Here */}
                                <div className={`ace-settings-box clearfix ${setting === true ? 'open' : ''} `} id="ace-settings-box">
                                    <div className="pull-left width-50">
                                        <div className="ace-settings-item">
                                            <div className="pull-left">
                                                <select className="hide" style={{ color: `${showColorOption}`, zIndex: 2000, display: 'inline' }}
                                                        onChange={(e) => setChangeNavBarColor(e.currentTarget.value)} value={changeNavBarColor}>
                                                    <option data-skin="no-skin" value="#438EB9">#438EB9</option>
                                                    <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                                                    {/*<option data-skin="skin-2" value="#C6487E">#C6487E</option>
												    <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>*/}
                                                </select>

                                                {/* Change NavBar color option here */}
                                                <div className={`dropdown dropdown-colorpicker ${showColorOption ? "open" : ""}`} onClick={() => setShowColorOption(!showColorOption)}>
                                                    <a className="dropdown-toggle" aria-expanded={showColorOption ? "true" : "false"}>
                                                        <span className="btn-colorpicker" style={{ backgroundColor: `${changeNavBarColor}` }} />
                                                    </a>
                                                    <ul className={`dropdown-menu dropdown-caret ${showColorOption ? "dropdown-caret:after" : "dropdown-caret:before"}`}>
                                                        <li onClick={() => setChangeNavBarColor('#438EB9')}>
                                                            <a className={`colorpick-btn ${changeNavBarColor == "#438EB9" ? "selected" : ""}`} style={{ backgroundColor: "#438EB9" }} data-color="#438EB9" href="#" />
                                                        </li>
                                                        <li onClick={() => setChangeNavBarColor('#222A2D')}>
                                                            <a className={`colorpick-btn  ${changeNavBarColor == "#222A2D" ? "selected" : ""}`} style={{ backgroundColor: "#222A2D" }} data-color="#222A2D" href="#" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* End of NavBar color option */}
                                            </div>
                                            <span>&nbsp; Choose Skin</span>
                                        </div>
                                        <div className="ace-settings-item">
                                            <input type="checkbox" className="ace ace-checkbox-2 ace-save-state" id="ace-settings-navbar" autoComplete="off" defaultChecked={fixedNavBar} onChange={() => setFixedNavBar(!fixedNavBar)} />
                                            <label className="lbl" htmlFor="ace-settings-navbar">Fixed Navbar</label>
                                        </div>
                                        <div className="ace-settings-item">
                                            <input type="checkbox" className="ace ace-checkbox-2 ace-save-state" id="ace-settings-sidebar" autoComplete="off" value={fixedSideBar} onChange={() => { setSideNavBar(!fixedSideBar); setFixedNavBar(!fixedNavBar) }} />
                                            <label className="lbl" htmlFor="ace-settings-sidebar">Fixed Sidebar</label>
                                        </div>
                                    </div>{/* /.pull-left */}
                                </div>{/* .ace-settings-box */}
                                {/* Setting code end here */}

                            </div>{/* /.ace-settings-container */}

                            <div class="page-header">
                                <h1>{props.pageTitle}</h1>
                            </div>{/* <!-- /.page-header --> */}

                            <div className="row">
                                <div className="col-xs-12">

                                    {/* PAGE CONTENT BEGINS */}
                                    <div className="alert alert-info visible-sm visible-xs">
                                        <button type="button" className="close" data-dismiss="alert">
                                            <i className="ace-icon fa fa-times"></i>
                                        </button>
                                        Please note that
                                        <span className="blue bolder">top menu style</span>
                                        is visible only in devices larger than
                                        <span className="blue bolder">991px</span>
                                        which you can change using CSS builder tool.
                                    </div>

                                    <div className="well well-sm visible-sm visible-xs">
                                        Top menu can become any of the 3 mobile view menu styles:
                                        <em>default</em>
                                        ,
                                        <em>collapsible</em>
                                        or
                                        <em>minimized</em>.
                                    </div>

                                    {/* BEGIN PAGE*/}

                                    {props.pageContent}

                                    {/* END PAGE*/}

                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.page-content */}
                    </div>
                </div>{/* /.main-content */}

                <br></br>
                <div className="footer">
                    <div className="footer-inner">
                        <div className="footer-content">
                            <div style={{ padding: 0 }}>
                                Copyright &copy; 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED</div>
                            <div style={{ padding: 0 }}>For the best viewing experience, please use either Mozilla Firefox or IE browser with resolution at 1280 x 800 pixels and above</div>
                        </div>
                    </div>
                </div>

                <a href="#" id="btn-scroll-up" className="btn-scroll-up btn btn-sm btn-inverse">
                    <i className="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
                </a>
            </div>{/* /.main-container */}
        </div>


    );
}


export default Layout;
