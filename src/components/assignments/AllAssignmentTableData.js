import React from "react";
import { Link } from 'react-router-dom';

function AllAssignmentTable(props) {
    return (
        <table id="dynamic-table" className="table table-striped table-bordered table-hover"> {/* <!-- id="simple-table" className="table table-bordered table-hover" --> */}
            <thead>
                <tr>
                    <th>Case ID</th>
                    <th><div align="center">Status</div></th>
                    <th width="6%">Aging</th>
                    <th>Type</th>
                    <th><div align="center">VIP</div></th>
                    <th><div align="center" title="Eligibility">ELG</div></th>
                    <th width="8%">Product</th>
                    <th>Customer</th>
                    <th>HERO</th>
                    <th>Owner / Group</th>
                    <th><div align="center">State</div></th>
                    <th><div align="center"><i className="ace-icon fa fa-bell icon-animated-bell"></i></div></th>
                    {/* <th width="5%"><div align="center"><i className="ace-icon fa fa-comment-o"></i></div></th> */}
                </tr>
            </thead>
            <tbody>
                {
                    props.tableData.map((data, index) => {
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
                        const agingKey = (data.caseStatus === 'CLOSED') ? data.closedAgingDH : data.unclosedAgingDH;
                        return (data.response === 'FAILED') ?
                            <tr>
                                <td colSpan="12">
                                    <span style={{ color: 'red' }}>List is empty</span>
                                </td>
                            </tr>
                            :
                            (props.caseType === '0' || props.caseType === data.caseType || 
                            props.groupType === data.stakeholderName || 
                            (props.caseType === data.caseType && props.groupType === data.stakeholderName)) &&
                            <tr key={index}>
                                <td>
                                    <Link to={`/case-detail/${data.cToken}`}>
                                        {data.caseNum}
                                    </Link>
                                    <br />
                                    <small title="Created Date">{formattedDate}</small>
                                </td>
                                <td><div align="center">
                                    <span className='badge badge-info'>{data.caseStatus ? 'A' : '-'}</span>
                                </div></td>
                                <td>
                                    <div align="center" title='Day:Hour'>
                                        {agingDay < 16 ? agingKey : <span style={{ fontSize: "10px" }} className={`badge badge-sm badge-${data.unclosedAging > 30 ? 'danger' : 'warning'}`}>{agingKey}</span>}
                                    </div>
                                </td>
                                <td>{data.caseType}</td>
                                <td>
                                    <div align="center">
                                        {data.vip ? <i className="menu-icon glyphicon glyphicon-ok"></i> : '-'}
                                    </div>
                                </td>
                                <td>
                                    <div align="center">{data.eligibility}</div>
                                </td>
                                <td>{data.productName}</td>
                                <td>{data.customerName}</td>
                                <td>{data.vip ? <span className="label label-success arrowed-right">{data.fullname}</span> : data.fullname}</td>
                                <td>{data.ownerName === null ? 'Un - Assigned - ' + data.stakeholderName : data.ownerName + ' - ' + data.stakeholderName}</td>
                                <td>
                                    <div align="center">{data.areaLocation}</div>
                                </td>
                                <td>
                                    <div align="center" style={{ fontSize: 10 }}>
                                        {data.totalNewAlert > 0 ? <span style={{ fontSize: 10 }} className="badge badge-warning">{data.totalNewAlert}</span> : '0'}
                                    </div>
                                </td>
                                {/* <td>
                            <div align="center">
                              <Link className="btn btn-minier btn-yellow" to={`/hero-chat/${data.cToken}`}>
                                Open
                                <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
                              </Link>
                            </div>
                          </td> */}
                            </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default AllAssignmentTable