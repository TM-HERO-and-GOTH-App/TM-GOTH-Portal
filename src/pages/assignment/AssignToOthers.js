import React from 'react';

class AssignToOther extends React.Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-sm-4">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </button>
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
                            <select class="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." onchange="submitForm('<?php echo APPNAME; ?>/assignment/groupmembers/<?php echo $cToken; ?>/#group-members')">
                                {/* <option value="0" <?php echo ( 0 == $shID_opt ) ? 'selected="yes"' : ''; ?>>All Group/Stakeholder ...</option> */}
                                {/* // <?php $totalLov = count($lovStakeholder); ?>
            // <?php for($i=0;$i<$totalLov;$i++){ ?>
            // 	<?php if( $lovStakeholder[$i]['lovName'] != 'ADMIN' ) { ?> */}
                                {/* <option value="<?php echo $lovStakeholder[$i]['lovID']; ?>" <?php echo ( $lovStakeholder[$i]['lovID'] == $shID_opt ) ? 'selected="yes"' : ''; ?>><?php echo $lovStakeholder[$i]['lovName']; ?></option> */}
                                {/* // 	<?php } ?>
            // <?php } ?> */}
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
                                {/* <?php if( empty($teamMembers) ){ ?> */}
                                <tr><td colSpan="4"><span style={{color:"red"}}>Selection NOT Allowed. Please select Group/Stakeholder</span></td></tr>
                                {/* <?php } else { 
				
				for($i=0;$i<$teamMembersCount;$i++){ 
				?> */}
                                <tr>
                                    <td><div align="center">
                                        {/* <?php echo $i+1; ?> */}
                                    </div></td>
                                    <td>
                                        {/* <?php echo ucwords($teamMembers[$i]['fullName']); ?> */}
                                    </td>
                                    <td>
                                        {/* <?php echo strtolower($teamMembers[$i]['email']); ?> */}
                                    </td>
                                    <td>
                                        {/* <?php echo ( strtoupper($teamMembers[$i]['positionName']) == 'ADMIN' ) ? '<span class="label label-warning arrowed-right">' . $teamMembers[$i]['positionName'] . '</span>' : $teamMembers[$i]['positionName']; ?>						 */}
                                    </td>
                                    <td><div align="center">
                                        {/* <?php echo $teamMembers[$i]['stakeholderName']; ?> */}
                                    </div></td>
                                    <td><div align="center">
                                        {/* <?php if( isAdmin($position) || isGroupCoordinator($position,$shID,$ci['shID']) ) { ?>		
						<?php if(! isCaseOwner($ci['oID'],$teamMembers[$i]['hID']) ){ ?> */}
                                        <button class="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/assignment/assigntoagent/<?php echo $cToken; ?>/<?php echo $teamMembers[$i]['hID']; ?>/<?php echo $shID_opt; ?>')">Assign</button>
                                        {/* <?php }} ?>
					<?php echo ( isCaseOwner($ci['oID'],$teamMembers[$i]['hID']) ) ? '<span class="badge badge-info">Owner</span>' : ''; ?>					 */}
                                    </div>
                                    </td>
                                </tr>
                                {/* <?php }} ?> */}
                            </tbody>

                        </table>
                    </div>{/* <!-- /.span --> */}
                </div>
            </div>
        )
    }
}

export default AssignToOther;