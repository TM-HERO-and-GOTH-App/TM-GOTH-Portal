import Header from '../Header';
import Footer from '../Footer';
import React from 'react';
import UpdateProfileService from '../../web_service/update_profile_service/UpdateProfile';
import { Link } from 'react-router-dom'

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: JSON.parse(sessionStorage.getItem('UserData')),
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            email: '',
            mobileNum: '',
            name: '',
            nickName: '',
            divisionOption: '0',
            stateOption: '0',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        // e.preventDefault();
        UpdateProfileService.updateAgentProfile(this.state.token, this.state.data.email, this.state.name, '', this.state.mobileNum, this.state.nickName, '', this.state.stateOption,this.state.divisionOption, '', '')
        .then(res => {
            console.log(res);
            this.props.history.push('/user-profile')
        })
    }

    render() { 
        return (
            <div>
                <Header />
                <form onSubmit={this.handleSubmit}>
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

                        <div className="profile-user-info profile-user-info-striped" style={{margin: '0px'}}>

                            <div className="profile-info-row">
                                <div className="profile-info-name" style={{width: '20%'}}> Email </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{ this.state.data.email }</span>
                                    <input type="hidden" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Level </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{ this.state.data.level }</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Rank </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{this.state.data.rank}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Score </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{this.state.data.score}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Group </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">{this.state.data.stakeholderName}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Joined Date</div>

                                <div className="profile-info-value">
                                    <span className="editable" id="signup">{this.state.data.registeredDate}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Last Logged In </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="login">{this.state.data.lastLoggedIn}</span>
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
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="fullName" placeholder="Fullname" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Nickname </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="nickName" placeholder="Nickname" value={this.state.nickName} onChange={(e) => this.setState({ nickName: e.target.value })}/>
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Mobile No </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <input className="input-sm" style={{width: "100%"}} type="text" name="mobileNum" placeholder="Mobile Number" value={this.state.mobileNum} onChange={(e) => this.setState({ mobileNum: e.target.value })}/>
                                    </span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Division </div>

                                <div className="profile-info-value">
                                    <span className="editable" id="username">
                                        <select className="chosen-select form-control" name="divisionID" value={this.state.divisionOption} onChange={(e) => this.setState({ divisionOption: e.target.value})}>

                                            <option value="0" >Choose a Division...</option>
                                            {this.state.lovData.filter(filter => filter.lovGroup === 'DIVISION').map(data => {
                                                return <option value={data.lovName} key={data.lovID}>{data.lovName}</option>
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
                                        <select className="chosen-select form-control" name="inputs[stateID]" value={this.state.stateOption} onChange={(e) => this.setState({ stateOption: e.target.value })}>
                                            <option value="0">Choose a State...</option>
                                            {this.state.lovData.filter(filter => filter.lovGroup === 'AREA-LOCATION').map(data => {
                                                return <option value={data.lovName} key={data.lovID}>{data.lovName}</option>

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
                <Footer />
            </div>
        )
    }
}

export default EditUser;