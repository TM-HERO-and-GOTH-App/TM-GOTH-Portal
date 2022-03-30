import React from "react";

function AssignmentDashboard(props) {
    return (
        <div className="col-sm-4">
            <div className="widget-box transparent">
                <div className="widget-header widget-header-flat">
                    <h4 className="widget-title lighter">
                        <i className="ace-icon fa fa-star orange" />
                        {props.typesOfAssignment}
                    </h4>
                    <div className="widget-toolbar">
                        <a href="#" data-action="collapse">
                            <i className="ace-icon fa fa-chevron-up" />
                        </a>
                    </div>
                </div>
                <div className="widget-body">
                    <div className="widget-main no-padding">
                        <table className="table table-bordered table-striped">
                            {props.assignmentData?.map((data, index) => {
                                return <tbody key={index}>
                                    <tr>
                                        <td>Resolved In 5 Days</td>
                                        <td align="right">
                                            <b className="green">{props.resolvedInFiveDays === 0 ? 0 : (props.resolvedInFiveDays / data.totalCase * 100).toFixed(2)}%</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Closed</td>
                                        <td align="right">
                                            <b className="blue">{data.totalClosed === undefined ? 0 : data.totalClosed}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>In-Progress</td>
                                        <td align="right">
                                            <b className="blue">{data.totalInProgress === undefined ? 0 : data.totalInProgress}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Assigned</td>
                                        <td align="right">
                                            <b className="blue">{data.totalAssigned === undefined ? 0 : data.totalAssigned}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Case</b></td>
                                        <td align="right">
                                            <b className="green">{data.totalCase=== undefined ? 0 : data.totalCase}</b>
                                        </td>
                                    </tr>
                                </tbody>
                            }) 
                            }
                        </table>
                    </div>{/* /.widget-main */}
                </div>{/* /.widget-body */}
            </div>{/* /.widget-box */}
        </div>// {/* /.col */ }
    )
}

export default AssignmentDashboard;