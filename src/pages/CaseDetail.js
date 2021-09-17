import React from 'react';

class CaseDetail extends React.Component {
    render() {
        return (
            <div>
                <div>
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
                        <div class="space-10" />
                    </div>
                    {/* <?php endif; ?> */}


                    <div class="row">
                        {/* <?php if( ($ci['caseStatus'] != 'CLOSED' && $ci['caseStatus'] != 'CANCELLED') ){ ?> */}
                        <div class="col-sm-5">
                            {/* <?php if( empty($ci['ownerName']) ){ ?>	 */}
                            <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/assigntome/<?php echo $cToken; ?>')">Assign To Me</button>
                            {/* <?php } ?>
		<?php if( isCoordinator($position) ){ ?> */}
                            <button class="btn btn-danger" onclick="redirect('<?php echo APPNAME; ?>/assignment/groupmembers/<?php echo $cToken; ?>/#group-members')">Assign To Others</button>
                            {/* <?php } ?>
		<?php if( isCaseOwner($ci['oID'],$hID) || isCoordinator($position) ) { ?>	 */}
                            <button class="btn btn-warning" onclick="redirect('<?php echo APPNAME; ?>/assignment/editdetailcase/<?php echo $cToken; ?>')">
                                <i class="ace-icon fa fa-pencil align-top bigger-125"></i>
                                Edit Case Detail
                            </button>
                            {/* <?php } ?>		 */}
                        </div>
                        {/* <?php $left = true; ?>
	<?php } ?> */}
                        {/* <div class="col-sm-7" <?php echo ( isset($left) ) ? 'align="right"' : ''; ?> > */}
                        <div class="col-sm-7">
                            <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/assignment/actiontaken/<?php echo $cToken; ?>')">
                                Action Taken
                                {/* <!--<i class="ace-icon fa fa-arrow-right icon-on-right"></i>--> */}
                            </button>
                            <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/logger/<?php echo $cToken; ?>/dc/')">HERO Chat</button>
                            <button class="btn btn-primary" onclick="redirect('<?php echo APPNAME; ?>/chat/internal/<?php echo $cToken; ?>/dc/')">Internal Chat</button>
                        </div>
                        <br />
                        <div class="space-20"></div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
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
                                {/* <?php } else { ?>
			<?php if( !empty($ci['stakeholderName']) ){ ?> */}
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
                                {/* <?php } ?>
			<?php } ?> */}
                                <div class="profile-info-row">
                                    <div class="profile-info-name" style={{width:"20%"}}> HERO </div>

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
                                    <div class="profile-info-name"> Actual Customer Name </div>

                                    <div class="profile-info-value">
                                        {/* <?php echo (! empty($ci['actualCustomerName'])) ? $ci['actualCustomerName'] : 'n/a'; ?> */}
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> State </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="age">
                                            {/* <?php echo (!empty($ci['areaLocation'])) ? $ci['areaLocation'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Contact No. </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="age">
                                            {/* <?php echo $ci['mobileNum']; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> NRIC/BRN </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo $ci['nricNum']; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Geotag </div>

                                    <div class="profile-info-value">

                                        <i class="fa fa-map-marker light-orange bigger-110"></i>
                                        <span class="editable" id="country">
                                            {/* <?php echo ( !empty($ci['longitude']) ) ? $ci['latitude'] . ' / ' . $ci['longitude'] : '<i>Not provided</i>'; ?> */}
                                        </span>
                                    </div>
                                </div>
                                <input type="hidden" id="lon" value="<?php echo ( !empty($ci['longitude']) ) ? $ci['longitude'] : 0; ?>" />
                                <input type="hidden" id="lat" value="<?php echo ( !empty($ci['latitude']) ) ? $ci['latitude'] : 0; ?>" />

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
                                            {/* <?php 
							if( $ci['caseStatus'] == 'NEW' ) {
								$statusLabel = 'UN-ASSIGNED';
								$statusBadge = 'danger';
							} else if( $ci['caseStatus'] == 'IN-PROGRESS' ) { 
								$statusLabel = $ci['caseStatus'];
								$statusBadge = 'info';						
							} else if( $ci['caseStatus'] == 'ASSIGNED' ) { 
								$statusLabel = $ci['caseStatus'];
								$statusBadge = 'info';												
							} else if( $ci['caseStatus'] == 'CLOSED' ) { 
								$statusLabel = $ci['caseStatus'];
								$statusBadge = 'success';												
							} else {
								$statusLabel = $ci['caseStatus'];
								$statusBadge = 'pink';												
							}
						?> */}

                                            <span class="label label-<?php echo $statusBadge; ?> arrowed-right">
                                                {/* ?php echo $statusLabel; ?> */}
                                            </span>
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
                                {/* <?php if(! empty($ci['closedDate']) ){ ?> */}
                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Closed Date </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="about">
                                            {/* <?php echo $ci['closedDate']; ?> */}
                                        </span>
                                    </div>
                                </div>
                                {/* <?php } ?> */}
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="profile-user-info profile-user-info-striped" style={{margin:0}}>

                                <div class="profile-info-row">
                                    <div class="profile-info-name" style={{width:"25%"}}> Case Type </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['caseType'])) ? $ci['caseType'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Product Name</div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['productName'])) ? $ci['productName'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Segment</div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['segmentName'])) ? $ci['segmentName'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Package Name </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['packageName'])) ? $ci['packageName'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Service ID </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['serviceID'])) ? $ci['serviceID'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Service Address </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['serviceAddress'])) ? $ci['serviceAddress'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> SR Number </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['srNum'])) ? $ci['srNum'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> TT Number </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['ttNum'])) ? $ci['ttNum'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Source Name </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['sourceName'])) ? $ci['sourceName'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                                <div class="profile-info-row">
                                    <div class="profile-info-name"> Sub-Source Name </div>

                                    <div class="profile-info-value">
                                        <span class="editable" id="signup">
                                            {/* <?php echo (!empty($ci['subSourceName'])) ? $ci['subSourceName'] : '<span style="color:gray">n/a</span>'; ?> */}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>{/* <!-- /.row --> */}
                    <div class="space-20"></div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4 class="header green">Attachment</h4>
                            {/* <?php echo ( !empty($ci['picture']) ) ? '<img src="'.$ci['picture'].'">' : '<i style="color:red">Not provided</i>'; ?> */}
                        </div>
                    </div>
                    {/* <?php if ( !empty($ci['longitude']) ) { ?> */}
                    <div class="space-20"></div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4 class="header green">Geotag Map
                                <div class="pull-right">
                                    <button class="btn btn-warning btn-xs" onclick="initMap(lat,lon);" title="Reload Map">
                                        <i class="ace-icon fa fa-refresh bigger-110 icon-only"></i>
                                    </button>
                                </div>
                            </h4>
                            <div id="map_canvas" style={{width:"100%", height:400}}></div>
                        </div>
                    </div>
                    {/* <?php } ?> */}
                    {/* <script type="text/javascript">
	var lat = document.getElementById("lat").value;
	var lon = document.getElementById("lon").value;
	initMap(lat,lon);
</script> */}

                </div>
            </div>
        )
    }
}

export default CaseDetail;