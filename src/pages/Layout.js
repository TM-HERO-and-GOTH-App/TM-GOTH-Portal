import React, { useState } from 'react';
import { CustomPicker } from 'react-color';
import img1 from '../images/avatars/user.jpg';
import img2 from '../images/avatars/avatar2.png';
import img3 from '../images/guardian.png';
import QuickSearchService from '../web_service/quick_search_service/QuickSearchService';

function Layout(props) {
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [myAssignmentDropDownOpen, setMyAssignmentDropDownOpen] = useState(false);
  const [collaborationDropdown, setCollaborationDropDown] = useState(false);
  const [groupDropDownOpen, setGroupDropDownOpen] = useState(false);
  const [allAssignmentDropDownOpen, setAllAssignmentDropDownOpen] = useState(false);
  const [manageUserDropDownOpen, setManageUserDropDownOpen] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [searchInput, setUserInput] = useState('');
  const [setting, setSetting] = useState(false);
  const [showColorOption, setShowColorOption] = useState(false);
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
      <div id="navbar" className="navbar navbar-default navbar-collapse ace-save-state">
        <div className="navbar-container ace-save-state" id="navbar-container">
          <div className="navbar-header pull-left">
            <a href="/" className="navbar-brand">
              <small>
                HERO Portal
              </small>
            </a>
            <button className="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
              <span className="sr-only">Toggle user menu</span>
              <img src={img1} alt="User's Photo" />
            </button>
            <button className="pull-right navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#sidebar">
              <span className="sr-only">Toggle sidebar</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="navbar-buttons navbar-header pull-right  collapse navbar-collapse" role="navigation">
            <ul className="nav ace-nav">
              <li className="light-blue dropdown-modal">
                <a data-toggle="dropdown" href="#" className="dropdown-toggle">
                  <img className="nav-user-photo" src={img2} alt="User's Photo" />
                  <span className="user-info">
                    <small>Welcome,</small>
                    {userData.fullName ? userData.fullName : 'User Name'}
                  </span>
                  <i className="ace-icon fa fa-caret-down" />
                </a>

                <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                  {/*<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										Settings
									</a>
								</li>*/}
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

          <nav role="navigation" className="navbar-menu pull-right collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {/* <li>
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								Overview &nbsp;
								<i class="ace-icon fa fa-angle-down bigger-110"></i>
							</a>

							<ul class="dropdown-menu dropdown-light-blue dropdown-caret">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-eye bigger-110 blue"></i>
										Monthly Visitors
									</a>
								</li>

								<li>
									<a href="#">
										<i class="ace-icon fa fa-user bigger-110 blue"></i>
										Active Users
									</a>
								</li>

								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog bigger-110 blue"></i>
										Settings
									</a>
								</li>
							</ul>
						</li>

						<li>
							<a href="#">
								<i class="ace-icon fa fa-envelope"></i>
								Messages
								<span class="badge badge-warning">5</span>
							</a>
						</li> */}
            </ul>

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

        <div id="sidebar" className="sidebar h-sidebar navbar-collapse collapse ace-save-state">
          <div className="sidebar-shortcuts" id="sidebar-shortcuts" style={{ width: 150 }}>
            <img src={img3} width={125} />
          </div>{/* /.sidebar-shortcuts */}

          <ul className={`nav nav-list ${changeNavBarColor === '#222A2D' ? 'skin-1' : ''} `}>
            <li className={window.location.pathname === '/' ? 'active open hover' : 'hover'}>
              <a href="/">
                <i className="menu-icon fa fa-tachometer" />
                <span className="nav_menu-item"> Dashboard </span>
              </a>

              <b class="arrow" />
            </li>

            <li className={window.location.href.indexOf("MyAssignments") > -1 ? 'active open hover' : 'hover skin-1'} onMouseOver={() => setMyAssignmentDropDownOpen(true)} onMouseLeave={() => setMyAssignmentDropDownOpen(false)}>
              <a href="/MyAssignments-Assigned">
                <i className="menu-icon fa fa-list" />
                <span className="menu-text"> My Assignments </span>
                <b className="arrow fa fa-angle-down" />
              </a>

              <b className="arrow" />

              {myAssignmentDropDownOpen &&
                (
                  <ul className="submenu">
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

            </li>

            {/* <li className={window.location.href.indexOf("MyCollaboration") > -1 ? 'active open hover' : 'hover'} onMouseOver={() => setCollaborationDropDown(true)} onMouseLeave={() => setCollaborationDropDown(false)}>
              <a href="/MyCollaboration-Assigned">
                <i className="menu-icon fa fa-list" />
                <span className="menu-text"> My Collaboration </span>
                <b className="arrow fa fa-angle-down" />
              </a>

              <b className="arrow" />

              {collaborationDropdown &&
                <ul className="submenu">
                  <li className="hover">
                    <a href="/MyCollaboration-Assigned">
                      <i className="menu-icon fa fa-caret-right" />
                      Assigned Cases
                    </a>
                    <b className="arrow" />
                  </li>

                  <li className="hover">
                    <a href="/MyCollaboration-Inprogress">
                      <i className="menu-icon fa fa-caret-right" />
                      In-Progress Cases
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>
              }

            </li> */}

            <li className={window.location.href.indexOf("GroupAssignments") > -1 ? 'active open hover' : 'hover'} onMouseEnter={() => setGroupDropDownOpen(true)} onMouseLeave={() => setGroupDropDownOpen(false)}>
              <a href="/GroupAssignments-Assigned">
                <i className="menu-icon fa fa-list" />
                <span className="menu-text"> Group Assignments </span>
                <b className="arrow fa fa-angle-down" />
              </a>

              <b className="arrow" />

              {groupDropDownOpen &&
                <ul className="submenu">
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
                <a href="/AllAssignments-Unassigned">
                  <i className="menu-icon glyphicon glyphicon-globe" />
                  <span className="menu-text"> ALL Assignments </span>
                  <b className="arrow fa fa-angle-down" />
                </a>

                <b className="arrow" />

                {allAssignmentDropDownOpen && <ul className="submenu">
                  {/*<li class="hover">
								<a href="<?php //echo APPNAME; ?>/assignment/all/">
									<i class="menu-icon fa fa-caret-right"></i>
									ALL Status
								</a>

								<b class="arrow"></b>
							</li>*/}
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
                <a href="/ManageUsers-Groupmembers">
                  <i className="menu-icon fa fa-users" />
                  <span className="menu-text"> Manage Users </span>
                  <b className="arrow fa fa-angle-down" />
                </a>

                <b className="arrow" />

                {manageUserDropDownOpen && <ul className="submenu">
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
            {/*<li class="hover">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-pencil-square-o"></i>
							<span class="menu-text"> Forms </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="hover">
								<a href="form-elements.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Form Elements
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="form-elements-2.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Form Elements 2
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="form-wizard.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Wizard &amp; Validation
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="wysiwyg.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Wysiwyg &amp; Markdown
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="dropzone.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Dropzone File Upload
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li class="hover">
						<a href="widgets.html">
							<i class="menu-icon fa fa-list-alt"></i>
							<span class="menu-text"> Widgets </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li class="hover">
						<a href="calendar.html">
							<i class="menu-icon fa fa-calendar"></i>

							<span class="menu-text">
								Calendar

								<span class="badge badge-transparent tooltip-error" title="2 Important Events">
									<i class="ace-icon fa fa-exclamation-triangle red bigger-130"></i>
								</span>
							</span>
						</a>

						<b class="arrow"></b>
					</li>

					<li class="hover">
						<a href="gallery.html">
							<i class="menu-icon fa fa-picture-o"></i>
							<span class="menu-text"> Gallery </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li class="hover">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-tag"></i>
							<span class="menu-text"> More Pages </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="hover">
								<a href="profile.html">
									<i class="menu-icon fa fa-caret-right"></i>
									User Profile
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="inbox.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Inbox
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="pricing.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Pricing Tables
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="invoice.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Invoice
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="timeline.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Timeline
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="search.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Search Results
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="email.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Email Templates
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="login.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Login &amp; Register
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<li class="hover">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-file-o"></i>

							<span class="menu-text">
								Other Pages

								<span class="badge badge-primary">5</span>
							</span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="hover">
								<a href="faq.html">
									<i class="menu-icon fa fa-caret-right"></i>
									FAQ
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="error-404.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Error 404
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="error-500.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Error 500
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="grid.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Grid
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="blank.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Blank Page
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>*/}
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
                {/* 2. Add 'open' className to open the Setting Icon */}
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
                        <div className={`dropdown dropdown-colorpicker ${showColorOption ? "open" : "close"}`} onClick={() => setShowColorOption(!showColorOption)}>
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
                      <input type="checkbox" className="ace ace-checkbox-2 ace-save-state" id="ace-settings-navbar" autoComplete="off" />
                      <label className="lbl" htmlFor="ace-settings-navbar"> Fixed Navbar</label>
                    </div>
                    <div className="ace-settings-item">
                      <input type="checkbox" className="ace ace-checkbox-2 ace-save-state" id="ace-settings-sidebar" autoComplete="off" />
                      <label className="lbl" htmlFor="ace-settings-sidebar"> Fixed Sidebar</label>
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

                  {/*<div class="hidden-sm hidden-xs">
									<button type="button" class="sidebar-collapse btn btn-white btn-primary" data-target="#sidebar">
                  <i class="ace-icon fa fa-angle-double-up" data-icon1="ace-icon fa fa-angle-double-up" data-icon2="ace-icon fa fa-angle-double-down"></i>
                  Collapse/Expand Menu
									</button>
								</div> */}
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

              {/* &nbsp; &nbsp;
						<span class="action-buttons">
							<a href="#">
								<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
							</a>
						</span> */}
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