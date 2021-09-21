import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import CaseDetailService from '../../web_service/case_detail_service/CaseDetailService';
import ManageUserService from '../../web_service/manage_user_service/ManageUserService';

class AssignToOther extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseToken: this.props.match.params.id,
            lovData: JSON.parse(sessionStorage.getItem('LovData')),
            token: JSON.parse(sessionStorage.getItem('userToken')),
            shID: JSON.parse(sessionStorage.getItem('UserData')),
            caseDetailData: {},
            groupMember: []
        }
        this.getCaseDetail = this.getCaseDetail.bind(this);
        this.getGroupResult = this.getGroupResult.bind(this);
    }

    componentDidMount() {
        this.getCaseDetail();
        this.getGroupResult();
    }

    getGroupResult() {
        const shID = this.state.shID.shID
        ManageUserService.getProfileByGroup(this.state.token, shID).then(res => {
            console.log(res);
            this.setState({ groupMember: res })
        })
    }

    getCaseDetail() {
        CaseDetailService.getCaseDetail(this.state.token, this.state.caseToken).then(res => {
            console.log(res)
            this.setState({ caseDetailData: res })
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div class="row">
                    <div class="col-sm-4">
                        <Link class="btn btn-primary" to={`/case_detail/${this.state.caseToken}`}>
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </Link>
                    </div>
                </div>
                <div class="space-10"></div>
                <div class="row">
                    <div class="col-sm-12">
                        {/* <?php if ( isset($alertStatus) && !empty($alertStatus) ): ?> */}
                        <div class="alert alert-block alert-<?php echo $alertStatus; ?>">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {/* <?php echo str_replace("-", " ", $alertMessage); ?> */}
                            </p>
                        </div>
                        {/* <?php endif; ?> */}
                    </div>
                </div>{/* <!-- /.row --> */}
                <a name="group-members"></a>
                <div class="page-header">
                    <h1>Group Members</h1>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <form name="form" method="POST">
                            <select class="chosen-select form-control" name="shID" dataPlaceholder="Choose a Group..." onChange="submitForm('<?php echo APPNAME; ?>/assignment/groupmembers/<?php echo $cToken; ?>/#group-members')">
                                <option value="0">All Group/Stakeholder ...</option>
                                {this.state.lovData.filter(filter => filter.lovGroup === 'STAKEHOLDER' && filter.lovName !== 'ADMIN').map(data => {
                                    return <option key={data.lovID} value={data.lovName}>{data.lovName}</option>
                                })}
                            </select>
                        </form>
                    </div>
                    <div class="col-sm-9" align="right">
                        {/* <?php if( 0 != $shID_opt && (isCaseOwner($ci['oID'],$hID) || isAdmin($position) || isGroupCoordinator($position,$shID,$ci['shID'])) ) { ?>		 */}
                        <button class="btn btn-sm btn-danger" onclick="redirect('<?php echo APPNAME; ?>/assignment/assigntopool/<?php echo $cToken; ?>/<?php echo $shID_opt; ?>')">
                            <i class="ace-icon fa fa-exchange"></i>
                            Assign To Group Pool
                        </button>
                        {/* <?php } ?> */}
                    </div>

                    <div class="space-20"></div>

                    <div class="col-xs-12">

                        <table id="simple-table" class="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="5%"><div align="center">#</div></th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th><div align="center">Group</div></th>
                                    <th width="10%"><div align="center"><i class="ace-icon fa fa-cog"></i></div></th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.groupMember === null ?
                                    <tr><td colSpan="4"><span style={{ color: "red" }}>Selection NOT Allowed. Please select Group/Stakeholder</span></td></tr>
                                    :
                                    this.state.groupMember.map((data, i)=> {
                                        i += 1;
                                        return <tr>
                                            <td><div align="center">
                                                {i}
                                            </div></td>
                                            <td>
                                                {data.fullName}
                                            </td>
                                            <td>
                                                {data.email}
                                            </td>
                                            <td>
                                                {data.positionName === 'Admin' ? <span class="label label-warning arrowed-right">{data.positionName}</span> : data.positionName}
                                            </td>
                                            <td><div align="center">
                                                {data.stakeholderName}
                                            </div></td>
                                            <td><div align="center">	
						{/* <?php if(! isCaseOwner($ci['oID'],$teamMembers[$i]['hID']) ){ ?> */} 
                                                {(data.positionName === 'Admin' || data.positionName === 'Coordinator' || !this.state.caseDetailData.ownerName) && 
                                                    <button class="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/assignment/assigntoagent/<?php echo $cToken; ?>/<?php echo $teamMembers[$i]['hID']; ?>/<?php echo $shID_opt; ?>')">Assign</button>                          
                                                }
                                                {/* <?php }} ?>
					<?php echo ( isCaseOwner($ci['oID'],$teamMembers[$i]['hID']) ) ? '<span class="badge badge-info">Owner</span>' : ''; ?>					 */}
                                                {(this.state.caseDetailData.ownerName === this.state.caseDetailData.oID) && <span class="badge badge-info">Owner</span>}
                                            </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>

                        </table>
                    </div>{/* <!-- /.span --> */}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AssignToOther;