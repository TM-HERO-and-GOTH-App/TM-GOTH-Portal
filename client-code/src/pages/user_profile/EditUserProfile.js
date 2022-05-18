import React, { useState } from 'react';
import Layout from '../Layout';
import UpdateProfileService from '../../web_service/update_profile_service/UpdateProfile';
import { Link } from 'react-router-dom'

function EditUser() {
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
    const [lovData, setLOVData] = useState(JSON.parse(sessionStorage.getItem('LovData')));
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
    const [emailInput, setEmailInput] = useState('');
    const [mobileNumberInput, setMobileNumberInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [nickNameInput, setNicknameInput] = useState('');
    const [divisionOption, setDivisionOption] = useState('0');
    const [stateOption, setStateOption] = useState('0');

    const handleSubmit = (props) => {
        // e.preventDefault();
        UpdateProfileService.updateAgentProfile(token, userData.email, nameInput, '', mobileNumberInput, nickNameInput, '', stateOption, divisionOption, '', '')
            .then(res => {
                console.log(res);
                props.history.replace('/user-profile')
            })
    }

    return (
        <Layout pageContent={
            <>

                <form onSubmit={handleSubmit}>
                    <div className="col-xs-12 col-sm-6">
                        <div className="left">
                            <Link className="btn btn-sm btn-primary" to='/user-profile'>
                                <i className="ace-icon fa fa-user align-top bigger-125"></i>
                                View Profile
                            </Link>

                            <button className="btn btn-sm btn-success" type="submit" name="btn_post">
                                <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                Update Profile
                            </button>
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

                        <div className="profile-user-info profile-user-info-striped" style={{ margin: '0px' }}>

                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: '20%' }}> Email </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{userData.email}</span>
                                    <input type="hidden" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Level </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{userData.level}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Rank </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{userData.rank}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Score </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{userData.score}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Group </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{userData.stakeholderName}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Joined Date</div>

                                <div className="profile-info-value">
                                    <span className="editable" id="signup">{userData.registeredDate}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Last Logged In </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="login">{userData.lastLoggedIn}</span>
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
                        <div className="left" style={{ height: "35px" }}>
                        </div>
                        <div className="space-6"></div>

                        <div className="profile-user-info profile-user-info-striped" style={{ margin: "0px" }}>
                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{ width: "20%" }}> Fullname </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{ width: "100%" }} type="text" name="fullName" placeholder="Fullname" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Nickname </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{ width: "100%" }} type="text" name="nickName" placeholder="Nickname" value={nickNameInput} onChange={(e) => setNicknameInput(e.target.value)} />
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Mobile No </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{ width: "100%" }} type="text" name="mobileNum" placeholder="Mobile Number" value={mobileNumberInput} onChange={(e) => setMobileNumberInput(e.target.value)} />
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Division </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="divisionID" value={divisionOption} onChange={(e) => setDivisionOption(e.target.value)}>

                                            <option value="0" >Choose a Division...</option>
                                            {
                                                lovData.filter(filter => filter.lovGroup === 'DIVISION').map((data, index) => {
                                                    return <option value={data.lovID} key={index}>{data.lovName}</option>
                                                })
                                            }
                                        </select>
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> State </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="inputs[stateID]" value={stateOption} onChange={(e) => setStateOption(e.target.value)}>
                                            <option value="0">Choose a State...</option>
                                            {
                                                lovData.filter(filter => filter.lovGroup === 'AREA-LOCATION').map((data, index) => {
                                                    return <option value={data.lovID} key={index}>{data.lovName}</option>

                                                })
                                            }
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
            </>
        }
        />
    )
}

export default EditUser;