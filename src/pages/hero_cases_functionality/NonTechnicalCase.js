import React from 'react';
import CaseService from '../../web_service/login_web_service/CaseService';

class NonTechnicalCase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobileNumber: '',
            description: '',
            description: '',
            type: 'empty',
            product: 'empty',
            location: 'empty',
            image: null,
            currLatForm: '',
            currLat: '',
            currLon: '',
            cToken: '',
            stateID: '',
            token: JSON.parse(localStorage.getItem('userToken')),
            lovData: JSON.parse(localStorage.getItem('LovData'))
        }
        this.handleSelectType = this.handleSelectType.bind(this);
        this.handleSelectProduct = this.handleSelectProduct.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.createCase = this.createCase.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.location = this.location.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleSelectType(e) {
        this.setState({ type: e.target.value });
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
        this.location(this.state.location);
        this.createCase();
    }

    createCase() {
        CaseService.createSubmit(this.state.token, this.state.name, this.state.mobileNumber, this.item, this.state.location, 284, 46, this.state.description, this.state.stateID, this.herobuddyResponses)
            .then(response => {
                const svrResponse = response;
                console.log(response);
                if (response.response == 'OK') {
                    this.setState({ cToken: svrResponse.cToken });
                    //----------no have pic-------------------
                    if (this.state.image === null) {
                        //----------for null latlong-------------------
                        if (this.state.currLatForm == null) {
                            this.setState({ currLon: null });
                            this.setState({ currLat: null });
                            //this.showSuccessAlert(this.svrResponseMsg);    
                            alert(this.svrResponseMsg);
                            // this.navCtrl.push(TrackingPage);
                            //----------for have latlong-------------------
                        } else {
                            this.setState({ image: "" });
                            // this.showSuccessAlert('Case', this.svrResponse.status);
                            alert(svrResponse.status);
                            this.uploadPic(svrResponse.status);
                        }
                    }
                    //----------for have pic-------------------
                    else {
                        //this.showSuccessAlert('Case', this.svrResponse.status);
                        this.uploadPic(svrResponse.status);
                    }
                } else {
                    alert('Failed to create case');
                }
                console.log(this.state.name + ',' + this.state.mobileNumber + ',' + this.state.type + ',' + this.state.location + ',' + 'complaint' + ',' + 284 + ','
                    + 46 + ',' + 58 + ',' + this.state.stateID + ',' + this.state.description);
            });
    }

    uploadPic(svrResponseMsg) {
        if (this.state.currLatForm == null) {
            this.setState({ currLatForm: "-" });
            this.setState({ currLonForm: "-" });
        }
        CaseService.attachPicture(this.state.token, this.state.cToken, this.state.image, this.currLonForm, this.currLatForm)
            .then(response => {
                const PIC_GPS = response;
                if (this.PIC_GPS.response == "FAILED") {
                    // loader.dismiss();
                    alert(this.PIC_GPS.status);
                    //this.createForm.reset();
                }
                else {
                    alert(this.PIC_GPS.status);

                    this.setState({ image: null });
                    this.setState({ currLon: null });
                    this.setState({ currLat: null });
                    this.setState({ currLatForm: null });
                    this.setState({ currLonForm: null });
                    // this.closeCreateCaseModal();
                    // this.navCtrl.push(TrackingPage);
                    alert(svrResponseMsg);
                }
            }, errorMsg => { console.log(errorMsg) });
    };

    //location mapp
    location(state) {
        console.log(state);
        if (state == 'JOHOR') {
            this.setState({ stateID: 124 });
        }
        else if (state == 'KEDAH/PERLIS') {
            this.setState({stateID: 127});
        }
        else if (state == 'KELANTAN') {
            this.setState({stateID: 133});
        }
        else if (state == 'KUALA LUMPUR') {
            this.setState({stateID: 139});
        }
        else if (state == 'MELAKA') {
            this.setState({stateID: 142});
        }
        else if (state == 'MSC') {
            this.setState({stateID: 145});
        }
        else if (state == 'NEGERI SEMBILAN') {
            this.setState({stateID: 148});
        }
        else if (state == 'PAHANG') {
            this.setState({stateID: 151});
        }
        else if (state == 'PERAK') {
            this.setState({stateID: 157});
        }
        else if (state == 'PETALING JAYA') {
            this.stateID = 163;
        }
        else if (state == 'PULAU PINANG') {
            this.setState({stateID: 154});
        }
        else if (state == 'SABAH') {
            this.setState({stateID: 166});
        }
        else if (state == 'SARAWAK') {
            this.setState({stateID: 169});
        }
        else if (state == 'SELANGOR') {
            this.setState({stateID: 160});
        }
        else if (state == 'TERENGGANU') {
            this.setState({stateID: 136});
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label for='customerName'>Customer Name*</label>
                    <div>
                        <input type='text' id='customerName' name='customerName' placeholder='example: Mr Ahmad/Ms Chiu/Mr Rama' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                </div>

                <div>
                    <label for='customerNumber'>Customer Mobile Number*</label>
                    <div>
                        <input type='tel' id='customerNumber' name='customerName' min={0} placeholder='example: 0123456789' value={this.state.mobileNumber} onChange={(e) => this.setState({ mobileNumber: e.target.value })} />
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

                    <div>
                        <select id='type' name='type' value={this.state.type} onChange={this.handleSelectType}>
                            <option value='empty' disabled>Select one</option>
                            <option value='biling'>Biling</option>
                            <option value='install'>Installation</option>
                        </select>
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
                            <option value='empty' disabled>Select one</option>
                            { this.state.lovData.filter(lov => lov.lovGroup == "AREA-LOCATION").map(data => 
                                <option key={data.lovID} value={data.lovName}>{data.lovName}</option>
                            )}
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

export default NonTechnicalCase;