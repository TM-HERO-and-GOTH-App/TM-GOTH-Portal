import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import defaultUserLogo from '../../images/avatars/default.jpg';
import { Link } from 'react-router-dom'

class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const data = JSON.parse(localStorage.getItem('UserData'));
    return (
      <div>
        <Header />
        <div>
          <div className="col-xs-12 col-sm-3 center">
            <div>
              <span className="profile-picture">
                {data.avatarPicture === null ? <img id="avatar" className="editable img-responsive" title="Dummy Avatar" alt="User's Avatar" src={defaultUserLogo} />
                :
                <img id="avatar" className="editable img-responsive" alt="User's Avatar" src={data.avatarPicture} />
                }

              </span>
              <div className="space-4" />
              {/*<div class="width-95 label label-info label-lg arrowed-in arrowed-in-right">
			<div class="inline position-relative">
				<span class="white"><?php //echo $fullName; ?></span>
			</div>
		</div> */}
              <div>
                <form onSubmit={this.handleSubmit}>
                  {/* <!--<input type="file" name="avatar">
				          <input type="button" name="btn_upload" value="Upload Avatar"> --> */}
                  <input type="file" id="id-input-file-avatar" name="avatar" />
                  <div className="pull-right">
                    <button className="btn btn-sm btn-success" type="submit" name="btn_upload">
                      <i className="ace-icon fa fa-save align-top bigger-125"/>
                      Save New Avatar
                    </button>
                  </div>
                </form>
              </div>

            </div>
            <div className="space-6" />
            {/*<div class="hr hr12 dotted"></div>
	<div class="clearfix">
		<div class="grid2">
			<span class="bigger-175 blue">25</span>

			<br />
			Followers
		</div>

		<div class="grid2">
			<span class="bigger-175 blue">12</span>

			<br />
			Following
		</div>
	</div>
	<div class="hr hr16 dotted"></div>*/}
          </div>
          <div className="col-xs-12 col-sm-5">
            <div className="left">
              <Link className="btn btn-sm btn-warning" to='/edit_user'>
                <i className="ace-icon fa fa-pencil align-top bigger-125" />
                Edit Profile
              </Link>
              {/*<button class="btn btn-sm btn-danger">
			<i class="ace-icon fa fa-key align-top bigger-125"></i>		
			Change Password
		</button>		*/}
            </div>
            <div className="space-6" />
            {/*<div class="left">
		<span class="btn btn-app btn-sm btn-light no-hover">
			<span class="line-height-1 bigger-170 blue"> 1,411 </span>

			<br />
			<span class="line-height-1 smaller-90"> Views </span>
		</span>

		<span class="btn btn-app btn-sm btn-yellow no-hover">
			<span class="line-height-1 bigger-170"> 32 </span>

			<br />
			<span class="line-height-1 smaller-90"> Followers </span>
		</span>

		<span class="btn btn-app btn-sm btn-pink no-hover">
			<span class="line-height-1 bigger-170"> 4 </span>

			<br />
			<span class="line-height-1 smaller-90"> Projects </span>
		</span>

		<span class="btn btn-app btn-sm btn-grey no-hover">
			<span class="line-height-1 bigger-170"> 23 </span>

			<br />
			<span class="line-height-1 smaller-90"> Reviews </span>
		</span>

		<span class="btn btn-app btn-sm btn-success no-hover">
			<span class="line-height-1 bigger-170"> 7 </span>

			<br />
			<span class="line-height-1 smaller-90"> Albums </span>
		</span>

		<span class="btn btn-app btn-sm btn-primary no-hover">
			<span class="line-height-1 bigger-170"> 55 </span>

			<br />
			<span class="line-height-1 smaller-90"> Contacts </span>
		</span>
	</div> */}
            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
              <div className="profile-info-row">
                <div className="profile-info-name" style={{ width: '25%' }}> Fullname </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.fullName}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Nickname </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.nickName === '' ? 'n/a' : data.nickName}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Email </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.email}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Mobile No </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.mobileNum}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Level </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.level}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Joined Date</div>
                <div className="profile-info-value">
                  <span className="editable" id="signup">{data.registeredDate}</span>
                </div>
              </div>
              {/* ?php 
		            if( $days 0 ) $hours = $hours - ($days*24);
              //if( $minutes &gt; 60 ) $minutes = $minutes - ($row['hours']*60);							
              ?&gt; */}
              <div className="profile-info-row">
                <div className="profile-info-name"> Last Logged In </div>
                <div className="profile-info-value">
                  <span className="editable" id="login">{data.lastLoggedIn === 'null' ? 'n/a' : data.lastLoggedIn}</span>
                </div>
              </div>
              {/* <div class="profile-info-row">
			<div class="profile-info-name"> About Me </div>

			<div class="profile-info-value">
				<span class="editable" id="about">Editable as WYSIWYG</span>
			</div>
		</div> */}
            </div>
            <div className="space-20" />
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="left" style={{ height: 35 }}>
            </div>
            <div className="space-6" />
            {/*<div class="left">
		<span class="btn btn-app btn-sm btn-light no-hover">
			<span class="line-height-1 bigger-170 blue"> 1,411 </span>

			<br />
			<span class="line-height-1 smaller-90"> Views </span>
		</span>

		<span class="btn btn-app btn-sm btn-yellow no-hover">
			<span class="line-height-1 bigger-170"> 32 </span>

			<br />
			<span class="line-height-1 smaller-90"> Followers </span>
		</span>

		<span class="btn btn-app btn-sm btn-pink no-hover">
			<span class="line-height-1 bigger-170"> 4 </span>

			<br />
			<span class="line-height-1 smaller-90"> Projects </span>
		</span>

		<span class="btn btn-app btn-sm btn-grey no-hover">
			<span class="line-height-1 bigger-170"> 23 </span>

			<br />
			<span class="line-height-1 smaller-90"> Reviews </span>
		</span>

		<span class="btn btn-app btn-sm btn-success no-hover">
			<span class="line-height-1 bigger-170"> 7 </span>

			<br />
			<span class="line-height-1 smaller-90"> Albums </span>
		</span>

		<span class="btn btn-app btn-sm btn-primary no-hover">
			<span class="line-height-1 bigger-170"> 55 </span>

			<br />
			<span class="line-height-1 smaller-90"> Contacts </span>
		</span>
	</div> */}
            <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
              <div className="profile-info-row">
                <div className="profile-info-name" style={{ width: '25%' }}> Level </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.level}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Rank </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.rank}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Score </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.score}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Group </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.stakeholderName}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> Division </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.divisionName === null ? 'n/a' : data.divisionName}</span>
                </div>
              </div>
              <div className="profile-info-row">
                <div className="profile-info-name"> State </div>
                <div className="profile-info-value">
                  <span className="editable" id="username">{data.stateName === null ? 'n/a' : data.stateName}</span>
                </div>
              </div>
            </div>
            <div className="space-20" />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Userprofile;