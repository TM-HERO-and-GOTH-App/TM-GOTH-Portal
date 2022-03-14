import React, { useState } from 'react';
import Layout from './Layout';
import AdvancedSearchService from '../web_service/advance_search_service/AdvanceSearch';
import { Link } from 'react-router-dom';

function AdvancedSearch(props) {
  const [caseToken, setCaseToken] = useState(props.match.params.id);
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showHeroGroupOption, setShowHeroGroupOption] = useState(false);
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nricInput, setNRICInput] = useState('');
  const [caseNumberInput, setCaseNumberInput] = useState('');
  const [vipNameInput, setVIPNameInput] = useState('');
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [srNumberInput, setSRNumberInput] = useState('');
  const [ttNumberInput, setTTNumberInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const advancedSearch = (e) => {
    e.preventDefault();
    AdvancedSearchService.advancedSearch(token, emailInput, fullNameInput, nricInput, srNumberInput,
      ttNumberInput, caseNumberInput, vipNameInput, customerNameInput)
      .then(res => {
        console.log(res);
        setSearchResult(res)
      })
  }

  const reset = () => {
    setFullNameInput('');
    setEmailInput('');
    setNRICInput('');
    setCaseNumberInput('');
    setVIPNameInput('');
    setCustomerNameInput('');
    setSRNumberInput('');
    setTTNumberInput('');
  }

  return (
    <Layout
      pageTitle='Advanced Search'
      pageContent={
        <>
          <div className="col-sm-12">Please enter your keywords...</div>
          <div className="space-2" />

          <div class="row">
            <form name="form" onSubmit={advancedSearch} onReset={reset}>
              <div className="col-sm-2">
                <div className="input-group">
                  <input className="form-control date-picker" id="id-date-picker-1" name="keyStartDate" type='date' style={{ width: 180 }} data-date-format="yyyy-mm-dd" value={startDateInput} onChange={(e) => setStartDateInput(e.currentTarget.val)} placeholder="Date Created (Start)" />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar bigger-110" onClick={() => {
                      const startDate = document.getElementById('id-date-picker-1');
                      startDate.focus()
                    }} />
                  </span>
                </div>
              </div>

              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <div className="input-group">
                  <input className="form-control date-picker" id="id-date-picker-1" name="keyEndDate" type="date" style={{ width: "180px" }} data-date-format="yyyy-mm-dd" value={endDateInput} onChange={(e) => setEndDateInput(e.currentTarget.value)} placeholder="Date Created (End)" />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar bigger-110"></i>
                  </span>
                </div>
              </div>

              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <select className="chosen-select form-control" name="inputs[keyCaseTypeID]" data-placeholder="Case Type..." style={{ display: "none" }}>
                  <option value="0">Case Type...</option>
                  <option value="28">Assurance</option>
                  <option value="37">Billing</option>
                  <option value="503">Caution Report</option>
                  <option value="557">Dr UNIFI</option>
                  <option value="34">Fullfilment</option>
                  <option value="596">Installation</option>
                  <option value="46">Others</option>
                  <option value="419">Sales</option>
                  <option value="542">Save</option>
                  <option value="600">State Manual Task</option>
                  <option value="593">Technical</option>
                  <option value="564">TM Infra</option>
                  <option value="43">TM One</option>
                  <option value="524">TMGo</option>
                  <option value="40">UniFi Mobile</option>
                  <option value="521">Unifi Public Wifi</option>
                </select>
                <div className="chosen-container chosen-container-single" style={{ width: "220px" }} title="">
                  <a className="chosen-single chosen-default">
                    <span>Case Type...</span>
                    <div>
                      <b></b>
                    </div>
                  </a>
                  <div className="chosen-drop">
                    <div className="chosen-search">
                      <input type="text" autocomplete="off" />
                    </div>
                    <ul className="chosen-results">
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-sm-2" style={{ paddingLeft: 10 }}>
                <select className="chosen-select form-control" name="keyHeroGroup" data-placeholder="HERO Group..." style={{ display: 'none' }}>
                  <option value="0">HERO Group...</option>
                  <option value="WKTM">WKTM</option>
                  <option value="TMCC">TMCC</option>
                  <option value="Others">Others</option>
                </select>
                <div className="chosen-container chosen-container-single" style={{ width: "220px" }} title="">
                  <a className="chosen-single chosen-default">
                    <span>HERO Group...</span>
                    <div>
                      <b />
                    </div>
                  </a>
                  <div className="chosen-drop">
                    <div className="chosen-search">
                      <input type="text" autocomplete="off" />
                    </div>
                    <ul className="chosen-results" />
                  </div>
                </div>
              </div>

              <div className="space-20" />
              <br />

              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyFullname" placeholder="HERO Name" value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="keyEmail" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="keyNricNum" placeholder="NRIC Number" value={nricInput} onChange={(e) => setNRICInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="ikeyCaseNum" placeholder="Case ID" value={caseNumberInput} onChange={(e) => setCaseNumberInput(e.target.value)} />
              </div>
              <div className="space-20" />
              <br />
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyVipName" placeholder="VIP Name" value={vipNameInput} onChange={(e) => setVIPNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="keyCustomerName" placeholder="Customer Name" value={customerNameInput} onChange={(e) => customerNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="keySrNum" placeholder="SR Number" value={srNumberInput} onChange={(e) => setSRNumberInput(e.target.value)} />
              </div>
              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <input type="text" style={{ width: "220px" }} name="keyTtNum" placeholder="TT Number" value={ttNumberInput} onChange={(e) => setTTNumberInput(e.target.value)} />
              </div>

              <div className="col-sm-3" style={{ paddingLeft: '10px' }}>
                <button type="reset" className="btn btn-sm btn-inverse">
                  <i className="ace-icon fa fa-repeat align-top bigger-125" />
                  <span>Reset</span>
                </button>
                <button type="submit" className="btn btn-sm btn-primary" style={{ marginLeft: '2.5px' }}>
                  <i className="ace-icon fa fa-search align-top bigger-125" />
                  Search Cases
                </button>
              </div>
            </form>
          </div>

          <div className="col-xs-12">
            <div className="clearfix">
              <div className="pull-right tableTools-container-search" style={{ paddingTop: 10 }} />
            </div>
            <table id="dynamic-table-search" className="table table-striped table-bordered table-hover dataTable no-footer">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th><div align="center">Status</div></th>
                  <th style={{ width: '6%' }}>Aging</th>
                  <th>Type</th>
                  <th><div align="center">VIP</div></th>
                  <th><div align="center" title="Eligibility">ELG</div></th>
                  <th width="8%">Product</th>
                  <th style={{ width: "12%" }}>Customer</th>
                  <th style={{ width: "12%" }}>HERO</th>
                  <th style={{ width: "12%" }}>Owner</th>
                  <th style={{ width: "15%" }}>Latest Remark</th>
                  <th><div align="center">State</div></th>
                  <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell" /></div></th>
                  <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o" /></div></th>
                </tr>
              </thead>
              <tbody>
                {
                  searchResult.length === 0 ?
                    <tr><td colSpan={14}><span style={{ color: 'red' }}>Search result is empty</span></td></tr>
                    :
                    searchResult.map((data, index) => {
                      const date = new Date(data.createdDate)
                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "2-digit",
                        year: "numeric",
                        hour: 'numeric',
                        minute: 'numeric',
                        hourCycle: 'h12'
                      })
                      const agingDay = (data.caseStatus === 'CLOSED') ? data.closedAging : data.unclosedAging;
                      const agingkey = (data.caseStatus === 'CLOSED') ? data.closedAgingDH : data.unclosedAgingDH;
                      // const formattedTime = date.toLocaleDateString('en-GB', {
                      //   hour: 'numeric',
                      //   minute: 'numeric',
                      //   hourCycle: 'h12'
                      // })
                      return data.response === 'FAILED' ?
                        <tr><td colSpan={11}><span style={{ color: 'red' }}>Search result is empty</span></td></tr>
                        :
                        <tr key={index}>
                          <td>
                            <Link to={`/case-detail/${data.cToken}`}>
                              {data.caseNum}
                            </Link>
                            <br />
                            <small title="Created Date">{formattedDate}</small>
                            {/* <br /> */}
                            {/* <small title="Created Date">{formattedTime}</small> */}
                          </td>
                          <td>
                            <div align="center">
                              {
                                data.caseStatus === 'NEW' ? <span className='badge badge-danger'>N</span> :
                                  data.caseStatus === 'IN-PROGRESS' ? <span className='badge badge-info'>IP</span> :
                                    data.caseStatus === 'ASSIGNED' ? <span className='badge badge-info'>A</span> :
                                      data.caseStatus === 'CLOSED' ? <span className='badge badge-success'>CL</span> :
                                        data.caseStatus === 'CANCELLED' ? <span className='badge badge-info'>CA</span> :
                                          <span className='badge badge-pink'>TBD</span>
                              }
                            </div>
                          </td>
                          <td>
                            <div align="center" title='Day:Hour'>
                              {agingDay < 16 ? agingkey : <span style={{ fontSize: "10px" }} className={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>{agingkey}</span>}
                            </div>
                          </td>
                          <td>{data.caseType}</td>
                          <td>
                            <div align="center">
                              {data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : '-'}
                            </div>
                          </td>
                          <td align='center'>{data.eligibility}</td>
                          <td>{data.productName}</td>
                          <td>{data.customerName}</td>
                          <td>{data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : data.fullname}</td>
                          <td>{data.ownerName} <span class="label label-lg label-info arrowed-right">
                            <small>
                              {data.stakeholderName}
                            </small>
                          </span></td>
                          <td>{data.remark}</td>
                          <td>{data.areaLocation}</td>
                          <td>
                            <div align="center">
                              {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning">{data.totalNewAlert}</span> : 0}
                            </div>
                          </td>
                          <td>
                            <div align="center">
                              <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${caseToken}`}>
                                Open
                                <i className="ace-icon fa fa-arrow-right icon-on-right" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                    })
                }
              </tbody>
            </table>
          </div>{/* /.span */}
          {/* /.row */}
        </>
      }
    />
  );
}



export default AdvancedSearch;