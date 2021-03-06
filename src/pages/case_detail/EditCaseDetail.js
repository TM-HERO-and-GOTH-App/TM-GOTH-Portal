import React, {useState, useEffect} from "react";
import Layout from "../Layout";
// import Footer from "../Footer";
import CaseDetailService from "../../web_service/case_detail_service/CaseDetailService";
import {Link} from "react-router-dom";

function EditCaseDetail(props) {
    const userData = JSON.parse(sessionStorage.getItem('UserData'))
    const [token] = useState(JSON.parse(sessionStorage.getItem("userToken")));
    const [lovData] = useState(JSON.parse(sessionStorage.getItem("LovData")));
    const [caseToken] = useState(props.match.params.id);
    const [caseDetailData, setCaseDetailData] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [statusBadge, setStatusBadge] = useState("");
    const [caseType, setCaseType] = useState("0");
    const [productType, setProductType] = useState("0");
    const [packageNameInput, setPackageNameInput] = useState("");
    const [serviceAddressInput, setServiceAddressInput] = useState("");
    const [srNumberInput, setSrNumberInput] = useState("");
    const [ttNumberInput, setTtNumberInput] = useState("");
    const [serviceIDInput, setServiceIDInput] = useState("");
    const [locationType, setLocationType] = useState("0");
    const [customerNameInput, setCustomerNameInput] = useState("");
    const [segmentType, setSegmentType] = useState("0");
    const [sourceType, setSourceType] = useState('0');
    const [customerLoginID, setCustomerLoginID] = useState('');
    const [ckcStatus, setCKCStatus] = useState('');
    const [ckcNumberInput, setCKCNumberInput] = useState('')
    const [externalSystemInput, setExternalSystemInput] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [subAreaCode, setSubAreaCode] = useState('');
    const [symptomCode, setSymptomCode] = useState('');
    const [ambassador, setAmbassador] = useState(false);
    const [stakeHolderRef, setStakeHolderRef] = useState('');

    useEffect(() => {
        const getCaseDetail = () => {
            CaseDetailService.getCaseDetail(token, caseToken).then(res => {
                console.log(res.data, 'getCaseDetail')
                setCaseDetailData(res.data)
            })
        }

        getCaseDetail();
    }, []);

    const editCaseDetail = (e) => {
        e.preventDefault();
        CaseDetailService.updateCaseInfo(
            token, userData.hID, caseToken, caseType, productType, packageNameInput,
            serviceIDInput, serviceAddressInput, srNumberInput, ttNumberInput, locationType,
            customerNameInput, segmentType, sourceType, ckcStatus, ckcNumberInput, customerLoginID,
            stakeHolderRef, externalSystemInput, areaCode, subAreaCode, parseFloat(symptomCode)
        ).then((res) => {
            console.log(res, 'editCaseDetail');
            if (res.response === "FAILED") {
                setAlertStatus(true);
                setStatusBadge("danger");
                setAlertMessage("The case failed to updated.");
            } else {
                props.history.push(`/case-detail/${caseDetailData.C_TOKEN}`, {message: res.data[0].message})
            }
        });
    };

    const onInitialLoad = () => {
        setCustomerNameInput(caseDetailData.CUSTOMER_NAME)
        setPackageNameInput(caseDetailData.PACKAGE_NAME)
        setServiceAddressInput(caseDetailData.SERVICE_ADDRESS)
        setServiceIDInput(caseDetailData.SERVICE_ID)
        setSrNumberInput(caseDetailData.SR_NUM)
        setTtNumberInput(caseDetailData.TT_NUM)
        setCaseType(caseDetailData.CASE_TYPE_ID)
        setLocationType(caseDetailData.AREA_LOCATION_ID)
        setProductType(caseDetailData.PRODUCT_NAME_ID)
        setSegmentType(caseDetailData.SEGMENT_ID)
        setSourceType(caseDetailData.SOURCE_ID)
        setCKCStatus(caseDetailData.CKC)
        setCKCNumberInput(caseDetailData.CKC_NUM)
        setStakeHolderRef(caseDetailData.STAKEHOLDER_REF)
        setExternalSystemInput(caseDetailData.EXT_SYS_REF)
        setSymptomCode(caseDetailData.SYMPTOM_CODE)
        setAreaCode(caseDetailData.AREA_CODE)
        setSubAreaCode(caseDetailData.SUB_AREA)
        setCustomerLoginID(caseDetailData.LOGIN_ID)
        setAmbassador(caseDetailData.VIP)
    }

    useEffect(() => {
            onInitialLoad();
        }, [caseDetailData]
    )

    const reset = () => {
        setCustomerNameInput("");
        setPackageNameInput("");
        setServiceAddressInput("");
        setServiceIDInput("");
        setSrNumberInput("");
        setTtNumberInput("");
        setCaseType("0");
        setLocationType("0");
        setProductType("0");
        setSegmentType("0");
        setCKCStatus('')
        setCKCNumberInput('')
        setStakeHolderRef('')
        setExternalSystemInput('')
        setSymptomCode('0')
        setAreaCode('0')
        setSubAreaCode('0')
        // setSourceType('')
        // setSubSourceType("0");
    };

    return (
        <Layout
            pageTitle={
                <span>
          CASE DETAIL : <span style={{color: 'green'}}>{caseDetailData.CASE_NUM}</span>
        </span>
            }
            pageContent={
                <div className="row">
                    {!alertStatus && (
                        <div className="col-sm-12">
                            <div className={`alert alert-block alert-${statusBadge}`}>
                                <button type="button" className="close" data-dismiss="alert">
                                    <i className="ace-icon fa fa-times"/>
                                </button>
                                {alertMessage}
                            </div>
                        </div>
                    )}
                    <br/>
                    <div className="space-10"/>
                    <div className="col-sm-4">
                        <Link
                            className="btn btn-primary"
                            to={`/case-detail/${caseToken}`}
                        >
                            <i className="ace-icon fa fa-arrow-left icon-on-left"/>
                            Back to Case Detail
                        </Link>
                    </div>
                    <br/>
                    <div className="space-20"/>
                    <form name="form" onSubmit={editCaseDetail} onReset={reset}>
                        <div className="col-sm-6">
                            <div
                                className="profile-user-info profile-user-info-striped"
                                style={{margin: 0}}
                            >
                                {caseDetailData ? (
                                    <div className="profile-info-row">
                                        <div className="profile-info-name">CASE OWNER</div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="username">
                                                <b>
                                                    {caseDetailData.OWNER_NAME +
                                                        " - " +
                                                        caseDetailData.STAKEHOLDER_NAME}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">GROUP POOL</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    <b>{caseDetailData.STAKEHOLDER_NAME}</b>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="profile-info-row">
                                            <div className="profile-info-name">CASE OWNER</div>
                                            <div className="profile-info-value">
                                                <span className="editable" id="username">
                                                    <i style={{color: "red"}}>Unassigned</i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{width: "20%"}}>
                                        HERO
                                    </div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="username">
                                          {caseDetailData.FULLNAME}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Customer</div>
                                    <div className="profile-info-value">
                                        {caseDetailData.CUSTOMER_NAME}
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name"> Customer</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="customerName"
                                                placeholder="Customer Name"
                                                value={customerNameInput}
                                                onChange={(e) => setCustomerNameInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{color: "red"}}>
                                        State{" "}
                                    </div>

                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="areaLocationID"
                                            value={locationType}
                                            onChange={(e) => setLocationType(e.target.value)}
                                        >
                                            <option value="0">Choose a State...</option>
                                            {lovData
                                                .filter(
                                                    (filter) => filter.L_GROUP === "AREA-LOCATION"
                                                )
                                                .map((data) => {
                                                    return (
                                                        <option key={data.L_ID} value={data.L_ID}>
                                                            {data.L_NAME}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">Contact No.</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="age">
                                            {caseDetailData.MOBILE_NUM}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">NRIC/BRN</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            {caseDetailData.NRIC_NUM}
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Descriptions</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="login">
                                            <i style={{color: "blue"}}>
                                                {caseDetailData.CASE_CONTENT}
                                            </i>
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Case Status</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="login">
                                            {caseDetailData.CASE_STATUS}
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">Created Date</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="about">
                                            {caseDetailData.CREATED_DATE}
                                        </span>
                                    </div>
                                </div>

                                {caseDetailData.CLOSED_DATE ? (
                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Closed Date</div>
                                        <div className="profile-info-value">
                                            <span className="editable" id="about">
                                                {caseDetailData.CLOSED_DATE}
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="profile-info-row">
                                    <div className="profile-info-name">Login ID</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="loginID"
                                                placeholder="Login ID"
                                                value={customerLoginID}
                                                onChange={(e) => setCustomerLoginID(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Service ID</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="serviceID"
                                                placeholder="Service ID"
                                                value={serviceIDInput}
                                                onChange={(e) => setServiceIDInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Service Address</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="serviceAddress"
                                                placeholder="Service Address"
                                                value={serviceAddressInput}
                                                onChange={(e) => setServiceAddressInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Ambassador</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="segmentID"
                                            value={ambassador}
                                            onChange={(e) => setAmbassador(e.target.value)}
                                            disabled
                                        >
                                            <option value={false}>False</option>
                                            <option value={true}>True</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Stakeholder Ref.</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="stakeholderRef"
                                            data-placeholder="Choose a Stakeholder Reference..."
                                            value={stakeHolderRef}
                                            onChange={(e) => setStakeHolderRef(e.target.value)}
                                        >
                                            <option value="n/a" selected="yes">Choose a Stakeholder Reference...
                                            </option>
                                            <option value="NMO">NMO</option>
                                            <option value="BRD">BRD</option>
                                            <option value="PRODUCT">Product</option>
                                            <option value="RRT">RRT</option>
                                            <option value="RRM">RRM</option>
                                            <option value="GIT">GIT</option>
                                            <option value="RESELLER">Reseller</option>
                                            <option value="CMC">CMC</option>
                                            <option value="TMPOINT">TM Point</option>
                                            <option value="NOC">NOC</option>
                                            <option value="CSM">CSM State</option>
                                            <option value="SFM">SFM</option>
                                            <option value="LOB/PTT">LOB/PTT</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Contact-Centre">Contact Centre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">External system Ref.</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="extSysRef"
                                                placeholder="External System Reference"
                                                value={externalSystemInput}
                                                onChange={(e) => setExternalSystemInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div
                                className="profile-user-info profile-user-info-striped"
                                style={{margin: 0}}
                            >
                                <div className="profile-info-row">
                                    <div
                                        className="profile-info-name"
                                        style={{color: "red", width: "20%"}}
                                    >
                                        Case Type
                                    </div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="caseTypeID"
                                            data-placeholder="Choose a Case Type..."
                                            value={caseType}
                                            onChange={(e) => setCaseType(e.target.value)}
                                        >
                                            <option value="0">Choose a Case Type...</option>
                                            {lovData
                                                .filter((filter) => filter.L_GROUP === "CASE-TYPE")
                                                .map((data) => {
                                                    return (
                                                        <option key={data.L_ID} value={data.L_ID}>
                                                            {data.L_NAME}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{color: "red"}}>
                                        Product Name
                                    </div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="productNameID"
                                            value={productType}
                                            onChange={(e) => setProductType(e.target.value)}
                                        >
                                            <option value="0">Choose a Product Name...</option>
                                            {lovData
                                                .filter((filter) => filter.L_GROUP === "PRODUCT")
                                                .map((data) => {
                                                    return (
                                                        <option key={data.L_ID} value={data.L_ID}>
                                                            {data.L_NAME}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">Segment</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="segmentID"
                                            value={segmentType}
                                            onChange={(e) => setSegmentType(e.target.value)}
                                        >
                                            <option value="0">Choose a Segment...</option>
                                            {lovData
                                                .filter((filter) => filter.L_GROUP === "SEGMENT")
                                                .map((data) => {
                                                    return (
                                                        <option key={data.L_ID} value={data.L_ID}>
                                                            {data.L_NAME}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Segment Code</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="login">
                                            {caseDetailData.SEGMENT_CODE === null ? ' N / A' : caseDetailData.SEGMENT_CODE}
                                        </span>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Package Name</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="packageName"
                                                placeholder="Package Name"
                                                value={packageNameInput}
                                                onChange={(e) => setPackageNameInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">Symptom</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="symptomType"
                                            value={symptomCode}
                                            onChange={(e) => setSymptomCode(e.target.value)}
                                            placeholder='Choose a Symptom Type...'
                                        >
                                            <option value='0' disabled>Choose a Symptom Type</option>
                                            {/* {
                                                        lovData.filter(filter => filter.lovGroup === 'SYMPTOM').map((data, key) => {
                                                            return <option key={key}
                                                                value={data.lovID}>{data.lovName}</option>
                                                        })
                                                    } */}
                                            <option value='800'>All Services Down</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Area (for SR creation)</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="areaCode"
                                            value={areaCode}
                                            onChange={(e) => setAreaCode(e.target.value)}
                                        >
                                            <option value='0' disabled>Choose a Area Type</option>
                                            {/* {
                                                        lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                                                            return <option key={key}
                                                                value={data.lovID}>{data.lovName}</option>
                                                        })
                                                    } */}
                                            <option value='660'>Service Failure</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">Sub-Area (for SR creation)</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="subAreaCode"
                                            value={subAreaCode}
                                            onChange={(e) => setSubAreaCode(e.target.value)}
                                        >
                                            <option value='0' disabled>Choose a Sub-area Type</option>
                                            {/* {
                                                        lovData.filter(filter => filter.lovGroup === 'CASE-TYPE').map((data, key) => {
                                                            return <option key={key}
                                                                value={data.lovID}>{data.lovName}</option>
                                                        })
                                                    } */}
                                            <option value='700'>All Services Down</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name" style={{color: "red"}}>
                                        SR Number
                                    </div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="srNum"
                                                placeholder="SR Number"
                                                value={srNumberInput}
                                                onChange={(e) => setSrNumberInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>

                                <div className="profile-info-row">
                                    <div className="profile-info-name">TT Number</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="ttNum"
                                                placeholder="TT Number"
                                                value={ttNumberInput}
                                                onChange={(e) => setTtNumberInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>

                                {/* <!-- if not from MOBILE APP --> */}
                                {/* Separate the 2 of the option because if combine them both in the same statement, they will not display correctly */}
                                {lovData.filter((filter) => filter.L_ID !== 284) && (
                                    <div className="profile-info-row">
                                        <div className="profile-info-name">Source</div>
                                        <div className="profile-info-value">
                                            <select
                                                className="chosen-select form-control"
                                                name="sourceID"
                                                value={sourceType}
                                                onChange={(e) => setSourceType(e.target.value)}
                                            >
                                                <option value='0'>Choose a Source...</option>
                                                {lovData
                                                    .filter(
                                                        (filter) =>
                                                            filter.L_GROUP === "SOURCE" &&
                                                            filter.L_NAME !== "Mobile Apps"
                                                    )
                                                    .map((data, key) => {
                                                        return (
                                                            <option key={key} value={data.L_ID}>
                                                                {data.L_NAME}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {/*Sub-Source*/}
                                {/*{lovData.filter((filter) => filter.L_ID !== 284) && (*/}
                                {/*    <div className="profile-info-row">*/}
                                {/*        <div className="profile-info-name">Sub Source</div>*/}
                                {/*        <div className="profile-info-value">*/}
                                {/*            <select*/}
                                {/*                className="chosen-select form-control"*/}
                                {/*                name="subSourceID"*/}
                                {/*                value={subSourceType}*/}
                                {/*                onChange={(e) => setSubSourceType(e.target.value)}*/}
                                {/*            >*/}
                                {/*                <option value="0">Choose a Sub Source...</option>*/}
                                {/*                {lovData*/}
                                {/*                    .filter(*/}
                                {/*                        (filter) => filter.L_GROUP === "SUB-SOURCE"*/}
                                {/*                    )*/}
                                {/*                    .map((data, key) => {*/}
                                {/*                        return (*/}
                                {/*                            <option key={key} value={data.L_ID}>*/}
                                {/*                                {data.L_NAME}*/}
                                {/*                            </option>*/}
                                {/*                        );*/}
                                {/*                    })}*/}
                                {/*            </select>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <div className="profile-info-row">
                                    <div className="profile-info-name">CKC Status</div>
                                    <div className="profile-info-value">
                                        <select
                                            className="chosen-select form-control"
                                            name="ckcStatus"
                                            value={ckcStatus}
                                            onChange={(e) => setCKCStatus(e.target.value)}
                                        >
                                            <option value=''>Choose a Value...</option>
                                            <option value="N">No</option>
                                            <option value="Y">Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile-info-row">
                                    <div className="profile-info-name">CKC Number</div>
                                    <div className="profile-info-value">
                                        <span className="editable" id="signup">
                                            <input
                                                className="input-sm"
                                                style={{width: "100%"}}
                                                type="text"
                                                name="ckcNum"
                                                placeholder="CKC Number"
                                                value={ckcNumberInput}
                                                onChange={(e) => setCKCNumberInput(e.target.value)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{clear: "both"}}/>
                        <div className="col-sm-6" style={{paddingTop: "30px"}}>
                            <p style={{color: "red"}}>
                                <i>*** Inputs with red color are compulsory</i>
                            </p>
                            <button type="reset" className="btn btn-sm btn-inverse">
                                <i className="ace-icon fa fa-repeat align-top bigger-125"/>
                                <span>Reset</span>
                            </button>
                            <button type="submit" className="btn btn-sm btn-success">
                                <i className="ace-icon fa fa-save align-top bigger-125"/>
                                Update Info
                            </button>
                        </div>
                    </form>
                </div>
            }
        />
    );
}

export default EditCaseDetail;
