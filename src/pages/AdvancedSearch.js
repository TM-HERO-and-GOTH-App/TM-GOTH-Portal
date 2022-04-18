import React, { useState } from 'react';
import Layout from './Layout';
import AdvancedSearchService from '../web_service/advance_search_service/AdvanceSearch';
import { Link } from 'react-router-dom';

function AdvancedSearch(props) {
  const [caseToken, setCaseToken] = useState(props.match.params.id);
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showHeroGroupOption, setShowHeroGroupOption] = useState(false);
  const [caseType, setCaseType] = useState('0');
  const [heroGroupType, setHeroGroupType] = useState('0');
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
  const [calendarDays, setCalendarDays] = useState('');
  const [calendarMonth, setCalendarMonth] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [nextMonth, setNextMonth] = useState(false);
  const [previousMonth, setPreviousMonth] = useState(false);

  const Calendar = () => {
    return (
      <div className={`datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-bottom ${showCalendar ? "datepicker-dropdown:after datepicker-orient-left:after datepicker-orient-bottom:after" : "datepicker-orient-bottom:before datepicker-orient-left:before datepicker-dropdown:before"}`} 
      style={{ marginTop: "50px", marginLeft: "11.5px", display: "block" }}><div className="datepicker-days" style={{ display: "block" }}>
        <table className=" table-condensed">
          <thead>
            <tr>
              <th colSpan="7" className="datepicker-title" style={{ display: "none" }}>
              </th>
            </tr>
            <tr>
              <th className="prev" style={{ visibility: "visible" }}>«</th>
              <th colSpan="5" className="datepicker-switch">April 2022</th>
              <th className="next" style={{ visibility: "visible" }} onClick={() => alert('forward button pressed')}>»</th>
            </tr>
            <tr>
              <th className="dow">Su</th>
              <th className="dow">Mo</th>
              <th className="dow">Tu</th>
              <th className="dow">We</th>
              <th className="dow">Th</th>
              <th className="dow">Fr</th>
              <th className="dow">Sa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="old day">27</td>
              <td className="old day">28</td>
              <td className="old day">29</td>
              <td className="old day">30</td>
              <td className="old day">31</td>
              <td className="day">1</td>
              <td className="day">2</td>
            </tr>
            <tr>
              <td className="day">3</td>
              <td className="day">4</td>
              <td className="day">5</td>
              <td className="day">6</td>
              <td className="day">7</td>
              <td className="day">8</td>
              <td className="day">9</td>
            </tr>
            <tr>
              <td className="day">10</td>
              <td className="day">11</td>
              <td className="day">12</td>
              <td className="day">13</td>
              <td className="day">14</td>
              <td className="day">15</td>
              <td className="today day">16</td>
            </tr>
            <tr>
              <td className="day">17</td>
              <td className="day">18</td>
              <td className="day">19</td>
              <td className="day">20</td>
              <td className="day">21</td>
              <td className="day">22</td>
              <td className="day">23</td>
            </tr>
            <tr>
              <td className="day">24</td>
              <td className="day">25</td>
              <td className="day">26</td>
              <td className="day">27</td>
              <td className="day">28</td>
              <td className="day">29</td>
              <td className="day">30</td>
            </tr>
            <tr>
              <td className="new day">1</td>
              <td className="new day">2</td>
              <td className="new day">3</td>
              <td className="new day">4</td>
              <td className="new day">5</td>
              <td className="new day">6</td>
              <td className="new day">7</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
            </tr>
            <tr>
              <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
            </tr>
          </tfoot>
        </table>
      </div>
        <div className="datepicker-months" style={{ display: "none" }}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
              </tr>
              <tr>
                <th className="prev" style={{ visibility: "visible" }}>«</th>
                <th colSpan="5" className="datepicker-switch">2022</th>
                <th className="next" style={{ visibility: "visible" }}>»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Jan</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Feb</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Mar</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Apr</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>May</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Jun</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Jul</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Aug</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Sep</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Oct</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Nov</span>
                  <span className={nextMonth || previousMonth ? "month focused" : "month"}>Dec</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
              </tr>
              <tr>
                <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="datepicker-years" style={{ display: "none" }}><table className="table-condensed">
          <thead>
            <tr>
              <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
            </tr>
            <tr>
              <th className="prev" style={{ visibility: "visible" }}>«</th>
              <th colSpan="5" className="datepicker-switch">2020-2029</th>
              <th className="next" style={{ visibility: "visible" }}>»</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7"><span className="year old">2019</span><span className="year">2020</span>
                <span className="year">2021</span>
                <span className="year focused">2022</span>
                <span className="year">2023</span>
                <span className="year">2024</span>
                <span className="year">2025</span>
                <span className="year">2026</span>
                <span className="year">2027</span>
                <span className="year">2028</span>
                <span className="year">2029</span>
                <span className="year new">2030</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
            </tr>
            <tr>
              <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
            </tr>
          </tfoot>
        </table>
        </div>
        <div className="datepicker-decades" style={{ display: "none" }}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
              </tr>
              <tr>
                <th className="prev" style={{ visibility: "visible" }}>«</th>
                <th colSpan="5" className="datepicker-switch">2000-2090</th>
                <th className="next" style={{ visibility: "visible" }}>»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <span className="decade old">1990</span>
                  <span className="decade">2000</span>
                  <span className="decade">2010</span>
                  <span className="decade">2020</span>
                  <span className="decade">2030</span>
                  <span className="decade">2040</span>
                  <span className="decade">2050</span>
                  <span className="decade">2060</span>
                  <span className="decade">2070</span>
                  <span className="decade">2080</span>
                  <span className="decade">2090</span>
                  <span className="decade new">2100</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
              </tr>
              <tr>
                <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="datepicker-centuries" style={{ display: "none" }}>
          <table className="table-condensed">
            <thead>
              <tr>
                <th colSpan="7" className="datepicker-title" style={{ display: "none" }}></th>
              </tr>
              <tr>
                <th className="prev" style={{ visibility: "visible" }}>«</th>
                <th colSpan="5" className="datepicker-switch">2000-2900</th>
                <th className="next" style={{ visibility: "visible" }}>»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7">
                  <span className="century old">1900</span>
                  <span className="century">2000</span>
                  <span className="century">2100</span>
                  <span className="century">2200</span>
                  <span className="century">2300</span>
                  <span className="century">2400</span>
                  <span className="century">2500</span>
                  <span className="century">2600</span>
                  <span className="century">2700</span>
                  <span className="century">2800</span>
                  <span className="century">2900</span>
                  <span className="century new">3000</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="7" className="today" style={{ display: "none" }}>Today</th>
              </tr>
              <tr>
                <th colSpan="7" className="clear" style={{ display: "none" }}>Clear</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }

  // TODO: fix advance search caseType and HERO Group API
  const advancedSearch = (e) => {
    e.preventDefault();
    AdvancedSearchService.advancedSearch(token, emailInput, fullNameInput, nricInput, srNumberInput,
      ttNumberInput, caseNumberInput, vipNameInput, customerNameInput, caseType, startDateInput, endDateInput, heroGroupType)
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
    setCaseType('0')
    startDateInput('')
    endDateInput('')
    heroGroupType('0')
  }

  return (
    <Layout
      pageTitle='Advanced Search'
      pageContent={
        <>
          <div className="col-sm-12">Please enter your keywords...</div>
          <div className="space-2" />

          <div className="row">
            <form name="form" onSubmit={advancedSearch} onReset={reset}>
              <div className="col-sm-2">
                <div className="input-group">
                  <input className="form-control date-picker" id="id-date-picker-1" name="keyStartDate" type='text' style={{ width: 180 }} data-date-format="yyyy-mm-dd" value={startDateInput} onChange={(e) => setStartDateInput(e.currentTarget.valueAsDate)} placeholder="Date Created (Start)" />
                  <span className="input-group-addon" onClick={() =>
                    setShowCalendar(!showCalendar)
                    // alert('Calendar Icon being clicked')
                  }>
                    <i className="fa fa-calendar bigger-110" />
                  </span>
                </div>
              </div>

              <div className="col-sm-2" style={{ paddingLeft: "10px" }}>
                <div className="input-group">
                  <input className="form-control date-picker" id="id-date-picker-1" name="keyEndDate" type="date" style={{ width: "180px" }} data-date-format="yyyy-mm-dd" value={endDateInput} onChange={(e) => setEndDateInput(e.currentTarget.value)} placeholder="Date Created (End)" />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar bigger-110" />
                  </span>
                </div>
              </div>

              <div className="col-sm-2  chosen-container chosen-container-single" style={{ paddingLeft: "10px" }}>
                <select className="chosen-select form-control" name="keyCaseTypeID" value={caseType} onChange={(e) => setCaseType(e.target.value)} data-placeholder="Case Type..." style={{ width: "220px" }}>
                  <option value="0">Case Type...</option>
                  <option value='28'>Assurance</option>
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

                {/* <div className="chosen-drop">
                    <div className="chosen-search">
                      <input type="text" autocomplete="off" />
                    </div>
                    <ul className="chosen-results">
                    </ul>
                  </div> */}
                {/* </div> */}
              </div>

              <div className="col-sm-2 chosen-container chosen-container-single" style={{ paddingLeft: 10 }}>
                <select className="chosen-select form-control" name="keyHeroGroup" value={heroGroupType} onChange={(e) => setHeroGroupType(e.currentTarget.value)} data-placeholder="HERO Group..." style={{ width: "220px" }}>
                  <option value="0">HERO Group...</option>
                  <option value="WKTM">WKTM</option>
                  <option value="TMCC">TMCC</option>
                  <option value="Others">Others</option>
                </select>
                {/* <div className="chosen-container chosen-container-single" style={{ width: "220px" }} title="">
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
                </div> */}
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
                  (searchResult.length === 0 || searchResult.length === undefined) ?
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
                          <td>{data.ownerName} <span className="label label-lg label-info arrowed-right">
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
          <div id="limiterBox" className="limiterBox" style={{ position: "absolute", display: "none" }}/>
          {showCalendar && <Calendar />}
        </>
      }
    />
  );
}



export default AdvancedSearch;