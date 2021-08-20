import React from 'react';
import img1 from '../images/avatars/user.jpg';
import img2 from '../images/avatars/avatar2.png';
import img3 from '../images/guardian.png';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.collabToggle = this.collabToggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnterCollab = this.onMouseEnterCollab.bind(this);
    this.onMouseLeaveCollab = this.onMouseLeaveCollab.bind(this);
    this.showDashboard = this.showDashboard.bind(this);
    this.state = {
      dropdownOpen: false,
      collabDropdown: false,
      Dashboard: true,
      AdvancedSearch: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  collabToggle() {
    this.setState({
      collabDropdown: !this.state.collabDropdown
    });
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseEnterCollab(){
    this.setState({collabDropdown: true})
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  onMouseLeaveCollab() {
    this.setState({ collabDropdown: false });
  }

  showDashboard(e) {
    this.setState({
      Dashboard: true, AdvancedSearch: false 
    });
  }


  render() {
    return (

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
                <img src={img1} alt="Jason's Photo" />
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
                      <a href="/preference/profile/">
                        <i className="ace-icon fa fa-user" />
                        My Profile
                      </a>
                    </li>
                    {/*?php if( $stakeholderName == 'RRT' ){ ?*/}
                    <li>
                      <a href="/preference/createcase/">
                        <i className="ace-icon fa fa-pencil" />
                        Create New Case
                      </a>
                    </li>
                    {/*?php } ?*/}
                    <li className="divider" />
                    <li>
                      <a href="/login/signout/">
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
              </ul>
              <form className="navbar-form navbar-left form-search" role="search" method="POST" action="/search/quick/">
                <div className="form-group">
                  <input type="text" name="keywords" placeholder="search" style={{ width: 250 }} />
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
            <ul className="nav nav-list">
              <li className="active open hover">
                <a href="/">
                  <i className="menu-icon fa fa-tachometer" />
                  <span className="nav_menu-item"> Dashboard </span>
                </a>
              </li>
              <li className="active open hover" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <a href="/assignment/self/assigned/">
                  <i className="menu-icon fa fa-list" />
                  <span className="menu-text"> My Assignments </span>
                  <b className="arrow fa fa-angle-down" />
                </a>
                {this.state.dropdownOpen && <ul className="submenu">
                  <li className="hover">
                    <a href="/assignment/self/assigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      Assigned Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/self/in-progress/">
                      <i className="menu-icon fa fa-caret-right" />
                      In-Progress Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/self/closed/">
                      <i className="menu-icon fa fa-caret-right" />
                      Closed Cases
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>}
              </li>
              <li className="active open hover" onMouseOver={this.onMouseEnterCollab} onMouseLeave={this.onMouseLeaveCollab} isOpen={this.state.collabDropdown} toggle={this.collabToggle}>
                <a href="/assignment/collaboration/assigned/">
                  <i className="menu-icon fa fa-list" />
                  <span className="menu-text"> My Collaboration </span>
                  <b className="arrow fa fa-angle-down" />
                </a>
                {this.state.collabDropdown && <ul className="submenu">
                  <li className="hover">
                    <a href="/assignment/collaboration/assigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      Assigned Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/collaboration/in-progress/">
                      <i className="menu-icon fa fa-caret-right" />
                      In-Progress Cases
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>}
              </li>
              <li className="active open hover" onMouseOver={this.onMouseEnterCollab} onMouseLeave={this.onMouseLeaveCollab} isOpen={this.state.collabDropdown} toggle={this.collabToggle}>
                <a href="/assignment/group/assigned/">
                  <i className="menu-icon fa fa-list" />
                  <span className="menu-text"> Group Assignments </span>
                  <b className="arrow fa fa-angle-down" />
                </a>
                {this.state.collabDropdown && <ul className="submenu">
                  <li className="hover">
                    <a href="/assignment/group/assigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      Assigned Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/group/closed/">
                      <i className="menu-icon fa fa-caret-right" />
                      Closed Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover"> {/* active */}
                    <a href="/assignment/group/in-progress/">
                      <i className="menu-icon fa fa-caret-right" />
                      In-Progress Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/group/unassigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      <span style={{ color: 'red' }}>Unassigned Cases</span>
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>}
              </li>
              {/*?php if( $shGroup != 'SALES' ){ ?*/}
              <li className="active open hover" onMouseOver={this.onMouseEnterCollab} onMouseLeave={this.onMouseLeaveCollab} isOpen={this.state.collabDropdown} toggle={this.collabToggle}>
                <a href="/assignment/all/unassigned/">
                  <i className="menu-icon glyphicon glyphicon-globe" />
                  <span className="menu-text"> ALL Assignments </span>
                  <b className="arrow fa fa-angle-down" />
                </a>
                {this.state.collabDropdown && <ul className="submenu">
                  {/*<li class="hover">
								<a href="<?php //echo APPNAME; ?>/assignment/all/">
									<i class="menu-icon fa fa-caret-right"></i>
									ALL Status
								</a>

								<b class="arrow"></b>
							</li>*/}
                  <li className="hover">
                    <a href="/assignment/all/assigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      Assigned Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/all/closed/">
                      <i className="menu-icon fa fa-caret-right" />
                      Closed Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover"> {/* active */}
                    <a href="/assignment/all/in-progress/">
                      <i className="menu-icon fa fa-caret-right" />
                      In-Progress Cases
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/assignment/all/unassigned/">
                      <i className="menu-icon fa fa-caret-right" />
                      <span style={{ color: 'red' }}>Unassigned Cases</span>
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>}
              </li>
              {/*?php } ?*/}
              {/*?php if( strtoupper($position) == 'ADMIN' ){ ?*/}
              <li className="active open hover" onMouseOver={this.onMouseEnterCollab} onMouseLeave={this.onMouseLeaveCollab} isOpen={this.state.collabDropdown} toggle={this.collabToggle}>
                <a href="/admin/groupmembers/">
                  <i className="menu-icon fa fa-users" />
                  <span className="menu-text"> Manage Users </span>
                  <b className="arrow fa fa-angle-down" />
                </a>
                {this.state.collabDropdown && <ul className="submenu">
                  <li className="hover">
                    <a href="/admin/alluser/">
                      <i className="menu-icon fa fa-caret-right" />
                      ALL Registered User
                    </a>
                    <b className="arrow" />
                  </li>
                  <li className="hover">
                    <a href="/admin/groupmembers/">
                      <i className="menu-icon fa fa-caret-right" />
                      My Group Members
                    </a>
                    <b className="arrow" />
                  </li>
                </ul>}
              </li>
              {/* Add Link inside the I Tag because the style will ruin. You can try move it around */}
              <li className="active open hover">
                <a href="advance_search">
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
                {/* /.page-header */}
                <div className="row">
                  <div className="col-xs-12">
                  
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


export default Header;