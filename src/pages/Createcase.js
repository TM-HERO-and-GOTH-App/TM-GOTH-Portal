import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Createcase extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          {/*?php if ( isset($alertStatus) && !empty($alertStatus) ): ?*/}
          <div className="row">
            <div className="col-xs-12">
              <div className="alert alert-block alert-<?php echo $alertStatus; ?>">
                <button type="button" className="close" data-dismiss="alert">
                  <i className="ace-icon fa fa-times" />
                </button>
                <p>{/*?php echo urldecode($alertMessage); ?*/}</p>
              </div>
            </div>
          </div>
          {/*?php endif; ?*/}
          <div className="left">
            <button className="btn btn-sm btn-inverse" type="button" onclick="redirect('<?php echo APPNAME; ?>/preference/resetcreateform/')">
              <i className="ace-icon fa fa-repeat align-top bigger-125" />
              Reset
            </button>
            <button className="btn btn-sm btn-success" type="submit" name="btn_post" onclick="this.style.visibility= 'hidden';">
              <i className="ace-icon fa fa-save align-top bigger-125" />
              Save New Case</button>
          </div>
          <div className="space-6" />
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Customer Name </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username"><input className="input-sm" style={{ width: '100%' }} type="text" name="inputs[customerName]" placeholder="Customer Name" defaultValue="<?php echo (isset($ci['customerName'])) ? $ci['customerName'] : ''; ?>" /></span>
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> NRIC No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username"><input className="input-sm" style={{ width: '100%' }} type="text" name="inputs[nricNum]" placeholder="NRIC Number" defaultValue="<?php echo (isset($ci['nricNum'])) ? $ci['nricNum'] : ''; ?>" /></span>
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Mobile No </div>
                    <div className="profile-info-value">
                      <span className="editable" id="username"><input className="input-sm" style={{ width: '100%' }} type="text" name="inputs[mobileNum]" placeholder="Mobile Number" defaultValue="<?php echo (isset($ci['mobileNum'])) ? $ci['mobileNum'] : ''; ?>" /></span>
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> State </div>
                    <div className="profile-info-value">
                      {/* <select className="chosen-select form-control" name="inputs[areaLocationID]" data-placeholder="Choose a State...">
                <option 0="=" value={0} <?php echo ( $ci['arealocationid'] ) ? 'selected="yes" ' : '';>&gt;Choose a State...</option> 		
                {/*?php $totalLov = count($lovState); ?*/}
                      {/*?php for($i=0;$i<$totalLov;$i++){ ?*/}
                      {/* <option value="<?php echo $lovState[$i]['lovID']; ?>" <?php echo ( $lovstate[$i]['lovid']="=" $ci['arealocationid'] ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovState[$i]['lovName']; ?</option> */}
                      {/*?php } ?*/}
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Case Type </div>
                    <div className="profile-info-value">
                      {/* <select className="chosen-select form-control" name="inputs[caseTypeID]" data-placeholder="Choose a Case Type...">
                <option 0="=" value={0} <?php echo ( $ci['casetypeid'] ) ? 'selected="yes" ' : '';>&gt;Choose a Case Type...</option>		
                {/*?php $totalLov = count($lovCaseType); ?*/}
                      {/*?php for($i=0;$i<$totalLov;$i++){ ?*/}
                      {/* <option value="<?php echo $lovCaseType[$i]['lovID']; ?>" <?php echo ( $lovcasetype[$i]['lovid']="=" $ci['casetypeid'] ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovCaseType[$i]['lovName']; ?</option> */}
                      {/*?php } ?*/}
                    </div>
                  </div>
                  {/* <div class="profile-info-row">
			<div class="profile-info-name"> About Me </div>

			<div class="profile-info-value">
				<span class="editable" id="about">Editable as WYSIWYG</span>
			</div>
		</div> */}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <div className="profile-user-info profile-user-info-striped" style={{ margin: 0 }}>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Source </div>
                    <div className="profile-info-value">
                      {/* <select className="chosen-select form-control" name="inputs[sourceID]" data-placeholder="Choose a Source..." onchange="submitForm('<?php echo APPNAME; ?>/preference/createcase/')">
                <option 0="=" value={0} <?php echo ( $ci['sourceid'] ) ? 'selected="yes" ' : '';>&gt;Choose a Source...</option>		 */}
                      {/*?php $totalLov = count($lovSource); ?*/}
                      {/*?php for($i=0;$i<$totalLov;$i++){ ?*/}
                      {/* <option value="<?php echo $lovSource[$i]['lovID']; ?>" <?php echo ( $lovsource[$i]['lovid']="=" $ci['sourceid'] ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovSource[$i]['lovName']; ?</option> */}
                      {/*?php } ?*/}
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name"> Sub Source </div>
                    <div className="profile-info-value">
                      {/* <select className="chosen-select form-control" name="inputs[subSourceID]" data-placeholder="Choose a Sub Source...">
                <option 0="=" value={0} <?php echo ( $ci['subsourceid'] ) ? 'selected="yes" ' : '';>&gt;Choose a Sub Source...</option>		 */}
                      {/*?php $totalLov = count($lovSubSource); ?*/}
                      {/*?php for($i=0;$i<$totalLov;$i++){ ?*/}
                      {/* <option value="<?php echo $lovSubSource[$i]['lovID']; ?>" <?php echo ( $lovsubsource[$i]['lovid']="=" $ci['subsourceid'] ) ? 'selected="yes" ' : '';>&gt;{/*?php echo $lovSubSource[$i]['lovName']; ?</option> */}
                      {/*?php } ?*/}
                    </div>
                  </div>
                  <div className="profile-info-row">
                    <div className="profile-info-name" style={{ width: '25%' }}> Case Description </div>
                    <div className="profile-info-value">
                      <textarea className="form-control limited" rows={10} name="inputs[caseContent]" maxLength={9999} defaultValue={"<?php echo (isset($ci['caseContent'])) ? $ci['caseContent'] : ''; ?>"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Createcase;