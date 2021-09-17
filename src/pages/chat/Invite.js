import React from 'react';

class InviteChat extends React.Component {
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
                    <div class="col-sm-7">
                        <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>
                            {/* <?php if( !empty($ci['ownerName']) ){ ?> */}
                            <div class="profile-info-row">
                                <div class="profile-info-name">CASE OWNER</div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username"><b>
                                        {/* <?php echo strtoupper($ci['ownerName']) , ' - ' , $ci['stakeholderName']; ?> */}
                                    </b></span>
                                </div>
                            </div>
                            {/* // <?php } else { ?> */}
                            {/* // <?php if( !empty($ci['stakeholderName']) ){ ?> */}
                            <div class="profile-info-row">
                                <div class="profile-info-name">GROUP POOL</div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username"><b>
                                        {/* <?php echo $ci['stakeholderName']; ?> */}
                                    </b></span>
                                </div>
                            </div>
                            <div class="profile-info-row">
                                <div class="profile-info-name">CASE OWNER</div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username"><i style={{color:'red'}}>Un-Assigned</i></span>
                                </div>
                            </div>
                            {/* // <?php } ?>
			// <?php } ?> */}
                            <div class="profile-info-row">
                                <div class="profile-info-name"> HERO Name </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo ucwords($ci['fullname']); ?> */}
                                    </span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Customer </div>

                                <div class="profile-info-value">
                                    {/* <?php echo $ci['customerName']; ?> */}
                                </div>
                            </div>


                            <div class="profile-info-row">
                                <div class="profile-info-name"> Descriptions </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="login"><i style={{color:"blue"}}>
                                        {/* <?php echo $ci['caseContent']; ?> */}
                                    </i></span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Case Status </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="login">
                                        {/* ?php echo $ci['caseStatus']; ?> */}
                                    </span>
                                </div>
                            </div>

                            <div class="profile-info-row">
                                <div class="profile-info-name"> Created Date </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="about">
                                        {/* <?php echo $ci['createdDate']; ?> */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>{/* // <!-- /.row --> */}
                <div class="space-20"></div>
                <a name="group-chat-members"></a>
                <div class="page-header">
                    <h1>G-Chat (Collaboration) Members</h1>
                </div>
                {/* // <?php $invited=array(); ?> */}
                <div class="row">
                    <div class="col-sm-12">
                        {/* <?php if ( isset($alertStatus) && !empty($alertStatus) ): ?> */}
                        <div class="alert alert-block alert-<?php echo $alertStatus; ?>">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {/* <?php echo urldecode($alertMessage); ?> */}
                            </p>
                        </div>
                        {/* <?php endif; ?> */}
                    </div>
                    <div class="col-xs-12">
                        <p>Users in the list below are able to view the Case in "My Collaboration" Tab</p>
                        <table id="simple-table" class="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="5%"><div align="center">#</div></th>
                                    <th width="35%">Fullname</th>
                                    <th width="30%">Nickname</th>
                                    <th width="20%"><div align="center">Group</div></th>
                                    <th width="10%"><div align="center"><i class="ace-icon fa fa-bookmark"></i></div></th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* <?php if( empty($invitedMembers) ){ ?> */}
                                <tr><td colspan="4"><span style={{color:"red"}}>Group Chat User for this case is Empty</span></td></tr>
                                {/* // <?php } else {  */}
                                {/* // for($i=0;$i<$invitedMembersCount;$i++){  */}
                                {/* // $invited[] = $invitedMembers[$i]['hToken']; */}
                                {/* // ?> */}
                                <tr>
                                    <td><div align="center">
                                        {/* <?php echo $i+1; ?> */}
                                    </div></td>
                                    <td>
                                        {/* <?php echo ucwords($invitedMembers[$i]['fullName']); ?> */}
                                    </td>
                                    <td>
                                        {/* <?php echo ucwords($invitedMembers[$i]['nickName']); ?> */}
                                    </td>
                                    <td><div align="center">
                                        {/* <?php echo $invitedMembers[$i]['stakeholderName']; ?> */}
                                    </div></td>
                                    <td><div align="center">
                                        <button class="btn btn-minier btn-danger" onclick="redirect('<?php echo APPNAME; ?>/chat/removefromgroup/<?php echo $cToken; ?>/<?php echo $invitedMembers[$i]['hToken']; ?>/')">Remove</button>
                                    </div>
                                    </td>
                                </tr>
                                {/* // <?php }} ?> */}
                            </tbody>

                        </table>
                    </div>{/* // <!-- /.span --> */}
                </div>
                <div class="space-20"></div>
                <a name="group-members"></a>
                <div class="page-header">
                    <h1>Group Members</h1>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <form name="form" method="POST">
                            <select class="chosen-select form-control" name="shID" data-placeholder="Choose a Group..." onchange="submitForm('<?php echo APPNAME; ?>/chat/invite/<?php echo $cToken; ?>/#group-members')">
                                {/* <option value="0" <?php echo ( 0 == $shID_opt ) ? 'selected="yes"' : ''; ?>>All Group/Stakeholder ...</option> */}
                                { /* <?php $totalLov = count($lovStakeholder); ?>
            <?php for($i=0;$i<$totalLov;$i++){ ?>
            <?php if( $lovStakeholder[$i]['lovName'] != 'ADMIN' ) { ?> */}
                                { /* <option value="<?php echo $lovStakeholder[$i]['lovID']; ?>" <?php echo ( $lovStakeholder[$i]['lovID'] == $shID_opt ) ? 'selected="yes"' : ''; ?>><?php echo $lovStakeholder[$i]['lovName']; ?></option> */}
                                {/* <?php } ?>
        <?php } ?> */}
                            </select>
                        </form>
                    </div>
                    <div class="col-sm-9" align="right">
                    </div>

                    <div class="space-20"></div>

                    <div class="col-xs-12">

                        <table id="simple-table" class="table  table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="5%"><div align="center">#</div></th>
                                    <th width="35%">Fullname</th>
                                    <th width="20%">Email</th>
                                    <th width="15%">Position</th>
                                    <th width="15%"><div align="center">Group</div></th>
                                    <th width="10%"><div align="center"><i class="ace-icon fa fa-bookmark"></i></div></th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* <?php if( empty($teamMembers) ){ ?> */}
                                <tr><td colspan="6"><span style={{color:"red"}}>List is Empty. Please select other Group/Stakeholder</span></td></tr>
                                {/* // <?php } else {  */}

                                { /* for($i=0;$i<$teamMembersCount;$i++){ 
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
                                        {/* <?php echo ( strtoupper($teamMembers[$i]['positionName']) == 'ADMIN' ) ? '<span class="label label-warning arrowed-right">' . $teamMembers[$i]['positionName'] . '</span>' : $teamMembers[$i]['positionName']; ?> */}
                                        {/* <?php echo ( $ci['oID'] == $teamMembers[$i]['hID'] ) ? ' (Owner)' : ''; ?> */}
                                    </td>
                                    <td><div align="center">
                                        {/* <?php echo $teamMembers[$i]['stakeholderName']; ?> */}
                                    </div></td>
                                    <td><div align="center">
                                        {/* <?php if(! in_array($teamMembers[$i]['hToken'], $invited) && $ci['oID'] != $teamMembers[$i]['hID']){ ?> */}
                                        <button class="btn btn-minier btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/invitetogroup/<?php echo $cToken; ?>/<?php echo $teamMembers[$i]['hToken']; ?>/')">Invite</button>
                                        {/* // <?php } ?> */}
                                    </div>
                                    </td>
                                </tr>
                                { /* // <?php }} ?> */}
                            </tbody>
                        </table>
                    </div>
                    { /* // <!-- /.span --> */}
                </div>
            </div>
        )
    }
}

export default InviteChat;