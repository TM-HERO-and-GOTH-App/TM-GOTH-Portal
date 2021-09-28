import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import AssignmentService from '../../web_service/assignment_service/MyAssignmentService';

class MC_Inprogress extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: JSON.parse(sessionStorage.getItem('userToken')),
      totalCase: [],
    }
    this.collaboratorCase = this.collaboratorCase.bind(this);
  }

  componentDidMount(){
    this.collaboratorCase();
  }

  collaboratorCase(){
    AssignmentService.viewCaseByCollaborator(this.state.token, 67).then(res =>{
      this.setState({ totalCase: res })
    })
  }

  render() {
    return (
      <div>
        <Header />
          <div class="page-header">
              <h1>My Collaboration : IN-PROGRESSED</h1>
          </div> {/* <!-- /.page-header --> */}

          <div class="row">
            <div class="col-xs-12">
              {/* If there is a message */}

              {/* <?php if ( isset($pageMessage) && !empty($pageMessage) ): ?> */}
              <div class="alert alert-block alert-<?php echo $pageMessageAlert; ?>">
                <button type="button" class="close" data-dismiss="alert">
                  <i class="ace-icon fa fa-times"></i>
                </button>

                <p>
                  <strong>
                    <i class="ace-icon fa fa-check"></i>
                    Well done!
                  </strong>
                  {/* Display message here */}
                </p>
              </div>
              {/* <?php endif; ?> */}

              <table id="simple-table" class="table  table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th><div align="center">Aging</div></th>
                    <th>Type</th>
                    <th><div align="center">VIP</div></th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Logger</th>
                    <th><div align="center">Alert</div></th>
                  </tr>
                </thead>

                <tbody>
                { this.state.totalCase.length === 1 ? 
                    <tr><td colSpan={11}><span style={{ color: 'red' }}>List is empty</span></td></tr>
                  :
                  this.state.totalCase.map( data => {
                    return <tr>
                    <td>
                      <a href={`/case-detail/${data.cToken}`}>
                        {data.caseNum}
                      </a>
                    </td>
                    <td>
                      <div align="center">
                        <span className={`badge badge-${data.caseStatus ? 'info' : '-'}`}>{data.caseStatus ? 'IP' : '-'}</span>
                      </div>
                      </td>
                    <td>
                      <div align="center">
                        {data.caseStatus === 'CLOSED' ? 'closedAging' : <span class={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>unclosedAging</span>}
                      </div>
                    </td>
                    <td>{data.caseType}</td>
                    <td>
                      <div align="center">
                        {data.vip ? <i class="menu-icon glyphicon glyphicon-ok"></i> : '-'}
                      </div>
                    </td>
                    <td>{data.productName}</td>
                    <td>{data.customerName}</td>
                    <td>
                      {data.vip ? <span class="label label-success arrowed-right"> {data.fullname} </span> : data.fullname}
                    </td>
                    <td>{data.ownerName}</td>
                    <td>
                      <div align="center" style={{ fontSize: 10 }}>
                       {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning"> {data.totalNewAlert} </span> : 0}
                      </div>
                    </td>
                    <td>
                      <div align="center">
                        <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${data.cToken}`}>
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
            </div> {/* <!-- /.span --> */}
          </div> {/* <!-- /.row --> */}
        <Footer />
      </div>
    );
  }
}

export default MC_Inprogress;