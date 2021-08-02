import React, { Component } from 'react';

class baselayout extends React.Component {

    render() {
    return(

        <div>
  <div id="navbar" className="navbar navbar-default navbar-collapse ace-save-state">
    <div className="navbar-container ace-save-state" id="navbar-container">
      <div className="navbar-header pull-left">
        <a href="index.html" className="navbar-brand">
          <small>
            HERO Portal
          </small>
        </a>
        <button className="pull-right navbar-toggle navbar-toggle-img collapsed" type="button" data-toggle="collapse" data-target=".navbar-buttons,.navbar-menu">
          <span className="sr-only">Toggle user menu</span>
          <img src="<?php echo MEDIA; ?>/images/avatars/user.jpg" alt="Jason's Photo" />
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
              <img className="nav-user-photo" src="<?php echo MEDIA; ?>/images/avatars/avatar2.png" alt="User's Photo" />
              <span className="user-info">
                <small>Welcome,</small>
                {/*?php echo ucwords(strtolower($fullName)); ?*/}
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
                <a href="<?php echo APPNAME; ?>/preference/profile/">
                  <i className="ace-icon fa fa-user" />
                  My Profile
                </a>
              </li>
              {/*?php if( $stakeholderName == 'RRT' ){ ?*/}
              <li>
                <a href="<?php echo APPNAME; ?>/preference/createcase/">
                  <i className="ace-icon fa fa-pencil" />
                  Create New Case
                </a>
              </li>
              {/*?php } ?*/}
              <li className="divider" />
              <li>
                <a href="<?php echo APPNAME; ?>/login/signout/">
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
          {/*<li>
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
						</li>*/}
        </ul>
        <form className="navbar-form navbar-left form-search" role="search" method="POST" action="<?php echo APPNAME; ?>/search/quick/">
          <div className="form-group">
            <input type="text" name="keywords" placeholder="search" style={{width: 250}} defaultValue="<?php echo (isset($keywords) ) ? $keywords : ''; ?>" />
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
      <div className="sidebar-shortcuts" id="sidebar-shortcuts" style={{width: 150}}>
        <img src="<?php echo MEDIA; ?>/images/guardian.png" width={125} />					
      </div>{/* /.sidebar-shortcuts */}
      <ul className="nav nav-list">
        <li className="<?php echo ( isset($dashboardTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/dashboard/overall/">
            <i className="menu-icon fa fa-tachometer" />
            <span className="menu-text"> Dashboard </span>
          </a>
          <b className="arrow" />
        </li>
        {/*<li class="hover">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-desktop"></i>
							<span class="menu-text">
								UI &amp; Elements
							</span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="active open hover">
								<a href="#" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>

									Layouts
									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="active hover">
										<a href="top-menu.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Top Menu
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="two-menu-1.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Two Menus 1
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="two-menu-2.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Two Menus 2
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="mobile-menu-1.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Default Mobile Menu
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="mobile-menu-2.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Mobile Menu 2
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="mobile-menu-3.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Mobile Menu 3
										</a>

										<b class="arrow"></b>
									</li>
								</ul>
							</li>

							<li class="hover">
								<a href="typography.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Typography
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="elements.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Elements
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="buttons.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Buttons &amp; Icons
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="content-slider.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Content Sliders
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="treeview.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Treeview
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="jquery-ui.html">
									<i class="menu-icon fa fa-caret-right"></i>
									jQuery UI
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="nestable-list.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Nestable Lists
								</a>

								<b class="arrow"></b>
							</li>

							<li class="hover">
								<a href="#" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>

									Three Level Menu
									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="hover">
										<a href="#">
											<i class="menu-icon fa fa-leaf green"></i>
											Item #1
										</a>

										<b class="arrow"></b>
									</li>

									<li class="hover">
										<a href="#" class="dropdown-toggle">
											<i class="menu-icon fa fa-pencil orange"></i>

											4th level
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="hover">
												<a href="#">
													<i class="menu-icon fa fa-plus purple"></i>
													Add Product
												</a>

												<b class="arrow"></b>
											</li>

											<li class="hover">
												<a href="#">
													<i class="menu-icon fa fa-eye pink"></i>
													View Products
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</li>*/}
        <li className="<?php echo ( isset($myAssignmentTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/assignment/self/assigned/">
            <i className="menu-icon fa fa-list" />
            <span className="menu-text"> My Assignments </span>
            <b className="arrow fa fa-angle-down" />
          </a>
          <b className="arrow" />
          <ul className="submenu">
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/self/assigned/">
                <i className="menu-icon fa fa-caret-right" />
                Assigned Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/self/in-progress/">
                <i className="menu-icon fa fa-caret-right" />
                In-Progress Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/self/closed/">
                <i className="menu-icon fa fa-caret-right" />
                Closed Cases
              </a>
              <b className="arrow" />
            </li>
          </ul>
        </li>
        <li className="<?php echo ( isset($myCollaborationTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/assignment/collaboration/assigned/">
            <i className="menu-icon fa fa-list" />
            <span className="menu-text"> My Collaboration </span>
            <b className="arrow fa fa-angle-down" />
          </a>
          <b className="arrow" />
          <ul className="submenu">
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/collaboration/assigned/">
                <i className="menu-icon fa fa-caret-right" />
                Assigned Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/collaboration/in-progress/">
                <i className="menu-icon fa fa-caret-right" />
                In-Progress Cases
              </a>
              <b className="arrow" />
            </li>
          </ul>
        </li>
        <li className="<?php echo ( isset($groupAssignmentTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/assignment/group/assigned/">
            <i className="menu-icon fa fa-list" />
            <span className="menu-text"> Group Assignments </span>
            <b className="arrow fa fa-angle-down" />
          </a>
          <b className="arrow" />
          <ul className="submenu">
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/group/assigned/">
                <i className="menu-icon fa fa-caret-right" />
                Assigned Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/group/closed/">
                <i className="menu-icon fa fa-caret-right" />
                Closed Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover"> {/* active */}
              <a href="<?php echo APPNAME; ?>/assignment/group/in-progress/">
                <i className="menu-icon fa fa-caret-right" />
                In-Progress Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/group/unassigned/">
                <i className="menu-icon fa fa-caret-right" />
                <span style={{color: 'red'}}>Unassigned Cases</span>
              </a>
              <b className="arrow" />
            </li>
          </ul>
        </li>
        {/*?php if( $shGroup != 'SALES' ){ ?*/}
        <li className="<?php echo ( isset($allAssignmentTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/assignment/all/unassigned/">
            <i className="menu-icon glyphicon glyphicon-globe" />
            <span className="menu-text"> ALL Assignments </span>
            <b className="arrow fa fa-angle-down" />
          </a>
          <b className="arrow" />
          <ul className="submenu">
            {/*<li class="hover">
								<a href="<?php //echo APPNAME; ?>/assignment/all/">
									<i class="menu-icon fa fa-caret-right"></i>
									ALL Status
								</a>

								<b class="arrow"></b>
							</li>*/}
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/all/assigned/">
                <i className="menu-icon fa fa-caret-right" />
                Assigned Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/all/closed/">
                <i className="menu-icon fa fa-caret-right" />
                Closed Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover"> {/* active */}
              <a href="<?php echo APPNAME; ?>/assignment/all/in-progress/">
                <i className="menu-icon fa fa-caret-right" />
                In-Progress Cases
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/assignment/all/unassigned/">
                <i className="menu-icon fa fa-caret-right" />
                <span style={{color: 'red'}}>Unassigned Cases</span>
              </a>
              <b className="arrow" />
            </li>
          </ul>						
        </li>
        {/*?php } ?*/}
        {/*?php if( strtoupper($position) == 'ADMIN' ){ ?*/}
        <li className="<?php echo ( isset($adminTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/admin/groupmembers/">
            <i className="menu-icon fa fa-users" />
            <span className="menu-text"> Manage Users </span>
            <b className="arrow fa fa-angle-down" />
          </a>
          <b className="arrow" />
          <ul className="submenu">
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/admin/alluser/">
                <i className="menu-icon fa fa-caret-right" />
                ALL Registered User
              </a>
              <b className="arrow" />
            </li>
            <li className="hover">
              <a href="<?php echo APPNAME; ?>/admin/groupmembers/">
                <i className="menu-icon fa fa-caret-right" />
                My Group Members
              </a>
              <b className="arrow" />
            </li>
          </ul>						
        </li>
        {/*?php } ?*/}
        <li className="<?php echo ( isset($searchTab) ) ? 'active open hover' : 'hover'; ?>">
          <a href="<?php echo APPNAME; ?>/search/enquiry/">
            <i className="menu-icon glyphicon glyphicon-search" />
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
        <div className="page-content">
          <div className="ace-settings-container" id="ace-settings-container">
            <div className="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
              <i className="ace-icon fa fa-cog bigger-130" />
            </div>
            <div className="ace-settings-box clearfix" id="ace-settings-box">
              <div className="pull-left width-50">
                <div className="ace-settings-item">
                  <div className="pull-left">
                    <select id="skin-colorpicker" className="hide">
                      <option data-skin="no-skin" value="#438EB9">#438EB9</option>
                      <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                      {/*<option data-skin="skin-2" value="#C6487E">#C6487E</option>
												<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>*/}
                    </select>
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
            </div>{/* /.ace-settings-box */}
          </div>{/* /.ace-settings-container */}
          <div className="page-header">
            <h1>{/*?php echo $pageHeader; ?*/}</h1>
          </div>{/* /.page-header */}
          <div className="row">
            <div className="col-xs-12">
              {/* PAGE CONTENT BEGINS */}
              <div className="alert alert-info visible-sm visible-xs">
                <button type="button" className="close" data-dismiss="alert">
                  <i className="ace-icon fa fa-times" />
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
              {/* BEGIN PAGE CONTENT BY CONTROLLER */}
              {/*?php echo $pageContent; ?*/}
              {/* END PAGE CONTENT BY CONTROLLER */}								
              {/* PAGE CONTENT ENDS */}
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.page-content */}
      </div>
    </div>{/* /.main-content */}
    <br /><br /><br />
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div style={{padding: 0}}>
            Copyright © 2018 Telekom Malaysia Berhad (128740-P) ALL RIGHTS RESERVED</div>
          <div style={{padding: 0}}>For the best viewing experience, please use either Mozilla Firefox or IE browser with resolution at 1280 x 800 pixels and above</div>
          {/*&nbsp; &nbsp;
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
      <i className="ace-icon fa fa-angle-double-up icon-only bigger-110" />
    </a>
  </div>{/* /.main-container */}
  {/* basic scripts */}
  {/*[if !IE]> */}
  {/* <![endif]*/}
  {/*[if IE]>

<![endif]*/}
  {/* page specific plugin scripts */}
  {/* ace scripts */}
  {/* inline scripts related to this page */}
  {/* inline scripts related to this page */}
  {/* page specific plugin scripts for jQuery Data Table */}
  {/* inline scripts related for jQuery Data Table */}
</div>


    );
    }
}


export default baselayout;