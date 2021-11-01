import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AdvancedSearchService from '../web_service/advance_search_service/AdvanceSearch';
import { Link } from 'react-router-dom';

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      caseToken: this.props.match.params.id,
      keyFullName: '',
      keyEmail: '',
      keyNricNum: '',
      keyCaseNum: '',
      keyVIPName: '',
      keyCustomerName: '',
      keySRNum: '',
      keyTtNum: '',
      searchResult: [],
      token: JSON.parse(sessionStorage.getItem('userToken'))
    }
    this.advancedSearch = this.advancedSearch.bind(this);
    this.reset = this.reset.bind(this);
  }

  advancedSearch(e) {
    e.preventDefault();
    AdvancedSearchService.advancedSearch(this.state.token, this.state.keyEmail, this.state.keyFullName, this.state.keyNricNum, this.state.keySRNum, this.state.keyTtNum, this.state.keyCaseNum, this.state.keyVIPName, this.state.keyCustomerName)
      .then(res => {
        console.log(res)
        this.setState({ searchResult: res })
      })
  }

  reset(){
    this.setState({
      keyFullName: '',
      keyEmail: '',
      keyNricNum: '',
      keyCaseNum: '',
      keyVIPName: '',
      keyCustomerName: '',
      keySRNum: '',
      keyTtNum: '',
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="page-header">
            <h1> AdvancedSearch </h1>
          </div>
          <div className="col-sm-12">Please enter your keywords...</div>
          <div className="space-2" />
          <form name="form" onSubmit={this.advancedSearch} onReset={this.reset}>
            <div className="col-sm-2">
              <input type="text" name="keyFullname" placeholder="HERO Name" value={this.state.keyFullName} onChange={(e) => this.setState({ keyFullName: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyEmail" placeholder="Email" value={this.state.keyEmail} onChange={(e) => this.setState({ keyEmail: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="ikeyNricNum" placeholder="NRIC Number" value={this.state.keyNricNum} onChange={(e) => this.setState({ keyNricNum: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="ikeyCaseNum" placeholder="Case ID" value={this.state.keyCaseNum} onChange={(e) => this.setState({ keyCaseNum: e.target.value })} />
            </div>
            <div className="space-20" />
            <br />
            <div className="col-sm-2">
              <input type="text" name="keyVipName" placeholder="VIP Name" value={this.state.keyVIPName} onChange={(e) => this.setState({ keyVIPName: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyCustomerName" placeholder="Customer Name" value={this.state.keyCustomerName} onChange={(e) => this.setState({ keyCustomerName: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keySrNum" placeholder="SR Number" value={this.state.keySRNum} onChange={(e) => this.setState({ keySRNum: e.target.value })} />
            </div>
            <div className="col-sm-2" style={{ paddingLeft: 10 }}>
              <input type="text" name="keyTtNum" placeholder="TT Number" value={this.state.keyTtNum} onChange={(e) => this.setState({ keyTtNum: e.target.value })} />
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
                {this.state.searchResult.map(map => map.response  === "FAILED") ?
                  <tr><td colSpan={11}><span style={{ color: 'red' }}>Search result is empty</span></td></tr>
                  :
                  this.state.searchResult.map((data, i) => {
                    return <tr>
                      <td>
                        <Link to={`/case-detail/${data.cToken}`}>
                          {data.caseNum}
                        </Link>
                      </td>
                      <td>
                        <div align="center">
                          <span className="badge badge-<?php echo $statusBadge; ?>">{data.caseStatus}</span>
                        </div>
                      </td>
                      <td>
                        <div align="center" style={{ fontSize: 10 }}>
                          {/* ?php echo ( $caseLs[$i]['unclosedAging'] < 16 ) ? $caseLs[$i]['unclosedAging'] : '<span style="font-size:10px" className="badge badge-sm badge-'.$badgeColor.'"'.$caseLs[$i]['closedAging'].''; ?&gt; */}
                          {data.unclosedAging > 30 ? 'Closed' : 'aging' }
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
                          {data.totalNewAlert > 0 ? <span style={{fontSize:10}} className="badge badge-warning">{data.totalNewAlert}</span> : 0}
                        </div>
                      </td>
                      <td>
                        <div align="center">
                          <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${this.state.caseToken}`}>
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
        <Footer />
      </div>
    );
  }
}



export default AdvancedSearch;