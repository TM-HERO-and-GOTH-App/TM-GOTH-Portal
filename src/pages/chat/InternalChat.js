import React from 'react';

class InternalChat extends React.Component {
    render() {
        return (

            <div>
                <div class="row">
                    <div class="col-sm-12">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/<?php echo $prevPage; ?>/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </button>
                        <button class="btn btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-exchange"></i>
                            Switch to HERO Chat
                        </button>
                    </div>
                </div>
                <div class="space-6" />
                { /* <?php if( $ci['caseStatus'] == 'NEW' || $ci['caseStatus'] == 'ASSIGNED' || $ci['caseStatus'] == 'IN-PROGRESS' ){ ?> */}
                <form name="form" method="POST">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="well">
                                <h4 class="black smaller">Chat Message (Internal)</h4>
                                {/* <!--<input type="text" name="message_be" placeholder="Text Field" class="form-control" />--> */}
                                <div class="form-group">
                                    <textarea class="form-control limited" id="message_be" name="message_be" maxlength="2000"></textarea>
                                </div>
                                <div class="space-2"></div>
                                <button class="btn btn-sm btn-success" onclick="submitForm('<?php echo APPNAME; ?>/chat/pushmessage/<?php echo $cToken; ?>/be/');this.style.visibility= 'hidden';">
                                    <i class="ace-icon fa fa-save align-top bigger-125"></i>
                                    Post New Message</button>
                                {/* // <?php if( isCaseOwner($ci['oID'],$hID) || isGroupCoordinator($position,$shID,$ci['shID']) || isAdmin($position) ){ ?> */}
                                <button class="btn btn-sm btn-danger" onclick="submitForm('<?php echo APPNAME; ?>/chat/invite/<?php echo $cToken; ?>/')">Invite User to G-Chat (Collaboration)</button>
                                { /* // <?php } ?> */}
                            </div>
                        </div>{/* <!-- /.col --> */}
                    </div>
                </form>
                {/* <?php } else { ?> */}
                <div class="row">
                    <div class="col-sm-12">
                        <div class="alert alert-block alert-danger">
                            <p>Case has been CLOSED & LOCKED</p>
                        </div>
                    </div>
                    <br />
                    <div class="space-10"></div>
                </div>
                {/* <?php } ?> */}
                <a name="chat-ls"></a>
                {/* <?php if ( isset($alertStatus) && !empty($alertMessage) ): ?> */}
                <div class="row">
                    <div class="col-sm-12">
                        <div class="alert alert-block alert-<?php echo $alertStatus; ?>">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>
                            <p>
                                {/* <?php echo urldecode($alertMessage); ?> */}
                            </p>
                        </div>
                    </div>
                    <br />
                    <div class="space-10"></div>
                </div>
                {/* <?php endif; ?> */}

                <div class="row">
                    <div class="col-sm-12">
                        {/* <?php if( $chatLsCount == 0 ) { echo '<i style="color:red">Internal Chat is empty</i>'; } else { ?> */}
                        <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>
                            <div class="profile-info-row">
                                <div class="profile-info-name" style={{width:'10%'}}><b>Posted Date</b></div>
                                <div class="profile-info-value" style={{width:'40%'}}><b>Message</b></div>
                                <div class="profile-info-value" style={{width:'20%'}}><b>Posted By</b></div>
                                <div class="profile-info-value" align="center" style={{width:'10%'}}><b>Attachment</b></div>
                            </div>
                            {/* <?php for($i=0;$i<$chatLsCount;$i++){ ?> */}
                            <div class="profile-info-row">
                                <div class="profile-info-name">
                                    {/* <?php echo $chatLs[$i]['postedDate']; ?> */}
                                </div>

                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo nl2br($chatLs[$i]['message']); ?> */}
                                    </span>
                                </div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo ucwords($chatLs[$i]['fullName']); ?> */}
                                    </span>
                                </div>
                                <div class="profile-info-value" align="center">
                                    {/* <?php echo ( 0 != $chatLs[$i]['bID'] ) ? '<a target="_blank" href="'.$chatLs[$i]['filename'].'"><i class="ace-icon fa fa-download"></i></a>' : '-'; ?> */}
                                </div>
                            </div>
                            {/* 		<?php } ?>	 */}
                        </div>
                        {/* <?php }?> */}
                        {/* </div> */}
                    </div>
                </div>
                <div class="space-8"></div>
                {/* <span class="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> */}
            </div>
        )
    }
}

export default InternalChat;