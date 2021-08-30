import Header from '../Header';
import Footer from '../Footer';
import React from 'react';

const lov = JSON.parse(localStorage.getItem('LovData'));

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.lovData = this.lovData.bind(this);
    }

    lovData(){
        lov.map(data => {
            console.log(data)
            return data
        })
    }

    render() {
        const data = JSON.parse(localStorage.getItem('UserData')); 
        return (
            <div>
                <Header />
                <form>
                    <div className="col-xs-12 col-sm-6">
                        <div className="left">
                            <button className="btn btn-sm btn-primary" type="button" onclick={"redirect('<?php echo APPNAME; ?>/preference/profile/')"}>
                                <i className="ace-icon fa fa-user align-top bigger-125"></i>
                                View Profile
                            </button>
                            <button className="btn btn-sm btn-success" type="submit" name="btn_post" onclick="this.style.visibility= 'hidden';">
                                <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                Update Profile</button>
                        </div>

                        <div className="space-6" />

                        {/* <div className="left">
		<span className="btn btn-app btn-sm btn-light no-hover">
			<span className="line-height-1 bigger-170 blue"> 1,411 </span>

			<br />
			<span className="line-height-1 smaller-90"> Views </span>
		</span>

		<span className="btn btn-app btn-sm btn-yellow no-hover">
			<span className="line-height-1 bigger-170"> 32 </span>

			<br />
			<span className="line-height-1 smaller-90"> Followers </span>
		</span>

		<span className="btn btn-app btn-sm btn-pink no-hover">
			<span className="line-height-1 bigger-170"> 4 </span>

			<br />
			<span className="line-height-1 smaller-90"> Projects </span>
		</span>

		<span className="btn btn-app btn-sm btn-grey no-hover">
			<span className="line-height-1 bigger-170"> 23 </span>

			<br />
			<span className="line-height-1 smaller-90"> Reviews </span>
		</span>

		<span className="btn btn-app btn-sm btn-success no-hover">
			<span className="line-height-1 bigger-170"> 7 </span>

			<br />
			<span className="line-height-1 smaller-90"> Albums </span>
		</span>

		<span className="btn btn-app btn-sm btn-primary no-hover">
			<span className="line-height-1 bigger-170"> 55 </span>

			<br />
			<span className="line-height-1 smaller-90"> Contacts </span>
		</span>
	</div> */}

                        <div className="profile-user-info profile-user-info-striped" style={{margin: '0px'}}>

                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{width: '20%'}}> Email </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="username">{<?php echo $profile['email']; ?>}</span> */}
                                    <span className="editable" id="username">{ data.email }</span>
                                    {/* <input type="hidden" name="inputs[email]" value="<?php echo $profile['email']; ?>"> */}
                                    <input type="hidden" name="inputs[email]" value='' />
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Level </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="username">{<?php echo $profile['level']; ?>}</span> */}
                                    <span className="editable" id="username">{ data.nickName === '' ? 'n/a' : data.nickName }</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Rank </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="username">{<?php echo $profile['rank']; ?>}</span> */}
                                    <span className="editable" id="username">{data.rank}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Score </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="username">{<?php echo $profile['score']; ?>}</span> */}
                                    <span className="editable" id="username">{data.score}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Group </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="username">{<?php echo $profile['stakeholderName']; ?>}</span> */}
                                    <span className="editable" id="username">{data.stakeholderName}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Joined Date</div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="signup">{<?php echo $profile['registeredDate']; ?>}</span> */}
                                    <span className="editable" id="signup">{data.registeredDate}</span>
                                </div>
                            </div>
                            {/* <?php 
		//if( $days > 0 ) $hours = $hours - ($days*24);
		//if( $minutes > 60 ) $minutes = $minutes - ($row['hours']*60);							
		?> */}
                            <div className="profile-info-row">
                                <div className="profile-info-name"> Last Logged In </div>

                                <div className="profile-info-value">
                                    {/* <span className="editable" id="login"{><?php echo $profile['lastLoggedIn']; ?>}</span> */}
                                    <span className="editable" id="login">{data.lastLoggedIn}</span>
                                </div>
                            </div>

                            {/* <div className="profile-info-row">
			<div className="profile-info-name"> About Me </div>

			<div className="profile-info-value">
				<span className="editable" id="about">Editable as WYSIWYG</span>
			</div>
		</div> */}
                        </div>

                        <div className="space-20" />

                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="left" style={{height:"35px"}}>
                        </div>
                        <div className="space-6"></div>

                        <div className="profile-user-info profile-user-info-striped" style={{margin: "0px"}}>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{width: "20%"}}> Fullname </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username"><input className="input-sm" style={{width: "100%"}} type="text" name="inputs[fullName]" placeholder="Fullname" value={data.fullName === null ? '' : data.fullName} /></span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Nickname </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username"><input className="input-sm" style={{width: "100%"}} type="text" name="inputs[nickName]" placeholder="Nickname" value={data.nickName === null ? '' : data.nickName} /></span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Mobile No </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username"><input className="input-sm" style={{width: "100%"}} type="text" name="inputs[mobileNum]" placeholder="Mobile Number" value={data.mobileNum === null ? '' : data.mobileNum} /></span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Division </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="inputs[divisionID]" data-placeholder="Choose a State...">
                                            {/* <option value="0" {<?php echo ( 0 == $profile['divisionID'] ) ? 'selected="yes"' : ''; ?>}>Choose a Division...</option>		 */}

                                            <option value="0" >Choose a Division...</option>
                                            {/* <?php $totalLov = count($lovDivision); ?>
                                            <?php for($i=0;$i<$totalLov;$i++){ ?> */}
                                            {/* <option value="<?php echo $lovDivision[$i]['lovID']; ?>"{ <?php echo ( $lovDivision[$i]['lovID'] == $profile['divisionID'] ) ? 'selected="yes"' : ''; ?>><?php echo $lovDivision[$i]['lovName']; ?>}</option> */}
                                            <option value={this.lovData}></option>
                                            {/* <?php } ?> */}
                                        </select>
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> State </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="inputs[stateID]" data-placeholder="Choose a State...">
                                            {/* <option value="0" <?php echo ( 0 == $profile['stateID'] ) ? 'selected="yes"' : ''; ?>>Choose a State...</option>		 */}
                                            <option value="0">Choose a State...</option>
                                            {/* <?php $totalLov = count($lovState); ?> */}
                                            {/* <?php for($i=0;$i<$totalLov;$i++){ ?> */}
                                            {/* <option value="<?php echo $lovState[$i]['lovID']; ?>" <?php echo ( $lovState[$i]['lovID'] == $profile['stateID'] ) ? 'selected="yes"' : ''; ?>><?php echo $lovState[$i]['lovName']; ?></option> */}
                                            <option value=""></option>
                                            {/* <?php } ?> */}
                                        </select>

                                    </span>
                                </div>
                            </div>
                            {/* <div className="profile-info-row">
			<div className="profile-info-name"> About Me </div>

			<div className="profile-info-value">
				<span className="editable" id="about">Editable as WYSIWYG</span>
			</div>
		</div> */}
                        </div>

                        <div className="space-20" />

                    </div>
                </form>
                <Footer />
            </div>
        )
    }
}

export default EditUser;