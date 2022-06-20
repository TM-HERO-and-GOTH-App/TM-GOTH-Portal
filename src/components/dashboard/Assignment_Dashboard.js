import React from "react";

function calculateCaseResolve(totalCase, caseResolveInFiveDays) {
    let divideNumber = caseResolveInFiveDays / totalCase;
    let timesWithResolveCase = divideNumber * 100;
    return timesWithResolveCase.toFixed(2);
}

function AssignmentDashboard(props) {
    // console.log(props, props.typesOfAssignment)
    return (
        <div className="col-sm-4">
            <div className="widget-box transparent dashboard-box">
                <div className="widget-header widget-header-flat">
                    <h4 className="widget-title lighter">
                        <i className="ace-icon fa fa-star orange"/>
                        {props.typesOfAssignment}
                    </h4>
                    <div className="widget-toolbar" onClick={props.widgetOnClick}>
                        <a href="#" data-action="collapse">
                            <i className={props.chevronClassName}/>
                        </a>
                    </div>
                </div>
                <div className="widget-body" style={{display: props.display === true ? "block" : "none"}}>
                    <div className="widget-main no-padding">
                        <table className="table table-bordered table-striped">
                            {
                                props.assignmentData?.map((data, index) => {
                                    return <tbody key={index}>
                                    <tr>
                                        <td>Resolved In 5 Days</td>
                                        <td align="right">
                                            <b className="green">
                                                {
                                                    props.isFetching === true ? 0 : props.assignmentData === [] ? 0 : props.resolvedInFiveDays 
                                                }%
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Closed</td>
                                        <td align="right">
                                            <b className="blue">
                                                {
                                                    props.isFetching === true ? 0 : data?.CLOSED !== null ? data?.CLOSED?.toLocaleString() : 0 
                                                }
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>In-Progress</td>
                                        <td align="right">
                                            <b className="blue">
                                                {
                                                    props.isFetching === true ? 0 :  props.assignmentData === [] ? 0 : data?.INPROGRESS?.toLocaleString()
                                                }
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Assigned</td>
                                        <td align="right">
                                            <b className="blue">
                                                {
                                                    props.isFetching === true ? 0 :  props.assignmentData === [] ? 0 : data?.ASSIGNED?.toLocaleString()
                                                }
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Case</b></td>
                                        <td align="right">
                                            <b className="green">
                                                {
                                                    props.isFetching === true ? 0 :  props.assignmentData === [] ? 0 : data?.GTOTAL?.toLocaleString()
                                                }
                                            </b>
                                        </td>
                                    </tr>
                                    </tbody>
                                })
                            }
                        </table>
                    </div>
                    {/* /.widget-main */}
                </div>
                {/* /.widget-body */}
            </div>
            {/* /.widget-box */}
        </div>// {/* /.col */ }
    )
}

export default AssignmentDashboard;
