import React, { useState } from 'react';
import './styleHeroBuddy.css';

function NonTechnicalCase() {
    const [customerNameInput, setCustomerNameInput] = useState('');
    const [customerMobileNumberInput, setCustomerMobileNumberInput] = useState('');
    const [loggerMobileNumberInput, setLoggerMobileNumber] = useState('');
    const [descriptionInput, setDescription] = useState('');
    const [typeSelect, setTypeSelect] = useState('biling');
    const [productSelect, setProduct] = useState('default');
    const [areaSelect, setArea] = useState('default');
    const [subAreaSelect, setSubArea] = useState('default');
    const [locationSelect, setLocation] = useState('default');
    const [pictureInput, setPicture] = useState('');

    let styles = {
        body: {
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            background: 'darkgrey'
        },
    }

    return (
        <body style={styles.body}>
            <div className="hb-container">
                <div className="hb-title">Non-Technical Case</div>
                <form action="#">
                    <div className="hb-input-group">
                        <label className="hb-detail" for='customerName'>Customer Name*</label>
                        <div className="hb-input-box">
                            <input type='text' id='customerName' name='customerName'
                                placeholder='example: Mr Ahmad/Ms Chiu/Mr Rama' 
                                value={customerNameInput} onChange={(e) => setCustomerNameInput(e.target.value)}
                                />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for='customerNumber'>Customer Mobile Number*</label>
                        <div className="hb-input-box">
                            <input type='tel' id='customerNumber' name='customerName' min={0}
                                placeholder='example: 0123456789' 
                                value={customerMobileNumberInput} onChange={(e) => setCustomerMobileNumberInput(e.target.value)}
                                />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for='description'>Description*</label>
                        <div className="hb-input-box">
                            <input type='text' id='description' name='userDescription'
                                placeholder='example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps'
                                value={descriptionInput} onChange={(e) => setDescription(e.target.value)}
                                />
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for='type'>Type*</label>
                        <div className="hb-input-box">
                            <select id='type' name='type' value={typeSelect}>
                                <option value='biling' disabled>Biling</option>
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for="area">Area*</label>
                        <div className="hb-input-box">
                            <select id="area" name="area" value={areaSelect}>
                                <option value="complaint">Complaint/Enquiries</option>
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for="subarea">Sub-Area*</label>
                        <div className="hb-input-box">
                            <select id="subarea" name="subarea" value={subAreaSelect} onChange={(e) => setSubArea(e.currentTarget.value)}>
                                <option value="default" disabled>Select One</option>
                                <option value="report_progress">Report Progress</option>
                                <option value="payment">Payment</option>
                                <option value="Charges">Charges</option>
                                <option value="bill_details">Bill Details</option>
                                <option value="tos">TOS/RTN</option>
                                <option value="dispute_invalid_charges">Dispute-Invalid Charges</option>
                                <option value="resolution">Complaint Handling & Resolution</option>
                                <option value="payment">Payment Not Updated</option>
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for='product'>Product*</label>
                        <div className="hb-input-box">
                            <select id='product' name='product' value={productSelect} onChange={(e) => setProduct(e.target.value)}>
                                <option value='default'>Select one</option>
                                <option value='broadband'>Broadband</option>
                                <option value='telephony'>Telephony</option>
                                <option value='mobile'>unifi Mobile</option>
                                <option value='tv'>unifi TV</option>
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail" for='location'>Location*</label>
                        <div className="hb-input-box">
                            <select id='location' name='location' value={locationSelect} onChange={(e) =>setLocation(e.target.value)}>
                                <option value='default' disabled>Select one</option>
                            </select>
                        </div>
                    </div>

                    <div className="hb-input-group">
                        <label className="hb-detail">Attachment</label>
                        <div className="hb-attachment">
                            <input type='file' name='imageAttach' />
                        </div>
                    </div>
                    <div className="hb-button">
                        <input className="hb-submit" type='submit' title='Submit' value={pictureInput} onChange={(e) => setPicture(e.target.value)}/>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default NonTechnicalCase;