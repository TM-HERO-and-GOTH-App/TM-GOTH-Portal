import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import defaultUserLogo from '../../images/avatars/default.jpg';
import UpdateProfileService from '../../web_service/update_profile_service/UpdateProfile';
import { Link } from 'react-router-dom'

const Userprofile = (props) => {
	const [token] = useState(JSON.parse(sessionStorage.getItem('userToken')));
	const [userData] = useState(JSON.parse(sessionStorage.getItem('UserData')));
	const [imageFile, setImageFile] = useState(null);

	const handleImage = (e) => {
		e.preventDefault();
		// Uncomment below to see the picture data when an image is upload.
		console.log(imageFile);
		UpdateProfileService.uploadAvatar(token, imageFile.name).then(res => {
			console.log(res);
			props.history.push('/user-profile');
		})
	}

	useEffect(() => {
		setImageFile(userData.avatarPicture)
	})

	const onImageChange = (e) => {
		console.log(e.target.files[0])
		if (e.target.files && e.target.files[0]) {
			// setImageFile(URL.createObjectURL(e.target.files[0]));
			setImageFile(e.target.files[0].name)
			console.log(imageFile, 'image file')
		}
	}

	return (
		<Layout
			pageTitle='My Profile'
			pageContent={
				<>
					<div className="col-xs-12 col-sm-3 center">
						<div>
							<span className="profile-picture">
								{imageFile === null ?
									<img id="avatar" className="editable img-responsive" title="Dummy Avatar" alt="User's Avatar"
										src={defaultUserLogo} />
									:
									<img id="avatar" className="editable img-responsive" alt="preview image" src={imageFile} />
								}
							</span>
							<div className="space-4" />
							<div>
								<form onSubmit={handleImage}>
									<input type="file" accept="image/png, image/jpeg" id="id-input-file-avatar" name="avatar"
										onChange={onImageChange} />
									<div className="pull-right">
										<button className="btn btn-sm btn-success" type="submit" name="btn_upload">
											<i className="ace-icon fa fa-save align-top bigger-125" />
											Save New Avatar
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="space-6" />
					</div>
					<div className="col-xs-12 col-sm-5">
						<div className="left">
							<Link className="btn btn-sm btn-warning" to='/edit-profile'>
								<i className="ace-icon fa fa-pencil align-top bigger-125" />
								Edit Profile
							</Link>
						</div>
						<div className="space-6" />
						<div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
							<div className="profile-info-row">
								<div className="profile-info-name" style={{ width: '25%' }}> Fullname</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.fullName}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Nickname</div>
								<div className="profile-info-value">
									<span className="editable"
										id="username">{userData.nickname === '' ? 'n/a' : userData.nickname}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Email</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.email}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Mobile No</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.mobileNum}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Alt Mobile No</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.altMobileNum}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Level</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.level}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Joined Date</div>
								<div className="profile-info-value">
									<span className="editable" id="signup">{userData.registeredDate}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Last Logged In</div>
								<div className="profile-info-value">
									<span className="editable"
										id="login">{userData.lastLoggedIn === 'null' ? 'n/a' : userData.lastLoggedIn}</span>
								</div>
							</div>
						</div>
						<div className="space-20" />
					</div>
					<div className="col-xs-12 col-sm-4">
						<div className="left" style={{ height: 35 }}>
						</div>
						<div className="space-6" />
						<div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
							<div className="profile-info-row">
								<div className="profile-info-name" style={{ width: '25%' }}> Level</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.level}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Rank</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.RANK}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Score</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.score}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Group</div>
								<div className="profile-info-value">
									<span className="editable" id="username">{userData.stakeholderName}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> Division</div>
								<div className="profile-info-value">
									<span className="editable"
										id="username">{userData.divisionName === null ? 'n/a' : userData.divisionName}</span>
								</div>
							</div>
							<div className="profile-info-row">
								<div className="profile-info-name"> State</div>
								<div className="profile-info-value">
									<span className="editable"
										id="username">{userData.stateName === null ? 'n/a' : userData.stateName}</span>
								</div>
							</div>
						</div>
						<div className="space-20" />
					</div>
				</>
			}
		/>
	);
}

export default Userprofile;