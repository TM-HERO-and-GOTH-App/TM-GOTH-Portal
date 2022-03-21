import React from 'react';

function TechnicalCase() {
    return (
        <form>
            <div>
                <label for='customerName'>Customer Name*</label>
                <div>
                    <input type='text' id='customerName' name='customerName' placeholder='example: Mr Ahmad/Ms Chiu/Mr Rama' />
                </div>
            </div>

            <div>
                <label for='customerNumber'>Customer Mobile Number*</label>
                <div>
                    <input type='tel' id='customerNumber' name='customerName' min={0} placeholder='example: 0123456789' />
                </div>
            </div>

            <div>
                <label for='description'>Description*</label>
                <div>
                    <input type='text' id='description' name='userDescription' placeholder='example: Need Help with abcd@unifi or Sales Lead Package unifi 100mbps' />
                </div>
            </div>

            <div>
                <label for='type'>Type*</label>

                <div id='type' name='assurance'>
                    <p value='assurance'>Assurance</p>
                </div>
            </div>

            <div>
                <label for='product'>Product*</label>

                <div>
                    <select id='product' name='product'>
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
                    <select id='location' name='location'>
                        <option value='empty'>Select one</option>
                    </select>
                </div>
            </div>

            <div>
                <h5>Attachment</h5>
                <input type='file' name='imageAttach' />
            </div>

            <input type='submit' title='Submit' />
        </form>
    )
}

export default TechnicalCase;