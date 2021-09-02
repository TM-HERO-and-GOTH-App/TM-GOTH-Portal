import React from 'react';
import CaseService from '../../web_service/login_web_service/CaseService';

class TechnicalCase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobileNumber: '',
            description: '',
            description: '',
            type: 'assurance',
            product: 'empty',
            location: 'empty',
            image: null,
            currLatForm: '',
            currLat: '',
            currLon: '',
            state: '',
        }
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleSelectProduct = this.handleSelectProduct.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }

    handleSelectProduct(e) {
        this.setState({ product: e.target.value });
    }

    handleSelectLocation(e) {
        this.setState({ location: e.target.value });
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    onSubmit(e) {
        e.preventDefault();
        this.createCase('COMPLAINT');
    }

    createCase(complaint) {
        CaseService.createCase(this.state.name, '', this.state.mobileNumber, this.state.description, this.state.state, complaint, 284)
            .subscribe(response => {
                if (response.response === "ERROR") {
                    const svrResponseMsg = response.status;
                    // this.presentToast(this.svrResponseMsg);
                    alert(svrResponseMsg);
                    // loader.dismiss();
                }
                else {
                    // this.cToken = this.svrResponse.cToken;
                    this.svrResponseMsg = response.status;
                }
                if (this.state.image === null) {
                    //----------for null latlong-------------------
                    if (this.state.currLatForm == null) {
                        this.setState({currLon: null});
                        this.setState({currLat: null});
                        // this.showSuccessAlert(this.svrResponseMsg);
                        alert(this.svrResponseMsg);
                        // loader.dismiss();
                        // this.navCtrl.push(TrackingPage);
                        //----------for have latlong-------------------
                    } else {
                        this.setState({image: ""});
                        // loader.dismiss();
                        this.uploadPic(this.svrResponseMsg);
                    }
                }
                //----------for have pic-------------------
                else {
                    this.uploadPic(this.svrResponseMsg);
                }
            });
    }

    uploadPic(svrResponseMsg) {
        if (this.state.currLatForm === null) {
            this.setState({currLatForm: "-"});
            this.setState({currLonForm: "-"});
        }
        CaseService.attachPicture(this.cToken, this.image, this.currLonForm, this.currLatForm)
            .then(response => {
                const PIC_GPS = response;
                if (this.PIC_GPS.response == "FAILED") {
                    // loader.dismiss();
                    alert(this.PIC_GPS.status);
                    //this.createForm.reset();
                }
                else {
                    alert(this.PIC_GPS.status);

                    this.image = null;
                    this.currLon = null;
                    this.currLat = null;
                    this.currLatForm = null;
                    this.currLonForm = null;
                    this.createForm.reset();
                    // this.closeCreateCaseModal();
                    // this.navCtrl.push(TrackingPage);
                    alert(svrResponseMsg);
                }
            }, errorMsg => { console.log(errorMsg) });
    };

    render() {
        return (
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label for='customerName'>Customer Name*</label>
                        <div>
                            <input type='text' id='customerName' name='customerName' placeholder='example: Mr Ahmad/Ms Chiu/Mr Rama' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                        </div>
                    </div>

                    <div>
                        <label for='customerNumber'>Customer Mobile Number*</label>
                        <div>
                            <input type='tel' id='customerNumber' name='customerName' min={0} placeholder='example: 0123456789' value={this.state.mobileNumber} onChange={(e) => this.setState({mobileNumber: e.target.value})} />
                        </div>
                    </div>

                    <div>
                        <label for='description'>Description*</label>
                        <div>
                            <input type='text' id='description' name='userDescription' placeholder='example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label for='type'>Type*</label>

                        <div id='type' name='assurance'>
                            <p>Assurance</p>
                        </div>
                    </div>

                    <div>
                        <label for='product'>Product*</label>

                        <div>
                            <select id='product' name='product' value={this.state.product} onChange={this.handleSelectProduct}>
                                <option value='empty'>Select one</option>
                                <option value='broadband'>Broadband</option>
                                <option value='telephony'>Telephony</option>
                                <option value='mobile'>unifi Mobile</option>
                                <option value='tv'>unifi TV</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for='location'>Location*</label>

                        <div>
                            <select id='location' name='location' value={this.state.location} onChange={this.handleSelectLocation}>
                                <option value='empty'>Select one</option>
                                <option value='johor'>Johor</option>
                                <option value='kedah/perlis'>Kedah/Perlis</option>
                                <option value='kelantan'>Kelantan</option>
                                <option value='kl'>Kuala Lumpur</option>
                                <option value='melaka'>Melaka</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h5>Attachment</h5>
                        {this.state.image && <img src={this.state.image} />}
                        <input type='file' name='imageAttach' onChange={this.onImageChange} />
                    </div>

                    <input type='submit' title='Submit' />
                </form>
            )
        }
    }

    export default TechnicalCase;