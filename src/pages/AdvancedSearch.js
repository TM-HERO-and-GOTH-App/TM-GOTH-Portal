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
    const caseToken = props.match.params.id;
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const lovData = JSON.parse(sessionStorage.getItem('LovData'))
    const [caseType, setCaseType] = useState('0');
    const [heroGroupType, setHeroGroupType] = useState('');
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
                console.log(res, 'advancedSearch');
                // console.log(startDateInput);
                setSearchResult(res.data)
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
                    <div className="mb-3">Please enter your keywords...</div>
                    <div className="row">
                        <form name="form" onSubmit={advancedSearch} onReset={reset}>
                            <div className="col-sm-2 advance-search-select-input">
                                <div className="input-group">
                                    <input className="form-control date-picker" id="id-date-picker-1"
                                        name="keyStartDate" type='date' data-date-format="yyyy-mm-dd"
                                        value={startDateInput}
                                        onChange={(e) => setStartDateInput(e.currentTarget.value)}
                                        placeholder="Date Created (Start)" />
                                    <span className="input-group-addon" onClick={() => {
                                        const startDate = document.getElementById('id-date-picker-1');
                                        startDate.focus()
                                    }}>
                                        <i className="fa fa-calendar bigger-110" />
                                    </span>
                                </div>
                            </div>

                            <div className="col-sm-2 advance-search-select-input">
                                <div className="input-group">
                                    <input className="form-control date-picker" id="id-date-picker-2" name="keyEndDate"
                                        type="date" data-date-format="yyyy-mm-dd" value={endDateInput}
                                        onChange={(e) => setEndDateInput(e.currentTarget.value)}
                                        placeholder="Date Created (End)" />
                                    <span className="input-group-addon">
                                        <i className="fa fa-calendar bigger-110" />
                                    </span>
                                </div>
                            </div>

                            <div className="col-sm-2 advance-search-select-input">
                                <select className="form-control chosen-select" name="keyCaseTypeID" value={caseType}
                                    onChange={(e) => setCaseType(e.target.value)} data-placeholder="Case Type..."
                                    style={{ backgroundColor: "#FAFAFA" }}>
                                    <option value="0">Case Type...</option>
                                    {
                                        lovData.filter(filter => filter.L_GROUP === 'CASE-TYPE').map((data, key) => {
                                            return <option value={data.L_ID} key={key}>{data.L_NAME}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-sm-2 advance-search-select-input">
                                <select className="form-control chosen-select" name="keyHeroGroup" value={heroGroupType}
                                    onChange={(e) => setHeroGroupType(e.currentTarget.value)}
                                    data-placeholder="HERO Group..." style={{ backgroundColor: "#FAFAFA" }}>
                                    <option value="">HERO Group...</option>
                                    <option value="WKTM">WKTM</option>
                                    <option value="TMCC">TMCC</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {/*<div className="space-20"/>*/}
                            {/*<br/>*/}

                            <div className="form-floating col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyFullname" placeholder="HERO Name"
                                    value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyEmail" placeholder="Email"
                                    value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyNricNum" placeholder="NRIC Number"
                                    value={nricInput} onChange={(e) => setNRICInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="ikeyCaseNum" placeholder="Case ID"
                                    value={caseNumberInput} onChange={(e) => setCaseNumberInput(e.target.value)} />
                            </div>

                            <div className="space-20" />

                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyVipName" placeholder="VIP Name"
                                    value={vipNameInput} onChange={(e) => setVIPNameInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyCustomerName"
                                    placeholder="Customer Name" value={customerNameInput}
                                    onChange={(e) => setCustomerNameInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keySrNum" placeholder="SR Number"
                                    value={srNumberInput} onChange={(e) => setSRNumberInput(e.target.value)} />
                            </div>
                            <div className="col-sm-2 advance-search-select-input">
                                <input className="form-control" type="text" name="keyTtNum" placeholder="TT Number"
                                    value={ttNumberInput} onChange={(e) => setTTNumberInput(e.target.value)} />
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
                            <TableContainer>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size='medium'
                                >
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
                                            <TableCell align="center">
                                                <i className="ace-icon fa fa-bell icon-animated-bell" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="table-body">
                                        {
                                            (searchResult === [] || searchResult === undefined || searchResult.length === 0) ?
                                                <TableRow><TableCell colSpan={14}><span style={{ color: 'red' }}>Search result is empty</span></TableCell></TableRow>
                                                :
                                                searchResult.map((data, index) => {
                                                    const date = new Date(data.CREATED_DATE)
                                                    const formattedDate = date.toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hourCycle: 'h12'
                                                    })
                                                    const agingDay = (data.CASE_STATUS === 'CLOSED') ? data.CLOSED_AGING : data.UNCLOSED_AGING;
                                                    const agingkey = (data.CASE_STATUS === 'CLOSED') ? data.CLOSED_AGING_DH : data.UNCLOSED_AGING_DH;
                                                    return <TableRow key={index} lassName="table-row">
                                                        <TableCell>
                                                            <Link to={`/case-detail/${data.C_TOKEN}`}>
                                                                {data.CASE_NUM}
                                                            </Link>
                                                            <br />
                                                            <small title="Created Date">{formattedDate}</small>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div align="center">
                                                                {
                                                                    data.CASE_STATUS === 'NEW' ? <span
                                                                        className='badge badge-danger'>N</span> :
                                                                        data.CASE_STATUS === 'IN-PROGRESS' ? <span
                                                                            className='badge badge-info'>IP</span> :
                                                                            data.CASE_STATUS === 'ASSIGNED' ? <span
                                                                                className='badge badge-info'>A</span> :
                                                                                data.CASE_STATUS === 'CLOSED' ? <span
                                                                                    className='badge badge-success'>CL</span> :
                                                                                    data.CASE_STATUS === 'CANCELLED' ?
                                                                                        <span
                                                                                            className='badge badge-info'>CA</span> :
                                                                                        <span
                                                                                            className='badge badge-pink'>TBD</span>
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div align="center" title='Day:Hour'>
                                                                {agingDay < 16 ? agingkey :
                                                                    <span style={{ fontSize: "10px" }}
                                                                        className={`badge badge-sm badge-${data.UNCLOSED_AGING > 30 ? 'danger' : 'warning'}`}>{agingkey}</span>}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{data.CASE_TYPE}</TableCell>
                                                        <TableCell>
                                                            <div align="center">
                                                                {data.VIP ? <span
                                                                    className="label label-success arrowed-right">{data.FULLNAME}</span> : '-'}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='center'>{data.ELIGIBILITY}</TableCell>
                                                        <TableCell>{data.PRODUCT_NAME}</TableCell>
                                                        <TableCell>{data.CUSTOMER_NAME}</TableCell>
                                                        <TableCell>{data.VIP ? <span
                                                            className="label label-success arrowed-right">{data.FULLNAME}</span> : data.FULLNAME}</TableCell>
                                                        <TableCell>{data.OWNER_NAME} <span
                                                            className="label label-lg label-info arrowed-right">
                                                            <small>
                                                                {data.stakeholderName}
                                                            </small>
                                                        </span></TableCell>
                                                        <TableCell>{data.STAKEHOLDER_REF}</TableCell>
                                                        <TableCell>{data.REMARK}</TableCell>
                                                        <TableCell>{data.AREA_LOCATION}</TableCell>
                                                        <TableCell>
                                                            <div align="center">
                                                                {data.TOTAL_NEW_ALERT > 0 ?
                                                                    <span style={{ fontSize: 10 }}
                                                                        className="badge badge-warning">{data.TOTAL_NEW_ALERT}</span> : 0}
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
