import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import AdvancedSearchService from '../web_service/advance_search_service/AdvanceSearchService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdvancedSearch(props) {
  const [caseToken, setCaseToken] = useState(props.match.params.id);
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
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
  const [calendarYear, setCalendarYear] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const advancedSearch = (e) => {
    e.preventDefault();
    AdvancedSearchService.advancedSearch(token, emailInput, fullNameInput, nricInput, srNumberInput,
      ttNumberInput, caseNumberInput, vipNameInput, customerNameInput, caseType, startDateInput, endDateInput, heroGroupType)
      .then(res => {
        // console.log(res);
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
    setStartDateInput('')
    setEndDateInput('')
    setHeroGroupType('0')
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
                  <input className="form-control date-picker" id="id-date-picker-1" name="keyStartDate" type='date' data-date-format="yyyy-mm-dd" value={startDateInput} onChange={(e) => setStartDateInput(e.currentTarget.value)} placeholder="Date Created (Start)" />
                  <span className="input-group-addon" onClick={() => {
                    const startDate = document.getElementById('id-date-picker-1');
                    startDate.focus()
                  }
                  }>
                    <i className="fa fa-calendar bigger-110" />
                  </span>
                </div>
              </div>

              <div className="col-sm-2">
                <div className="input-group">
                  <input className="form-control date-picker" id="id-date-picker-2" name="keyEndDate" type="date" data-date-format="yyyy-mm-dd" value={endDateInput} onChange={(e) => setEndDateInput(e.currentTarget.value)} placeholder="Date Created (End)" />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar bigger-110" />
                  </span>
                </div>
              </div>

              <div className="col-sm-2  chosen-container chosen-container-single">
                <select className="form-control chosen-select advance-search-select-input" name="keyCaseTypeID" value={caseType} onChange={(e) => setCaseType(e.target.value)} data-placeholder="Case Type..." style={{ backgroundColor: "#FAFAFA" }}>
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
              </div>

              <div className="col-sm-2">
                <select className="form-control chosen-select advance-search-select-input" name="keyHeroGroup" value={heroGroupType} onChange={(e) => setHeroGroupType(e.currentTarget.value)} data-placeholder="HERO Group..." style={{ backgroundColor: "#FAFAFA" }}>
                  <option value="0">HERO Group...</option>
                  <option value="WKTM">WKTM</option>
                  <option value="TMCC">TMCC</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-20" />
              <br />

              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyFullname" placeholder="HERO Name" value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyEmail" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyNricNum" placeholder="NRIC Number" value={nricInput} onChange={(e) => setNRICInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="ikeyCaseNum" placeholder="Case ID" value={caseNumberInput} onChange={(e) => setCaseNumberInput(e.target.value)} />
              </div>

              <div className="space-20" />

              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyVipName" placeholder="VIP Name" value={vipNameInput} onChange={(e) => setVIPNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keyCustomerName" placeholder="Customer Name" value={customerNameInput} onChange={(e) => customerNameInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
                <input type="text" style={{ width: "220px" }} name="keySrNum" placeholder="SR Number" value={srNumberInput} onChange={(e) => setSRNumberInput(e.target.value)} />
              </div>
              <div className="col-sm-2">
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

          <div className="col-sm-12">
            <div className="clearfix">
              <div className="pull-right tableTools-container-search" style={{ paddingTop: 10 }} />
            </div>
            <div className="dataTables_wrapper form-inline no-footer">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead className="table-head">
                    <TableRow className="table-head-row">
                      <TableCell>Case ID</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Aging</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="center">VIP</TableCell>
                      <TableCell align="center">ELG</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>HERO</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>STH</TableCell>
                      <TableCell>Latest Remark</TableCell>
                      <TableCell align="center">State</TableCell>
                      <TableCell align="center"><i class="ace-icon fa fa-bell icon-animated-bell"></i></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (searchResult === [] || searchResult === undefined || searchResult.length === 0) ?
                        <TableRow><TableCell colSpan={14}><span style={{ color: 'red' }}>Search result is empty</span></TableCell></TableRow>
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
                          return (data.response === 'FAILED') ?
                            <TableRow>
                              <TableCell colSpan={11}>
                                <span style={{ color: 'red' }}>Search result is empty</span>
                              </TableCell>
                            </TableRow>
                            :
                            <TableRow key={index}>
                              <TableCell>
                                <Link to={`/case-detail/${data.cToken}`}>
                                  {data.caseNum}
                                </Link>
                                <br />
                                <small title="Created Date">{formattedDate}</small>
                                {/* <br /> */}
                                {/* <small title="Created Date">{formattedTime}</small> */}
                              </TableCell>
                              <TableCell>
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
                              </TableCell>
                              <TableCell>
                                <div align="center" title='Day:Hour'>
                                  {agingDay < 16 ? agingkey : <span style={{ fontSize: "10px" }} className={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>{agingkey}</span>}
                                </div>
                              </TableCell>
                              <TableCell>{data.caseType}</TableCell>
                              <TableCell>
                                <div align="center">
                                  {data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : '-'}
                                </div>
                              </TableCell>
                              <TableCell align='center'>{data.eligibility}</TableCell>
                              <TableCell>{data.productName}</TableCell>
                              <TableCell>{data.customerName}</TableCell>
                              <TableCell>{data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : data.fullname}</TableCell>
                              <TableCell>{data.ownerName} <span className="label label-lg label-info arrowed-right">
                                <small>
                                  {data.stakeholderName}
                                </small>
                              </span></TableCell>
                              <TableCell>{data.stakeholderRef}</TableCell>
                              <TableCell>{data.remark}</TableCell>
                              <TableCell>{data.areaLocation}</TableCell>
                              <TableCell>
                                <div align="center">
                                  {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning">{data.totalNewAlert}</span> : 0}
                                </div>
                              </TableCell>
                            </TableRow>
                        })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          {/* <div id="limiterBox" className="limiterBox" style={{ position: "absolute", display: "none" }} />
          {showCalendar && 
            <Calendar 
              showCalendar={showCalendar}
              showDaysCalendar={showDaysOption}
              showMonthOnclick={() => {setShowMonthOption(!showMonthOption); setShowDaysOption(!showDaysOption)}}
              date={date}
              selectDay={() => {setCalendarDays('20'); console.log(calendarDays);}}
              showMonthCalendar={showMonthOption}
              showYear={() => {setShowYearOption(!showYearOption); setShowMonthOption(false);}}
              selectMonth={() => {setCalendarMonth('April'); console.log(calendarMonth); setShowMonthOption(!showMonthOption); setShowDaysOption(!showDaysOption);}}
              month={month}
              showDecadesOptionCalendar={() => {setShowDecadeOption(!showDecadeOption); setShowYearOption(!showYearOption);}}
              showYearOptionCalendar={showYearOption}
              year={year}
              selectYear={() => {setCalendarYear('2022'); console.log(calendarYear); setShowYearOption(!showYearOption); setShowMonthOption(!showMonthOption);}}
              showDecadeCalendar={showDecadeOption}
              showCenturiesOptionCalendar={() => {setShowCenturiesOption(!showCenturiesOption); setShowYearOption(!showYearOption)}}
              selectDecade={() => { setCalendarDecade('2020'); console.log(calendarDecade); setShowDecadeOption(!showDecadeOption); setShowYearOption(!showYearOption) }}
              showCenturiesCalendar={showCenturiesOption}
              selectCentury={() => { setCalendarCentury('2000'); console.log(calendarCentury); setShowCenturiesOption(!showCenturiesOption); setShowDecadeOption(!showDecadeOption); }}
            />
          } */}
        </>
      }
    />
  );
}



export default AdvancedSearch;