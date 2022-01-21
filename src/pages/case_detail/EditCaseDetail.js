import React from 'react';
import Layout from '../Layout';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import { Link } from 'react-router-dom';

class EditCaseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(sessionStorage.getItem('userToken')),
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            caseToken: this.props.match.params.id,
            caseDetailData: [],
            alertStatus: false,
            alertMessage: '',
            statusBadge: '',
            customerName: '',
            packageName: '',
            serviceAddress: '',
            serviceID: '',
            srNumber: '',
            ttNumber: '',
            caseType: '0',
            locationType: '0',
            productType: '0',
            segmentType: '0',
            sourceType: '0',
            subSourceType: '0',
        }
        this.editCaseDetail = this.editCaseDetail.bind(this);
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.getCaseDetail();
    }

    editCaseDetail(e) {
        e.preventDefault();
        CaseDetailService.updateCaseInfo(this.state.token, this.state.caseToken, this.state.caseType, this.state.productType,
            this.state.packageName, this.state.serviceID, this.state.serviceAddress, this.state.srNumber, this.state.ttNumber, this.state.locationType,
            this.state.customerName, this.state.segmentType).then(res => {
                console.log(res)
                if (res.response === 'FAILED') {
                    this.setState({
                        alertStatus: true,
                        statusBadge: 'danger',
                        alertMessage: 'The case failed to updated.'
                    })
                } else {
                    this.setState({
                        alertStatus: true,
                        statusBadge: 'success',
                        alertMessage: 'The case has been successfully updated.'
                    })
                }
            });
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res })
        })
    }

    reset() {
        this.setState({
            customerName: '',
            packageName: '',
            serviceAddress: '',
            serviceID: '',
            srNumber: '',
            ttNumber: '',
            caseType: '0',
            locationType: '0',
            productType: '0',
            segmentType: '0',
            sourceType: '0',
            subSourceType: '0'
        })
    }

    render() {
        return (
            <Layout pageContent={
                <div>

                    <div className="page-header">
                        <h1>CASE DETAIL : {this.state.caseDetailData.caseNum}</h1>
                    </div> {/* <!-- /.page-header --> */}
                    <div className="row">
                        {this.state.alertStatus &&
                            <div className="col-sm-12">
                                <div className={`alert alert-block alert-${this.state.statusBadge}`}>
                                    <button type="button" className="close" data-dismiss="alert">
                                        <i className="ace-icon fa fa-times"></i>
                                    </button>
                                    {this.state.alertMessage}
                                </div>
                            </div>
                        }
                        <br />
                        <div className="space-10" />
                        <div className="col-sm-4">
                            <Link className="btn btn-primary" to={`/case-detail/${this.state.caseToken}`}>
                                <i className="ace-icon fa fa-arrow-left icon-on-left"></i>
                                Back to Case Detail
                            </Link>
                        </div>
                        <br />
                        <div className="space-20" />
                        <form name="form" onSubmit={this.editCaseDetail} onReset={this.reset}>
                            <div className="col-sm-6">
                                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                                    {this.state.caseDetailData ?
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">CASE OWNER</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    <b>
                                                        {this.state.caseDetailData.ownerName + ' - ' + this.state.caseDetailData.stakeholderName}
                                                    </b>
                                                </span>
                                            </div>
                                        </div> :
                                        <div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">GROUP POOL</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username">
                                                        <b>{this.state.caseDetailData.stakeholderName}</b>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="profile-info-row">
                                                <div className="profile-info-name">CASE OWNER</div>
                                                <div className="profile-info-value">
                                                    <span className="editable" id="username"><i style={{ color: "red" }}>Unassigned</i></span>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ width: "20%" }}> HERO </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="username">{this.state.caseDetailData.fullname}</span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Customer </div>
                                        <div className="profile-info-value">
                                            {this.state.caseDetailData.customerName}
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Customer </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="actualCustomerName" placeholder="Actual Customer Name" value={this.state.customerName} onChange={(e) => this.setState({ customerName: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ color: "red" }}> State </div>

                                        <div className="profile-info-value">
                                            <select className="chosen-select form-control" name="areaLocationID" value={this.state.locationType} onChange={(e) => this.setState({ locationType: e.target.value })}>
                                                <option value="0">Choose a State...</option>
                                                {this.state.lovData.filter(filter => filter.lovGroup === 'AREA-LOCATION').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Contact No. </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="age">{this.state.caseDetailData.mobileNum}</span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> NRIC/BRN </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">{this.state.caseDetailData.nricNum}</span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Descriptions </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="login">
                                                <i style={{ color: "blue" }}>
                                                    {this.state.caseDetailData.caseContent}
                                                </i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Case Status </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="login">{this.state.caseDetailData.caseStatus}</span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Created Date </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="about">{this.state.caseDetailData.createdDate}</span>
                                        </div>
                                    </div>

                                    {this.state.caseDetailData.closedDate ?
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Closed Date </div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="about">{this.state.caseDetailData.closedDate}</span>
                                            </div>
                                        </div> : null
                                    }
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ color: 'red', width: '20%' }}> Case Type </div>

                                        <div className="profile-info-value">
                                            <select className="chosen-select form-control" name="caseTypeID" data-placeholder="Choose a Case Type..." value={this.state.caseType} onChange={(e) => this.setState({ caseType: e.target.value })}>
                                                <option value="0">Choose a Case Type...</option>
                                                {this.state.lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ color: "red" }}> Product Name</div>
                                        <div className="profile-info-value">
                                            <select className="chosen-select form-control" name="productNameID" value={this.state.productType} onChange={(e) => this.setState({ productType: e.target.value })}>
                                                <option value="0" >Choose a Product Name...</option>
                                                {this.state.lovData.filter(filter => filter.lovGroup === 'PRODUCT').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Segment </div>
                                        <div className="profile-info-value">
                                            <select className="chosen-select form-control" name="segmentID" value={this.state.segmentType} onChange={(e) => this.setState({ segmentType: e.target.value })}>
                                                <option value="0">Choose a Segment...</option>
                                                {this.state.lovData.filter(filter => filter.lovGroup === 'SEGMENT').map(data => {
                                                    return <option key={data.lovID} value={data.lovID}>{data.lovName}</option>
                                                }
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Package Name </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="packageName" placeholder="Package Name" value={this.state.packageName} onChange={(e) => this.setState({ packageName: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Service ID </div>

                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="serviceID" placeholder="Service ID" value={this.state.serviceID} onChange={(e) => this.setState({ serviceID: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> Service Address </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="serviceAddress" placeholder="Service Address" value={this.state.serviceAddress} onChange={(e) => this.setState({ serviceAddress: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name" style={{ color: "red" }}> SR Number </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="srNum" placeholder="SR Number" value={this.state.srNumber} onChange={(e) => this.setState({ srNumber: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="profile-info-row">
                                        <div className="profile-info-name"> TT Number </div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="signup">
                                                <input className="input-sm" style={{ width: "100%" }} type="text" name="ttNum" placeholder="TT Number" value={this.state.ttNumber} onChange={(e) => this.setState({ ttNumber: e.target.value })} />
                                            </span>
                                        </div>
                                    </div>

                                    {/* <!-- if not from MOBILE APP --> */}
                                    {/* Separate the 2 of the option because if combine them both in the same statement, they will not display correctly */}
                                    {this.state.lovData.filter(filter => filter.lovID !== 284) &&
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Source </div>

                                            <div className="profile-info-value">
                                                <select className="chosen-select form-control" name="sourceID" value={this.state.sourceType} onChange={(e) => this.setState({ sourceType: e.target.value })}>
                                                    <option value="0">Choose a Source...</option>
                                                    {this.state.lovData.filter(filter => filter.lovGroup === 'SOURCE' && filter.lovName !== 'Mobile Apps').map((data, key) => {
                                                        return <option key={key} value={data.lovID}>{data.lovName}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    }

                                    {this.state.lovData.filter(filter => filter.lovID !== 284) &&
                                        <div className="profile-info-row">
                                            <div className="profile-info-name"> Sub Source </div>
                                            <div className="profile-info-value">
                                                <select className="chosen-select form-control" name="subSourceID" value={this.state.subSourceType} onChange={(e) => this.setState({ subSourceType: e.target.value })}>
                                                    <option value="0">Choose a Sub Source...</option>
                                                    {this.state.lovData.filter(filter => filter.lovGroup === 'SUB-SOURCE').map((data, key) => {
                                                        return <option key={key} value={data.lovID}>{data.lovName}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div style={{ clear: "both" }}></div>
                            <div className="col-sm-6" style={{ paddingTop: "30px" }}>
                                <p style={{ color: "red" }}><i>*** Inputs with red color are compulsory</i></p>
                                <button type="reset" className="btn btn-sm btn-inverse">
                                    <i className="ace-icon fa fa-repeat align-top bigger-125"></i>
                                    <span>Reset</span>
                                </button>
                                <button type="submit" className="btn btn-sm btn-success">
                                    <i className="ace-icon fa fa-save align-top bigger-125"></i>
                                    Update Info
                                </button>
                            </div>
                        </form>
                    </div>{/* <!-- /.row --> */}
                </div>
            }
            />
        )
    }
}

export default EditCaseDetail;