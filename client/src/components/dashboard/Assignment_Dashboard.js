import React from "react";

function calculateCaseResolve(totalCase, caseResolveInFiveDays) {
    let divideNumber = caseResolveInFiveDays / totalCase;
    let timesWithResolveCase = divideNumber * 100 ;
    let totalCaseResolvedInFiveDays = timesWithResolveCase.toFixed(2);
    return totalCaseResolvedInFiveDays;
}

function AssignmentDashboard(props) {
    return (
        <div className="col-sm-4">
            <div className="widget-box transparent dashboard-box">
                <div className="widget-header widget-header-flat">
                    <h4 className="widget-title lighter">
                        <i className="ace-icon fa fa-star orange" />
                        {props.typesOfAssignment}
                    </h4>
                    <div className="widget-toolbar" onClick={props.widgetOnClick}>
                        <a href="#" data-action="collapse">
                            <i className={props.chevronClassName} />
                        </a>
                    </div>
                </div>
                <div className="widget-body" style={{display: props.display === true ? "block" : "none"}}>
                    <div className="widget-main no-padding">
                        <table className="table table-bordered table-striped">
                            {props.assignmentData?.map((data, index) => {
                                return <tbody key={index}>
                                <tr>
                                    <td>Resolved In 5 Days</td>
                                    <td align="right">
                                        <b className="green">
                                            {
                                                props.resolvedInFiveDays === 0
                                                || !data ? 0 : calculateCaseResolve( data.totalCase, props.resolvedInFiveDays )
                                            }%
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Closed</td>
                                    <td align="right">
                                        <b className="blue">
                                            {
                                                data.totalClosed === null
                                                || !data ? 0 : data.totalClosed.toLocaleString()
                                            }
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>In-Progress</td>
                                    <td align="right">
                                        <b className="blue">
                                            {
                                                data.totalInProgress === null
                                                || !data ? 0 : data.totalInProgress.toLocaleString()
                                            }
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Assigned</td>
                                    <td align="right">
                                        <b className="blue">
                                            {
                                                data.totalAssigned === null
                                                || !data ? 0 : data.totalAssigned.toLocaleString()
                                            }
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>Total Case</b></td>
                                    <td align="right">
                                        <b className="green">
                                            {
                                                data.totalCase === null
                                                || !data ? 0 : data.totalCase.toLocaleString()
                                            }
                                        </b>
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
