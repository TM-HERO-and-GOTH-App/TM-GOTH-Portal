import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

class ActionTaken extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {/* <script type="text/javascript">
function getRemarkText()
{
    var remarkText = document.getElementById("remarkText").value;
    if( 0 != remarkText ){
        document.getElementById("remark").value=remarkText;
    }
}

function isStatusClosed()
{
    var caseStatusID = document.getElementById("caseStatusID").value;
    if( 70 == caseStatusID || 73 == caseStatusID ){
        document.getElementById("closureType").style.display = "";
    } else {
    	document.getElementById("closureType").style.display = "none";
    }	
}
</script> */}
                {/* <?php if ( isset($alertStatus) && !empty($alertStatus) ): ?> */}
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
                    <div class="col-sm-6">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                            Back to Case Detail
                        </button>
                        {/* <?php if( ($ci['caseStatus'] != 'CLOSED' && $ci['caseStatus'] != 'CANCELLED') ){ ?> */}
                        {/* <?php if( isCaseOwner($ci['oID'],$hID) || isCoordinator($position) ) { ?>	 */}
                        <button class="btn btn-warning" onclick="redirect('<?php echo APPNAME; ?>/assignment/editdetailcase/<?php echo $cToken; ?>')">
                            <i class="ace-icon fa fa-pencil align-top bigger-125"></i>
                            Edit Case Detail
                        </button>
                        {/* <?php } ?>				
		<?php } ?> */}
                    </div>
                    <div class="pull-right col-sm-6" align="right">
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $cToken; ?>/dc/')">HERO Chat</button>
                        <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/internal/<?php echo $cToken; ?>/dc/')">Internal Chat</button>
                    </div>
                </div>
                <div class="space-6"></div>
                <div class="row">
                    <div class="col-sm-12">
                        {/* <?php if( $actionRemarkCount == 0 ) { echo '<div style="color:red">Case Updates is empty</div>'; } else { ?> */}
                        <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>
                            <div class="profile-info-row">
                                <div class="profile-info-name"><b>Logged Date</b></div>
                                <div class="profile-info-value" style={{width:"50%"}}><b>Remarks</b></div>
                                <div class="profile-info-value"><b>Status</b></div>
                                <div class="profile-info-value"><b>Updated By</b></div>
                                <div class="profile-info-value" align="center" style={{width:"10%"}}><i class="ace-icon fa fa-download"></i></div>
                            </div>
                            {/* <?php for($i=0;$i<$actionRemarkCount;$i++){ ?> */}
                            <div class="profile-info-row">
                                <div class="profile-info-name">
                                    {/* <?php echo $actionRemarkLs[$i]['loggedDate']; ?> */}
                                </div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo nl2br($actionRemarkLs[$i]['remark']); ?> */}
                                    </span>
                                </div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo ( $actionRemarkLs[$i]['remarkType'] == 'NEW' ) ? 'UN-ASSIGNED' : $actionRemarkLs[$i]['remarkType']; ?> */}
                                    </span>
                                </div>
                                <div class="profile-info-value">
                                    <span class="editable" id="username">
                                        {/* <?php echo $actionRemarkLs[$i]['updatedBy']; ?> */}
                                    </span>
                                </div>
                                <div class="profile-info-value" align="center">
                                    <span class="editable" id="username">-</span>
                                </div>

                            </div>
                            {/* <?php } ?>	 */}
                        </div>
                        {/* <?php }?> */}
                    </div>
                </div>
                <div class="space-8"></div>
                {/* <?php if( $ci['caseStatus'] == 'NEW' || $ci['caseStatus'] == 'ASSIGNED' || $ci['caseStatus'] == 'IN-PROGRESS' || isAdmin($position) ){ ?> */}
                <form name="form" method="POST">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="well" style={{height:300}}>
                                <h4 class="green smaller lighter">Add New Updates/Remarks</h4>
                                <div class="col-sm-4" style={{padding:'5 0 0 0'}}>
                                    <div class="form-group">
                                        <select class="chosen-select form-control" id="remarkText" data-placeholder="Choose a Remark..." onchange="getRemarkText()">
                                            <option value="0" selected="yes">Please select Remark Text Helper (if any)...</option>
                                            {/* <?php $totalLov = count($lovRemarkHelper); ?>
	            <?php for($i=0;$i<$totalLov;$i++){ ?>
            		<?php if( $lovRemarkHelper[$i]['lovID'] > 421 && $lovRemarkHelper[$i]['lovID'] < 426 ){ ?>	            
		            	<?php if( $shGroup == 'SALES' ){ ?> */}
                                            <option value="<?php echo $lovRemarkHelper[$i]['lovName']; ?>">
                                                {/* <?php echo $lovRemarkHelper[$i]['lovName']; ?> */}
                                            </option>
                                            {/* <?php } ?>
            		<?php } else { ?>
		            	<?php if( $shGroup == 'COMPLAINT' ){ ?>            		
		            	<option value="<?php echo $lovRemarkHelper[$i]['lovName']; ?>"><?php echo $lovRemarkHelper[$i]['lovName']; ?></option>
			            <?php } ?>
		            <?php } ?>
	            <?php } ?> */}
                                        </select>
                                        {/* <!--<option value="Customer Acknowledge">Customer Acknowledge</option>
                <option value="Escalation to Stakeholder">Escalation to Stakeholder</option>
                <option value="Restoration In-Progress (Technical)">Restoration In-Progress (Technical)</option>
                <option value="Rebate In-Progress">Rebate In-Progress</option>
                <option value="Verified & Closed">Verified & Closed</option>
                <option value="Investigation In-Progress">Investigation In-Progress</option>--> */}
                                    </div>
                                </div>
                                <div class="col-sm-12" style={{padding:0}}>
                                    <div class="form-group">
                                        <textarea class="form-control limited" id="remark" name="remark" maxlength="2000"></textarea>
                                    </div>
                                </div>
                                {/* <!--<input type="text" name="remark" placeholder="Text Field" class="form-control" />--> */}
                                {/* <?php if( isCaseOwner($ci['oID'],$hID) || isAdmin($position) || isGroupCoordinator($position,$shID,$ci['shID']) ) { ?>		 */}
                                <div class="col-sm-3" style={{padding:0}}>
                                    <div class="form-group">
                                        <select class="chosen-select form-control" name="caseStatusID" id="caseStatusID" data-placeholder="Choose a Case Status..." onchange="isStatusClosed()">
                                            {/* <option value="0" <?php echo ( 0 == $caseStatusID ) ? 'selected="yes"' : ''; ?>>Choose a Case Status...</option>		 */}
                                            { /* <?php $totalLov = count($lovCaseStatus); ?>
	            <?php for($i=0;$i<$totalLov;$i++){ ?>
	            	<?php if( $lovCaseStatus[$i]['lovName'] != 'NEW' && $lovCaseStatus[$i]['lovName'] != 'ASSIGNED' && $lovCaseStatus[$i]['lovName'] != 'IN-PROGRESS' ) { ?>
	            		<?php if( $lovCaseStatus[$i]['lovName'] == 'CLOSED' ) { ?>
                        <?php if( isCaseOwner($ci['oID'],$hID) || isAdmin($position) ) { ?> */}
                                            <option value="<?php echo $lovCaseStatus[$i]['lovID']; ?>">
                                                {/* <?php echo $lovCaseStatus[$i]['lovName']; ?> */}
                                            </option>
                                            {/* <?php } ?>	
	            		<?php } else if( $lovCaseStatus[$i]['lovName'] == 'TO-BE-DELETED' ) { ?>
	            			<?php if( isAdmin($position) ) { ?> */}
                                            <option value="<?php echo $lovCaseStatus[$i]['lovID']; ?>">
                                                {/* <?php echo $lovCaseStatus[$i]['lovName']; ?> */}
                                            </option>
                                            {/* <?php } ?>	
	            		<?php } else { ?>	 */}
                                            <option value="<?php echo $lovCaseStatus[$i]['lovID']; ?>">
                                                {/* <?php echo $lovCaseStatus[$i]['lovName']; ?> */}
                                            </option>
                                            {/* <?php } ?>
	            	<?php } ?>
	            <?php } ?> */}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4" style={{paddingLeft:5}} id="closureType">
                                    <div class="form-group">
                                        <select class="chosen-select form-control" name="ctID" data-placeholder="Choose a Closure Type...">
                                            {/* <option value="0" <?php echo ( 0 == $ctID ) ? 'selected="yes"' : ''; ?>>Choose a Closure Type...</option>		 */}
                                            { /* <?php $totalLov = count($lovClosureType); ?>
	            <?php for($i=0;$i<$totalLov;$i++){ ?>
            		<?php if( $lovClosureType[$i]['lovID'] > 427 && $lovClosureType[$i]['lovID'] < 489 ){ ?>
                    <?php if( $shGroup == 'SALES' ){ ?> */}
                                            <option value="<?php echo $lovClosureType[$i]['lovID']; ?>">
                                                {/* <?php echo $lovClosureType[$i]['lovName']; ?> */}
                                            </option>
                                            { /* <?php } ?>
            		// <?php } else { ?> 
		                <?php if( $shGroup == 'COMPLAINT' ){ ?> */}
                                            <option value="<?php echo $lovClosureType[$i]['lovID']; ?>">
                                                {/* <?php echo $lovClosureType[$i]['lovName']; ?> */}
                                            </option>
                                            {/* <?php } ?>
            	// 	<?php } ?>
                    // <?php } ?> */}
                                        </select>
                                    </div>
                                </div>
                                {/* // <?php } ?> */}

                                <div class="col-sm-11" style={{padding:0}}>
                                    <div class="form-group">
                                        <button class="btn btn-sm btn-success" onclick="submitForm('<?php echo APPNAME; ?>/assignment/setremark/<?php echo $cToken; ?>');this.style.visibility= 'hidden';">
                                            <i class="ace-icon fa fa-save align-top bigger-125"></i>
                                            Update Status & Remark</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /.col --> */}
                    </div>
                </form>
                {/* // <?php } ?> */}
                <Footer/>
            </div>
        )
    }
}

export default ActionTaken;