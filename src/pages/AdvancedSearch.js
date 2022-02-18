import React, { useState } from 'react';
import Layout from './Layout';
import AdvancedSearchService from '../web_service/advance_search_service/AdvanceSearch';
import { Link } from 'react-router-dom';

function AdvancedSearch(props) {
  const [caseToken, setCaseToken] = useState(props.match.params.id);
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('userToken')));
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
    <Layout pageContent={
      <div>

        <div className="row">
          <div className="page-header">
            <h1> AdvancedSearch </h1>
          </div>
          <div className="col-sm-12">Please enter your keywords...</div>
          <div className="space-2" />
          <form name="form" onSubmit={advancedSearch} onReset={reset}>
            <div className="col-sm-2">
              <input type="text" name="keyFullname" placeholder="HERO Name" value={fullNameInput} onChange={(e) => setFullNameInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyEmail" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="ikeyNricNum" placeholder="NRIC Number" value={nricInput} onChange={(e) => setNRICInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="ikeyCaseNum" placeholder="Case ID" value={caseNumberInput} onChange={(e) => setCaseNumberInput(e.target.value)} />
            </div>
            <div className="space-20" />
            <br />
            <div className="col-sm-2">
              <input type="text" name="keyVipName" placeholder="VIP Name" value={vipNameInput} onChange={(e) => setVIPNameInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyCustomerName" placeholder="Customer Name" value={customerNameInput} onChange={(e) => customerNameInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keySrNum" placeholder="SR Number" value={srNumberInput} onChange={(e) => setSRNumberInput(e.target.value)} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyTtNum" placeholder="TT Number" value={ttNumberInput} onChange={(e) => setTTNumberInput(e.target.value)} />
            </div>
            <div className="col-sm-3" style={{ paddingLeft: 10 }}>
              <button type="reset" className="btn btn-sm btn-inverse">
                <i className="ace-icon fa fa-repeat align-top bigger-125" />
                <span>Reset</span>
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                <i className="ace-icon fa fa-search align-top bigger-125" />
                Search
              </button>
            </div>
          </form>
          <div className="col-xs-12">
            <div className="clearfix">
              <div className="pull-right tableTools-container-search" style={{ paddingTop: 10 }} />
            </div>
            <table id="dynamic-table-search" className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th><div align="center">Status</div></th>
                  <th style={{ width: '6%' }}>Aging</th>
                  <th>Type</th>
                  <th><div align="center">VIP</div></th>
                  <th width="8%">Product</th>
                  <th>Customer</th>
                  <th>HERO</th>
                  <th>Owner</th>
                  <th>Latest Remark</th>
                  <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell" /></div></th>
                  <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o" /></div></th>
                </tr>
              </thead>
              <tbody>
                {
                  searchResult.length === 0 ?
                    <tr><td colSpan={11}><span style={{ color: 'red' }}>Search result is empty</span></td></tr>
                    :
                    searchResult.map((data, index) => {
                      return data.response === 'FAILED' ?
                        <tr><td colSpan={11}><span style={{ color: 'red' }}>Search result is empty</span></td></tr>
                        :
                        <tr key={index}>
                          <td>
                            <Link to={`/case-detail/${data.cToken}`}>
                              {data.caseNum}
                            </Link>
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
                            <div align="center" style={{ fontSize: 10 }}>
                              {data.unclosedAging < 16 ? data.unclosedAging : <span style={{ fontSize: "10px" }} class={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>{data.closedAging}</span>}
                            </div>
                          </td>
                          <td>{data.caseType}</td>
                          <td>
                            <div align="center">
                              {data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : '-'}
                            </div>
                          </td>
                          <td>{data.productName}</td>
                          <td>{data.customerName}</td>
                          <td>{data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : data.fullname}</td>
                          <td>{/*?php echo $ownerName , ' ' , $sh; ?*/}</td>
                          <td>{data.remark}</td>
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
        </div>
      </div>
    }
    />
  );
}



export default AdvancedSearch;