import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

class MC_Inprogress extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <div class="row">
            <div class="col-sm-12">
              <button class="btn btn-danger" onclick="redirect('<?php echo APPNAME; ?>/assignment/unassigned/')">Show Unassigned Cases</button>
            </div>
            <br /><br /><br />

            <div class="col-xs-12">
              {/* If there is a message */}

              {/* <?php if ( isset($pageMessage) && !empty($pageMessage) ): ?> */}
              <div class="alert alert-block alert-<?php echo $pageMessageAlert; ?>">
                <button type="button" class="close" data-dismiss="alert">
                  <i class="ace-icon fa fa-times"></i>
                </button>

                <p>
                  <strong>
                    <i class="ace-icon fa fa-check"></i>
                    Well done!
                  </strong>
                  {/* Display message here */}

                  {/* <?php echo str_replace("_", " ", $pageMessage); ?> */}
                </p>
              </div>
              {/* <?php endif; ?> */}

              <table id="simple-table" class="table  table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th><div align="center">Aging</div></th>
                    <th>Type</th>
                    <th><div align="center">VIP</div></th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Logger</th>
                    <th><div align="center">Alert</div></th>
                  </tr>
                </thead>

                <tbody>
                  {/* <?php if( empty($assignedCaseLs) ){ ?> */}
                  <tr><td colspan="8">List is empty</td></tr>
                  {/* <?php } else { */}

                  {/* for($i=0;$i<$assignedCaseCount;$i++){  */}
                  {/* ?> */}
                  <tr>
                    <td>
                      <a href="<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $assignedCaseLs[$i]['cToken']; ?>">
                        {/* <?php echo $assignedCaseLs[$i]['caseNum']; ?> */}
                      </a>
                    </td>
                    {/* <td><div align="center"><?php echo ( $assignedCaseLs[$i]['unclosedAging'] < 30 ) ? $assignedCaseLs[$i]['unclosedAging'] : '<span class="badge badge-sm badge-danger">'.$assignedCaseLs[$i]['unclosedAging'].'</span>'; ?></div></td> */}
                    <td><div align="center">unclosedAging : '<span class="badge badge-sm badge-danger">'Number here'</span></div></td>
                    {/* <td><?php echo $assignedCaseLs[$i]['caseType']; ?></td> */}
                    <td>Case type</td>
                    {/* <td><div align="center"><?php echo ( !empty($assignedCaseLs[$i]['vip']) ) ? '<span class="label label-sm label-warning">Yes</span>' : 'No'; ?></div></td> */}
                    <td><div align="center">VIP '<span class="label label-sm label-warning">Yes</span>' : 'No'</div></td>
                    {/* <td><?php echo $assignedCaseLs[$i]['productName']; ?></td> */}
                    <td>Product Name</td>
                    {/* <td><?php echo $assignedCaseLs[$i]['customerName']; ?></td> */}
                    <td>customerName</td>
                    {/* <td><?php echo $assignedCaseLs[$i]['fullname']; ?></td> */}
                    <td>fullName</td>
                    {/* <td><div align="center"><?php echo ( $assignedCaseLs[$i]['totalNewAlert'] > 0 ) ? '<span class="badge badge-warning">' . $assignedCaseLs[$i]['totalNewAlert'] . '</span>' : 0; ?></div></td> */}
                    <td><div align="center">Total New Alert '<span class="badge badge-warning">' Alert Number'</span>' : 0 '</div></td>
                  </tr>
                  {/* <?php }} ?> */}
                </tbody>

              </table>
            </div> {/* <!-- /.span --> */}
          </div> {/* <!-- /.row --> */}
          <div class="page-header">
            <h1>My Collaboration : IN PROGRESS</h1>
          </div> {/* <!-- /.page-header --> */}
          <div class="row">
            <div class="col-xs-12">
              <table id="simple-table" class="table  table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th><div align="center">Aging</div></th>
                    <th>Type</th>
                    <th><div align="center">VIP</div></th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Logger</th>
                    <th><div align="center">Alert</div></th>
                  </tr>
                </thead>

                <tbody>
                  {/* <?php if( empty($inProgressCaseLs) ){ ?> */}
                  <tr><td colspan="8">List is empty</td></tr>
                  {/* <?php } else { */}

                  {/* or($i=0;$i<$inProgressCaseCount;$i++){  */}
                  {/* ?> */}
                  <tr>
                    <td>
                      <a href="<?php echo APPNAME; ?>/assignment/detailcase/<?php echo $inProgressCaseLs[$i]['cToken']; ?>">
                        {/* <?php echo $inProgressCaseLs[$i]['caseNum']; ?> */}
                        Case Number
                      </a>
                    </td>
                    {/* <td><div align="center"><?php echo ( $inProgressCaseLs[$i]['unclosedAging'] < 30 ) ? $inProgressCaseLs[$i]['unclosedAging'] : '<span class="badge badge-sm badge-danger">'.$inProgressCaseLs[$i]['unclosedAging'].'</span>'; ?></div></td> */}
                    <td><div align="center">unclosedAging: '<span class="badge badge-sm badge-danger">inProgress</span>'</div></td>
                    {/* <td><?php echo $inProgressCaseLs[$i]['caseType']; ?></td> */}
                    <td>Case Type</td>
                    {/* <td><div align="center"><?php echo ( !empty($inProgressCaseLs[$i]['vip']) ) ? '<span class="label label-sm label-warning">Yes</span>': 'No'; ?></div></td> */}
                    <td><div align="center">VIP: '<span class="label label-sm label-warning">Yes</span>': 'No'</div></td>
                    {/* <td><?php echo $inProgressCaseLs[$i]['productName']; ?></td> */}
                    <td>Product Name</td>
                    {/* <td><?php echo $inProgressCaseLs[$i]['customerName']; ?></td> */}
                    <td>customerName</td>
                    {/* <td><?php echo $inProgressCaseLs[$i]['fullname']; ?></td> */}
                    <td>customerName</td>
                    {/* <td><div align="center"><?php echo $inProgressCaseLs[$i]['totalNewAlert']; ?></div></td> */}
                    <td><div align="center">Total New Alert</div></td>
                  </tr>
                  {/* <?php }} ?> */}
                </tbody>

              </table>
            </div> {/* <!-- /.span --> */}
          </div> {/* <!-- /.row --> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MC_Inprogress;