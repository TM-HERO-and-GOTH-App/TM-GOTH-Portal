import React from 'react';

class Logger extends React.Component {
    render() {
        return (
            <div>
                {/* <script type="text/javascript"> */}
                {/* function getRemarkText()
{
    var remarkText = document.getElementById("remarkText").value;
    if( 0 != remarkText ){
        document.getElementById("message_fe").value=remarkText;
    }
} */}

                {/* function isStatusClosed()
{
    var caseStatusID = document.getElementById("caseStatusID").value;
    if( 70 == caseStatusID || 73 == caseStatusID ){
        document.getElementById("closureType").style.display = "";
    } else {
    	document.getElementById("closureType").style.display = "none";
    }	
} */}
                {/* </script> */}
                <div class="row">
                    <div class="col-sm-12">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/<?php echo $prevPage; ?>/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Previous Page
                        </button>
                        <button class="btn btn-yellow" onclick="redirect('<?php echo APPNAME; ?>/chat/internal/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-exchange"></i>
                            Switch to Internal Chat
                        </button>
                    </div>
                </div>
                <div class="space-6"></div>
                {/* <?php if( $ci['caseStatus'] == 'NEW' || $ci['caseStatus'] == 'ASSIGNED' || $ci['caseStatus'] == 'IN-PROGRESS' ){ ?> */}
                <form name="form" method="POST">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="well">
                                <h4 class="black smaller">Chat Message (with Logger)</h4>
                                {/* <!--<input type="text" name="message_fe" placeholder="Text Field" class="form-control" />--> */}
                                <div class="form-group">
                                    <select class="chosen-select form-control" id="remarkText" data-placeholder="Choose a Remark..." onchange="getRemarkText()">
                                        <option value="0" selected="yes">Please select Remark Text Helper (if any)...</option>
                                        {/* <?php $totalLov = count($lovRemarkHelper); ?> */}
                                        {/* <?php for($i=0;$i<$totalLov;$i++){ ?> */}
                                        {/* <?php if( $lovRemarkHelper[$i]['lovID'] > 421 && $lovRemarkHelper[$i]['lovID'] < 426 ){ ?>	             */}
                                        {/* <?php if( $shGroup == 'SALES' ){ ?> */}
                                        <option value="<?php echo $lovRemarkHelper[$i]['lovName']; ?>">
                                            {/* <?php echo $lovRemarkHelper[$i]['lovName']; ?> */}
                                        </option>
                                        {/* <?php } ?> */}
                                        {/* <?php } else { ?> */}
                                        {/* <?php if( $shGroup == 'COMPLAINT' ){ ?>            		 */}
                                        <option value="<?php echo $lovRemarkHelper[$i]['lovName']; ?>">
                                            {/* <?php echo $lovRemarkHelper[$i]['lovName']; ?> */}
                                        </option>
                                        {/* <?php } ?> */}
                                        {/* <?php } ?> */}
                                        {/* <?php } ?> */}
                                    </select>
                                    <div class="space-2"></div>
                                    <textarea class="form-control limited" id="message_fe" name="message_fe" maxlength="2000"></textarea>
                                </div>

                                <div class="space-2"></div>
                                <button class="btn btn-sm btn-success" onclick="submitForm('<?php echo APPNAME; ?>/chat/pushmessage/<?php echo $cToken; ?>/fe/');this.style.visibility= 'hidden';">
                                    <i class="ace-icon fa fa-save align-top bigger-125"></i>
                                    Post New Message</button>
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
                        {/* <?php if( $chatLsCount == 0 ) { echo '<i style="color:red">HERO Chat is empty</i>'; } else { ?> */}
                        <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>
                            <div class="profile-info-row">
                                <div class="profile-info-name" style={{width:"10"}}><b>Posted Date</b></div>
                                <div class="profile-info-value" style={{width:"40%"}}><b>Message</b></div>
                                <div class="profile-info-value" style={{width:"20%"}}><b>Posted By</b></div>
                                <div class="profile-info-value" align="center" style={{width:"10%"}}><b>Attachment</b></div>
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
                            {/* <?php } ?>	 */}
                        </div>
                        {/* <?php }?> */}
                    </div>
                </div>
                <div class="space-8"></div>

                {/* <!--<span class="label label-xs label-inverse arrowed-right" style="font-size:11px;padding-top:4px"><i>Source From : <?php //echo ( $source == 'API' ) ? $source : 'Cache - 30 sec'; ?></i></span> --> */}
            </div>
        )
    }
}

export default Logger;